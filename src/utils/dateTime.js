import { addZeroToNumber } from "./addZeroToNumber";
export class DateTime {
    static CalendarDate = (val) => {
        const date = new Date(val)

        return `${date.getFullYear()}-${addZeroToNumber(date.getMonth() + 1)}-${addZeroToNumber(date.getDate())} `;
    }
}