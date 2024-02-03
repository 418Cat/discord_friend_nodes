module.exports = 
{
    getFriends: async function (token)
    {
        const friendResponse = await fetch(
            "https://discord.com/api/v9/users/@me/relationships",
            {
                "credentials": "include",
                "headers":
                {
                    "User-Agent": "",
                    "Accept": "*/*",
                    "Accept-Language": "",
                    "Authorization": token,
                    "X-Super-Properties": "",
                    "X-Discord-Locale": "",
                    "X-Discord-Timezone": "",
                    "X-Debug-Options": "bugReporterEnabled",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-GPC": "1",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                "referrer": "https://discord.com/channels/@me",
                "method": "GET",
                "mode": "cors"
            }
        );
    
        let friends = await friendResponse.json();
        return await friends;
    },
    
    getCommonFriends: async function (token, friendID)
    {
        const commonFriendsResponse = await fetch(
            `https://discord.com/api/v9/users/${friendID}/relationships`,
            {
                "credentials": "include",
                "headers":
                {
                    "User-Agent": "",
                    "Accept": "*/*",
                    "Accept-Language": "",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-GPC": "1",
                    "Authorization": token,
                    "X-Super-Properties": "",
                    "X-Discord-Locale": "",
                    "X-Discord-Timezone": "",
                    "X-Debug-Options": "bugReporterEnabled",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                "referrer": "https://discord.com/channels/@me",
                "method": "GET",
                "mode": "cors"
            }
        );
        
        let commonFriends = await commonFriendsResponse.json();
        return await commonFriends;
    }
};
