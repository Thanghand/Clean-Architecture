# **Summary**

-   [Introduction](#introduction)
-   [Compare Typescript vs ES6](#compare-typescript-vs-es6)
-   [Declarations](#declaration):
    -   [Variable](#variable)
    -   [Function](#function)
    -   [Class](#class)
        -   [Access modifier](#access-modifier)
        -   [Define constructor](#define-constructor)
        -   [Get/Set property](getters-and-setters)
        -   [Inheritance](#inheritance)
        -   [Abstract](#abstract)
        -   [Interface](#interface)
-   [Link document](#link-document)

## **Introduction**:

-   TypeScript is a super set of JavaScript. It follows JavaScript syntactically but adds more features to it.

-   TypeScript is developed and maintained by Microsoft under the license of Apache 2.

-   TypeScript is Typed JavaScript. TypeScript adds types to JavaScript to help you speed up the development by catching errors before you even run the JavaScript code.

-   TypeScript is an open-source object-oriented programing language that builds on top of JavaScript. It works on any browser, any OS, any environment that JavaScript runs.

## **Compare Typescript vs ES6**:

|                   | TypeScript                                                            | ES6               |
| ----------------- | --------------------------------------------------------------------- | ----------------- |
| Typing            | Strong typing, support all primitive data types (number, string, ...) | Dynamic type      |
| Access modifier   | public, private, protected, readonly                                  | default is public |
| Interface support | Yes                                                                   | No                |
| Abstract class    | Yes                                                                   | No                |
| Generics          | Yes                                                                   | No                |
| Enums             | Yes                                                                   | No                |

## **Declaration**:

### **Variable**:

-   **Number**: All numbers in TypeScript are either floating-point values or big integers. The floating-point numbers have the type **number** while the big integers get the type **bigint**

```typescript
const counter: number = 0;
const binary: number = 0b100;
const octal: number = 0o10;
const hex: number = 0xa;
const bigInteger: bigint = 9007199254740991n;
```

**Note**: Avoid using the Number type as much as possible.

-   **String**:
    TypeScript uses double quotes (") or single quotes (') to surround string
    We can use **backtick** (`) to implement multiline string and string interpolation (string literals)

**Example**:

```typescript
const name: string = 'Thang';
const role: string = 'Software Architecture';
const multiline: string = `Hello
world
`;
const stringLiterals = `Hi, my name is ${name} and I am ${role}`;
```

-   **Boolean**:

```typescript
const isExisted: boolean = true;
const isPending: boolean = false;
```

-   **Object**: The TypeScript **object** type represents all values that are not in primitive types.

```typescript
const employee: object = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    jobTitle: 'Web Developer',
};

// Or we can specify what we need to declare

const employee: {
    firstName: string;
    lastName: string;
    age: number;
    jobTitle: string;
} = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    jobTitle: 'Web Developer',
};

// empty type
let vacant: {} = {};
```

-   **Array**: A TypeScript **array** is an ordered list of data.

**Syntax**:

```typescript
let arrayName: type[];
```

**Example**:

```typescript
let fruits: string[] = ['banana', 'apple', 'orage'];
// Access array element by using [] operator.
const banana = fruits[0];

// Add Element to array:
fruits.push('grape');

fruits.push(100); // Error because we can't add number in to string array.

// Array methods:
const newFruits = fruits.map((fruit) => 'New ' + fruit);
const banana = fruits.map((fruit) => fruit === 'banana');
....

// Mixid types array:
const mixedArray: (string | number) = ['Hello', 4, 'World', 6];
```

### **Function**:

-   TypeScript functions are the building blocks of readable, maintainable, and reusable code.

Syntax:

```typescript
function name(parameter: type, parameter:type,...): returnType {
   // do something
}
```

Example:

```typescript
function add(a: number, b: number): number {
    return a + b;
}
const result = add(1, 2);
console.log(result); // 3

const result = add('1', 2);
console.log(result); // Error: we cant pass string in number type in paramter
```

### **Class**:

Example:

```typescript
class Person {
    // attributes
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // methods
    greet() {}
}

const person = new Person('Thang', 'Cao');
```

### **Access Modifier**:

-   **Access modifiers** change the visibility of the properties and methods of a class. TypeScript provides three access modifiers:

-   **private**: The private modifier limits the visibility to the same-class only.

```typescript
class Person {
    private firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFirstName(): string {
        return this.firstName;
    }
    // ...
}

const person = new Person('Thang', 'Cao');
console.log(person.getFirstName()); // Thang
console.log(person.lastName()); // Error because we cant access private attribute of class
```

-   **public**: The public modifier allows class properties and methods to be accessible from all locations

```typescript
class Person {
    // ...
    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    // ...
}
const person = new Person('Thang', 'Cao');
console.log(person.getFullName()); // Thang Cao
```

-   **protected**: The protected modifier allows properties and methods of a class to be accessible within same class and within subclasses.

```typescript
class Person {
    constructor(protected firstName: string, protected lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    protected getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Student extends Person {
    constructor(firstName: string, lastName: string) {
        super(firstName, lastName);
    }

    greet() {
        console.log(`Hello, my name is: ${this.getFullName()}`);
    }
}

const person = new Person('Thang', 'Cao');
console.log(person.getFullName()); // Error: cant access private function

const student = new Person('John', 'Doe');
console.log(person.greet()); // Hello, my name is: John Doe
```

-   **readonly**:

TypeScript provides the **readonly** modifier that allows you to mark the properties of a class **immutable**. The assignment to a readonly property can **only** occur in one of two places:

-   In the property declaration.
-   In the constructor of the same class.

A readonly property must be initialized as a part of the declaration or in the constructor of the same class.

Example:

```typescript
class Person {
    readonly birthDate: Date;

    constructor(birthDate: Date) {
        this.birthDate = birthDate;
    }
}

let person = new Person(new Date(1990, 12, 25));
console.log(person.birthDate); // Fri Jan 25 1991 00:00:00 GMT+0700 (Indochina Time)
person.birthDate = new Date(1991, 12, 25); // Compile error
```

### **Define constructor**:

-   Default constructor:

```typescript
class Person {
    constructor() {
        // do something here
    }
}
```

-   Parameterize constructor:

```typescript
class Person {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

// Another way
class Person {
    firstName: string;
    lastName: string;

    constructor(
        private readonly firstName: string,
        private readonly lastName: string
    ) {}
}
```

### **Getters and Setters**:

-   A getter method returns the value of the property’s value. A getter is also called an accessor.

-   A setter method updates the property’s value. A setter is also known as a mutator.

```typescript
class Person {
    private _age: number;
    private _firstName: string;
    private _lastName: string;

    public get age() {
        return this._age;
    }

    public set age(theAge: number) {
        if (theAge <= 0 || theAge >= 200) {
            throw new Error('The age is invalid');
        }
        this._age = theAge;
    }

    public getFullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
}
```

### **Abstract**

-   An **abstract class** is typically used to define common behaviors for derived classes to extend. Unlike a regular class, an abstract class cannot be instantiated directly.

-   Abstract classes cannot be instantiated.

-   An Abstract class has at least one abstract method.

-   To use an abstract class, you need to inherit it and provide the implementation for the abstract methods.

Example:

```typescript
// declare abstract class
abstract class Employee {
    constructor(protected firstName: string, protected lastName: string) {}

    abstract getSalary(): number; // abstract method

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    compensationStatement(): string {
        return `${this.fullName} makes ${this.getSalary()} a month.`;
    }
}

class Contractor extends Employee {
    constructor(
        firstName: string,
        lastName: string,
        private readonly rate: number,
        private readonly hours: number
    ) {
        super(firstName, lastName);
    }

    getSalary() {
        return this.rate * this.hours;
    }
}
```

### **Interface**:

-   TypeScript **interfaces** define the contracts within your code. They also provide explicit names for type checking.

-   Interfaces may have optional properties or readonly properties.

-   Interfaces can be used as function types.

-   Interfaces are typically used as class types that make a contract between unrelated classes.

Example:

```typescript
interface IPerson {
    firstName: string;
    lastName: string;
}

const getFullName = (person: IPerson) => {
    return person.firstName + person.lastName;
};

let john: IPerson = {
    firstName: 'John',
    lastName: 'Doe',
};

console.log(getFullName(john)); // John Doe
```

**_Optional properties_**

```typescript
interface Person {
    firstName: string;
    middleName?: string;
    lastName: string;
}

const getFullName = (person: IPerson) => {
    return person.middleName
        ? `${person.firstName} ${person.middleName} ${person.lastName}`
        : `${person.firstName} ${person.lastName}`;
};

let john: IPerson = {
    firstName: 'John',
    middleName: 'Kean',
    lastName: 'Doe',
};

console.log(getFullName(john)); // John Kean Doe
```

**_Readonly properties_**

```typescript
interface IPerson {
    readonly id: number;
    firstName: string;
    lastName: string;
}

const person: IPerson;
person = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
};

person.id = 4; // Error
```

# **Link Document**:

> https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
