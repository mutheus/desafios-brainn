class Person {
  constructor(name, surname, age, hobbies) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.hobbies = hobbies;
  }
}

const john = new Person('John', 'Doe', 30, ['Surf', 'Design']);
const jane = new Person('Jane', 'Doe', 30, ['MuayThai', 'Programming']);

console.log('John:', john);
console.log('Jane:', jane);
