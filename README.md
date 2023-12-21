## Discord Reaction Collector Bot

This project includes a Discord bot written in TypeScript using the `discord.js` library. 
The bot collects unique usernames from reactions to a specific message and can randomly select a specified number of winners from these users.

### Features
1) Collects all unique usernames who reacted to a specified Discord message.
2) Ability to select a random number of winners from the collected usernames.
3) Saves the usernames to a text file.

### Prerequisites
- Node.js
- TypeScript
- discord.js library
- A Discord Bot Token
- message ID 
- server ID
- channel ID

### Setup and Installation
1) Clone the Repository
`git clone https://github.com/timpratim/giveawaydiscordbot.git`

2) Navigate to the Project Directory 
`cd giveawaydiscordbot`

3) Install Dependencies: 
Run `npm install` to install the required Node.js modules.

4) Set Environment Variables: 
Create a .env file in the project root and add your Discord Bot Token, Channel ID, and Message ID:

```
BOT_TOKEN=your_bot_token
CHANNEL_ID=your_channel_id
MESSAGE_ID=your_message_id
```
5) Usage
   - Enter Number of Winners: When prompted, input the number of winners 
      you wish to select.
   - Results: The bot will print the selected winners to the console and save all 
      unique usernames to a file users.txt.

6) Important Notes
   - Ensure your bot has the required permissions on your Discord server.
   - You can refer to [this](https://www.upwork.com/resources/how-to-make-discord-bot) blog.
   - When on step 8, check the following permissions: View Channels, Read 
     Message History, Send Messages.
   - Never share your Discord token. Add it to your local env file. 
   - Do not cross the rate limit for discord, else the bot will be blocked by 
     discord. 
   - The number of winners must be a positive integer and less than or equal to 
     the total number of unique users.



7) Run the project
   Run the project with `npm start <number of winners you want to select>`

8) Contributing
   Contributions to the project are welcome! Please follow the standard GitHub pull request process.
