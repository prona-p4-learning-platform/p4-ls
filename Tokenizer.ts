import { createToken, Lexer } from "chevrotain";

const IDENTIFIER = createToken({
  name: "IDENTIFIER",
  pattern: /[a-zA-Z][a-zA-Z0-9\_]*/,
});
const APPLY = createToken({ name: "APPLY", pattern: /apply/ });
const KEY = createToken({ name: "KEY", pattern: /key/ });
const ACTIONS = createToken({ name: "ACTIONS", pattern: /actions/ });
const STATE = createToken({ name: "STATE", pattern: /state/ });
const TYPE = createToken({ name: "TYPE", pattern: /type/ });
const TYPEDEF = createToken({ name: "TYPEDEF", pattern: /typedef/ });
const HEADER = createToken({ name: "HEADER", pattern: /header/ });
const BIT = createToken({ name: "BIT", pattern: /bit/ });
const STRUCT = createToken({ name: "STRUCT", pattern: /struct/ });
const INTEGER = createToken({ name: "INTEGER", pattern: /[0-9]+/ });
const LESS_THAN = createToken({ name: "LESS_THAN", pattern: /\</ });
const GREATER_THAN = createToken({ name: "GREATER_THAN", pattern: /\>/ });
const WHITESPACE = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
const SEMICOLON = createToken({
  name: "SEMICOLON",
  pattern: /;/,
});
const OPEN_BRACE = createToken({
  name: "OPEN_BRACE",
  pattern: /\{/,
});
const CLOSE_BRACE = createToken({
  name: "CLOSE_BRACE",
  pattern: /\}/,
});
const DOT = createToken({
  name: "DOT",
  pattern: /\./,
});
export const tokens = {
  APPLY,
  KEY,
  ACTIONS,
  STATE,
  TYPEDEF,
  TYPE,
  HEADER,
  BIT,
  STRUCT,
  INTEGER,
  IDENTIFIER,
  WHITESPACE,
  GREATER_THAN,
  LESS_THAN,
  SEMICOLON,
  OPEN_BRACE,
  CLOSE_BRACE,
  DOT,
};
export default new Lexer(Object.values(tokens));
