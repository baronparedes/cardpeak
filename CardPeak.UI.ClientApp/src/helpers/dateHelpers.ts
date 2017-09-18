import * as moment from 'moment'

export const currentMonth = () => {
    return new Date().getMonth();
}

export const currentYear = () => {
    return new Date().getFullYear();
}

export const dateFormat = (date: Date) => {
    return moment(date).format("MMM-DD-YYYY")
}

export const dateTimeFormat = (date: Date) => {
    return moment(date).format("MMM-DD-YYYY HH:mm")
}

export const dateFormatISO = (date: Date) => {
    return moment(date).format("YYYY-MM-DD")
}

export const firstDayOfTheMonth = () => {
    let currentDate = new Date(), mm = currentDate.getMonth(), yyyy = currentDate.getFullYear();
    let fDay = new Date(yyyy, mm, 1);
    return moment(fDay).format("YYYY-MM-DD");
}