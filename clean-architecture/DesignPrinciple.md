# **Summary**

-   [Single Responsibility Principle](#single-responsibility-principle-srp)
-   [The Perfect Combinition Of 3 Important Principles](#the-perfect-combinition-of-3-important-principles)
    -   [Problems](#problems)
    -   [Open/Closed Princiciple](#open-closed-principle-ocp)
    -   [Dependency Inversion Princiciple](#dependency-inversion-principle-dip)
    -   [Liskov Substitution Principle](#liskov-substitution-principle-lsp)
-   [Interface Segregation Princiciple](#interface-segregation-principle-isp)

# **Single Responsibility Principle (SRP)**

-   **SRP** is Not: "Every module should do one thing".

-   **SRP** is: "A module should have one, and only one, reason to change" - "Reason to change" can be interpreted as a group of users or stakeholders for which the module was built for and that would want the module to be changed in the same way. This group is also referred to as actor

-   Note that there is a lower level rule that states that functions should only do one thing. That rule still holds, but it is NOT the **SRP**.

-   Another form of **SRP**:
    -   "A module should be responsible to one, and only one, actor."
    -   "Problems occur because we put code that different actors depend on into close proximity. The **SRP** says to separate the code that different actors depend on.

**Example**:

-   Employee
-   You have HR, Accounting, IT

```typescript
class Employee {
    constructor(
        {
            // Init data
        }
    );

    calculatePay(): number {
        // implement logic
        // Using some if else
    }

    reportHours(): number {
        // implement logic
    }

    save(): boolean {}
}
```

should be

```typescript
class Employee {
    calculatePay(): number {}

    reportHours(): number {}

    save(): boolean {}
}

class HR extends Employee {
    calculatePay(): number {
        // implement own algorithm
    }

    reportHours(): number {
        // implement own algorithm
    }
}

class Accounting extends Employee {
    calculatePay(): number {
        // implement own algorithm
    }

    reportHours() {
        // implement own algorithm
    }
}

class IT extends Employee {}
```

=> Much better. Each employee in this social structure has a single place where we can go to in order adjust their respective algorithm that is most likely to change.

## **Conclusion**

A module only has **ONE** reason to change. Problems occur because we put code that different actors depend on into close proximity. The **SRP** says to separate the code that different actors depend on.

## **The Perfect Combinition Of 3 Important Principles**

### **Problems**:

-   You are building backend for e-commerce platforms
-   First time, you used MySQL to store product data
-   After a few months, you want to change MySQL to Mongodb
-   Every services are using it. They must apply a new change.

```typescript
class MongoProductRepository {

    constructor(mongoose) {
        this.mongoose = mongoose;
    }

    getClient() {
        return this.mongoose;
    }

    isExisted(id:string) {
      // Implement here
    }

    isManyExisted(ids: string[]) {
        // Implement logic
    }
    ...
}

class ProductService {

    constructor(productRepository: MongoProductRepository) {
        this.productRepository = productRepository;
    }

    async updateProduct(product) {
        // Check existed product
        const isProductExisted = await this.productRepository.isExisted(product.id);
        ...
    }
}

class OrderService {

  constructor(productRepository: MongoProductRepository) {
        this.productRepository = productRepository;
    }

  async create(order) {
      // Check existed product
      const productIds = order.items.map(i => i.id);
      const isProductsExisted = await this.productRepository.isManyExisted(productIds);
  }
}
```

How to solve this problem with a minimum cost change ?
=> Using OCP, LSP and **DIP**

### **Open Closed Principle (OCP)**

-   This is the O of SOLID. Open means open for extension. Closed means closed for modification. So you should be able to add functionality to a class or component, but you shouldn’t need to modify existing functionality.

-   How do you do that? You make sure that every class or component has just one responsibility and then you hide the more stable classes behind interfaces so that they won’t be affected when less stable classes have to change (DIP).

```typescript
abstract class BaseProductRepository {
    constructor(private readonly mapper: DataMapper) {}

    abstract isExisted(id: string): Promise<boolean>;
    abstract isManyExisted(ids: string[]): Promise<boolean>;
    abstract getById(id): Promise<any>;
    abstract getMany(query, project): Promise<any[]>;
    abstract create(domain): Promise<string>;
}

class MySqlProductRepository extends BaseProductRepository {
    constructor(client: MySqlClient, mapper: MySqlProductDataMapper) {
        super(mapper);
    }

    isExisted(id): Promise<boolean> {
        // Implement logic
    }

    isManyExisted(ids: string[]): Promise<boolean> {
        // Implement logic
    }

    getById(id: string): Promise<any> {
        // Implement logic
    }

    create(domain: any): Promise<string> {
        // Implement logic
    }

    getMany(query, project): Promise<any[]> {
        // Implement logic
    }

    // add private functions
}

class MongoProductRepository extends BaseProductRepository {
    constructor(
        client: Mongoose,
        option: MongoOptions,
        mapper: MongoProductDataMapper
    ) {
        super(mapper);
    }

    isExisted(id): Promise<boolean> {
        // Implement logic
    }

    isManyExisted(ids: string[]): Promise<boolean> {
        // Implement logic
    }

    getById(id: string): Promise<any> {
        // Implement logic
    }

    create(domain: any): Promise<string> {
        // Implement logic
    }

    getMany(query, project): Promise<any[]> {
        // Implement logic
    }

    // add private functions
    private getByName(name) {
        // Implement logic
    }
}
```

### **Conclusion**

Behavior of the system can be changed by adding new code rather than changing existing one.

### **Dependency Inversion Principle (DIP)**

The basic version of the **DIP** tells us that our code should depend on abstractions and not on concrete implementations.
This principle states two essential things:

-   High-level modules should not depend on low-level modules. It should depend on abstractions.
-   Abstractions should not depend upon details. Details should depend on abstractions.

Why all this? Because when we depend on a stable abstraction and the interface changes, all concretions that implement it are guaranteed to be updated. Additionally, we can easily make changes in a concrete implementation without having to change the interface or any of the classes that use it.

**Bad**

```typescript
class ProductService {
    constructor(private readonly productRepository: MySqlProductRepository) {}
}
```

**Good**

```typescript
class ProductService {
    constructor(private readonly productRepository: BaseProductRepository) {}
}
```

### **Liskov Substitution Principle (LSP)**

> If S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of the desirable properties of that program. (Barbara Liskov)

-   This principle means that lower level classes or components can be substituted without affecting the behavior of the higher level classes and components.

-   The “substitution” is all you need to remember.

-   This can be done by implementing abstract classes or interfaces.

**Example 1**:

In Java an ArrayList and a LinkedList both implement the List interface so they can be substituted for each other. If this principle were applied on the architectural level, MySQL could be substituted with MongoDB without affecting the domain logic.

```typescript

// Higher class
class ProductService {

    // DIP
    constructor(productRepository: BaseProductRepository) {
        this.productRepository = productRepository;
    }

    async updateProduct(product) {
        // Check existed product
        const isProductExisted = await this.productRepository.isExisted(product.id);
        ...
    }
}
// Remember polymorphism of OOP

// Before
const mySqlProductRepository = new MySqlProductRepository(
  // Injections
);
const productService = new ProductService(mySqlProductRepository);

// Now
const mongoProductRepository = new MongoProductRepository(
   // Injections
);
const productService = new ProductService(mongoProductRepository);


// Define mock implementation or using jest mock
class MockProductRepository extends BaseProductRepository {

  isExisted(id): Promise<boolean> {
    // Implement mock logic
  }

  isManyExisted(ids: string[]): Promise<boolean> {
    // Implement mock logic
  }

  getById(id: string): Promise<any> {
    // Implement mock logic
  }

  create(domain: any): Promise<string> {
    // Implement mock logic
  }

  getMany(query, project): Promise<any[]> {
    // Implement mock logic
  }
}

// Unit test
const mockProductRepository = new MockProductRepository(); // LSP
const productService = new ProductService(mockProductRepository);
```

# **Interface Segregation Principle (ISP)**

-   The Interface Segregation Principle (ISP) states that Clients should not be forced to depend on methods they do not use.

-   If one class perform more than interface than it need. It cause **Interface Pollution**

-   When a class is required to perform actions that are not useful, it is wasteful and may produce unexpected bugs if the class does not have the ability to perform those actions.

-   A class should perform only actions that are needed to fulfil its role. Any other action should be removed completely or moved somewhere else if it might be used by another class in the future.

**Goal**: This principle aims at splitting a set of actions into smaller sets so that a Class executes ONLY the set of actions it requires.

```typescript
interface IWriteProductService {
    create();
    update();
}

interface IReadProductService {
    findById();
    searchProducts();
}

class ProductService implements IWriteProductService, IReadProductService {

    constructor(
        // Create, Maybe Update doesn't need emailService or SupplierRepo
        private productRepo: ProductRepo,
        supplierRepo: SupplierRepo,
        emailService: EmailService,
        kinesisService: KinesisService,
        // Read
        redisService: IRedisService,
    )
    create() {
        ...
    }
    update() {
        ...
    }

    findById() {
        ...
    }

    searchProducts() {
        ...
    }
}
```

Imagine that we are using lambda for handling the api, every api request will have their own lambda.

```typescript
class UseCase {
    execute(params);
}

class FindProductByIdUseCase extends UseCase {
    constructor(redisService) {
    }

    execute(params) {
        // Implement logic here
    }
}

class CreateProductUseCase extends UseCase {
    ...
}

class UpdateProductUseCase extends UseCase {
    ...
}
```
