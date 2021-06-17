import test from "ava";
import { readFileSync } from "fs";
import path from "path";
import { TextDocument } from "vscode-languageserver-textdocument";
import { createAST } from "../src/AST/parseTreeToAST";

const code = readFileSync(path.resolve(__dirname, "code.p4"), {
  encoding: "utf8",
});

const textDocument = TextDocument.create(
  "test",
  "p4",
  1,
  readFileSync(path.resolve(__dirname, "code.p4"), {
    encoding: "utf8",
  })
);

test("returns diagnostics with undefined types detected", (t) => {
  const result = createAST(code);

  t.deepEqual(
    result.diagnostics.map((diag) => ({
      ...diag,
      text: textDocument.getText(diag.range),
    })),
    []
  );
});
