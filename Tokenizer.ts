import { createToken, Lexer } from "chevrotain";

const IDENTIFIER = createToken({
  name: "IDENTIFIER",
  pattern: /[a-zA-Z][a-zA-Z0-9\_]*/,
});
const APPLY = createToken({ name: "APPLY", pattern: /apply/ });
const TRUE = createToken({ name: "TRUE", pattern: /true/ });
const FALSE = createToken({ name: "FALSE", pattern: /false/ });
const SWITCH = createToken({ name: "SWITCH", pattern: /switch/ });
const STRING_LITERAL = createToken({
  name: "STRING_LITERAL",
  pattern: /\".*\"/,
});
const CONST = createToken({ name: "CONST", pattern: /const/ });
const KEY = createToken({ name: "KEY", pattern: /key/ });
const INOUT = createToken({ name: "INOUT", pattern: /inout/ });
const DEFAULT = createToken({ name: "DEFAULT", pattern: /default/ });
const DONTCARE = createToken({ name: "DONTCARE", pattern: /dontcare/ });
const MASK = createToken({ name: "MASK", pattern: /mask/ });
const RANGE = createToken({ name: "RANGE", pattern: /range/ });
const OPEN_SQUARE_BRACKET = createToken({
  name: "OPEN_SQUARE_BRACKET",
  pattern: /\[/,
});
const CLOSE_SQUARE_BRACKET = createToken({
  name: "CLOSE_SQUARE_BRACKET",
  pattern: /\]/,
});
const ACTIONS = createToken({ name: "ACTIONS", pattern: /actions/ });
const ACTION = createToken({
  name: "ACTION",
  pattern: /action/,
  longer_alt: ACTIONS,
});
const TABLE = createToken({ name: "TABLE", pattern: /table/ });
const ENTRIES = createToken({ name: "ENTRIES", pattern: /entries/ });
const COLON = createToken({ name: "COLON", pattern: /:/ });
const IN = createToken({ name: "IN", pattern: /in/ });
const OUT = createToken({ name: "OUT", pattern: /out/ });
const CONTROL = createToken({ name: "CONTROL", pattern: /control/ });
const STATE = createToken({ name: "STATE", pattern: /state/ });
const TRANSITION = createToken({ name: "TRANSITION", pattern: /transition/ });
const PARSER = createToken({ name: "PARSER", pattern: /parser/ });
const TYPE = createToken({ name: "TYPE", pattern: /type/ });
const TYPEDEF = createToken({ name: "TYPEDEF", pattern: /typedef/ });
const HEADER = createToken({
  name: "HEADER",
  pattern: /header/,
  longer_alt: IDENTIFIER,
});
const BIT = createToken({ name: "BIT", pattern: /bit/ });
const STRUCT = createToken({ name: "STRUCT", pattern: /struct/ });
const INTEGER = createToken({ name: "INTEGER", pattern: /(0x)?[0-9]+/ });
const LESS_THAN = createToken({ name: "LESS_THAN", pattern: /\</ });
const GREATER_THAN = createToken({ name: "GREATER_THAN", pattern: /\>/ });
const EQUALS = createToken({ name: "EQUALS", pattern: /\=/ });
const SLASH = createToken({ name: "SLASH", pattern: /\// });
const TIMES = createToken({ name: "TIMES", pattern: /\*/ });
const COMMA = createToken({ name: "COMMA", pattern: /\,/ });
const OPEN_BRACKET = createToken({ name: "OPEN_BRACKET", pattern: /\(/ });
const CLOSE_BRACKET = createToken({ name: "CLOSE_BRACKET", pattern: /\)/ });
const WHITESPACE = createToken({
  name: "WHITESPACE",
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
const IF = createToken({
  name: "IF",
  pattern: /if/,
});
const ELSE = createToken({
  name: "ELSE",
  pattern: /else/,
});
const DOT = createToken({
  name: "DOT",
  pattern: /\./,
});

const EXIT = createToken({
  name: "EXIT",
  pattern: /exit/,
});

const RETURN = createToken({
  name: "RETURN",
  pattern: /return/,
});
export const tokens = {
  DEFAULT,
  DONTCARE,
  MASK,
  CONTROL,
  APPLY,
  SWITCH,
  RETURN,
  EXIT,
  ACTIONS,
  ACTION,
  IF,
  ELSE,
  TABLE,
  ENTRIES,
  RANGE,
  COLON,
  INOUT,
  IN,
  OUT,
  EQUALS,
  SLASH,
  TRANSITION,
  TIMES,
  KEY,
  TRUE,
  COMMA,
  FALSE,
  STRING_LITERAL,
  PARSER,
  CONST,
  STATE,
  TYPEDEF,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  CLOSE_SQUARE_BRACKET,
  OPEN_SQUARE_BRACKET,
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
