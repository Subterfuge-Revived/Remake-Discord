# Remake-Discord
A bot coded in Node JS for Discord as part of the Subterfuge Remake project.  

## Manual Setup
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
   - Rename `tokens.json.example` to `tokens.json` and fill it out as follows, 
	 	- Replace `"YOUR_UNIQUE_BOT_ID"` with the discord token.
   		- Replace `"YOUR_DISCORD_BOT_ID` with the bot's ID (Can be done with right clicking the bot in Discord and copying ID)
		- OPTIONAL: You can replace `YOUR_TEST_SERVER_ID` with your server ID to get faster command refreshes

5. Test out the bot.
    - Run `npm run bot` and you should see the bot come online.

## Docker Setup
1. [Install docker](https://docs.docker.com/get-docker/) for your device
2. [Install VSCode](https://code.visualstudio.com/)
3. Clone/fork this repository
   - Enter `git clone https://github.com/Subterfuge-Revived/Remake-Discord.git`
4. Open the project in Visual studio code. A message should say "This workspace has recommended extensions"
   - Install the recommended extensions.
   - These include: `Docker`, `Eslint`

## Run Scripts

The following scripts are avaliable for this repository:

`npm run lint` - Checks your code for syntax and style. For example, ensures all strings are double quotes, correct spacing, no unused imports, etc.<br/>
`npm run debug` - Runs the bot in a debugger process within visual studio code. Pressing `F5` will start and attach the VS Code debugger so that you can debug your code.<br/>
`npm run bot` - Runs the bot.<br/>
`npm run test` - Not yet implemented.<br/>

#### Managing Docker Builds

To run the bot:
- Ensure docker has started
- Right click the `docker-compose.yml` file and click `Compose Up`

To view the bot console:
- Click the docker whale icon on the left of VSCode
- In the `Containers` section, find the running container (likely named `remake-discord_discord`)
- Right click the container and click `View Logs`

To stop the bot:
- Right click the `docker-compose.yml` file and click `Compose Down`
- You can alternatively stop the container from the container list in the docker extensions

### Contributing

Ensure that when contributing files you adhere to `Eslint`.
To ensure your code meets the required style standards, run the command `npm run lint`
