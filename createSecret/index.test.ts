import { assert } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { genTabId } from './tabId/genTabId.ts';
import { genUserAgent } from './userAgent/genUserAgent.ts';

Deno.test("TabId Util Test", async () => {
    const tabId = await genTabId()
    assert(tabId.length === 13)
})

Deno.test("UserAgent Util Test", async () => {
    const userAgent = await genUserAgent()
    assert(userAgent !== null)
})