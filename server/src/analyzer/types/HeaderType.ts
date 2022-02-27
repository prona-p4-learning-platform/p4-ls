import { TypeContext } from "../TypeContext";
import { Type } from "./Type";

export class HeaderType implements Type {
  setNextFieldName(name: string) {
    this.nextFieldName = name;
  }
  setNextFieldType(type: Type) {
    this.fields.set(this.nextFieldName, type);
  }
  isPrimitive = false;
  isReference = false;
  public fields = new Map<string, Type>();
  private nextFieldName = "";
}
