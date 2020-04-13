# Remake-Discord
A bot coded in Node JS for Discord as part of the Subterfuge Remake project.  

## Setup
1. Install Node JS and NPM
   - Go to https://nodejs.org/ and download and isntall 12.16.x for your platform.  
   - Verify the install by running `node -v` and `npm -v`.  
2. Clone the Remake-Discord Repository
   - Enter `git clone https://github.com/Subterfuge-Revived/Remake-Discord.git`
   - Navigate into the folder with `cd Remake-Discord`
3. Install Packages with NPM
   - Run `npm install` to install all required packages.  
4. Configuring the tokens.json file.  
   - Find your discord bot token by going to https://discordapp.com/developers/applications and selecting your bot.  
   - Create a file names `tokens.json` and fill it out as follows, replacing `"YOUR_UNIQUE_BOT_ID"` with the token.  
    `
    {
    "token":"YOUR_UNIQUE_BOT_ID"
    }
    `
5. Test out the bot.
    - Run `node index.js` and you should see the bot come online.  