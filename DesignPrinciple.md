# Open/Closed Principle (OCP)

Uncle Bob himself used to say: “Good architecture reduces the amount of modified code to the absolute minimum. Ideally to zero”.

This section presents the OCP as goal: build systems that are easy to extend without requiring high cost of change.

Open means open for extension. Closed means closed for modification.

"A software artifact should be open for extension but closed for modification.” What does that mean though? This principle basically states that you should allow users to add new functionalities without changing existing code."

> "Higher level-components are protected from changes to lower level components."

**How to do that?**:

Example:

-   Assume you need to MongoDB for your project

```typescript
class MongoProductRepository {

    constructor(mongoose) {
        this.mongoose = mongoose;
    }

    getClient() {
        return this.mongoose;
    }

    isExisted(id) {
        // Query from DB
    }

    ...
}
```

After 6 months, your boss tell you want to use Redis?

```typescript
interface IProductRepository {
    isExisted(id) {}
    ...
}

class MongoProductRepository implements IProductRepository {

    constructor() {}

    isExisted(id) {
        // Query from DB
    }
}

class RedisProductRepository implements IProductRepository {

    constructor() {}

    isExisted(id) {
        // Query from DB
    }


}

// Define mock implementation or using jest mock
class MockProductRepositoryImpl implements IProductRepository {

    isExisted(id) {
        // mock the result
    }
}
```

# Liskov Substitution Principle (LSP)

> If S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of the desirable properties of that program.

The **substitution** is all you need to remember

This principle means that lower level classes or components can be **substituted** without affecting the behavior of the higher level classes and components.

> A motivation behind this principle is to ensure that inheritance is not being used when it is not appropriate for the code.

**Example 1**:
In Java an ArrayList and a LinkedList both implement the List interface so they can be substituted for each other

**Example 2**:
In our above Example for OCP. We can replace MongoDB to DynamoDB but dont affect the domain logic.

```typescript
class ProductService {

    /**
     * @param {IProductRepository}
     */
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async updateProduct(product) {
        // Check existed product
        const isProductExisted = await this.productRepository.isExisted(product.id);
        ...
    }
}

const productRepository = new MongoProductRepository(); // Before
const productRepository = new DynamoProductRepository(); // Now

const productService = new ProductService(productRepository); // Not change
```

# Interface Segregation Principle (ISP)

The Interface Segregation Principle (ISP) states that Clients should not be forced to depend on methods they do not use.

**Goal**: This principle aims at splitting a set of actions into smaller sets so that a Class executes ONLY the set of actions it requires.

If one class perform more than interface than it need. It cause **Interface Pollution**

When a class is required to perform actions that are not useful, it is wasteful and may produce unexpected bugs if the class does not have the ability to perform those actions.

A class should perform only actions that are needed to fulfil its role. Any other action should be removed completely or moved somewhere else if it might be used by another class in the future.

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

// Imagine that we are using lambda for handling the api, every api request will have their own lambda.

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

# Dependency Inversion Principle (DIP)

The basic version of the DIP tells us that our code should depend on abstractions and not on concrete implementations.

This principle states two essential things:

-   High-level modules should not depend on low-level modules. Both should depend on abstractions.
-   Abstractions should not depend upon details. Details should depend on abstractions.

Why all this? Because when we depend on a stable abstraction and the interface changes, all concretions that implement it are guaranteed to be updated. Additionally, we can easily make changes in a concrete implementation without having to change the interface or any of the classes that use it.

**Bad**

```
class ProductService {
    constructor() {
        emailService = new SendGridService();
        productRepo = new ProductRepository();
    }
}
```

**Good**

```
class ProductService {
    constructor(emailService, productRepo: IProductRepo) {
    }
}
```
