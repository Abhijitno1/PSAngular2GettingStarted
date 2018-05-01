import { Component, Input, ElementRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'cool-alert',
    inputs: ['title:heading'],
    outputs: ['modalClosed'],
    template: `
        <div class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" title="close" (click)="close(false)">&times;</button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body">
                        <ng-content></ng-content>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" (click)="close(true)">Ok</button>
                        <button type="button" class="btn btn-default" (click)="close(false)">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `.visible {
            opacity: 100;
            display: block;
        }`,
        `.modal>.modal-dialog {
            margin-top: 15%;
        }`
    ]
})
export class CoolAlertComponent {
    public title:string= 'Alert';
    public modalClosed: EventEmitter<any>= new EventEmitter<any>();

    constructor(private elmRef: ElementRef) { }

    public open() {
        this.elmRef.nativeElement.querySelector('.modal.fade').classList.add('visible');
    }
    public close(yesClicked: boolean) {
        this.elmRef.nativeElement.querySelector('.modal.fade').classList.remove('visible');
        this.modalClosed.emit(yesClicked);
    }
}