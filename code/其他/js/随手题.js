import { map } from "jquery";

var str = 33;
(function getstr(str) {
    console.log(str);
    str = str || [] && 66 || 99;
    console.log(str);
})();
console.log(str);

var a = [1, 2, 3]
a.toString = a.shift;
console.log(a)
if (a == 1 && a == 2 && a == 3) {
    console.log('OK')
}

var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 1 + i; j < nums.length; j++) {
            console.log(nums[i], nums[j])
            if (nums[i] + nums[j] == target) {
                return [i, j]
            }
        }
    }
};
console.log(twoSum([2, 5, 6, 5], 10))

var twoSum = function (nums, target) {
    //静态哈希表法
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        console.log(map.get(diff), i)
        if (map.has(diff) && map.get(diff) !== i) {
            return [i, map.get(diff)];
        }
    }
};
console.log(twoSum([2, 5, 6, 5], 10))

var twoSum = function (nums, target) {
    //动态哈希表法
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const num1 = nums[i];
        const num2 = target - num1
        console.log('num1--', num1)
        console.log('num2--', num2)
        if (map.has(num2)) {
            console.log('if--', map.get(num2), i)
            return [map.get(num2), i]
        } else {
            console.log('else--', num1, i)
            map.set(num1, i)
        }
    }
};
console.log(twoSum([2, 6, 5, 8], 10))


var addTwoNumbers = function (l1, l2) {
    let _l1 = []
    let _l2 = []
    for (let i = 0; i < l1.length; i++) {
        _l1.push(l1[l1.length - (i + 1)])
        _l2.push(l2[l1.length - (i + 1)])
    }
    let _sum = parseInt(_l1.join('')) + parseInt(_l2.join(''))
    let sumArr = _sum.toString().split('')
    let arr = sumArr.map((item, index) => {
        return parseInt(sumArr[sumArr.length - (index + 1)])
    })
    return arr;
};
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]))

var addTwoNumbers = function (l1, l2) {
    let _l1 = []
    let _l2 = []
    _l1 = l1.reverse()
    _l2 = l2.reverse()
    let _sum = parseInt(_l1.join('')) + parseInt(_l2.join(''))
    let sumArr = _sum.toString().split('')
    console.log(sumArr)
};
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]))

var addTwoNumbers = function (l1, l2) {
    const dummyNode = new ListNode();
    let cur = dummyNode;
    let extra = 0;
    while (l1 || l2) {
        let sum = extra;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        extra = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
    }
    if (extra) cur.next = new ListNode(extra);
    return dummyNode.next;
};

console.log(addTwoNumbers([9, 4, 3], [5, 6, 4]))