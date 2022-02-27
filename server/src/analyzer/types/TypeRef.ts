import { Type } from "./Type";

export class TypeRef implements Type {
  isPrimitive = false;
  isReference = true;
  constructor(public readonly referencedType: Type) {}
}
