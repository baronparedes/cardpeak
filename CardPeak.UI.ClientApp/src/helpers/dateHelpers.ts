import * as moment from 'moment'

export const dateFormat = (date: Date) => {
    return moment(date).format("MM/DD/YYYY")
}

export const firstDayOfTheMonth = () => {
    let currentDate = new Date(), mm = currentDate.getMonth(), yyyy = currentDate.getFullYear();
    let fDay = new Date(yyyy, mm, 1);
    return moment(fDay).format("YYYY-MM-DD");
}