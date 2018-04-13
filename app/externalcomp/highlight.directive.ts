import { Directive, ElementRef, HostListener, Input } from '@angular/core';

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