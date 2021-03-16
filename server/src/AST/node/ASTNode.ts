export default class ASTNode {
  public children: ASTNode[] = [];
  public parent: ASTNode = this;
  public kind: string = this.constructor.name;

  addChildren(children: ASTNode[]) {
    this.children = [...this.children, ...children];
  }

  toJSON(): object {
    const { parent, ...rest } = this;
    return rest;
  }
}
