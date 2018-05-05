import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'star-rating',
    templateUrl: './app/shared/widgets/star-rating.component.html',
    styles: ['.crop {overflow:hidden;}'] 
})
export class StarRatingComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5;
    }

    onClick() {
        this.ratingClicked.emit(`The Rating ${this.rating} was clicked`);
    }
}