import Parser from "tree-sitter";
//@ts-ignore
import P4 from "./bindings/node/index.js";
const parser = new Parser();
parser.setLanguage(P4);

export default function parseSource(source: string): Parser.Tree {
  const tree = parser.parse(source);
  return tree;
}
