
const Discord = require('discord.js');
const client = new Discord.Client();

const dotenv = require('dotenv');
dotenv.config();


// Apoyado por:
//      Momoles
//      Pocho
//      Matecocido



// Release 2021


const speed = process.env.speed;
const prefix = process.env.prefix;
const size = process.env.colors;
const logging = process.env.logging;



const rainbow = new Array(size);

for (var i = 0; i < size; i++) {
    var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
    var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
    var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

    rainbow[i] = '#' + red + green + blue;
}

function sin_to_hex(i, phase) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
}

let place = 0;

var servers = [];

function changeColor() {
    for (let index = 0; index < servers.length; ++index) {
        let server = client.guilds.cache.get(servers[index]);
        if (!server) {
            if (logging) {
                console.log(`[ColorChanger] Server ${servers[index]} was not found. Skipping.`);
            }
            continue;
        }


        var losroles = getVar(servers[index], "roles")
        var RoleElement = losroles;

        /*
        if (!losroles) {
            console.log("no roles assigned in ", server);
        }
        else {
            for (let index = 0; index < losroles.length; index++) {
                const RoleElement = losroles[index];
            }
        }
        */


        let role = server.roles.cache.find(r => r.name === RoleElement); //config.roleName
        if (!role) {
            if (logging) {
                console.log(`[ColorChanger] The role ${RoleElement} was not found on the server ${servers[index]}. Skipping.`);
            }
            continue;
        }

        role.setColor(rainbow[place]).catch(console.error);

        if (logging) {
            console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
        }








    }

    if (place == (size - 1)) {
        place = 0;
    } else {
        place++;
    }
}




///////////////////////////////     VARS PER SERVER ////////////////////////////////// A


// SOURCE
// https://stackoverflow.com/questions/61655414/discord-js-different-variables-in-different-servers


let stationsPerServer = new Map();
//when a server adds your bot
client.on("guildCreate", guild => {
    stationsPerServer.set(guild.id, new Object());
});
//station activation per server
function setVar(guildId, stationName, stationVar) {
    const stations = stationsPerServer.get(guildId);
    //stations.add(stationName);

    stations[stationName] = stationVar;
    return stationVar;
    //add any other custom actions like broadcast to a voice channel

}
//station deactivation per server
function removeVar(guildId, stationName) {
    const stations = stationsPerServer.get(guildId);
    delete stations[stationName]
    //add any other custom actions like leaving a voice channel
}

//station get var per server
function getVar(guildId, stationName) {
    const stations = stationsPerServer.get(guildId);
    return stations[stationName]
    //add any other custom actions like leaving a voice channel
}



//is station playing in server
function ifVarExist(guildId, stationName) {
    return stationsPerServer.get(guildId).has(stationName)
}

//deactivate station for all servers
function removeVarGlobally(stationName) {
    for (let stations of stationsPerServer.values()) {
        stations.delete(stationName);
        //add any other custom actions like leaving the voice channel
    }
}


///////////////////////////////     VARS PER SERVER ////////////////////////////////// V


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Logged in as ${client.user.username}!`);

    /*console.log(`Bot has started, with 
    ${client.users.size} users, in 
    ${client.channels.size} channels of 
    ${client.guilds.size} guilds.`);
    client.user.setActivity(`Serving 
    ${client.guilds.size} servers`);
    */

    console.log("----- SERVERS -----");
    client.guilds.cache.forEach(server => {
        console.log(server.name + " id: " + server.id);
        stationsPerServer.set(server.id, new Object());
        servers.push(server.id);
    });
    console.log("Quantity of servers logged", stationsPerServer);



    if (speed < 60000) {
        console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned");
        process.exit(1);
    }
    setInterval(changeColor, speed);
    changeColor();
});





function sendJoke(channel) {
    /*
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
            */
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Random Joke')
        .setURL('https://official-joke-api.appspot.com/random_joke')
        .setAuthor('Joke Bot', 'https://i.imgur.com/ABwifID.gif', 'https://discord.js.org')
        .setDescription('Some Joke here')
        .setThumbnail('https://i.imgur.com/ABwifID.gif')
        /*
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )*/
        .addField('XD', 'Some XD here')
        .setImage('https://i.imgur.com/ABwifID.gif')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/ABwifID.gif');


    channel.send(exampleEmbed);
}

client.on('message', msg => {
    /*
    if (msg.content === prefix + 'ping') {
        msg.reply('pong');
    }
    if (msg.content === prefix + 'joke') {
        //msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
        sendJoke(msg.channel)
    }
    */



    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const server = msg.guild.id;



    if (command === 'ping') {
        msg.reply('pong');
    } else if (command === 'joke') {
        //msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
        sendJoke(msg.channel)

    } else if (command === 'args-info') {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        }

        msg.channel.send(`Command name: ${command}\nArguments: ${args}`);


    } else if (command === 'set') {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        }

        msg.channel.send(`Command name: ${command}\nArguments: ${args}`);


        setVar(server, "var", args[0])

    } else if (command === 'get') {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        }

        msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
        msg.channel.send(getVar(server, "var") || "💔")

    } else if (command === 'setrole') {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        }

        msg.channel.send(`Command name: ${command}\nArguments: ${args}`);


        setVar(server, "roles", args[0])
    } else {
        msg.channel.send(`You didn't provide any command, please think if you are doing the things OK!, ${msg.author}!`);
    }

    /*
    if (msg.content === prefix + 'set') {
        //msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
        sendJoke(msg.channel)
    }
    if (msg.content === prefix + 'get') {
        //msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
        sendJoke(msg.channel)
    }
    */
});
console.log(`Your token is ${process.env.TOKEN}`); // 8626

client.login(process.env.TOKEN);