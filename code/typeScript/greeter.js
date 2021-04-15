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
var Student = /** @class */ (function () {
    function Student(firstName, middleInital, lastName) {
        this.firstName = firstName;
        this.middleInital = middleInital;
        this.lastName = lastName;
        this.fullName = firstName + middleInital + lastName;
    }
    return Student;
}());
function greeter(person) {
    return 'Hello, ' + person.firstName + person.lastName + person.middleInital;
}
var user = new Student('xx', 'vv', 'jj');
document.body.innerHTML = greeter(user);
