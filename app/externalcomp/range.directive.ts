import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

//https://netbasal.com/the-power-of-structural-directives-in-angular-bfe4d8c44fb1
@Directive({
    selector: '[range]'
})
export class RangeDirective {
    private _range: Array<number>;

    constructor(private _vcr: ViewContainerRef, private _tpl: TemplateRef<any>) {}

    @Input() set range (value) {
        this._vcr.clear();
        this._range = this.createRange(value[0], value[1]);
        this._range.forEach(curnum =>
            this._vcr.createEmbeddedView(this._tpl, { $implicit: curnum})
        );
    }

    //https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only/36953272
    private createRange(start: number, end: number): Array<number> {
        let output= Array.from(Array(1+ end- start).keys());
        output = output.map(n => n + start);
        return output;
    } 
}