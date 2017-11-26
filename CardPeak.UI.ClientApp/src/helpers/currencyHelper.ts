export function currencyFormat(num?: number) {
    num = num ? (Math.round(num*100) / 100) : 0;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function currencyFixedFormat(num?: number) {
    num = num ? num : 0;
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
