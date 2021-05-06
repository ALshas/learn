var strategies = {
    S: (salary) => {
        return salary * 4;
    },
    A: (salary) => {
        return salary * 3;
    },
    B: (salary) => {
        return salary * 2;
    },
};
var calculateBonus = function (level, salary) {
    return strategies[level](salary);
};
console.log(calculateBonus("S", 200)); // 输出：800
console.log(calculateBonus("A", 200)); // 输出：600


let a = {
    A: 200,
    B: 300,
    C: 400
}
console.log(a['A'](200))

let b = {
    fun1: (data) => {
        return 123
    },
    fun2: (data) => {
        return 456
    }
}
console.log(b['fun1'](123))
console.log(b.fun1(123))

let c = {
    11: '100',
    22: '200',
    33: '300'
}
// console.log(c.11)
console.log(c[11]) 