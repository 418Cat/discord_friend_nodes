# Discord Friend Nodes

## /!\ Be careful, this might be considered like a self-bot


For some time, I wondered how many of my seemingly unrelated discord friends were actually related in some way, so one evening I decided to plot by hand each friend in common I had with each one of my friends. \
It took me about 2 hours so, as any self-respecting programmer, I spent a whole day automating it.

---
\
It runs on an [Express](https://www.npmjs.com/package/express) web server so remember to install it using npm before, else it won't work
\
\
It uses your account token, so this might be considered a self-bot.
\
The only reason I'm making this code public is because of its passive nature, it doesn't write in any way using the discord API, it only reads from it at a relatively slow rate.\
/!\ Still, use it at your own risks

It is interactive, you can move nodes around.

![example image](https://github.com/418Cat/discord_friend_nodes/blob/master/example_img.png?raw=true)

---
\
\
The code in the ./webFiles directory was mainly written by [Mike Bostock](https://github.com/mbostock) from [this gist](https://gist.github.com/steveharoz/8c3e2524079a8c440df60c1ab72b5d03), so a big thank you to him.\
It was modified to suit my needs.
---
This code is under GPL3 licence