function getMeasurementUnit(views) {
    if (views >= 1_000_000_000) {
        return (views / 1_000_000_000).toFixed(1).replace('.', ',') + ' млрд';
    } else if (views >= 1_000_000) {
        return (views / 1_000_000).toFixed(1).replace('.', ',') + ' млн';
    } else if (views >= 1_000) {
        return (views / 1_000).toFixed(1).replace('.', ',') + ' тыс.';
    } else {
        return views.toString();
    }
}

export default getMeasurementUnit;