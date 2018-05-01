import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';

//https://www.concretepage.com/angular-2/angular-2-custom-attribute-directive-example
@Directive({   
    selector: '[appHighlight]',
    host: {
        '(mouseenter)': "onMouseEnter()"
    }})
export class HighlightDirective {
    constructor(private _element: ElementRef) {}

    @Input('appHighlight') highlightColor: string;

    //https://stackoverflow.com/questions/35993030/angular-2-attribute-directive-input-values-are-undefined-and-not-set-correctly
    @HostBinding('style.color') //Alternatively you can set host element color in ngAfterViewInit event
    @Input() textColor: string= "black";

    onMouseEnter() {
        this.highlight(this.highlightColor || 'Yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }

    private highlight(color: string) {
        this._element.nativeElement.style.backgroundColor = color; 
    }
}