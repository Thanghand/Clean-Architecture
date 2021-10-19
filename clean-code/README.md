# **Summary**

-   [Introduction](#introduction)
-   [Naming Rules](#naming-rules)
    -   [Meaningful name](#meaningful-name)
    -   [Use Intention-Revealing Names (Telling directly the context)](#use-intention-revealing-names-telling-directly-the-context)
    -   [Avoid Disinformation](#avoid-disinformation)
    -   [Make Meaningful Distinctions](#make-meaningful-distinctions)
    -   [Use Pronounceable Names](#use-pronounceable-names)
    -   [Use Searchable Names](#use-searchable-names)
    -   [Class Names](#class-name)
    -   [Method Names](#method-names)
    -   [Don't Be Cute](#dont-be-cute)
    -   [Pick One Word Per Concept](#pick-one-word-per-concept)
-   [Functions](#functions)
    -   [Small!](#small)
    -   [Do One Thing](#do-one-thing)
    -   [One level of abstraction per function](#one-level-of-abstraction-per-function)
    -   [Switch Statements](#switch-statements)
    -   [Use Descriptive Names](#use-descriptive-names)
    -   [Function arguments](#function-arguments)
    -   [Don't use flags as function parameters](#dont-use-flags-as-function-parameters)
    -   [Side Effects](#side-effects)
    -   [Don't Repeat Yourself](#dont-repeat-yourself)
-   [Comments](#comments)
    -   [Comments Do Not Make Up for Bad Code](#comments-do-not-make-up-for-bad-code)
    -   [Explain Yourself in Code](#explain-yourself-in-code)
        -   [TODO Comments](#todo-comments)
        -   [Bad Comments](#bad-comments)
        -   [Redundant Comments](#redundant-comments)
        -   [Noise Comments](#noise-comments)
        -   [Too Much Information](#too-much-information)
        -   [Don't leave commented out code in your codebase](#dont-leave-commented-out-code-in-your-codebase)
-   [Error Handling](#error-handling)
    -   [Don't Ignore Caught Errors](#dont-ignore-caught-erros)
    -   [Don't Return Null](#dont-return-null)
    -   [Don't Pass Null](#dont-pass-null)
-   [Testing](#testing)
    -   [The Three Laws of TDD](#the-three-laws-of-tdd)
    -   [Single Concept per Test](#single-concept-per-test)
    -   [FIRST principle](#first-principle)
-   [Class](#class)
    -   [Class Organization](#class-organization)
        -   [Encapsulation](#encapsulation)
        -   [Classes Should be Small](#classes-should-be-small)

# **Introduction**

Problems:

-   How much time can you understand your code or your colleagues after a few months?
-   How many times do you say "Can we do again ?"
-   How many times do you say "Where is the code document or Where is the comment" ?
-   How many times do you confuse between the code and the current document/comment ?
-   How many times do you say to your manager that I don't know how it's running. It's so weird ?
-   Fix or change something and creating many bugs
-   ...

Why write bad code ?

-   Are you in a rush?
-   Do you try to go "fast"?
-   Do not you have time to do a good job?
-   Are you tired of work in the same program/module?
-   Does your Boss push you to finish soon ?

If you say "I will back to fix it later" you could fall in the LeBlanc's law **`Later equals never`**

It is unprofessional for programmers to bend to the will of managers who don’t understand the risks of making messes.

Maybe sometime you think in go fast to make the deadline. The only way to go fast is to keep the code as clean as possible at all times.

How can we make the code clean ?

Clean Code is written by Uncle Bob

# **Naming rules**

## **Meaningful names**

Names are everywhere in software. Files, directories, variables functions, etc. Because we do so much of it. We have better do it well.

## **Use Intention-Revealing Names (Telling directly the context)**

-   Choosing good names takes time, but saves more than it takes. So take care with your names and change them when you find better ones.

-   The name of a variable, function or class, should answer all the big questions.
    It should tell you why it exists, what it does, and how is used.
    If a name requires a comment, then the name does not reveals its intent.

| Does not reveals intention       | Reveals intention       |
| -------------------------------- | ----------------------- |
| `var d; // elapsed time in days` | `var elapsedTimeInDays` |

**Bad:**

```javascript
// Get male teenagers
const users = [
    {
        name: 'Thang',
        age: 28,
        gender: 'male'
    },
    {
        name: 'Van',
        age: 17,
        gender: 'female'
    },
];

const filterUsers = users.filter(u => (u.age >= 9 && u.age <= 18) && u.gender === 'male');

...

// What is filterUsers ?, you have to go the definition of filterUsers to see
vaccinated(filterUsers);

```

**Good:**

```javascript
const isMaleTeenagers = (user) => (user.age >= 9 && user.age <= 18)
                                        && user.gender === 'male');
...

const maleTeenagers = users.filter(u => isTeenagers(age));

...

vaccinated(maleTeenagers);

```

## **Avoid Disinformation**

Programmers must avoid leaving false clues that obscure the meaning of code. We should avoid words whose entrenched meaning vary from our intended meaning.

```javascript
const listProduct = await getProducts(); // OK we think it will return the list

...

const listProduct = await getProducts();  // return [ {categoryName: "Fish", products: [... ] }];
```

**should be**

```javascript
const groupOfCategoryProducts = await getProducts();
```

**Beware of using names which vary in small ways**

```javascript
class ShoppingCartServiceForCaching {}

class ShoppingCartServiceForUserDefault {}

class ShoppingCartServiceForNetWorkCalls {}
```

You maybe select wrong name when the ide suggest you the list class **_ShoppingCartService_**.

**should be**

```javascript
class CacheService {}

class UserDefaultService {}

class NetworkClient {}
```

**`Note`**: No need to scan all the name when typing

## **Make Meaningful Distinctions**

> Programmers create problems for themselves when they **write code solely to satisfy a compiler or interpreter.**

**For example**: Because you can't use the same name to refer two different things in the same scope, you might be tempted to change one name in an arbitrary way.

```javascript
function copyItems(a1, a2) {
    for (let i = 0; i < a1.length; i++) {
        a2[i] = a1[i];
    }
}
```

**should be**

```javascript
function copyItems(source, destination) {
    for (let i = 0; i < source.length; i++) {
        destination[i] = source[i];
    }
}
```

**Noise words are another meaningless distinction.**

```javascript
const userInfo = getUserInfo();
const userData = getUserData();
```

**Noise words are redundant**

```javascript
const nameString = '';
const streetString = '';
const currentIdNumber = '1';
```

## **Use Pronounceable Names**

```javascript
class DtaRcrd102 {}
```

**should be**

```javascript
class Customer {}
```

## **Use Searchable Names**

Single-letter names and numeric constants have a particular problem in that they are not easy to locate across a body of text.

## **Class Names**

Classes and objects should have 'noun' or 'noun phrase' names like **`Customer`**, **`WikiPage`**, **`Account`**, and **`AddressParser`**. A class name **should not be a verb.**

## **Method Names**

Methods **should have verb or verb phrase names** like **`postPayment`**, **`deletePage`** or **`save`**

## **Don't Be Cute**

| Cute name         | Clean name    |
| ----------------- | ------------- |
| `holyHandGranade` | `deleteItems` |
| `whack`           | `kill`        |
| `eatMyShorts`     | `abort`       |

## **Pick one word per concept**

> Pick one word for one abstract concept and stick with it.

For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes.

# **Functions**

## **Small!**

1. The first rule of functions is that they should be small.
2. The second rule of functions is that they should be smaller than that.

## **Do One Thing**

> FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY.

**Bad:**

```javascript
class LinkedInProfile {
    getProfile() {
        this.view += 1;
        this.updatedAt = Date.now.toString();
        return this.information;
    }
}
```

**Good:**

```javascript
class LinkedInProfile {
    getProfile() {
        return this.information;
    }

    increaseView() {
        this.view += 1;
        this.updatedAt = Date.now.toString();
    }
}
```

## **One level of abstraction per function**

In order to make sure our functions are doing "one thing", we need to make sure that the statements within our function are all at the same level of abstraction.

> Reading Code from Top to Bottom: _The Stepdown Rule_

We want the code to read like a top-down narrative. 5 We want every function to be followed by those at the next level of abstraction so that we can read the program, descending one level of abstraction at a time as we read down the list of functions.

To say this differently, we want to be able to read the program as though it were a set of TO paragraphs, each of which is describing the current level of abstraction and referencing subsequent TO paragraphs at the next level down.

```
- To include the setups and teardowns, we include setups, then we include the test page content, and then we include the teardowns.
- To include the setups, we include the suite setup if this is a suite, then we include the regular setup.
- To include the suite setup, we search the parent hierarchy for the “SuiteSetUp” page and add an include statement with the path of that page.
- To search the parent...
```

It turns out to be very difficult for programmers to learn to follow this rule and write functions that stay at a single level of abstraction. But learning this trick is also very important. It is the key to keeping functions short and making sure they do “one thing.” Making the code read like a top-down set of TO paragraphs is an effective technique for keeping the abstraction level consistent.

```javascript
async function createOrder(request) {

    // Validation
    const { products, shippingAddress } = request;
    if (!products) {
        throw new ValidationError('Missing products');
    }
    ... validate many properties in request
    ....

    // Check existed products
    const productIds = products.map(p => p.id);
    const existedProductsResult = await productRepository.findMany(productIds);
    if (existedProductsResult.isFailure) {
        throw new BadRequestError();
    }
    const isProductsHaveNotTheSameSize = products.length !== existedProducts.length;
    if (isProductsHaveNotTheSameSize) {
        throw new BadRequestError('Some products are not existed');
    }

    // Checking price of products
    const existedProducts = existedProductsResult.value;
    for (const product of products) {
        const foundProduct = existedProducts.find(p => p.id === product.id);
        if (foundProduct.price !== product.price) {
            throw new BadRequestError('Wrong Price');
        }
    }

    // Save to DB
    const order = Order.create(request);
    const response = await orderRepository.save(order);

    return {
        message: 'Create order successfully,
    }
}
```

**should be**

```javascript
async function getProducts(products) {
    const productIds = products.map(p => p.id);
    const existedProductsResult = await productRepository.findMany(productIds);
    if (existedProductsResult.isFailure) {
        return Result.fail(existedProductsResult.error);
    }

    const isProductsHaveNotTheSameSize = products.length !== existedProducts.length;
    if (isProductsHaveNotTheSameSize) {
        return Result.fail(isProductsHaveNotTheSameSize);
    }
}

function isProductsHasCorrectPrice(sourceProducts, destinationProducts) {
    for (const product of sourceProducts) {
        const foundProduct = destinationProducts.find(p => p.id === product.id);
        if (foundProduct.price !== product.price) {
            return false;
        }
    }
    return true;
}

async function createOrder(request) {

    const validatorResult = SchemaValidator.validate(request);
    if (validatorResult.isFailure) {
        throw new BadRequest(validatorResult.message);
    }

    const existedProductsResult = await this.getProducts(products);
    if (existedProductResult.isFailure) {
        throw new BadRequestError(existedProductResult.error);
    }

    if (!this.isProductsHasCorrectPrice(products, existedProductsResult.value)) {
        throw new BadRequestError('Wrong Price');
    }

    const order = Order.create(request);
    const response = await orderRepository.save(order);
    return {
        message: 'Create order successfully,
    }
}
```

## **Switch Statements**

-   It’s hard to make a small switch statement. 6 Even a switch statement with only two cases is larger than I’d like a single block or function to be.
-   It’s also hard to make a switch statement that **does one thing**. By their nature, switch statements always do N things.
-   Unfortunately we can’t always avoid switch statements, but we can make sure that each switch statement is buried in a low-level class and is never repeated. Can we do this? Of course, with **polymorphism.**

```javascript
class EventManager {

    constructor({
        ..// Injections
    })
    async processEvent(message)  {
        switch(message.typeId) {
            case 1:
                justSave(message);
                break;
            case 2:
                notifyAll(message);
                break;
            case 3:
                notify(message);
                break;
            ...
        }
    }
}
```

**should be**

```javascript
class Message {
    processMessage(message) {}
}

class StorableMessage extends Message {
    // Override
    processMessage(message) {
        justSave(message);
    }
}

class PublicMessage extends Message {
    // Override
    processMessage(message) {
        notifyAll(message);
    }
}

class PrivateMessage extends Message {
    // Override
    processMessage(message) {
        notify(message);
    }
}

class MessageHandlerService {
    constructor() {
        this.mapHandler = new Map();

        this.mapHandler.set(1, new StorableMessage());
        this.mapHandler.set(2, new PublicMessage());
        this.mapHandler.set(3, new PrivateMessage());
    }

    async processMessage(message) {
        if (!this.mapHandler.has(message.type))
            throw new TypeError('This type is not existed');
        const handler = this.mapHandler.get(message.type);
        await handler.processMessage(message);
    }
}

const messageHandlerService = new MessageHandlerService();
const processEvent = (message) => {
    messageHandlerService.processMessage(message);
};

// Or using Factory
class MessageHandlerFactory {
    static getHandler(message) {
        switch (message.type) {
            case 1:
                return new StorableMessage();
            case 2:
                return new PublicMessage();
            case 3:
                return new PrivateMessage();
        }
    }
}

const processEvent = (message) => {
    const handler = MessageHandlerFactory.getHandler(message);
    handler.processMessage(message);
};
```

## **Use Descriptive Names**

> You know you are working on clean code when each routine turns out to be pretty much what you expected

-   Half the battle to achieving that principle is choosing good names for small functions that do one thing. The smaller and more focused a function is, the easier it is to choose a descriptive name.

-   Don’t be afraid to make a name long. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment. Use a naming convention that allows multiple words to be easily read in the function names, and then make use of those multiple words to give the function a name that says what it does.

-   Choosing descriptive names will clarify the design of the module in your mind and help you to improve it. It is not at all uncommon that hunting for a good name results in a favorable restructuring of the code.

## **Function arguments**

-   Limiting the amount of function parameters is incredibly important because it makes testing your function easier. Having more than three leads to a combinatorial explosion where you have to test tons of different cases with each separate argument.

-   One or two arguments is the ideal case, and three should be avoided if possible. Anything more than that should be consolidated. Usually, if you have more than two arguments then your function is trying to do too much. In cases where it's not, most of the time a higher-level object will suffice as an argument.

-   Since JavaScript allows you to make objects on the fly, without a lot of class boilerplate, you can use an object if you are finding yourself needing a lot of arguments.

-   To make it obvious what properties the function expects, you can use the ES2015/ES6 destructuring syntax. This has a few advantages:

-   When someone looks at the function signature, it's immediately clear what properties are being used.
    It can be used to simulate named parameters.
    Destructuring also clones the specified primitive values of the argument object passed into the function. This can help prevent side effects.

**`Note`**:

> -   Objects and arrays that are destructured from the argument object are **NOT** cloned.
>
> -   Linters can warn you about unused properties, which would be impossible without destructuring.

```javascript
function createMenu(title, body, buttonText, cancellable) {
    // ...
}

createMenu('Foo', 'Bar', 'Baz', true);

// Other way
function createMenu(menu) {
    // ...
}
```

**should be**

```javascript
function createMenu({ title, body, buttonText, cancellable }) {
    // ...
}

createMenu({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true,
});
```

## **Don't use flags as function parameters**

Flags tell your user that this function does more than one thing. Functions should do one thing. Split out your functions if they are following different code paths based on a boolean.

```javascript
class Dog {
    run(isRun) {
        this.isRun = isRun;
    }
}

const dog = new Dog();
dog.run(true);
dog.run(false);
```

**should be**

```javascript
class Dog {
    run() {
        this.isRun = true;
        ...
    }

    stop () {
        this.isRun = false;
        ...
    }
}
```

## **Side Effects**

-   In JavaScript, some values are unchangeable (immutable) and some are changeable (mutable). Objects and arrays are two kinds of mutable values so it's important to handle them carefully when they're passed as parameters to a function. A JavaScript function can change an object's properties or alter the contents of an array which could easily cause bugs elsewhere.

-   Suppose there's a function that accepts an array parameter representing a shopping cart. If the function makes a change in that shopping cart array - by adding an item to purchase, for example - then any other function that uses that same cart array will be affected by this addition. That may be great, however it could also be bad. Let's imagine a bad situation:

-   The user clicks the "Purchase" button which calls a purchase function that spawns a network request and sends the cart array to the server. Because of a bad network connection, the purchase function has to keep retrying the request. Now, what if in the meantime the user accidentally clicks an "Add to Cart" button on an item they don't actually want before the network request begins? If that happens and the network request begins, then that purchase function will send the accidentally added item because the cart array was modified.

-   A great solution would be for the addItemToCart function to always clone the cart, edit it, and return the clone. This would ensure that functions that are still using the old shopping cart wouldn't be affected by the changes.

Two caveats to mention to this approach:

-   There might be cases where you actually want to modify the input object, but when you adopt this programming practice you will find that those cases are pretty rare. Most things can be refactored to have no side effects!

-   Cloning big objects can be very expensive in terms of performance. Luckily, this isn't a big issue in practice because there are great libraries that allow this kind of programming approach to be fast and not as memory intensive as it would be for you to manually clone objects and arrays.e

```javascript
// Before login
let tokenPayload = null;

// After login
tokenPayload = {
    id: '12321',
    username: 'Thang Cao',
    role: 'admin',
};

// Some process
function someProcess() {
    const token = tokenPayload;

    doSomething1(token);
    doSomething2(token);
}

function doSomething1(token) {
    console.log('Token: ', token);
}

function doSomething2(token) {
    token.username = 'GT';
}

someProcess();
console.log('Token: ', tokenPayload);
```

## **Don't Repeat Yourself**

**Duplication** may be the root of all evil in software. Many principles and practices have been created for the purpose of controlling or eliminating it.

# **Comments**

Nothing can be quite so helpful as a well-placed comment. Nothing can clutter up a module more than frivolous dogmatic comments. Nothing can be quite so damaging as an old comment that propagates lies and misinformation.

If our programming languages were expressive enough, or if we had the talent to subtly wield those languages to express our intent, we would not need comments very much—perhaps not at all.

## **Comments Do Not Make Up for Bad Code**

Clear and expressive code with few comments is far superior to cluttered and complex code with lots of comments. Rather than spend your time writing the comments that explain the mess you’ve made, spend it cleaning that mess.

## **Explain Yourself in Code**

**Bad:**

```javascript
// Check user is male teenager
if (user.age >= AGE.9 && user.age <= AGE.18) && user.gender === GENDER.MALE)
```

**Good:**

```javascript
if (isMaleTeenager(user))
```

### **TODO Comments**

It is sometimes reasonable to leave “To do” notes in the form of **_TODO comments_**. In the following case, the **TODO comment** explains why the function has a degenerate implementation and what that function's future should be.

```javascript
// TODO: should support paging and add some query params
function fetchUsers() {}
```

TODOs are jobs that the programmer thinks should be done, but for some reason can’t do at the moment. It might be a reminder to delete a deprecated feature or a plea for someone else to look at a problem. It might be a request for someone else to think of a better name or a reminder to make a change that is dependent on a planned event. Whatever else a TODO might be, it is not an excuse to leave bad code in the system.

### **Bad Comments**

#### **Redundant Comments**

A comment is redundant if it describes something that adequately describes itself.

_For example_:

```javascript
i++; // increment

const apiOptions = {
    url: '', // Host Url
    port: '', // Port number
};

class ShoppingCart {
    // This function will return total price of shopping cart
    getTotalPrice() {}
}
```

### **Noise Comments**

```javascript
// The day of the month
const dayOfMonth;
```

### **Too Much Information**

Don't put interesting historical discussions or irrelevant descriptions of details into your comments.

### **Don't leave commented out code in your codebase**

Version control exists for a reason. Leave old code in your history.
**Bad:**

```javascript
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

**Good:**

```javascript
doStuff();
```

# **Error handling**

## **Don't ignore caught errors**

**Bad:**

```javascript
try {
    functionThatMightThrow();
} catch (error) {
    console.log(error);
}
```

**Good:**

```javascript
try {
    functionThatMightThrow();
} catch (error) {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!

    throw error;
}
```

## **Don't Return Null**

-   If you are tempted to return null from a method, consider throwing an exception or returning a **SPECIAL CASE object** instead.
-   If you are calling a null-returning method from a third-party API, consider wrapping that method with a method that either throws an exception or returns a **SPECIAL CASE object**.

## **Don't Pass Null**

Returning null from methods is bad, but passing null into methods is worse. Unless you are working with an API which expects you to pass null, you should avoid passing null in your code whenever possible.

# **Testing**

## **The Three Laws of TDD**

-   **First Law** You may not write production code until you have written a failing unit test.
-   **Second Law** You may not write more of a unit tests than is sufficient to fail, and not compiling is failing.
-   **Third Law** You may not write more production code than is sufficient to pass the currently failing tests.

## **Single concept per Test**

This rule will help you to keep short functions.

-   **Write one test per each concept that you need to verify**

## **FIRST principle**

Each character of **FIRST** can be analyzed as below

-   **Fast** Test should be fast.
-   **Independent** Test should not depend on each other.
-   **Repeatable** Test Should be repeatable in any environment.
-   **Self-Validating** Test should have a boolean output. either they pass or fail.
-   **Timely** Unit tests should be written just before the production code that makes them pass. If you write tests after the production code, then you may find the production code to be hard to test.

# **Class**

## **Class Organization**

### **Encapsulation**

-   We like to keep our variables and utility functions small, but we're not fanatic about it.

-   Sometimes we need to make a variable or utility function protected so that it can be accessed by a test.

### **Classes Should be Small**

1. First Rule: Classes should be small
2. Second Rule: **Classes should be smaller than the first rule**

## **SOLID**

You can read SOLID principle article [here](../clean-architecture/DesignPrinciple.md#summary)
