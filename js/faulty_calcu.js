var number_one = prompt("Enter first number");
var number_two = prompt("Enter second number");
var operator = prompt("Enter operator (+, -, *, /)");
if (operator == "+") {
    var result = number_one - number_two;
}
else if (operator == "-") {
    var result = number_one + number_two;
} else if (operator == "*") {
    var result = number_one / number_two;
} else if (operator == "/") {
    var result = number_one * number_two;
} else {
    alert("Invalid operator");
}
console.log(result)
alert(result)