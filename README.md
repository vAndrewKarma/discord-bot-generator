# Discord Generator Bot

The Discord Generator Bot is a versatile and easy-to-use Node.js bot that allows you to upload and generate accounts for various services, such as NordVPN and Minecraft which generates revenue to the owner every time someone clicks the link. It utilizes the powerful combination of Shrinkearn and Gists to provide you with a streamlined and user-friendly experience.

## Preview

Check out the Discord Generator Bot in action! Click [here](https://streamable.com/sgyxd0) to watch a demo video.


## Features

- Upload and generate accounts for various services
- Shorten links and generate revenue using the Shrinkearn API
- Securely upload accounts via Gists
- Automatic deletion of accounts after a configurable period of time
- Cooldown system to prevent spam and abuse
- Channel restrictions for added control and security
- Customizable configuration options stored in a .env file

## Getting Started

To get started with the Discord Generator Bot, you'll need to have Node.js installed on your system. You'll also need to create a new bot in the Discord Developer Portal and add it to your server.

Once you have your bot set up, you can clone the repository and install the required dependencies using NPM:

- `git clone https://github.com/vAndrewKarma/discord-bot-generator.git`
- `cd discord-bot-generator`
- `npm install`

Next, create a .env file in the root directory of the project and add your bot token, Shrinkearn API key,Github Gists API key, and other configuration options:

- BOT_TOKEN=your_bot_token
- DELETE_TIME=time_to_delete_account_after_generated
- SHRINKEARN_API=your_shrinkearn_api - [ https://shrinkearn.com/ ]
- COOLDOWN_GEN=your_cooldown_after_one_account_has_been_generated
- GENERATOR_CHANNEL=channel_to_generate
- GITHUB_GISTS_API=gists_api_to_upload_content


You can then start the bot using the following command:

`node .`


## Usage

To generate accounts, simply upload a file containing the account information to the root (EX: steam.txt), add account_type  in index.js and then use the `/freegen account_type` command in the designated channel:

The bot will then generate a link using the Shrinkearn API and post it in the channel. (ephermal, only the user who executed the command can see it)

## Customization

The Discord Generator Bot is highly customizable and includes several configuration options that can be adjusted to meet your specific needs. These options include:

- The expiration time for accounts
- The cooldown time for generating accounts
- The ID of the channel in which the bot can be used

All of these options can be configured by editing the .env file.

## Conclusion

Overall, the Discord Generator Bot is an excellent choice for anyone looking for a reliable and efficient way to manage and generate accounts for various services. Whether you're a seasoned pro or just getting started, this bot has everything you need to get the job done quickly and easily and you can make some money using it.

## Support

If you need any help with the Discord Generator Bot, please join my Discord server [here](https://discord.gg/nvkRNYk5Ww).

