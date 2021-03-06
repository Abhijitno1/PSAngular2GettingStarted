import { Component, Input, EventEmitter } from '@angular/core';
import { TreeNode } from '../models/tree-node';

//https://stackoverflow.com/questions/37746516/use-component-in-itself-recursively-to-create-a-tree
@Component({
    selector: 'tree-view',
    outputs: ['itemClicked'],
    templateUrl: './app/shared/widgets/tree-view.component.html',
    styles: [`.tree {
                margin-left: 20px;
                display: block;
            }`]
})
export class TreeViewComponent {
    @Input() node: TreeNode;
    public itemClicked: EventEmitter<any>= new EventEmitter<any>();

    public expandOrCollapseAll(state: string) {
        switch (state) {
            case 'expand':
                this.cascadeNodeAction(this.node, (curnode)=> curnode.isExpanded=true);
                break;
            case 'collapse':
                this.cascadeNodeAction(this.node, (curnode)=> curnode.isExpanded=false);
                break;
        }
    }

    public getCheckedValues(): number[] {
        var checkedNodes: number[]= [];
        this.cascadeNodeAction(this.node, (curNode)=> {
            if (curNode.isSelected==true) checkedNodes.push(curNode.id);
        });
        return checkedNodes;
    }

    public setCheckedValues(values: number[]) {
        this.cascadeNodeAction(this.node, (curNode)=> {
            curNode.isSelected= false;
        });
        this.cascadeNodeAction(this.node, (curNode)=> {
            if (values.includes(curNode.id) || (curNode.parent && curNode.parent.isSelected==true))
                curNode.isSelected= true;
        });
    }

    public cascadeNodeAction(node: TreeNode, action: (node: TreeNode)=>void) {
        action(node);
        node.children.forEach(child=> this.cascadeNodeAction(child, action));
    }

    nodeClicked(action: string) {
        switch (action) {
            case 'select':
                this.cascadeNodeAction(this.node, (curnode)=> curnode.isSelected=true);
                let curparent = this.node.parent;
                while (curparent) {
                    curparent.isSelected= curparent.children.every(child => child.isSelected);
                    curparent = curparent.parent;
                }
                break;
            case 'unselect':
                this.cascadeNodeAction(this.node, (curnode)=> curnode.isSelected=false);
                let curparent2 = this.node.parent;
                while (curparent2) {
                    curparent2.isSelected= false;
                    curparent2 = curparent2.parent;
                }
                break;
        }
        this.itemClicked.emit(this.node);
    }

    //Pass on the child node click event to parent
    childNodeClicked(childNode: TreeNode) {
        this.itemClicked.emit(childNode);
    }
}