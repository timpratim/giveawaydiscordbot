import "dotenv/config";
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

const token = <string>process.env.RAISON_BOT_TOKEN;

const channelId = <string>process.env.CHANNEL_ID;

const messageId = <string>process.env.MESSAGE_ID;

async function main() {

  CollectionUserReactions();

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

function CollectionUserReactions() {

  const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

  client.once('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    //fetch message
    const channel = await client.channels.fetch(channelId) as TextChannel;
    const message = await channel!.messages.fetch(messageId);

    const uniqueUsernames = new Set<string>();

    for (const reaction of message.reactions.cache.values()) {
      const users = await reaction.users.fetch();
      users.forEach((user: { username: string; }) => {
        uniqueUsernames.add(user.username);
      });
    }

    console.log(Array.from(uniqueUsernames));
    client.destroy();
  });

  client.login(token);
}