import Discord from "discord.js";
import fs from "fs";
import axios from 'axios'
import fetch from 'node-fetch';
import env from 'dotenv'
env.config()
const token = process.env.GITHUB_GISTS_API;
const url = 'https://api.github.com/gists';
import {
    Client,
    GatewayIntentBits,
} from "discord.js";

async function main() {
    const bot = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
        ],
    });
    const conturi = {
        steam: "steam.txt",
        roblox: "roblox.txt",
        valorant: "valorant.txt",
        nordvpn: "nordvpn.txt",
    };

    bot.on("ready", async () => {
        console.log(`Logged in as ${bot.user.tag}!`);
        const hopaeproblema = Object.values(conturi).filter(
            (file) => !fs.existsSync(file)
        );
        if (hopaeproblema.length > 0) {
            console.error(`Missing: ${hopaeproblema.join(", ")}`);
            await bot.user.setActivity(`Missing: ${hopaeproblema.join(", ")}`, {
                type: "WATCHING",
            });
            process.exit(1);
        }

        const command = await bot.application?.commands.create({
            name: "freegen",
            description: "Generate an account",
            options: [{
                name: "account",
                description: "Type of the account you want to generate",
                type: 3,
                choices: Object.keys(conturi).map((tipcont) => ({
                    name: tipcont,
                    value: tipcont,
                })),
            }, ],
        });

        console.log(`Build log: /freegen created`);
    });

    const cooldowns = new Map();

    bot.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const canalfg = process.env.GENERATOR_CHANNEL; // channel where generate
        if (interaction.channelId !== canalfg) {
            return interaction.reply({
                content: `You can use this command only on free-generator.`,
                ephemeral: true,
            });
        }
        const tipcont = interaction.options.getString("account");
        if (!Object.keys(conturi).includes(tipcont)) {
            return interaction.reply({
                content: `The type of the account is invalid. Types of the account you can generate are: ${Object.keys(
          conturi
        ).join(", ")}.`,
                ephemeral: true,
            });
        }
        const file = conturi[tipcont];
        const userId = interaction.user.id;
        const cooldownTimestamp = cooldowns.get(userId);
        const now = Date.now();
        if (cooldownTimestamp && now < cooldownTimestamp + process.env.COOLDOWN_GEN * 60 * 1000) {
            const remainingTime = Math.ceil(
                (cooldownTimestamp + process.env.COOLDOWN_GEN * 60 * 1000 - now) / 1000
            );
            return interaction.reply({
                content: `You need to wait ${remainingTime} seconds before using again the command.`,
                ephemeral: true,
            });
        }

        try {
            const data = await fs.promises.readFile(file, "utf8");
            const linii = data.trim().split("\n");

            if (linii.length === 0) {
                return interaction.reply({
                    content: `There is no more stock for ${tipcont}.`,
                    ephemeral: true,
                });
            }

            const index = Math.floor(Math.random() * linii.length);
            const account = linii[index];
            linii.splice(index, 1);

            if (account === "") {
                interaction.reply({
                    content: `There is no more stock for  ${tipcont}.`,
                    ephemeral: true,
                });
                return;
            }
            const email = account.split(":")[0]
            const parola = account.split(":")[1]

            await fs.promises.writeFile(file, linii.join("\n"), "utf8");
            const dataacc = {
                description: 'Gist',
                public: true,
                files: {
                    'hello-world.txt': {
                        content: `Account type - ${tipcont} \nEmai: ${email} | Password: ${parola}\nThank you for using our service: https://discord.gg/rQT7PXxr`
                    }
                }
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataacc)
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    const longUrl = data.html_url;
                    let r = (Math.random() + 1).toString(36).substring(7);
                    const apiToken = process.env.SHRINKEARN_API;
                    const apiUrl = `https://shrinkearn.com/api?api=${apiToken}&url=${encodeURIComponent(longUrl)}&alias=${r}`;
                    axios.get(apiUrl)
                        .then(response => {
                            const result = response.data;
                            if (result.status === 'error') {
                                console.log(result.message);

                            } else {
                                console.log();
                                const embed = new Discord.EmbedBuilder()
                                    .setColor("#FFFFFF")
                                    .setTitle("Darkside")
                                    .addFields({
                                            name: "Account information",
                                            value: " "
                                        }, {
                                            name: "For accesing the account follow the link ",
                                            value: `${result.shortenedUrl}`
                                        },

                                    )
                                    .setFooter({
                                        text: "\n Thank you for using our service !",
                                        position: "relative",
                                        align: "center",
                                        iconURL: "https://media.discordapp.net/attachments/1084215153094033480/1086208688341139538/El6CJHKWkAAJfP5.jpg?width=676&height=676",
                                    });
                                interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error occurred while shortening URL', error);
                        });
                    setTimeout(() => {
                        const deleteUrl = `https://api.github.com/gists/${data.id}`;
                        const deleteOptions = {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        };
                        fetch(deleteUrl, deleteOptions)
                            .then(() => console.log(`Gist ${data.id} deleted successfully`))
                            .catch(error => console.error(`Failed to delete Gist ${data.id}: ${error}`));
                    }, process.env.DELETE_TIME * 60 * 1000);
                })
                .catch(error => console.error(error));
            cooldowns.set(userId, now);
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: "An unexpected error happened...",
                ephemeral: true,
            });
        }
    });

    bot.login(
        process.env.BOT_TOKEN
    );
}
main();