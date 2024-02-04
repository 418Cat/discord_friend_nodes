# Discord Friend Nodes

## /!\ Be careful, this might be considered a self-bot


For some time, I wondered how many of my seemingly unrelated discord friends were actually related in some way, so one evening I decided to plot by hand each friend in common I had with each one of my friends. \
It took me about 2 hours so, as any self-respecting programmer, I spent a whole day automating it.

---
\
It runs on an [Express](https://www.npmjs.com/package/express) web server on port 8080.
\
\
It uses your account token, so this might be considered a self-bot.
\
The only reason I'm making this code public is because of its passive nature, it doesn't write in any way using the discord API, it only reads from it at a relatively slow rate.\
/!\ Still, use it at your own risks

It is interactive, you can move nodes around.

![example image](https://github.com/418Cat/discord_friend_nodes/blob/main/example_img.png?raw=true)

---
### How to use
1 - You're gonna need [NodeJS](https://nodejs.org/en/download) to run it. If you don't have it already, go ahead and install it.
\
\
2 - Now that you have NodeJS, open up a node console in the root folder of the progam and run `npm ci` to install the web server.
\
\
3 - In the `config.json` file, you're gonna put your account token (If you don't know how to get it, look it up online) in the empty quotation marks.
\
\
4 - With that previously opened node console, run `node index.js`. The first time it runs, it might take some time retrieving the friend list.
\
\
5 - After it's done, open a web browser and **in the top bar**, type [http://localhost:8080](http:/localhost:8080) to access the node graph.
\
\
To stop the web server, press `ctrl + C` in the console.
\
To update the friend list, delete the file `data.json` located in the `webFiles` folder.

---
\
\
The code in the ./webFiles directory was mainly written by [Mike Bostock](https://github.com/mbostock) from [this gist](https://gist.github.com/steveharoz/8c3e2524079a8c440df60c1ab72b5d03), so a big thank you to him.\
It was modified to suit my needs.

---
This code is under GPL3 licence