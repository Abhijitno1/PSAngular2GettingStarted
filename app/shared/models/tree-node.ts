export class TreeNode {
    children: TreeNode[]= [];
    isExpanded: boolean= false;
    isSelected: boolean= false;
    constructor(public id: number, public name: string) {}
}