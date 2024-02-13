export const prefix = ["adm", "8lgm"];

export async function createSecret() {
    return await prefix[Math.floor(Math.random() * prefix.length)] + "-" +
        crypto.randomUUID();
}
