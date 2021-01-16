import Tokenizer from "./Tokenizer";
import { readFileSync } from "fs";

const sampleProgram = readFileSync("./simple.p4").toString("utf-8");
it("creates tokens for a simple p4 program", () => {
  const tokens = Tokenizer.tokenize(sampleProgram);
  console.log(tokens);
  expect(tokens.errors.length).toBe(0);
});
