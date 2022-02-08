const keepAlive = require("./server.js")
const Discord = require('discord.js');
const client = new Discord.Client();
const fsLibrary  = require('fs'); 
const got = require('got');


function meme(message) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/memesthatkill/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
        message.reply(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
}

keepAlive()

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //Tell the bot is ready
	console.log('Ready!');
  //How many servers is the bot in
  console.log('In ' + client.guilds.cache.size + ' servers')
  //Tacanote server shows that the bot restarted
  //new embed
  const restartlog = new Discord.MessageEmbed()
    restartlog.setTitle('Tacanote has been restarted')
    restartlog.setColor('#ffff00')
    restartlog.setTimestamp()
  client.channels.cache.get('838264759899652137').send(restartlog)
  //Set status and activity
  client.user.setPresence({
   status: "online"
  });
  //shows how many servers and uses he bot has the uses is not spot on to true amount
	client.user.setActivity('Servers: ' + client.guilds.cache.size + ' Uses: ' + fsLibrary.readFileSync('times_used.int','utf8') + '(Uses may be off (less) real amount)', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
  //shows stats on my bot on my server
  let guild = client.guilds.cache.get('814940437751660595');
  let serversin = guild.channels.cache.get('879173068797378580')
  let usesabout = guild.channels.cache.get('879173262200946699')
  serversin.setName('Servers: ' + client.guilds.cache.size)
  usesabout.setName('Uses ↔: ' + fsLibrary.readFileSync('times_used.int','utf8'))
});

