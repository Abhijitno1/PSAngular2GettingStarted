import {Injectable} from '@angular/core';
import {TreeNode} from '../shared/models/tree-node';

@Injectable()
export class TreeDataService {
    public getTreeData(): TreeNode {
        let data: TreeNode;
        data = new TreeNode(0, "Portal");
        var item1 = this.addChildNode(data, 1, "Search");
        var item2 = this.addChildNode(data, 2, "Dashboard");
        var item3 = this.addChildNode(data, 3, "Item 3");
        var item4 = this.addChildNode(data, 4, "Item 4");
        item4.isSelected = true;
        item1.isExpanded = true;

        this.addChildNode(item1, 5, "Policy Search.");
        this.addChildNode(item1, 6, "Claims Search.");
        this.addChildNode(item2, 7, "Underwriter Dashboard.");
        this.addChildNode(item2, 8, "Claims Dashboard.");

        return data;
    }

    private addChildNode(parent: TreeNode, id: number, name: string): TreeNode {
        let newNode= new TreeNode(id, name);
        newNode.parent= parent;
        parent.children.push(newNode);
        return newNode;
    }
}