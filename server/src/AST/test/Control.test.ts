import { parseSource } from "../../Parser";
import { createAST } from "../ParseTreeToAST";
import assert from "assert";
import ScopeNode from "../node/ScopeNode";
import { fstat, writeFileSync } from "fs";
import { resolve } from "path";

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

it("creates a basic AST", () => {
  const root = createAST(parseSource(code).parseTreeRoot);
  const type = (root as ScopeNode).getDeclaredType("ipv4_t");
  writeFileSync(
    resolve(__dirname, "creates a basic AST"),
    JSON.stringify(root, null, 2)
  );
  assert.strictEqual(
    JSON.stringify(root),
    JSON.stringify({
      kind: "File",
      children: [
        {
          kind: "ControlDeclaration",
          children: [
            {
              kind: "ActionDeclarationNode",
              children: [
                {
                  children: [],
                  kind: "MethodCallStatement",
                  callee: {
                    children: [],
                    kind: "Identifier",
                    identifier: "mark_to_drop",
                  },
                  parameters: [
                    {
                      children: [],
                      kind: "Identifier",
                      identifier: "standard_metadata",
                    },
                  ],
                },
              ],
            },
            {
              kind: "ActionDeclarationNode",
              children: [
                {
                  children: [],
                  kind: "AssignmentStatement",
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    lhs: {
                      children: [],
                      kind: "Identifier",
                      identifier: "standard_metadata",
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      identifier: "egress_spec",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "Identifier",
                    identifier: "port",
                  },
                },
                {
                  children: [],
                  kind: "AssignmentStatement",
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "ethernet",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      identifier: "srcAddr",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "ethernet",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      identifier: "dstAddr",
                    },
                  },
                },
                {
                  children: [],
                  kind: "AssignmentStatement",
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "ethernet",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      identifier: "dstAddr",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "Identifier",
                    identifier: "dstAddr",
                  },
                },
                {
                  children: [],
                  kind: "AssignmentStatement",
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "ipv4",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      identifier: "ttl",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "SubstrationExpression",
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      lhs: {
                        children: [],
                        kind: "PropertyAccessExpression",
                        lhs: {
                          children: [],
                          kind: "Identifier",
                          identifier: "hdr",
                        },
                        rhs: {
                          children: [],
                          kind: "Identifier",
                          identifier: "ipv4",
                        },
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        identifier: "ttl",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Integer",
                      value: "1",
                    },
                  },
                },
              ],
            },
          ],
          parameters: [
            {
              children: [],
              kind: "ParameterNode",
              type: {
                children: [],
                kind: "Identifier",
                identifier: "headers",
              },
              identifier: "hdr",
            },
            {
              children: [],
              kind: "ParameterNode",
              type: {
                children: [],
                kind: "Identifier",
                identifier: "metadata",
              },
              identifier: "meta",
            },
            {
              children: [],
              kind: "ParameterNode",
              type: {
                children: [],
                kind: "Identifier",
                identifier: "standard_metadata_t",
              },
              identifier: "standard_metadata",
            },
          ],
        },
      ],
    })
  );
});
