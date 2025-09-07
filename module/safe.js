export function safeFunc(context) {
    return context.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function dateStandart(dataDate) {
    let day, month, year, hour, minute;
    let nowDate;

    // year = String(currentDate.getFullYear()).slice(-2);
    // month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // day = String(currentDate.getDate()).padStart(2, '0');
    // hour = String(currentDate.getHours()).padStart(2, '0');
    // minute = String(currentDate.getMinutes()).padStart(2, '0');
    // let dataDate = '2025-08-30T08:17:31.207Z';
    const masDate = dataDate.split('');

    year = masDate[0] + masDate[1] + masDate[2] + masDate[3];
    month = masDate[5] + masDate[6];
    day = masDate[8] + masDate[9];
    hour = masDate[11] + masDate[12];
    minute = masDate[14] + masDate[15];

    nowDate = `${day}.${month}.${year} ${hour}:${minute}`;
    return nowDate;
}
