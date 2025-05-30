export const formatDateGroup = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (isSameDay(date, today)) return 'Сегодня';

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (isSameDay(date, yesterday)) return 'Вчера';

    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    if (isSameDay(date, twoDaysAgo)) return 'Позавчера';

    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    if (date > currentWeekStart) return 'На этой неделе';

    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(currentWeekStart.getDate() - 7);
    if (date > lastWeekStart && date <= currentWeekStart) return 'На прошлой неделе';

    if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
    ) return 'В этом месяце';

    const prevMonth = new Date(today);
    prevMonth.setMonth(today.getMonth() - 1);
    if (
        date.getFullYear() === prevMonth.getFullYear() &&
        date.getMonth() === prevMonth.getMonth()
    ) return 'В прошлом месяце';

    const monthsDiff =
        (today.getFullYear() - date.getFullYear()) * 12 +
        (today.getMonth() - date.getMonth());

    if (monthsDiff > 1 && monthsDiff <= 11) return `${monthsDiff} мес. назад`;

    if (date.getFullYear() === today.getFullYear() - 1) return 'В прошлом году';

    return date.toLocaleDateString('ru-RU');
};
