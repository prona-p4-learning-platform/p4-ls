import Parser from "tree-sitter";
//@ts-ignore
import P4 from "./index";
const parser = new Parser();
parser.setLanguage(P4);

export default function parseSource(source: string): Parser.Tree {
  const tree = parser.parse(source);
  return tree;
}
