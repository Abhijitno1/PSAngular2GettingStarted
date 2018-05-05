import { Pipe, PipeTransform } from '@angular/core';
//reference>> http://www.advancesharp.com/blog/1211/angular-2-search-and-sort-with-ngfor-repeater-with-example

@Pipe({ name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
    transform(records: Array<any>, args?: any): Array<any> {
        var retVal = records.sort((prev, next) => {
            if (prev[args.property] < next[args.property])
                return 1 * args.direction;
            else if (prev[args.property] > next[args.property])
                return -1 * args.direction;
            else
                return 0;
        });
        return retVal;
    }
}