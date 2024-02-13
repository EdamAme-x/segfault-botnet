import { WebSocket } from "npm:ws"
import { Config } from "../../../types/global.d.ts";

export class CheckConfig {
    private ws: WebSocket;
    constructor(
        private secret: string,
    ) {
        this.ws = new WebSocket("wss://shell.segfault.net/ws", [], {
            headers: {
                Origin: "https://shell.segfault.net",
            }
        });
    }

    private wait = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    public async run(): Promise<Config> {
        const isOpen = this.ws.readyState;

        if (isOpen === 0) {
            await this.wait(50);
            return await this.run();
        } else if (isOpen === 1) {
            return await this.setup();
        } else {
            return null;
        }
    }

    private setup(): Promise<Config> {
        return new Promise((resolve) => {
            this.ws.onmessage = (e: MessageEvent) => {
                const text = this.bufferToText(e.data);
                if (text.includes("SEGFAULT")) {
                    resolve(this.activate());
                }
            };
            this.ws.onclose = () => resolve(null);
            this.ws.send(`4{"secret":"${this.secret}"}`);
            this.ws.send(`1{"cols":79,"rows":34}`);
            setTimeout(() => resolve(null), 30000);
        });
    }

    private activate(): Promise<Config> {
        return new Promise((resolve) => {
            // deno-lint-ignore no-explicit-any
            const result: any = {};
            this.ws.onmessage = (e: MessageEvent) => {
                const text = this.bufferToText(e.data);
                if (text.includes("SECRET=")) {
                    const envSecret = CheckConfig.envParser(text)

                    result.envSecret = envSecret as string;
                }

                if (text.includes("Exit CryptoStorm")) {
                    const ip = CheckConfig.ipParser(text);

                    result.ip = ip;
                }

                if (result.ip && result.envSecret) {
                    resolve(result as Config);
                }
            };
            this.ws.send("0\n");

            setTimeout(() => resolve(null), 15000);
        });
    }

    private bufferToText(buffer: Uint8Array): string {
        return new TextDecoder().decode(buffer);
    }

    static ipParser(text: string): string | null {
        const ip = text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g);

        if (ip) {
            if (ip.length >= 2) {
                return ip[1];
            }
        }
        return null;
    }

    static envParser(text: string): string | null {
        // \"SetEnv SECRET=....\"

        const regex = /\"SetEnv SECRET=(.*)\"/;

        const match = text.match(regex);

        if (match) {
            return match[0].replace(/\"SetEnv SECRET=/, "").replace(/\"/, "");
        }

        return null;
    }
}