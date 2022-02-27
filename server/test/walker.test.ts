import test from "ava";
import fs from "fs";
import path from "path";
import { walker } from "../src/analyzer/walker";

const code = fs.readFileSync(path.resolve(__dirname, "code.p4"), "utf-8");

test("test 1", () => {
  walker(code);
});
