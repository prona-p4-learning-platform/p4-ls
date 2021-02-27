import { Hover, HoverParams } from "vscode-languageserver";
import type TextDocumentManager from "./TextDocumentManager";

export default (docManager: TextDocumentManager) => (
  _textDocumentPosition: HoverParams
): Hover => {
  return { contents: "Test" };
};
