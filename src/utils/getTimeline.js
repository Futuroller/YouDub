import setWordEnding from "./setWordEnding";

const getTimeline = (date) => {
    const now = new Date();
    date = new Date(date);

    const daysCount = Math.floor(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    const weeksCount = Math.floor((now - date) / (7 * 24 * 60 * 60 * 1000));
    let monthsCount = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
    if (now.getDate() < date.getDate()) {
        monthsCount--;
    }
    const yearsCount = now.getFullYear() - date.getFullYear();

    let result;
    if (yearsCount > 0) {
        result = setWordEnding(yearsCount, '', 'год', 'года', 'лет');
    } else if (monthsCount > 0) {
        result = setWordEnding(monthsCount, 'месяц', '', 'а', 'ев');
    } else if (weeksCount > 0) {
        result = setWordEnding(weeksCount, 'недел', 'я', 'и', 'ь');
    } else if (daysCount >= 2) {
        result = setWordEnding(daysCount, 'д', 'ень', 'ня', 'ней');
    } else if (daysCount == 1) {
        return result = 'Вчера';
    } else {
        return result = 'Сегодня';
    }
    
    return result + ' назад';
}

export default getTimeline;