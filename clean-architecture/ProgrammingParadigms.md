# **Summary**

-   [Paradigm Overview](#paradigm-overview)
-   [Structured Programming](#structured-programming)
-   [Object Oriented Programming](#object-oriented-programming)
    -   [Encapsulation](#encapsulation)
    -   [Inheritance](#inheritance)
    -   [Polymorphism](#polymorphism)
    -   [Encapsulation](#encapsulation)
-   [Functional Programming](#functional-programming)
    -   [Immutable and Architecture](#immutable-and-architecture)
    -   [Different between Mutable and Immutable](#different-between-mutable-and-immutable)
    -   [What is Functional Programming?](#what-is-functional-programming)
    -   [Why use Functional Programming](#why-use-functional-programming)

# **Paradigm Overview**:

The journey of Programing Paradigm:

-   **Structured Programming**: Removed **goto** statements and replaced them with more disciplined if/then/else and do/while/until constructs.

-   **Object Oriented Programming**: Removed function pointers.

-   **Functional Programming**: driven by immutability removed assignment of state.

These 3 paradigms were discovered within 10 years (1958 - 1968). Many decades have passed and no new paradigms have been added. Robert M. claims that it is likely that these are the only ones we will discover.

# **Structure Programming**:

> The first paradigm to be adopted (but not the first to be invented) was structured programming, which was discovered by Edsger Wybe Dijkstra in 1968

**Concept**: Structured programming is a programming paradigm aimed at improving the clarity, quality, and development time of a computer program by making extensive use of the structured control flow constructs of selection (if/then/else) and repetition (while and for), block structures, and subroutines. (define by Wikipedia).

Structured Programming was born out of the idea of being able to mathematically prove that a program was correct.

**Example**:

```javascript
function sleep(a, b) {
    console.log('Sleeping...');
}

function wakeUp(a, b) {
    console.log('Wake Up');
}

function isNight(hour) {
    return hour < 22 && hour > 6;
}

function calculation() {
    const hour = 7;

    if (isNight(hour)) {
        sleep();
    } else {
        wakeUp();
    }
}
```

# **Object Oriented Programming**:

> The second paradigm to be adopted was actually discovered two years earlier, in 1966, by Ole Johan Dahl and Kristen Nygaard.

**Concept:** Object Oriented programming (OOP) is a programming paradigm that relies on the concept of classes and objects. It is used to structure a software program into simple, reusable pieces of code blueprints (usually called classes), which are used to create individual instances of objects.

The main idea behind Object Oriented Programming is to make our code more simplicity, reusability, extendibility, and security.

## **Encapsulation**:

-   Encapsulation is a mechanism of wrapping up the data under a single unit, making the fields in a class private to hiddden and prevent access directly, keep safe from from outside interference and misuse.

-   If one attribute or method made private, it cannot be access outside the class, we just can access it inside the class scope and if we want access outside? Use **get** and **set** methods

```typescript
class Person {
    constructor(private readonly firstName, private readonly lastName) {}

    protected getFirstName() {
        return this.firstName;
    }

    protected getLastName() {
        return this.lastName;
    }

    public getFullName() {
        return this.firstName + this.lastName;
    }
}

const person = new Person('Thang', 'Cao');

console.log(person.firstName); // Error
console.log(person.getFullName()); // Thang Cao
```

## **Inheritance**:

-   Inheritance is a mechanism where you can to derive a class from another class for a hierarchy of classes that share a set of attributes and methods.

-   Inheritance enables new objects to take on the properties of existing objects.

-   Inheritance make our code more reusable.

**Example**:

```typescript
class Person {
    constructor(
        protected readonly firstName,
        protected readonly lastName,
        protected readonly age
    ) {}

    public getFullName() {
        return this.firstName + this.lastName;
    }
}

class Student extends Person {
    constructor(
        private readonly firstName,
        private readonly lastName,
        private readonly age
    ) {
        super(firstName, lastName, age);
    }

    public isTeenager(): boolean {
        return this.age < 18;
    }
}

const student = new Student('John', 'Doe');
console.log(student.getFullName()); // John Doe
```

## **Polymorphism**:

-   Polymorphism is the ability of an entity to take on many forms.

-   Polymorphism is the idea of being able to call the same function by name, but have different implementations depending on the runtime context

-   It allow us to hide implementation details by interacting with a group of different classes through a common interface.

-   Polymorphism enables Dependency Inversion. Dependency Inversion is a very powerful concept that allows us to treat and design other software parts as plugins. This is the core of clean architecture.

**Example**:

```typescript
class ProductRepository {
    isExisted() {}
}

class MongoRepository extends ProductRepository {
    getProducts() {
        // Query DB here
    }
}

class RedisRepository extends ProductRepository {
    getProducts() {
        // Query DB here
    }
}

const mongoRepository: ProductRepository = new MongoRepository();
dog.getProducts();

const redisRepository: ProductRepository = new RedisRepository();
cat.getProducts();
```

## **Abstraction**:

-   Abstraction is a concept that aims to expose only high-level details of functionalities for the users and hiding all the background/implementation details.

**Example**:

```typescript
abstract class BaseProductRepository {
    constructor(protected readonly mapper: DataMapper) {
    }

    abstract create();
    ...
}

class MongoProductRepository extends BaseProductRepository {
    constructor(mapper: MongoDataMapper) {
        super(mapper);
    }

    create() {
        // Query DB here
    }
}

class RedisProductRepository extends BaseProductRepository {
    constructor(mapper: RedisDataMapper) {
        super(mapper);
    }

    create() {
        // Query DB here
    }
}

class ProductService {
    constructor(private readonly productRepository: BaseProductRepository) {}

    create() {
        const result = this.productRepository.create();
        ...
    }
}

const mongoProductRepositoy : BaseProductRepository = new MongoProductRepository();
const productService = new ProductService(mongoProductRepository);

const redisProductRepository: BaseProductRepository = new RedisProductRepository();
const productService = new ProductService(redisProductRepository);
```

# **Functional Programming**:

## **Immutable and Architecture**:

All race conditions, deadlocks and concurrent update problems are caused due to mutable variables. As an architect, understanding how and when immutability is practicable is a powerful tool to build programs that are robust under concurrency.

The core idea of functional programming is to rely less on polymorphism and loops but instead uses higher-order function for abstraction such as map, filter and reduce functions for iteration.

## **Different between Mutable and Immutable**?

**What is Mutable?**

-   **Mutable** mean that the object that **can be change** after they have been created.

**The painful of OOP?**

> Everything in OOP is mutable. Because in OOP, methods can change attributes of that object/class directly and always return the mutable object, so the biggest disadvantage of OOP is side-effect. Side-effect will be a nightmare if we don't control it well.

**Example**:

Imagine your company has built MutableResponse class:

```typescript
class MutableResponse {
    private _statusCode: number;
    private _data: any;
    private _message: string;

    get statusCode() {
        return this._statusCode;
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }

    get data() {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }
    ...
}

// In doSomething() function, your co-worker change reponse message:
const doSomething = (price, response) => {
    ...
    response.message = 'Everything is ok';
};

const getProductHandler = async (event): MutableResponse => {
    ...
    const response = new MutableResponse();


    const isProductExisted = false;
    if(!isProductExisted) {
        response.statusCode = 404;
        response.message = 'Not Found';
        return;
    }

    doSomething(price, response);        // Imagine your co-worker is working on this function

    const products = await productRepository.getProduct();

    // set response for success.
    response.statusCode = 200;
    response.data = products;

    return response;
}

/*
Result:
    {
        statusCode: 200,
        data: {...}
        message: 'Everything is ok'; ????????
    }
*/
```

You may ask yourself WHY? You've spend alot of time to realize the co-worker has add the `message` into `response` object in `doSomething()` function, that affect to your `response` result. It just small example, you can imagine that how much terrify when you working on bigger project.

**Solution**:

-   Make a **deep copy** in the object used in many places in project that you wanna change.

```typescript
const doSomething = (price, response) => {
    ...
    const deepCopyResponse = JSON.parse(JSON.stringify(response));
    deepCopyResponse.message = 'Everything is ok';

    ...
};
```

**What is Immutable?**

-   **Immutables** are the objects whose state **cannot be changed** once the object is created.

-   **Immutable** just simply that the object can't be modify, if you wanna change, create a new one.

Another solution of the above example is to make the `response` in `doSomething()` function to immutable

-   Make the **MutableReponse** to be **ImmutableReponse** by blocking the **set** method, if you wanna change something in the current object, you **MUST** create a new one.

```typescript
export interface ResponseData {
    statusCode?: number;
    data?: any;
    message?: string;
}

class ImmutableResponse {
    constructor(
        private readonly response: ResponseData = {}
    ) {}

    get statusCode() {
        return this.response.statusCode;
    }

    get statusData() {
        return this.response.data;
    }

    get statusMessage() {
        return this.response.message;
    }
}

// In doSomething() ...
const doSomething = (price, response) => {
    ...
    const newRespone = new ImmutableResponse({
        ...response,
        message: 'This is much better';
    });
    ...
}
```

## **What is Functional Programming**?

-   Functional programing allow us to pass multiple adjacent functions (Ex: response.map().filter()) and for each implement those function, it **will create a new object**.

## **Why use Functional Programming**?

-   By passing a multiple adjacent functions for object, it help our code more readable, more declarative.
-   Return new object whenever implement function, keep the original object not modify, prevent the side-effect that OOP does

-   Functional **strong support** about Immutable.

We can re-write the above Example to Function Immutable like this:

```typescript
export interface Response {
    statusCode?: number;
    data?: any;
    message?: string;
}

export class ImmutableResponse {
    constructor(private readonly response: Response = {}) {}

    public onBadRequest() {
        return new ImmutableResponse({
            ...response,
            statusCode: 400,
            message: 'Bad Request',
        });
    }

    public onSuccess(statusCode: number = 200) {
        return new ImmutableResponse({
            ...response,
            data: this.reponse.data,
            statusCode: statusCode,
        });
    }

    public withMessage(message: string) {
        return new ImmutableResponse({
            ...this.response,
            message: message,
        });
    }

    public withStatusCode(statusCode: number) {
        return new ImmutableResponse({
            ...this.response,
            statusCode: statusCode,
        });
    }

    public withData(data: any) {
        return new ImmutableResponse({
            ...this.response,
            data: data,
        });
    }
}

const response = new ImmutableResponse();
console.log('Builder: ', response); // result: {}

const badRequest = response.onBadRequest();
console.log('Bad Request ', badRequest); // result: { statusCode: 400, message: 'Bad Request' }

const handler = async () => {
    const product = await productRepository.getProducts();
    const successResponse = response
        .onSuccess();
        .withData(product)
    console.log('Success Response: ', successResponse);
}
```
