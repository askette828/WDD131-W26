// Variables and constants
const PI = 3.14;
let radius = 3;

// Type coercion
const one = 1;
const two = '2';

// Global and block scope
let course = "CSE131";

if (true) {
    let student = "John";
    console.log(course);
    console.log(student);
}

console.log(course);
// console.log(student); // This would cause an error because student is block scoped
