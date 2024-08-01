![Header](/IMG/logo.png)
<a href="https://github.com/YTFort/MIOXY-BOOSTED/stargazers"><img src="https://badgen.net/github/stars/YTFort/MIOXY-BOOSTED" alt="GitHub stars"/></a>
<a href="https://github.com/YTFort/MIOXY-BOOSTED"><img src="https://badgen.net/github/forks/YTFort/MIOXY-BOOSTED" alt="GitHub forks"/></a>
<a href="https://github.com/YTFort/MIOXY-BOOSTED/releases"><img src="https://badgen.net/github/assets-dl/YTFort/MIOXY-BOOSTED" alt="GitHub download"/></a>
# MIOXY BOOSTED
`MIOXY BOOSTED - Minecraft proxy server that allows you to log on to the same server with the same nickname, but from different gaming sessions`

## Creator's contacts
- [Discord](https://discord.gg/bjgpVAxgyE)
- [Youtube](https://youtube.com/c/fortcote)
- [Telegram](https://t.me/FortcoteTG)

## Translations
| <sub>EN</sub> [English](README.md) | <sub>RU</sub> [Русский](README_RU.md) |
|-------------------------|----------------------------|

## Disclaimer
> This program is made for educational purposes and does not encourage you to use it!

## The founders
- Original: https://github.com/quickyyy/MIOXY
- Based: https://github.com/dest4590/MIOXY

## Supported OS
 * Windows ✅
 * Linux ✅
 * Mac ✅

## Features
 * Supports Minecraft 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19 and 1.20
 * Beautiful interface
 * It works on pirated and licensed servers
 * If you add a server to the list of servers, it will look like the original you are joining

## Video review and guide on the program
 * not yet

# Installation
* First install [Node.js](https://nodejs.dev)
* Download last [Release](https://github.com/YTFort/MIOXY-BOOSTED/releases) or `git clone https://github.com/YTFort/MIOXY-BOOSTED.git`
* `cd MIOXY BOOSTED`
* `npm install`
* Edit config.json
* `node main.js` or launch the Start.bat

# Usage
 * Edit config.json
```json
{
  "accountname": "Steve", // - The nickname you will be playing on
  "password": "", // - If you are playing with a license, you can log in to your minecraft account here, if on a pirate server, then leave this field empty
  "host": "mc.hypixel.net", // - The server to which you will log in
  "port": 25565, // - Server port
  "proxyhost": "127.1.1.1", // - The host of the proxy server that will open on the localhost
  "proxyport": 25565, // - Proxy port
  "version": "1.16.5" // - The version of the game you will be playing
}
```
* `node main.js` or launch the Start.bat
* We go into the first game session and join `127.1.1.1:25565` (as you indicated in the config)
* (If you add a server to the list of servers, it will look like the original you are joining)
* We go to the proxy server from the second game session
* We are leaving the first game session
* To return to the first game session, repeat the steps in reverse order
#### Congratulations, you have learned how to change minecraft game sessions without leaving the server

# Console interface
* The program's console interface looks like this:
![Main](/IMG/main.png)

# Support me
### Please ⭐ and make a Fork if this program is interesting and informative for you
