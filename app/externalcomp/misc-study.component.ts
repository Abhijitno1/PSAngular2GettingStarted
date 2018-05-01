import { Component, OnInit } from '@angular/core';
import { AdItem } from '../shared/models/ad-item';
import { AdService } from './ad.service'
import { TreeDataService } from '../services/tree-data.service';
import { TreeNode } from '../shared/models/tree-node';

@Component({ 
    selector: 'misc-study',
    template: `
        <h3>Miscelleneous External Study Components</h3>
        <p>Select a Year <select><option *range="[2010, 2020]; let num" [value]="num">{{num}}</option></select></p>
        <p><span [appHighlight]="highlightColor" textColor="red">This text should be highlighted on hover</span></p>
        <p>
            <button (click)="coolAlert.open()">Propose Now</button> 
            <cool-alert heading="Propose" #coolAlert (modalClosed)="tellResponse($event)">Do you love me?</cool-alert>
        </p>
        <p><ad-banner [ads]="ads"></ad-banner></p>
        <div>
            <p> <tree-view #treeView [node]="treeData"></tree-view> </p>
            <div>
                <div style="float: left; width: 30%">Count of Checked Items = {{getCheckedCount()}}</div>
                <div style="float: left">
                    <button class="btn btn-default" (click)="treeView.expandOrCollapseAll('expand')">Expand All</button>
                    <button class="btn btn-default" (click)="treeView.expandOrCollapseAll('collapse')">Collapse All</button>
                </div>
            <div>
        </div>
        <my-accordian>
            <my-pane heading="Pane 1" selected="true">
                Content of pane 1
                <p><code>Check later why custom components do not work inside accordian pane</code></p>
            </my-pane>
            <my-pane heading="Pane 2">
                Content of pane 2
            </my-pane>
        </my-accordian>
    `
})
export class MiscStudyComponent implements OnInit {
    highlightColor: string= 'silver';
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

    tellResponse(yesClicked) {
        if (yesClicked)
            alert('Your partner agreed');
        else
            alert('Your partner refused');
    }
}