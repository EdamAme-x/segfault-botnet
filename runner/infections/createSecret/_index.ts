import { genTabId } from './tabId/index.ts';
import { genUserAgent } from './userAgent/index.ts';

export async function createSecret() {
  const resp = await fetch("https://shell.segfault.net/secret", {
    headers: {
      accept: "*/*",
      "accept-language": "ja,en-US;q=0.9,en;q=0.8",
      "content-type": "text/plain;charset=UTF-8",
      "sec-ch-ua":
        '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "User-Agent": await genUserAgent()
    },
    referrer: "https://shell.segfault.net/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify({
        secret: "",
        new_instance: true,
        tab_id: await genTabId()
    }),
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });

  const data = await resp.json();

  if (data.status === "OK") {
    return data.secret as string;
  }else {
    return null;
  }
}