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

		// Get the friends list
		const friendsJson = await frLinks.getFriends(config.token);
		
		// The friend list isn't a list
		if(!Array.isArray(friendsJson))
		{
			console.error("\n\n/!\\ /!\\\nCould not retrieve friend list, please make sure the token in config.json is valid and/or you have friends\n/!\\ /!\\");
			process.exit(1);
		}

		// Keeping track of the number for the progress bar
		let progress = 0;
		for(const friend of friendsJson)
		{
			// Make sure to not exceed the discord API rate limit
			/*
			 *  MODIFY AT YOUR OWN RISKS, YOU CAN VERY MUCH GET BANNED IF YOU SET IT TOO LOW
			 */
			await sleep(400);

			// Add user to the nodes
			frNetwork.nodes.push(
			{
				"id":parseInt(friend.user.id),
				"name":getName(friend.user)
			});

			// Get a list of the common friends
			const commonFriends = await frLinks.getCommonFriends(config.token, friend.user.id);
			for(const commonFriend of commonFriends)
			{
				// Check if the link wasn't previously created the other way around
				if(!linkExists(parseInt(commonFriend.id), parseInt(friend.user.id)))
				{
					frNetwork["links"].push(
					{
						"source":parseInt(friend.user.id),
						"target":parseInt(commonFriend.id)
					});
					console.log(`\rLink between ${getName(friend.user)} and ${getName(commonFriend)} added       `);
				}
				else
				{
					// The link was already created
					console.log(`\rLink ${getName(friend.user)} ${getName(commonFriend)} already exists       `);
				}
			}
			if(commonFriends.length == 0)
			{
				console.log(`\rNo common friend with ${getName(friend.user)}      `);
			}

			console.log("\r----------------------------------");

			progress++;
			process.stdout.write(
				(100 * progress/friendsJson.length).toFixed(0) + "% " + 	// Show the percentage of progress
				"[" + "=".repeat(25. * progress/friendsJson.length) + ">" + // Show completed progress
				" ".repeat(25. - 25. * progress/friendsJson.length) + "]" 	// Fill the rest with spaces
			);
		};

		// Save the data file
		fs.writeFile ("./webFiles/data.json", JSON.stringify(frNetwork), function(err) {
			if (err) throw err;
			console.log('\r\nComplete, open a web browser to \nhttp://localhost:8080');
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