import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/*
    next exercise
    http://deanmalone.net/post/using-jquery-from-angular2/
    https://stackoverflow.com/questions/30623825/how-to-use-jquery-with-angular
*/
@Directive({   
    selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(private _element: ElementRef) {}

    @Input('appHighlight') highlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor || 'Yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }

    private highlight(color: string) {
        this._element.nativeElement.style.backgroundColor = color; 
    }
}