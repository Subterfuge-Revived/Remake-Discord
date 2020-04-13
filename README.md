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
   - Rename the file named `tokens.json.example` to `tokens.json` and replace `"YOUR_UNIQUE_BOT_ID"` with the token.  
    ```json
    {
    "token":"YOUR_UNIQUE_BOT_ID"
    }
    ```
5. Test out the bot.
    - Run `node index.js` and you should see the bot come online.  

# How to add Commands:

1. Commands are loaded from the /commands/ directory.
    - Name the file like `commandName.js` and put it there.  
    - Use the `exports.run` format for modules.  
2. Commands have 3 arguments by default, which can access nearly anything about the situation they are called in.  
    - `client`: the Discord client which refers to the bot itself. Includes configuration and status references.  
    - `message`: the message object that triggered the event.  Allows references back to original channel, information about the author, and more.  
     - `args`: This is the words offered as arguments to the command, parsed by the message event handler.  

3. Example formatting:
    ```javascript
    exports.run = (client, message, args) => { 
        message.channel.send("pong!").catch(console.error);
    }
    ```