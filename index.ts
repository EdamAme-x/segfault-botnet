import { Prompt } from "./prompt/index.ts";
import { InfectionsRunner } from './runner/infections/index.ts';

Prompt.showTitle();

const mode = Prompt.showOptions();

switch (mode) {
    case "infections":
        new InfectionsRunner().run();
        break;
    case "operation":
        break;
}
