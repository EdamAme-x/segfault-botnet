export async function genTabId() {
    const length = 13;
    const list = "abcdefghijklmnopqrstuvwxyz0123456789";
    const result = []
  
    for (let i = 0; i < length; i++) {
      result.push(list[Math.floor(Math.random() * length)])
    }
  
    return await result.join("")
  }