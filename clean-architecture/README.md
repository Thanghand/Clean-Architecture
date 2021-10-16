# Summary
    - Introduction [Review]
    - Starting with the Bricks: Programming Paradigms [New] [Bin]
    - Design Principles [Review] [Bin]
        - Dependency injections
    - Component Principles [Review and Add Image] [Thang]
    - Architectures
        - part 1 [Review]
    - Details
        - 
    - Demo [Inprogress]
    - Conclusion
        - CLean Architecture
        - Domain Centric (TDD)
        -
    - Quick introduction CQRS and DDD 
# Introduction

## Problems/Questions with application is growing up,

    - Business always change. How can we refactor the current implementation without affected another logic ?
    - How do the new member understand the overview of the project quickly ?
    - How do the new member can follow the current structure without asking to tech lead/ another developers ?
    - How can we manage the unit test easily ?
    - ...

## The story behind

Build an e commerce clothes store project (B2C)
Web, POS Desktop, Mobile, ...

-   Requirements:
    1. Supplier:
        - Create/Import products
        - Update Product
            - Update price
            - Update inventory
        - Manage order (Online and Offline)
        - Add new order via POS System
    2. Buyer
        - Add product to shopping cart
        - Make an order
        - Update order when getting it from shipper
    3. Shipper
        - Ship products buyer
        - Update shipping status of order
        -
    4. Payment
        - COD
        - Paypall or Master Card ...

*   Notes: Customer did not know about technologies

1. Quick decision

Frontend: Angular >= 2
POS Desktop app: Xamarin
Mobile: Native App
Backend: node.js, Loopback v2, RabbitMQ
Database: Mongodb (easy)
Process: Scrum

-   Project Manager said we should use "MVC" for backend and MVVM for frontend, because it is really easy to understand for fresher/junior developer. They can catch up easy.
-   Ignore unit test in the first time (because time is really rush)
-   We think unit test make us slow down.

However, after a few months, code become bigger. And business become more complicated. And it change all the time.

They face many problems - One file has more than thousand lines. - Hard to change the logic. (_) - Update one thing and create many bugs (no unit test) (_) - Nightmare with conflict when there are some of developers working into the same module. - Change Mongodb to MySql (because at that time mongodb does not support transaction) - There are many styles code - New member cannot follow which code structures - Later, our client want to apply ElasticSearch for searching key index "Product data" - Overtime on the weekend - Dependency release is pending all of the time in every platforms.

=> Code is really hard to control and change. It hard to adapt with new/updated technologies. Implementation is slow down.

Solutions: - Separate teams - Team focus on implementing features - Team focus on writing unit test - Try add more shadow developers to write unit test - Overtime every day and weekend - Destroy old module and make a new one to adapt the new technologies (still keep MVC)

Pros: - Solving the current problems -
Cons: - Take a lot of resources - Overtime - Release is delayed many time in every platforms - There are many technical debts - Applying ElasticSearch, Redis to improve querying performance ? => Destroy again - Managing many resources for every platforms - Lost a lot of money - Scaling is really slow.

Conclusion: - MVC/MVP/MVVM is simple for everyone, but it will be a nightmare when the project become more complicated and scaling - The bigger lie that developers buy into is the notion that writing messy/easy code makes them go fast in the short term, and just slows them down in the long term - Decide to use database, framework, patterns very soon - Developers did not focus/understand the requirements - Developers scaring to add/maintain unit test, because they don't understand the scope of unit test in the project. They just to finish the unit test coverage. They just to cheat it to pass the test coverage. - They never think that code is the real document, so they always try to create many documents. And then these documents become out updated when developer update the implementation.

=> THEY MUST FIND OUT THE BETTER SOLUTIONS.

CLEAN ARCHITECTURE can give them a better views. Let's started

2. What is the design and architecture ?

-   **What is the difference between design and architecture?** There is no difference between them.
    -   **Architecture** is often referred to as the high-level structure, whereas **design** as the low-level details. However, they both form a continuum. You cannot have one without the other.
-   **What is the Goal of architecture?**
    -   To minimize the human resources required to build and maintain the required system.

Example:

# Design Principle

> Good software systems begin with clean code. On the one hand, if the
> bricks aren't well made, the architecture of the building doesn't
> matter much. On the other hand, you can make a substantial mess with
> well-made bricks. This is where the SOLID principles come in.

-   SOLID tells us how to arrange functions and data structures into
    classes / modules, and **how those classes / modules should be
    interconnected**. SOLID is therefore applied at the mid-level (class /
    module level).
    -   There are other sets of principles for the component level and the
        high-level architecture. We will study these later.
-   SOLID is not limited OOP. In the context of SOLID, a "class / module"
    is a grouping of functions and data (all software have this grouping,
    whether it is called a `class` a `module` or something else). We will
    refer to this grouping as class or a module interchangeably in this
    part.
    -   For many languages and teams a `module` is coded in a single `source file`, but this doesn't have to be the case.
-   SOLID goals: produce mid-level software structures that:
    -   Tolerate change
    -   Are easy to understand
    -   Are the basis of components that can be used in many systems (are
        reusable).

#### Executive Summary

-   **Single Responsibility:** a module only has one reason to change.
    Problems occur because we put code that different actors depend on
    into close proximity. The SRP says to _separate the code that
    different actors depend on._
-   **Open-Closed Principle:** behaviour of the system can be changed by
    adding new code rather than changing existing one.
-   **Liskov Substitution Principle:** interchangeable parts adhere to a
    contract that allows them to be substituted without the user of the
    part having to change.
-   **Interface Segregation Principle:** don't depend on things that you
    don't use (i.e. only depend on the interface that you need).
-   **Dependency Inversion Principle:** Low-level modules depend on
    high-level ones, by adhering to interfaces the high-level modules
    defines. Not the other way around.

### Single Responsibility Principle

SRP is Not: "Every module should do one thing". - Note that there is a lower level rule that states that functions should only do one thing. That rule still holds, but it is NOT the SRP.
SRP is: "A module should have one, and only one, reason to change" - "Reason to change" can be interpreted as a group of users or stakeholders for which the module was built for and that would want the module to be changed in the same way. This group is also referred to as actor - Another form of SRP: "A module should be responsible to one, and only one, actor." - Another form of SRP: "Problems occur because we put code that different actors depend on into close proximity. The SRP says to separate the code that different actors depend on.

Example:

-   Employee
-   You have HR, Accounting, IT

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

### Liskov Substitution Principle

### Interface Segregation Principle

### Dependency Inversion Principle

### Explain more about Dependency injection

# Component Principles

The SOLID design principles in part III showed us how to arrange code into classes / modules and how to interconnect those classes.

Part IV will go one level up to show us what components are, how to compose them and how they should interact in a system.

## Chapter 12: What Components Are

Components are units of deployment. Jar files in Java, Gems in Ruby, DLLs in .Net.

Good component design retains independence of deployability and independence of developability.

## Chapter 13 - Component Cohesion Principles

Component cohesion is about answering the question: Which classes belong in which components?. This is usually done in an ad-hoc manner, but there are software engineering principles that can guide the decision.

## Dependency Inversion

### Dependency Injection

## Components

## Framework Detail

## Database Detail

## UI Detail

# Comparing to another architectures

## Hexagon

## Onion

## CQRS

## DDD

## Put all architecture together
