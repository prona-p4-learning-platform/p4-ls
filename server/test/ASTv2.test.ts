import test from "ava";
import { readFileSync } from "fs";
import path from "path";
import { createAST } from "../src/AST/parseTreeToAST";

const code = readFileSync(path.resolve(__dirname, "code.p4"), {
  encoding: "utf8",
});

test("returns a JSON-based AST of a struct declaration", (t) => {
  const result = createAST(`struct headers {
    ethernet_t   ethernet;
    ipv4_t       ipv4;
}`);
  t.snapshot(result.tree);
});
