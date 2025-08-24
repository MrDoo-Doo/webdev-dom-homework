export function safeFunc(context) {
    return context.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function dateStandart(dataDate) {
    let day, month, year, hour, minute;
    let currentDate;
    let nowDate;

    currentDate = dataDate;

    year = String(currentDate.getFullYear()).slice(-2);
    month = String(currentDate.getMonth() + 1).padStart(2, '0');
    day = String(currentDate.getDate()).padStart(2, '0');
    hour = String(currentDate.getHours()).padStart(2, '0');
    minute = String(currentDate.getMinutes()).padStart(2, '0');

    nowDate = `${day}.${month}.${year} ${hour}:${minute}`;

    return nowDate;
}
