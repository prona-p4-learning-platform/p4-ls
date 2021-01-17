import Tokenizer from "./Tokenizer";
import Parser from "./Parser";
import { readFileSync } from "fs";

const sampleProgram = readFileSync("./simple.p4").toString("utf-8");
it("parses", () => {
  const lexResult = Tokenizer.tokenize(sampleProgram);
  const p = new Parser();
  p.input = lexResult.tokens;
  const cst = p.p4program();
  console.log(cst, p.errors, lexResult.errors);

  expect(lexResult.errors.length).toBe(0);
  expect(p.errors.length).toBe(0);
});
