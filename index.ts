import { createSecret } from "./createSecret/index.ts";
import { Prompt } from "./prompt/index.ts";

Prompt.showTitle();

const mode = Prompt.showOptions()
console.log(await createSecret())