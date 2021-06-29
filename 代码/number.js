// 精确加法
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}


// 精确减法
function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}


// 精确乘法
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

// 精确除法
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length; // 被除数小数位数
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length; // 除数小数位数
    } catch (e) {
    }
    // 俩数分别乘以10的其中小数位最多的位数的次方，转换为整数
    r1 = accMul(Number(arg1.toString()), Math.pow(10, Math.max(t1, t2)));
    r2 = accMul(Number(arg2.toString()), Math.pow(10, Math.max(t1, t2)));
    return r1 / r2; // 进行整数的除法计算
}

// 精确保留小数位数
function keepDecimal(number, precision) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}

// 精确保留2位小数
function keepTwoDecimal(number, precision=2) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}
