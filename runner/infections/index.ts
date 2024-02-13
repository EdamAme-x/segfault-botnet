import { createSecret } from "./createSecret/index.ts";
import { CheckConfig } from "./checkConfig/index.ts";
import { Config } from "../../types/global.d.ts";

const threads = 10;

export class InfectionsRunner {
    private createSecret = createSecret;
    private async checkConfig(secret: string): Promise<Config> {
        return await new CheckConfig(secret).run();
    }

    public async run() {
        const onThread = async () => {
            const secret = await this.createSecret();
            const config = await this.checkConfig(secret);
            if (!config) {
                return;
            }
            const result = {
                secret: secret,
                ip: config.ip,
                envSecret: config.envSecret
            } as const

            console.log(result);
        }

        onThread();


    }
}
