import UserAgents from "./list.json" with { type: "json" };

export async function genUserAgent() {
    return await UserAgents[Math.floor(Math.random() * UserAgents.length)];
}