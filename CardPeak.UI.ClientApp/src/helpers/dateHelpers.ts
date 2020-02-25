import * as moment from 'moment';

export const currentDay = () => {
    return dateFormatISO(new Date());
};

export const currentMonth = () => {
    return parseInt(moment(new Date()).format('MM'));
};

export const currentYear = () => {
    return parseInt(moment(new Date()).format('YYYY'));
};

export const dateFormat = (date: Date) => {
    return moment(date).format('MMM-DD-YYYY');
};

export const dateTimeFormat = (date: Date) => {
    return moment(date).format('MMM-DD-YYYY HH:mm');
};

export const dateFormatISO = (date: Date) => {
    return moment(date).format('YYYY-MM-DD');
};

export const firstDayOfTheMonth = () => {
    let currentDate = new Date(),
        mm = currentDate.getMonth(),
        yyyy = currentDate.getFullYear();
    let fDay = new Date(yyyy, mm, 1);
    return moment(fDay).format('YYYY-MM-DD');
};
