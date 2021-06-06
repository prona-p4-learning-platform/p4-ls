import { TextDocumentPositionParams } from "vscode-languageserver";
import type TextDocumentManager from "./TextDocumentManager";

export default (docManager: TextDocumentManager) =>
  (_textDocumentPosition: TextDocumentPositionParams) => {
    return docManager.provideDefinition(_textDocumentPosition);
  };
