// 队列 栈 链表 集合 hash表 树 图

// 1）队列 排队 先进先出
// class Queue {
//     constructor() {
//         this.queue = [];
//     }
//     enqueue(element) {
//         this.queue.push(element);
//     }
//     dequeue() {
//         this.queue.shift();
//     }
// }
// let queue = new Queue(); 
// queue.enqueue(1)
// queue.enqueue(2)
// queue.dequeue()
// console.log(queue.queue);

//2) 栈的特点就是先进后出 戴拿执行的时候结构就是个栈 （指向上下销毁的时候是从里向外的）
// class Stack {
//     constructor() {
//         this.stack = []
//     }
//     put(element) {
//         this.stack.push(element)
//     }
//     pop() {
//         this.stack.pop()
//     }
// }
// let stack = new Stack();
// stack.put(1)
// stack.put(2)
// stack.pop()
// console.log(stack.stack)

// 3)链表  单向链表 双向链表 循环链表
// 操作数据 不需要破坏数据的原有结构
// class Node {
//     constructor() {
//         this.element = null;
//         this.next = null;
//     }
// }
// class linkList {
//     constructor() {
//         this.head = null;
//         this.length = 0;
//     }
//     // 插入一个元素
//     insert(position, element) {
//         let node = new Node(element);
//         if (!this.head) {
//             this.head = node;
//         } else {
//             let index = 0;
//             let current = this.head;
//             let previous = null;
//             while (index++ < position) { //找到要在谁之前插入的哪一项
//                 previous = current;     //拿到要插入到哪项之前
//                 current = current.next;  //插入到前一个后面
//             }
//             previous.next = node;
//             node.next = current
//         }
//         this.length++
//     }
//     //  追加某一个元素
//     append(element) {
//         let node = new Node(element)
//         if (!this.head) {
//             this.head = node;
//         } else {
//             let index = 0;   //从0向开始查找
//             let current = this.head;  //先把链表的头拿出来 开始查找
//             while (++index < this.length) {
//                 current = current.next;   //如果当前不是最后一项 就把这个人的下一项继续查找
//             }
//             current.next = node;
//         }
//         this.length++;
//     }
// }
// let ll = new linkList();
// ll.append(1)
// ll.append(2)
// ll.append(3)
// ll.insert(1, 100)
// console.log(JSON.stringify(ll))

// 4) 集合
// set的特点是 key和value相同 ，且 key 不能重复
// class Set {
//     constructor() {
//         this.set = {}
//     }
//     add(element) {
//         if (!this.set.hasOwnProperty(element)) {
//             this.set[element] = element
//         }
//     }
// }
// let set = new Set()
// set.add(1)
// set.add(3)
// console.log(set.set)

// 5)Map 优点：hashTable取值快
// class Map {
//     constructor() {
//         this.arr = []
//     }
//     calc(key) {
//         let total = 0;
//         for (let i = 0; i < key.length; i++) {
//             total += key[i].charCodeAt()
//         }
//         return total % 100
//     }
//     set(key, value) {
//         key = this.calc(key);
//         this.arr[key] = value
//     }
//     map(key) {
//         return this.arr[this.calc(key)]
//     }
// }
// 如果key有相同的,可以使用链表做
// let map = new Map();
// map.set('abc', 123)
// map.set('dfe', 456)
// console.log(map.arr)

// 6)二叉树   二叉查找树 小的放左边 大的放右边
class Node {
    constructor(element) {
        this.element = element;
        this.left = null;
        this.right = null
    }
}
class Tree {
    constructor() {
        this.root = null; // 树的根
    }
    insert(root, newNode) {
        if (newNode.element < root.element) {
            if (root.left == null) {
                root.left = newNode
            } else {
                this.insert(root.left, newNode)
            }
        } else {
            if (root.right == null) {
                root.right = newNode
            } else {
                this.insert(root.right, newNode)
            }
        }
    }
    add(element) {
        let node = new Node(element);
        if (!this.root) {
            this.root = node;
        } else {
            this.insert(this.root, node);
        }
    }
}
let tree = new Tree;
tree.add(100);
tree.add(60);
tree.add(150);
tree.add(50);
console.log(JSON.stringify(tree));
// 图 邻接表 （树之间的节点产生的关联就是图）