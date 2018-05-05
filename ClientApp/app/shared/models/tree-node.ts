export class TreeNode {
    children: TreeNode[]= [];
    isExpanded: boolean= false;
    isSelected: boolean= false;
    parent: TreeNode= null;
    constructor(public id: number, public name: string) {}
}