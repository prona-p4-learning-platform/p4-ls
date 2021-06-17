import test from "ava";
import TextDocumentManager from "../src/TextDocumentManager";
import DefinitionProvider from "../src/DefinitionProvider";
import { TextDocument } from "vscode-languageserver-textdocument";
import { readFileSync } from "fs";
import path from "path";
import { Location } from "vscode-languageserver";

const docManager = new TextDocumentManager();
const definitionProvider = DefinitionProvider(docManager);
const textDocument = TextDocument.create(
  "test",
  "p4",
  1,
  readFileSync(path.resolve(__dirname, "code.p4"), {
    encoding: "utf8",
  })
);
docManager.update(textDocument);

test("provides the position of the definition of a variable identifier", (t) => {
  const definition = definitionProvider({
    position: { line: 159, character: 11 },
    textDocument,
  });
  t.deepEqual(
    textDocument.getText((definition as Location).range),
    "packet_out packet"
  );
});

test("provides the position of the definition of a type identifier", (t) => {
  const definition = definitionProvider({
    position: { line: 157, character: 45 },
    textDocument,
  });
  t.snapshot(textDocument.getText((definition as Location).range));
});
