const setWordEnding = (num, word, ending1, ending2_4, ending0_5_9) => {
    let customNum;
    customNum = num < 100 ? num : num % 100;
    if (customNum < 10 || customNum > 20) {
        customNum %= 10;
        if (customNum == 1) {
            word += ending1;
        } else if (customNum >= 2 && customNum <= 4) {
            word += ending2_4;
        } else if (customNum == 0 || (customNum >= 5 && customNum <= 9)) {
            word += ending0_5_9;
        }
    } else {
        word += ending0_5_9;
    }
    return num + ' ' + word;
};

export default setWordEnding;