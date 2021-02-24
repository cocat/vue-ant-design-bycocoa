function form(methods) {
    let res = null;
    switch (methods) {
        case "POST":
            res = { message: "OK" };
            break;
        default:
            res = null
    }
    return res;
};

module.exports = chart; 