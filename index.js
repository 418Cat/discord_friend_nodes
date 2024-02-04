const config    = require("./config.json");
const frLinks   = require('./friendLinks');
const fs        = require("fs");

let frNetwork = 
{
    "nodes":[],
    "links":[]
};

async function main()
{
    if(!fs.existsSync("./webFiles/data.json"))
    {
        console.log("/!\\\ndata.json not found, retrieving friend list from the discord API\n\n");

        // Get the friends
        frLinks.getFriends(config.token).then(async function(friendsJson)
        {
            if(!(typeof friendsJson[Symbol.iterator] === 'function'))
            {
                console.log("\n\n/!\\ /!\\\nCould not retrieve friend list, please make sure the token in config.json is valid and/or you have friends\n/!\\ /!\\");
                process.exit(1);
            }
            for(const friend of friendsJson)
            {
                // Make sure to not exceed the discord API rate limit
                /*
                 *  MODIFY AT YOUR OWN RISKS, YOU CAN VERY MUCH GET BANNED IF YOU SET IT TOO LOW
                 */
                await sleep(400);

                // Add user to the nodes
                frNetwork["nodes"].push(
                {
                    "id":parseInt(friend.user.id),
                    "name":getName(friend.user)
                });

                // Add common friends to links
                frLinks.getCommonFriends(config.token, friend.user.id).then(function(commonFriends)
                {
                    for(const commonFriend of commonFriends)
                    {
                        // Check if the link was previously created the other way around
                        if(!linkExists(parseInt(commonFriend.id), parseInt(friend.user.id)))
                        {
                            frNetwork["links"].push(
                            {
                                "source":parseInt(friend.user.id),
                                "target":parseInt(commonFriend.id)
                            });
                            console.log(`\rLink between ${getName(friend.user)} and ${getName(commonFriend)} added`);
                        }
                    }
                });
                console.log("");
            };
            
            // Save the data file
            fs.writeFile ("./webFiles/data.json", JSON.stringify(frNetwork), function(err) {
                if (err) throw err;
                console.log('complete');
            });
        });
    }


    // Startup the web server on port 8080
    try
    {
        const htmlGen = require("./htmlGen");
    }
    catch (err)
    {
        console.error(err);
    }
}

// Used to not spam the discord api
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

// Some users didn't switch to the new username system
// So user.global_name was returned as null
function getName(user)
{
    if(user.global_name != null) return user.global_name;

    if(user.username != null) return user.username;

    return "Deleted user";


}

function linkExists(source, target)
{
    for(const link of frNetwork.links)
    {
        if(link.source == source && link.target == target) return true;
    }

    return false;
}

main();