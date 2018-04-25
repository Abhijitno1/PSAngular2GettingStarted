import { Component, Input } from '@angular/core';
import { TreeNode } from '../shared/models/tree-node';
import { Tree } from '@angular/router/src/utils/tree';

//https://stackoverflow.com/questions/37746516/use-component-in-itself-recursively-to-create-a-tree
@Component({
    selector: 'tree-view',
    templateUrl: './app/externalcomp/tree-view.component.html',
    styles: [`.tree {
                margin-left: 20px;
                display: block;
            }`]
})
export class TreeViewComponent {
    @Input() node: TreeNode;

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

    private cascadeNodeAction(node: TreeNode, action: (node: TreeNode)=>void) {
        action(node);
        node.children.forEach(child=> this.cascadeNodeAction(child, action));
    }

    nodeClicked(action: string) {
        switch (action) {
            case 'select':
                this.cascadeNodeAction(this.node, (curnode)=> curnode.isSelected=true);
                break;
            case 'unselect':
                this.cascadeNodeAction(this.node, (curnode)=> curnode.isSelected=false);
                break;
        }
    }
}