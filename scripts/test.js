//object constructor, begins with Capital
function Dog(name, age, color) {
  this.name = name;
  this.age = age;
  this.color = color;
}

//classes ECMA 6 (new)
class Cat {
  constructor(name, color) {
    this.name = name;
    this.color = color
  }
}

function objTest() {
  console.log('test for creating objects');

  let dog = {
    name: "fido",
    age: 8,
  };

  let lola = {
    name: "lola",
    age: "3",
    color: "pink",
  };

  console.log("dog... ",dog);

  //obj constructor
  let alex = new Dog("Alex", 2, "red");
  let sona = new Dog("Sona", 4, "Green");
  console.log(alex);
  console.log(sona);

  //class
  let garfield = new Cat("Garfield", "Brown")
  console.log(garfield);
}