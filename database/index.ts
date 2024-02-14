export class BotNetDataBase {
    public kv: Deno.Kv | undefined;
    constructor() {}

    public setup = async () => {
        this.kv = await Deno.openKv();
    };

    public checkAlreadySetup = async () => {
        if (!this.kv) {
            await this.setup();
        }
    };

    public pushSecret = async (secret: string, ip: string[], envSecret: string) => {
        await this.checkAlreadySetup();
        this.kv?.set(["secrets", secret], {
            ip: ip,
            envSecret: envSecret
        });
    };

    public quantity = async (): Promise<number> => {
        await this.checkAlreadySetup();
        const list = await this.kv?.list({
            prefix: ["secrets"],
        });

        if (!list) {
            return 0;
        }

        const stackArray = [];
        
        for await (const item of list) {
            stackArray.push(item);
        }
        return stackArray.length
    }

    public quantityIP = async (): Promise<number> => {
        await this.checkAlreadySetup();
        const list = await this.kv?.list({
            prefix: ["secrets"],
        });

        if (!list) {
            return 0;
        }

        const stackArray = [];
        
        for await (const item of list) {
            stackArray.push((item.value as { ip: string[], envSecret: string }).ip);
        }

        const maps = new Set();

        for (const item of stackArray) {
            const ips = item;

            for (const ip of ips) {
                maps.add(ip);
            }
        }

        return maps.size
    }
}
