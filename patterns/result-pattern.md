# **Syllabus**

-   [What is Error Handling?](#what-is-error-handling)
-   [Problem with try/catch?](#problem-with-trycatch)
    -   [We don't know the function called have try/catch or not](#)
    -   [Every code logic all wrapped on try/catch.](#)

# **What is Error Handling?**

-   Error Handling is a technique to catching errors and protect the app without crashing it.

-   Error Handling help developer cover unexpected scenarios in user flow and make your app run more smoothly

-   Help us to developing a robust codebase and reducing development time by finding bugs and errors easily

-   The usual technique for error handling is using try/catch

# **Problem with try/catch?**

Using try/catch is a traditional way of Error Handling, it provides basic syntax and standard error-catching flow for every programming language. However, it contains a lot of problems may cause difficult to maintain:

## **We don't know the function called have try/catch or not.**

-   Try/catch is the syntax, not a type, so if we call a function, it doesn't remind us whether this function was wrapped on try/catch or not. we must manually jump into detail to see.

-   It will become more difficult to find if that function is already packaged

**Example**:

```typescript
const getAverage = (a: number, b: number) => {
    // Do you know this function have try catch or not?
    const total: number = sum();
};
```

## **Every code logic all wrapped on try/catch.**

-   As we've known, to protect our code from logic exception, we must wrapped inside try/catch block, and throw exception if it happen.
-   The problem will come when you call the function have try/catch but you don't have wrap it another try/catch block

## **Hard to write Unit test.**

-   If the function we need to test have complex logic and throw a lot of exception, we must catch specify each error in the test case.

```typescript
// product.ts
class Product extends Entity<ProductProps> {
  public static create(props: ProductProps) {
    try {
      const { title, price } = props;
      if (title.length > 30) {
        throw new LongTitleError("Title must less than 30 charactes");
      }

      if (price < 0) {
        throw new NegativePriceError("Price must be a positive number");
      }
    } catch (error) {
      if (error instanceof LongTitleError) {
        // Catch error logic.
      }
      if (error instanceof NegativePriceError) {
        // Catch error logic.
      }
    }
  }
}

// product.spec.ts
describe("product model") {
    it("should throw error") {
        try {
            const props: ProductProps = {
                title: "Television",
                price: 100000;
            }
            const result = Product.create(props);
            return result;
        }
        catch(error) {
            if(error instanceof LongTitleError) {
                expect(...)
            }
            if(error instanceof NegativePriceError) {
                expect(...)
            }
        }

    }
}
```

## **Forget to catch the error we've thrown**

-   When handling logic on try/catch, we often forgot or bypass some cases of exception.
-   In a large app, the Error Handling with try/catch will be a nightmare if the function or class has a complex logic and a ton of exception throwing, If we bypass catching some type of error, it may cause big problems, lead or application quality lower

# **What is Result Pattern ?**

-   Result Pattern is the pattern that helps us wrap our code logic into a common validator object.

With the Result class, we can:

-   check for validity with **isSuccess**
-   check for failure using the **isFailure**
-   collect the error with **error**
-   collect the value with **getValue()**
-   check for the validity of an array of Results using **Result.combine(results: Result[])**

# **Why - Benefit of using Result Pattern?**

There are 3 main purposes:

-   Safely return error states
-   Return valid results
-   Combine several results and determine the overall success or failure states

## **Make our code more functional.**

-   Result Pattern make code flow more readable and clarify.

-   **Create the user behavior**: must to catch fail case first if the return type is Result.

```typescript
// Definition.
class Product {
    public static validate(props: ProductProps): Result<void> {
        const { title, price } = props;
        if (title < 0 || title > 30) {
            return Result.fail(
                'Title length must be positive number and less than 30 characters'
            );
        }

        if (price < 0) {
            return Result.fail('Price must be positive number');
        }

        return Result.ok();
    }

    public static create(props: ProductProps): Result<Product> {
        const resultOrError = this.validate(props);
        if (resultOrError.isFailure) {
            return Result.fail(resultOrError.error);
        }

        // handle create product logic
        return Result.ok(new Product(props));
    }
}
```

## **Help user know and force them to return specify type wrapped by Result.**

-   By passing the Result type on the returned value, we'll know exactly that function will return fail in some cases and we must catch it before returning truth value.

```typescript
const validateAndGetProduct = async (): Promise<Result<Product>> => {
    // ...
};

class GetUserInformationUseCase {
    // ...
    protected execute(): Promise<Result<User>> {
        // ...
    }
}
```

## **Write unit test easier.**

**Example**:

```typescript
// product.spec.ts
describe("product model") {
    // check success case
    it("should create model success") {
        const props: ProductProps = {
            title: "Television",
            price: 5000
        }
        const resultOrError: Result<Product> = Product.create(props);

        expect(resultOrError.isSuccess).equal(true);
    }

    // check fail case
    it("should create fail if title is empty") {
        const props: ProductProps = {
            title: "",
            price: 5000
        }
        const resultOrError: Result<Product> = Product.create(props);

        expect(resultOrError.isFailure).equal(true);
    }
}
```

## **Is the right tool for write TDD convenient**

-   As we've known, TDD is a mindset help developer how to design code that write unit test more easily, with high quality, and at in any time of the business lifecycle.

-   With Result Pattern, it help us to write fast, clarify and high quality test case. Mean it adapts with TDD perfectly.

# **UseCases**

**Use Case 1:** Convert result or business layer to app layer (API) by ResultMapper.

<!-- # **Do I need it? Why it combine with DDD in large scale app so convenient and perfectly.** -->

# **Conclusion.**

# **References**

[Clean Up Your Client to Business Logic Relationship With a Result Pattern](https://alexdunn.org/2019/02/25/clean-up-your-client-to-business-logic-relationship-with-a-result-pattern-c/)
