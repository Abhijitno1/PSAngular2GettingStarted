import { Component, OnInit } from '@angular/core';
import { AdItem } from '../shared/models/ad-item';
import { AdService } from './ad.service'
import { TreeDataService } from './tree-data.service';
import { TreeNode } from '../shared/models/tree-node';

@Component({   
    template: `
        <h2>This is container view for Miscelleneous External Study Components</h2>
        <p>Select a Year <select><option *range="[2010, 2020]; let num" [value]="num">{{num}}</option></select></p>
        <p><span [appHighlight]="highlightColor">This text should be highlighted on hover</span></p>
        <p><ad-banner [ads]="ads"></ad-banner></p>
        <p> <tree-view [node]="treeData"></tree-view> </p>
        <p> Count of Checked Items = {{getCheckedCount()}} </p>
    `
})
export class MiscStudyComponent implements OnInit {
    highlightColor: string= 'Orange';
    ads: AdItem[]= [];
    treeData: TreeNode;

    constructor(private _adService: AdService, private _treedataSvc: TreeDataService) {}

    ngOnInit() {
        this.ads= this._adService.getAdItems();
        this.treeData= this._treedataSvc.getTreeData();
    }

    getCheckedCount(): number {
        var count= 0, 
        count = this.getCount4Node(this.treeData, count);
        return count;
    }

    private getCount4Node(pnode: TreeNode, curCount: number): number {
        curCount= pnode.isSelected===true? curCount + 1 : curCount;
        pnode.children.forEach(element => {
            curCount= this.getCount4Node(element, curCount);
        });
        return curCount;       
    }
}