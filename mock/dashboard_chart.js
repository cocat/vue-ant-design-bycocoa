function chart(methods) {
    let res = null;
    switch (methods) {
        case "GET":
            res = [1, 2, 3, 4, 5]
            break;
        default:
            res = null
    }
    return res;
};

module.exports = chart; 