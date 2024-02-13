import { assert } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { CheckConfig } from "./index.ts";

Deno.test("CheckConfig", () => {
    const checkConfig = CheckConfig.ipParser;

    const test1 = `xanxipoaanopx
ahepw
2.2.2.28 anko
1.1.1.1 aaa
ao9n2-
`;
    const test2 = `xanxipoaanopx
ahepw
2.2.2.x anko
1.1.1.1aaa
ao9n2-
`;

    const result1 = checkConfig(test1);
    assert(result1 === "1.1.1.1");
    const result2 = checkConfig(test2);
    assert(result2 === null);
});
