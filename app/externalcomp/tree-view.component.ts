import { Component, Input } from '@angular/core';
import { TreeNode } from '../shared/models/tree-node';

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

    nodeClicked(action: string) {
        switch (action) {
            case 'expand':
                this.node.isExpanded= true;
                break;
            case 'collapse':
                this.node.isExpanded= false;
                break;
            case 'select':
                this.node.isSelected= true;
                break;
            case 'unselect':
                this.node.isSelected= false;
                break;
        }
    }
}