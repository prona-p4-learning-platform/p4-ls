import { Type } from "./Type";

export class BitType implements Type {
  isPrimitive = true;
  isReference = false;
  constructor(public readonly width: number) {}
}
