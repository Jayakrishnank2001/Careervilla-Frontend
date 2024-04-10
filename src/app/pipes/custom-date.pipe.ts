import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: any) {
        const datePipe = new DatePipe('en-US')
        const notificationDate = new Date(value)
        const currentDate = new Date()

        if (notificationDate.toDateString() === currentDate.toDateString()) {
            return 'Today'
        } else if (notificationDate.toDateString() === new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString()) {
            return 'Yesterday'
        } else {
            return datePipe.transform(value, 'MMM d')
        }
    }
}