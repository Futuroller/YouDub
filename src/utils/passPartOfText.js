const passPartOfText = (text, symNum) => {
    if (!text) return;
    text = text.length < symNum ? text : text.slice(0, symNum) + '...';
    return text;
};

export default passPartOfText;