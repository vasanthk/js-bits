/**
 * Factory Functions
 *
 * @Reference:
 * https://www.youtube.com/watch?v=ImwrezYhw4w
 *
 */

// With classes -- Be wary
class Dog {
  constructor() {
    this.sound = 'woof';
  }

  talk() {
    console.log(this.sound);
  }
}

const sniffles = new Dog();
sniffles.talk();   // Outputs: 'woof'

// Here's the issue
$('button').click(sniffles.talk); // This will not work since - the `this` in talk() now refers to the DOM element selected by $(button) and not sniffles.

// Workaround -- explicit binding
$('button').click(sniffles.talk.bind(sniffles));

// Or in ES6 --  `this` inside an arrow function is always inherited from the enclosing scope.
$('button').click(() => sniffles.talk());



// Factory fucntions
const dog = () => {
  const sound = 'woof';
  return {
    talk: () => console.log(sound)  // We are not using `this` at all.
  };
};

const sniffles = dog();
sniffles.talk();  // Outputs: 'woof'

$('button').click(sniffles.talk); // Works -- Outputs: 'woof'