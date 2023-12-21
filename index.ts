import "dotenv/config";
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import fs from 'fs';

const token = process.env.BOT_TOKEN as string;
const channelId = process.env.CHANNEL_ID as string;
const messageId = process.env.MESSAGE_ID as string;

async function main() {
  const winnersCount = parseInt(process.argv[2]);
  if (isNaN(winnersCount) || winnersCount <= 0) {
    console.error('Please provide a valid number of winners.');
    return;
  }

  const winners = await collectUserReactions(winnersCount);
  console.log(winners);
}

async function collectUserReactions(winnersCount: number): Promise<string[]> {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  return new Promise((resolve, reject) => {
    client.once('ready', async () => {
      try {
        console.log(`Logged in as ${client.user?.tag}!`);

        // Fetch message
        const channel = await client.channels.fetch(channelId) as TextChannel;
        const message = await channel.messages.fetch(messageId);
        const uniqueUsernames = new Set<string>();

        for (const reaction of message.reactions.cache.values()) {
          const users = await reaction.users.fetch();
          users.forEach(user => {
            uniqueUsernames.add(user.username);
          });
        }

        const usernamesArray = Array.from(uniqueUsernames);
        const winners = selectRandomWinners(usernamesArray, winnersCount);
        console.log('Winners:', winners);

        // Write to file
        fs.writeFile('users.txt', usernamesArray.join('\n'), (err) => {
          if (err) {
            console.error('Error writing to the file', err);
            reject(err);
            return;
          }
          console.log('Writting to the file');
        });

        client.destroy();
        resolve(winners);
      } catch (err) {
        console.error(err);
        client.destroy();
        reject(err);
      }
    });

    client.login(token);
  });
}

function selectRandomWinners(usernames: string[], count: number): string[] {
  const shuffled = [...usernames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

main().catch(console.error);