client.on('guildCreate', (guild) => {
  //change amount of servers everytime bot is added too a server
  client.user.setActivity('Servers: ' + client.guilds.cache.size + ' Uses: ' + fsLibrary.readFileSync('times_used.int','utf8') + ' (about)', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

});

client.on('message', async (message) => {

  used = false

  if ((message.channel.type) === 'dm') {
    //need help it's t!help
    if ((message.content.toLowerCase()) == 'help') {
      const Help = new Discord.MessageEmbed()
      Help.setTitle('(Use "t!help")')
      message.reply(Help);
      var used = true
    }
  }

  if ((message.content) == '!help') {
    //for help use t!help instead
    const Help = new Discord.MessageEmbed()
    Help.setTitle('(For help in using Tacanote use "t!help")')
    message.reply(Help);
    var used = true
  }
  if (message.author.bot) return
  if (message.content.includes("gtg")) {
    
    //say bye too person leaving for the time being
		message.reply('bye');
    //set used to true so it adds one more to true
    var used = true
	}

  if (!message.content.toLowerCase().startsWith("t!")) return
  //Makes times used not change every message

  used = false

  //Bot doesn't trigger it's self and other bots don't also
  if (message.author.bot) return
  //Help


  if ((message.content.slice(2)) == 'help') {
    //delete message of t!help
    message.delete()
    const help = new Discord.MessageEmbed()
    //send list of things bot can do
    help.setTitle('Help List:')
    help.setColor('#5cf000')
    help.setDescription('Main commands:\n\n• t! help = List of what the bot can do (u are looking at it rn)\n• t!ds (website/app) = bot tells you if app/website has DarkMode (more things coming)\n• t!reply = Reply with “k”\n• t!meme = meme from Reddit r/memesthatkill\n• t!suggestion (suggestion) = Suggest something to be added (join the bots discord server to see the status of the suggestion)\n•  t!how many times have you been used? = About how many times he has been used\n\nOther:\n\n• gtg = Bot says bye\n• !help = Tell user how to use Tacanote help if they want to\n• Some commands are easter eggs try to find them or cheat using the bot github\n\nLinks:\n\n• t!server = This bots help and official server\n• t!website = Link to the website for this bot\n• t!invite = Invite link for this bot')
    help.setFooter('Help asked by: ' + message.author.username)
    message.channel.send(help)
    //set used to true so it adds one more to true
    var used = true
  }

  if ((message.content.slice(2)) == 'website') {
    const website = new Discord.MessageEmbed()
    website.setDescription('No website yet')
    message.channel.send(website)
    var used = true
  }
    if ((message.content.slice(2)) == 'invite') {
    const link = new Discord.MessageEmbed()
    link.setDescription('Get Tacanote here: https://discord.com/api/oauth2/authorize?client_id=877059528762470441&permissions=137439341632&scope=bot%20applications.commands \n(Bot is work in progress so some things might not work well)')
    message.channel.send(link)
    var used = true
  }

  if ((message.content.slice(2)) == 'server') {
    message.reply('Go to the help server here: https://discord.gg/RHNhkEbVa7')
    var used = true
  }

  
  if (message.content.slice(2).includes("reply")) {
    //reply k
    message.reply('K I reply')
    var used = true
  }

  if (message.content.slice(2).includes("among us emoji")) {
    //ඞ
    message.channel.send('ඞ')
    var used = true
  }

  if ((message.content.toLowerCase().slice(2)) == 'nsfw') {
    //This is the wrong bot bro
    message.reply('I\'m not a NSFW bot!!!!' );
    var used = true
  }

  if ((message.content.slice(2)) == 'meme') {
    //send meme using the function
    meme(message);
    var used = true
  }

  if ((message.content.slice(2)) == 'cheese server') {
    //cheese server link
    message.reply('https://discord.gg/dRW6fPjHpC')
    var used = true
  }
  
  //suggest command
  if (message.content.slice(2).startsWith('suggestion ')) {
    const suggest = new Discord.MessageEmbed()
    suggest.setTitle('Suggestion made by: ' + message.author.username)
    suggest.setColor('#5cf000')
    suggest.setDescription(message.content.slice(12))
    suggest.setTimestamp()
    var used = true
    //send to bot suggestions channel
    client.channels.cache.get('846452836615061564').send(suggest)
  }



  if ((message.content.slice(2)) == 'how many times have you been used?'){
    const timesused = new Discord.MessageEmbed()
    timesused.setDescription('I have been used ' + fsLibrary.readFileSync('times_used.int','utf8') + ' times')
    message.reply(timesused)
   var used = true
  }
  if (message.content.slice(2).startsWith('ds')) {
    var dml = fsLibrary.readFileSync('Darkmodelist.txt','utf8').indexOf(message.content.slice(5).toLowerCase());    
    if(dml !== -1){
      const dmle = new Discord.MessageEmbed()
      dmle.setTitle(message.content.slice(5).toLowerCase() + ' has DarkMode')
      dmle.setDescription("That app/website does have DarkMode (may only work on certain devices, also some apps/websites have the same name as others)")
      dmle.setFooter('Want to add a website/app to the list? Fill out this form: https://forms.gle/1Bbqi4rGHikhK1D36')
      dmle.setColor('#00FF00')
      message.reply(dmle);
      console.log(dml)
      } else{
      var pdml = fsLibrary.readFileSync('Payfordarkmodelist.txt','utf8').indexOf(message.content.slice(5).toLowerCase());
      if(pdml !== -1){
        const dmle = new Discord.MessageEmbed()
        dmle.setTitle(message.content.slice(5).toLowerCase() + ' has pay to have DarkMode')
        dmle.setDescription('That app/website does have DarkMode, but you must pay for DarkMode or app is not free. (may only work on certain devices, also some apps/websites have the same name as others)')
        dmle.setColor('#FFFF00')
        dmle.setFooter('Want to add a website/app to the list? Fill out this form: https://forms.gle/1Bbqi4rGHikhK1D36')
        message.reply(dmle);
      } else{
        const dmle = new Discord.MessageEmbed()
        dmle.setTitle(message.content.slice(5).toLowerCase() + ' does not have DarkMode')
        dmle.setDescription('That app/website does not have DarkMode or has not been added to the list.')
        dmle.setFooter('Want to add a website/app to the list? Fill out this form: https://forms.gle/1Bbqi4rGHikhK1D36')
        dmle.setColor('#FF0000')
        message.reply(dmle);
      }
    }
  }
  if (used) {
    //add used
    var usedtimes = 0
    usedtimes = Number(fsLibrary.readFileSync('times_used.int','utf8'))
    console.log(usedtimes)
    usedtimes +=1
    fsLibrary.writeFileSync('times_used.int',usedtimes)
  };
});

client.login(process.env.TOKEN)
