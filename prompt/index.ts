export class Prompt {
    static showTitle() {
        console.log(`
\x1b[32m..######..########..######...########....###....##.....##.##.......########
.##....##.##.......##....##..##.........##.##...##.....##.##..........##...
.##.......##.......##........##........##...##..##.....##.##..........##...
..######..######...##...####.######...##.....##.##.....##.##..........##...
.......##.##.......##....##..##.......#########.##.....##.##..........##...
.##....##.##.......##....##..##.......##.....##.##.....##.##..........##...
..######..########..######...##.......##.....##..#######..########....##...\x1b[0m
`);
    }

    static showOptions(): "infections" | "operation" | "backup" | "delete" | "view" {
        console.log(`
------------------------
|\x1b[32m [1] \x1b[0m Infections mode |
|\x1b[32m [2] \x1b[0m Operation mode  |
|\x1b[32m [3] \x1b[0m Backup mode     |
|\x1b[32m [4] \x1b[0m Delete mode     |
|\x1b[32m [5] \x1b[0m DB View mode    |
------------------------
`);
        const answer = prompt("\x1b[32m[?] \x1b[0mSelect :");

        if (answer === "1") {
            console.log("\n\x1b[32m[+] Infections mode\x1b[0m\n");
            return "infections";
        } else if (answer === "2") {
            console.log("\n\x1b[32m[+] Operation mode\x1b[0m\n");
            return "operation";
        } else if (answer === "3") {
            console.log("\n\x1b[32m[+] Backup mode\x1b[0m\n");
            return "backup";
        } else if (answer === "4") {
            console.log("\n\x1b[32m[+] Delete mode\x1b[0m\n");
            return "delete";
        } else if (answer === "5") {
            console.log("\n\x1b[32m[+] View mode\x1b[0m\n");
            return "view";
        } else {
            console.log("\n\x1b[31m[!] Invalid input\x1b[0m\n");
            return this.showOptions();
        }
    }

    static promptSaveFile(): string {
        const answer = prompt("\x1b[32m[?] \x1b[0m Save File name (data.json) :");

        if (answer === "" || answer === null) {
            console.log("\n\x1b[31m[!] Invalid input\x1b[0m\n");
            return this.promptSaveFile();
        }

        try {
            Deno.statSync(answer);
        } catch (_) {
            console.log("\n\x1b[31m[!] File not found\x1b[0m\n");
            return this.promptSaveFile();
        }

        return answer;
    }
}
