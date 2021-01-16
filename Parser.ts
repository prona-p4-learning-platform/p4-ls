import { CstParser } from "chevrotain";
import { tokens } from "./Tokenizer";
class SelectParser extends CstParser {
  constructor() {
    super(tokens);

    this.performSelfAnalysis();
  }

  public p4program = this.RULE("p4program", () => {
    this.MANY(() => {
      this.SUBRULE(this.declaration);
    });
  });

  private declaration = this.RULE("declaration", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.typeDeclaration);
        },
      },
    ]);
  });

  private typeDeclaration = this.RULE("typeDeclaration", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.typedefDeclaration);
        },
      },
    ]);
  });

  private typedefDeclaration = this.RULE("typedefDeclaration", () => {
    this.CONSUME(tokens.TYPEDEF);
    this.SUBRULE(this.typeRef);
    this.CONSUME(tokens.IDENTIFIER);
    this.CONSUME(tokens.SEMICOLON);
  });

  private typeRef = this.RULE("typeRef", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.typeName);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.baseType);
        },
      },
    ]);
  });

  private typeName = this.RULE("typeName", () => {
    this.SUBRULE(this.prefixedType);
  });

  private prefixedType = this.RULE("prefixedType", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.IDENTIFIER); //treat as type identifier
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.dotPrefix);
          this.CONSUME2(tokens.IDENTIFIER); //treat as type identifier
        },
      },
    ]);
  });

  private dotPrefix = this.RULE("dotPrefix", () => {
    this.CONSUME(tokens.DOT);
  });

  private baseType = this.RULE("baseType", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME2(tokens.BIT); //treat as type identifier
          this.CONSUME(tokens.LESS_THAN); //treat as type identifier
          this.CONSUME2(tokens.INTEGER);
          this.CONSUME(tokens.GREATER_THAN);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.BIT); //treat as type identifier
        },
      },
    ]);
  });
}

export default SelectParser;
