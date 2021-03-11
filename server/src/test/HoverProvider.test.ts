import TextDocumentManager from "../TextDocumentManager";
import HoverProvider from "../HoverProvider";
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
before(() => {
  docManager.update(textDocument);
});

it("shows the declaration source code excerpt if hovering over a type", () => {
  const hover = hoverProvider({
    position: { line: 157, character: 45 },
    textDocument,
  });
  assert.deepStrictEqual(hover, {
    contents: {
      language: "P4",
      value:
        "struct headers {\r\n    ethernet_t   ethernet;\r\n    ipv4_t       ipv4;\r\n}",
    },
  });
});
