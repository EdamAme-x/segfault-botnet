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

    static showOptions(): "infections" | "operation" | "backup" {
        console.log(`
------------------------
|\x1b[32m [1] \x1b[0m Infections mode |
|\x1b[32m [2] \x1b[0m Operation mode  |
|\x1b[32m [3] \x1b[0m Backup mode     |
------------------------
`);
        const answer = prompt("\x1b[32m[?] \x1b[0mSelect (1/2/3) :");

        if (answer === "1") {
            console.log("\n\x1b[32m[+] Infections mode\x1b[0m\n");
            return "infections";
        } else if (answer === "2") {
            console.log("\n\x1b[32m[+] Operation mode\x1b[0m\n");
            return "operation";
        } else if (answer === "3") {
            console.log("\n\x1b[32m[+] Backup mode\x1b[0m\n");
            return "backup";
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
