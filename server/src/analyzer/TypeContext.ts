import { Type } from "./types/Type";

export interface TypeContext {
  setTypeName(name: string): void;
  setType(type: Type): void;
}
