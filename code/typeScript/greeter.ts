// function greeter(person: String) {
//     return 'Hello, ' + person;
// }
// let user = '123'
// document.body.innerHTML = greeter(user)

// interface Person {
//     firstName: String,
//     lastName: String
// }
// function greeter(person: Person) {
//     return 'hello, ' + person.firstName + person.lastName
// }
// let user = { firstName: 'xix', lastName: 'hah' }
// document.body.innerHTML = greeter(user)

class Student {
    fullName: string;
    constructor(public firstName, public middleInital, public lastName) {
        this.fullName = firstName + middleInital + lastName
    }
}
interface Person {
    firstName: string;
    lastName: string
}
function greeter(person: Person) {
    return 'Hello, ' + person.firstName + person.lastName
}
let user = new Student('xx', 'vv', 'jj')
document.body.innerHTML = greeter(user)