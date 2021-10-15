
# Design Principle

> Good software systems begin with clean code. On the one hand, if the
> bricks aren't well made, the architecture of the building doesn't
> matter much. On the other hand, you can make a substantial mess with
> well-made bricks. This is where the SOLID principles come in.

- SOLID tells us how to arrange functions and data structures into
  classes / modules, and **how those classes / modules should be
  interconnected**. SOLID is therefore applied at the mid-level (class /
  module level).
  - There are other sets of principles for the component level and the
  high-level architecture. We will study these later.
- SOLID is not limited OOP. In the context of SOLID, a "class / module"
  is a grouping of functions and data (all software have this grouping,
  whether it is called a `class` a `module` or something else). We will
  refer to this grouping as class or a module interchangeably in this
  part.
  - For many languages and teams a `module` is coded in a single `source
    file`, but this doesn't have to be the case.
- SOLID goals: produce mid-level software structures that:
  - Tolerate change
  - Are easy to understand
  - Are the basis of components that can be used in many systems (are
    reusable).

#### Executive Summary

- **Single Responsibility:** a module only has one reason to change.
  Problems occur because we put code that different actors depend on
  into close proximity. The SRP says to *separate the code that
  different actors depend on.*
- **Open-Closed Principle:** behaviour of the system can be changed by
  adding new code rather than changing existing one.
- **Liskov Substitution Principle:** interchangeable parts adhere to a
  contract that allows them to be substituted without the user of the
  part having to change.
- **Interface Segregation Principle:** don't depend on things that you
  don't use (i.e. only depend on the interface that you need).
- **Dependency Inversion Principle:** Low-level modules depend on
  high-level ones, by adhering to interfaces the high-level modules
  defines. Not the other way around.

### Single Responsibility Principle

SRP is Not: "Every module should do one thing".
    - Note that there is a lower level rule that states that functions should only do one thing. That rule still holds, but it is NOT the SRP.
SRP is: "A module should have one, and only one, reason to change"
    - "Reason to change" can be interpreted as a group of users or stakeholders for which the module was built for and that would want the module to be changed in the same way. This group is also referred to as actor
    - Another form of SRP: "A module should be responsible to one, and only one, actor."
    - Another form of SRP: "Problems occur because we put code that different actors depend on into close proximity. The SRP says to separate the code that different actors depend on.

Example: 
- Employee
- You have HR, Accounting, IT

```
class Employee {
    constructor({
        // Init data
    })

    calculatePay(): number {
        // implement logic
        // Using some if else
    }

    reportHours(): number {
        // implement logic
    }

}
```

should be

```
abstract class Employee {
    abstract calculatePay(): number;
    abstract reportHours(): number; 
}
```

class HR extends Employee {
    calculatePay(): number {

    }
    reportHours(): number {

    }
}

class Accounting extends Employee {
    calculatePay(): number {

    }
    reportHours(): number {
        
    }
}

=> Much better. Each employee in this social structure has a single place where we can go to in order adjust their respective algorithm that is most likely to change.

The key thing is to separate responsibility based on the social structure of the users using the application.

**In the next chapters we discuss the architectural implications of
these principles.**

### Open Close Principe (OCP)
This section presents the OCP as goal: build systems that are easy to extend without requiring high cost of change.
The interesting bits of this chapter are a series of inter-related ideas that explain how to achieve the goal.

