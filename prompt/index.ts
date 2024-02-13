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

    static showOptions(): "infections" | "operation" {
        console.log(`
------------------------
|\x1b[32m [1] \x1b[0m Infections mode |
|\x1b[32m [2] \x1b[0m Operation mode  |
------------------------
`);
        const answer = prompt("\x1b[32m[?] \x1b[0mSelect (1/2) :");

        if (answer === "1") {
            console.log("\n\x1b[32m[+] Infections mode\x1b[0m\n");
            return "infections";
        } else if (answer === "2") {
            console.log("\n\x1b[32m[+] Operation mode\x1b[0m\n");
            return "operation";
        } else {
            console.log("\n\x1b[31m[!] Invalid input\x1b[0m\n");
            return this.showOptions();
        }
    }
}
