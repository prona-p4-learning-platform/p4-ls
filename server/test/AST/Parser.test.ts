import { writeFileSync } from "fs";
import { resolve } from "path";
import { parseSource } from "../../src/Parser";
import { createAST } from "../../src/AST/ParseTreeToAST";
import ScopeNode from "../../src/AST/node/ScopeNode";

const code = `
parser MyParser(packet_in packet,
  out headers hdr,
  inout metadata meta,
  inout standard_metadata_t standard_metadata) {

  state start {
    transition accept;
  }
}
`;

it("creates a basic parser AST", () => {
  const root = createAST(parseSource(code).parseTreeRoot);
  const type = (root as ScopeNode).getDeclaredType("ipv4_t");
  writeFileSync(
    resolve(__dirname, "Parser - creates a basic AST"),
    JSON.stringify(root, null, 2)
  );
  expect(root).toMatchSnapshot();
});
