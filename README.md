# ButterBot


**Description**
A small, easily maintainable bot using [Discord.io](https://github.com/Woor/discord.io/tree/gateway_v6) library for Node.js and browsers.

### Requirements
**Required**:
* **Node.js 0.10.x** or greater

### Getting Started:

#### Installing
run `npm i` int he project to get all dependencies

add `auth.json` file to root directory

place the following in `auth.json`

```javascript
{
   "token": "your bot token"
}

```
where `your bot token` is the token of your bot recieved by discord

#### Running
use `node index.js` to start the bot
You should receive the following output
```
info: Starting Bot
info: Loaded Commands
info: Bot Connected
info: Logged in as [Your bot's name] - ([your bot's ID])
```
