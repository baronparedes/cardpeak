import * as moment from 'moment'

export const dateFormat = (date: Date) => {
    return moment(date).format("DD/MM/YYYY")
}

export const dateTimeFormat = (date: Date) => {
    return moment(date).format("DD/MM/YYYY HH:mm")
}

export const dateFormatISO = (date: Date) => {
    return moment(date).format("YYYY-MM-DD")
}

export const firstDayOfTheMonth = () => {
    let currentDate = new Date(), mm = currentDate.getMonth(), yyyy = currentDate.getFullYear();
    let fDay = new Date(yyyy, mm, 1);
    return moment(fDay).format("YYYY-MM-DD");
}