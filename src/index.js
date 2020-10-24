module.exports = function check(expr, params) {
    const holder = [];
    let openBrackets = [],
        closedBrackets = [],
        dubleBrackets = [],
        wowarr = ["`", "!", "@", "#", "$", "%", "^", "&", "*"],
        dubleBracketslen = 0;
    for (var i = 0; i < params.length; i++) {
        openBrackets.push(params[i][0]);
        if (params[i][0] == params[i][1]) {
            closedBrackets.push(wowarr[dubleBracketslen]);
            dubleBrackets.push(params[i][1]);
            dubleBracketslen++;
        } else {
            closedBrackets.push(params[i][1]);
        }
    }

    let exprArr = expr.split("");
    let flag = 0;

    for (let i = 0; i < dubleBrackets.length; i++) {
        for (let j = 0; j < exprArr.length; j++) {
            if (exprArr[j] == dubleBrackets[i]) {
                if (flag > 0) {
                    exprArr[j] = wowarr[i];
                    flag--;
                } else {
                    flag++;
                }
            }
        }
    }
    expr = exprArr.join("");

    for (let letter of expr) {
        if (openBrackets.includes(letter)) {
            holder.push(letter);
        } else if (closedBrackets.includes(letter)) {
            const openPair = openBrackets[closedBrackets.indexOf(letter)];
            if (holder[holder.length - 1] === openPair) {
                holder.splice(-1, 1);
            } else {
                holder.push(letter);
            }
        }
    }
    return holder.length === 0;
};
