import test from "ava";
import TextDocumentManager from "../src/TextDocumentManager";
import HoverProvider from "../src/HoverProvider";
import { TextDocument } from "vscode-languageserver-textdocument";
import { readFileSync } from "fs";
import assert from "assert";
import path from "path";

const docManager = new TextDocumentManager();
const hoverProvider = HoverProvider(docManager);
const textDocument = TextDocument.create(
  "test",
  "p4",
  1,
  readFileSync(path.resolve(__dirname, "code.p4"), { encoding: "utf8" })
);
docManager.update(textDocument);

test("shows the declaration source code excerpt if hovering over a type", (t) => {
  const hover = hoverProvider({
    position: { line: 157, character: 45 },
    textDocument,
  });
  t.deepEqual(hover, {
    contents: {
      language: "P4",
      value:
        "struct headers {\n    ethernet_t   ethernet;\n    ipv4_t       ipv4;\n}",
    },
  });
});
