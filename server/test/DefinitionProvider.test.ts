import TextDocumentManager from "../src/TextDocumentManager";
import DefinitionProvider from "../src/DefinitionProvider";
import { TextDocument } from "vscode-languageserver-textdocument";
import { readFileSync } from "fs";
import assert from "assert";
import path from "path";

const docManager = new TextDocumentManager();
const definitionProvider = DefinitionProvider(docManager);
const textDocument = TextDocument.create(
  "test",
  "p4",
  1,
  readFileSync(path.resolve(__dirname, "code.p4"), { encoding: "utf8" })
);
beforeAll(() => {
  docManager.update(textDocument);
});

it("provides the position of the definition of a variable identifier", () => {
  const definition = definitionProvider({
    position: { line: 159, character: 11 },
    textDocument,
  });
  assert.deepStrictEqual(definition, {
    range: {
      end: {
        character: 36,
        line: 157,
      },
      start: {
        character: 36,
        line: 157,
      },
    },
    uri: "test",
  });
});

it("provides the position of the definition of a type identifier", () => {
  const definition = definitionProvider({
    position: { line: 157, character: 45 },
    textDocument,
  });

  assert.deepStrictEqual(definition, {
    range: {
      end: {
        character: 1,
        line: 42,
      },
      start: {
        character: 1,
        line: 39,
      },
    },
    uri: "test",
  });
});