import { parseSource } from "../../src/Parser";
import { createAST } from "../../src/AST/ParseTreeToAST";
import ScopeNode from "../../src/AST/node/ScopeNode";
const code = `
control MyIngress(inout headers hdr,
    inout metadata meta,
    inout standard_metadata_t standard_metadata) {
        
    action drop() {
        mark_to_drop(standard_metadata);
    }

    action ipv4_forward(macAddr_t dstAddr, egressSpec_t port) {
        standard_metadata.egress_spec = port;
        hdr.ethernet.srcAddr = hdr.ethernet.dstAddr;
        hdr.ethernet.dstAddr = dstAddr;
        hdr.ipv4.ttl = hdr.ipv4.ttl - 1;
    }

    apply {
        if (hdr.ipv4.isValid()) {
            ipv4_lpm.apply();
        }
    }    
}
`;

it("creates a control AST", () => {
  const root = createAST(parseSource(code).parseTreeRoot);
  const type = (root as ScopeNode).getDeclaredType("ipv4_t");
  expect(root).toMatchSnapshot();
});
