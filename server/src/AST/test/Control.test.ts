import { parseSource } from "../../Parser";
import { createAST } from "../ParseTreeToAST";
import assert from "assert";
import ScopeNode from "../node/ScopeNode";
import { writeFileSync } from "fs";
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
                  startPosition: { line: 6, character: 8 },
                  endPosition: { line: 6, character: 40 },
                  callee: {
                    children: [],
                    kind: "Identifier",
                    startPosition: { line: 6, character: 8 },
                    endPosition: { line: 6, character: 20 },
                    identifier: "mark_to_drop",
                  },
                  parameters: [
                    {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 6, character: 21 },
                      endPosition: { line: 6, character: 38 },
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
                  startPosition: { line: 10, character: 8 },
                  endPosition: { line: 10, character: 45 },
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    startPosition: { line: 10, character: 8 },
                    endPosition: { line: 10, character: 37 },
                    lhs: {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 10, character: 8 },
                      endPosition: { line: 10, character: 25 },
                      identifier: "standard_metadata",
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 10, character: 26 },
                      endPosition: { line: 10, character: 37 },
                      identifier: "egress_spec",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "Identifier",
                    startPosition: { line: 10, character: 40 },
                    endPosition: { line: 10, character: 44 },
                    identifier: "port",
                  },
                },
                {
                  children: [],
                  kind: "AssignmentStatement",
                  startPosition: { line: 11, character: 8 },
                  endPosition: { line: 11, character: 52 },
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    startPosition: { line: 11, character: 8 },
                    endPosition: { line: 11, character: 28 },
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      startPosition: { line: 11, character: 8 },
                      endPosition: { line: 11, character: 20 },
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 11, character: 8 },
                        endPosition: { line: 11, character: 11 },
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 11, character: 12 },
                        endPosition: { line: 11, character: 20 },
                        identifier: "ethernet",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 11, character: 21 },
                      endPosition: { line: 11, character: 28 },
                      identifier: "srcAddr",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    startPosition: { line: 11, character: 31 },
                    endPosition: { line: 11, character: 51 },
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      startPosition: { line: 11, character: 31 },
                      endPosition: { line: 11, character: 43 },
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 11, character: 31 },
                        endPosition: { line: 11, character: 34 },
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 11, character: 35 },
                        endPosition: { line: 11, character: 43 },
                        identifier: "ethernet",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 11, character: 44 },
                      endPosition: { line: 11, character: 51 },
                      identifier: "dstAddr",
                    },
                  },
                },
                {
                  children: [],
                  kind: "AssignmentStatement",
                  startPosition: { line: 12, character: 8 },
                  endPosition: { line: 12, character: 39 },
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    startPosition: { line: 12, character: 8 },
                    endPosition: { line: 12, character: 28 },
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      startPosition: { line: 12, character: 8 },
                      endPosition: { line: 12, character: 20 },
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 12, character: 8 },
                        endPosition: { line: 12, character: 11 },
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 12, character: 12 },
                        endPosition: { line: 12, character: 20 },
                        identifier: "ethernet",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 12, character: 21 },
                      endPosition: { line: 12, character: 28 },
                      identifier: "dstAddr",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "Identifier",
                    startPosition: { line: 12, character: 31 },
                    endPosition: { line: 12, character: 38 },
                    identifier: "dstAddr",
                  },
                },
                {
                  children: [],
                  kind: "AssignmentStatement",
                  startPosition: { line: 13, character: 8 },
                  endPosition: { line: 13, character: 40 },
                  lhs: {
                    children: [],
                    kind: "PropertyAccessExpression",
                    startPosition: { line: 13, character: 8 },
                    endPosition: { line: 13, character: 20 },
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      startPosition: { line: 13, character: 8 },
                      endPosition: { line: 13, character: 16 },
                      lhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 13, character: 8 },
                        endPosition: { line: 13, character: 11 },
                        identifier: "hdr",
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 13, character: 12 },
                        endPosition: { line: 13, character: 16 },
                        identifier: "ipv4",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Identifier",
                      startPosition: { line: 13, character: 17 },
                      endPosition: { line: 13, character: 20 },
                      identifier: "ttl",
                    },
                  },
                  rhs: {
                    children: [],
                    kind: "SubstrationExpression",
                    startPosition: { line: 13, character: 23 },
                    endPosition: { line: 13, character: 39 },
                    lhs: {
                      children: [],
                      kind: "PropertyAccessExpression",
                      startPosition: { line: 13, character: 23 },
                      endPosition: { line: 13, character: 35 },
                      lhs: {
                        children: [],
                        kind: "PropertyAccessExpression",
                        startPosition: { line: 13, character: 23 },
                        endPosition: { line: 13, character: 31 },
                        lhs: {
                          children: [],
                          kind: "Identifier",
                          startPosition: { line: 13, character: 23 },
                          endPosition: { line: 13, character: 26 },
                          identifier: "hdr",
                        },
                        rhs: {
                          children: [],
                          kind: "Identifier",
                          startPosition: { line: 13, character: 27 },
                          endPosition: { line: 13, character: 31 },
                          identifier: "ipv4",
                        },
                      },
                      rhs: {
                        children: [],
                        kind: "Identifier",
                        startPosition: { line: 13, character: 32 },
                        endPosition: { line: 13, character: 35 },
                        identifier: "ttl",
                      },
                    },
                    rhs: {
                      children: [],
                      kind: "Integer",
                      startPosition: { line: 13, character: 38 },
                      endPosition: { line: 13, character: 39 },
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
              startPosition: { line: 1, character: 18 },
              endPosition: { line: 1, character: 35 },
              identifier: "hdr",
              type: {
                children: [],
                kind: "Identifier",
                startPosition: { line: 1, character: 24 },
                endPosition: { line: 1, character: 31 },
                identifier: "headers",
              },
            },
            {
              children: [],
              kind: "ParameterNode",
              startPosition: { line: 2, character: 4 },
              endPosition: { line: 2, character: 23 },
              identifier: "meta",
              type: {
                children: [],
                kind: "Identifier",
                startPosition: { line: 2, character: 10 },
                endPosition: { line: 2, character: 18 },
                identifier: "metadata",
              },
            },
            {
              children: [],
              kind: "ParameterNode",
              startPosition: { line: 3, character: 4 },
              endPosition: { line: 3, character: 47 },
              identifier: "standard_metadata",
              type: {
                children: [],
                kind: "Identifier",
                startPosition: { line: 3, character: 10 },
                endPosition: { line: 3, character: 29 },
                identifier: "standard_metadata_t",
              },
            },
          ],
        },
      ],
    })
  );
});
