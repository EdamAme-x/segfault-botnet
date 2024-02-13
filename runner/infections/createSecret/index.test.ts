import { assert } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { createSecret } from "./index.ts";
import { prefix } from "./index.ts";

Deno.test("createSecret", async () => {
    const secret = await createSecret();
    assert(secret.length > 39);
    assert(secret.length < 42);
    assert(prefix.includes(secret.split("-")[0]));
});
