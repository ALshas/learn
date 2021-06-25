var str = 33;
(function getstr(str) {
    console.log(str);
    str = str || [] && 66 || 99;
    console.log(str);
})();
console.log(str);