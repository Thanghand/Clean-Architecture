# **Summary**

-   [Introduction](#introduction) [Review]
-   [Starting with the Bricks: Programming Paradigms](ProgrammingParadigms.md) [New] [Bin]
-   [Design Principles](DesignPrinciple.md) [Review] [Bin]
    -   Dependency injections
-   [Component Principles](ComponentPrinciple.md) [Review and Add Image] [Thang]
-   [Architectures](Architecture.md)
    -   Part 1 [Review]
-   [Details](Details.md)
-   Demo [In Progress]
-   Conclusion
    -   Clean Architecture
    -   Domain Centric (TDD)
    -
-   Quick introduction CQRS and DDD

# **Introduction**

## **Problems/Questions with application is growing up**

    - Business always change. How can we refactor the current implementation without affected another logic ?
    - How do the new member understand the overview of the project quickly ?
    - How do the new member can follow the current structure without asking to tech lead/ another developers ?
    - How can we manage the unit test easily ?
    - ...

## **The story behind**

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

They face many problems - One file has more than thousand lines. - Hard to change the logic.

-   Update one thing and create many bugs (no unit test)
-   Nightmare with conflict when there are some of developers working into the same module.
-   Change Mongodb to MySql (because at that time mongodb does not support transaction)
-   There are many styles code
-   New member cannot follow which code structures
-   Later, our client want to apply ElasticSearch for searching key index "Product data"
-   Overtime on the weekend
-   Dependency release is pending all of the time in every platforms.

=> Code is really hard to control and change. It hard to adapt with new/updated technologies. Implementation is slow down.

**Solutions**:

-   Separate teams
-   Team focus on implementing features
-   Team focus on writing unit test
-   Try add more shadow developers to write unit test
-   Overtime every day and weekend
-   Destroy old module and make a new one to adapt the new technologies (still keep MVC)

**Pros**:

-   Solving the current problems

**Cons**:

-   Take a lot of resources
-   Overtime
-   Release is delayed many time in every platforms
-   There are many technical debts
-   Applying ElasticSearch, Redis to improve querying performance ? => Destroy again
-   Managing many resources for every platforms
-   Lost a lot of money - Scaling is really slow.

**Conclusion**:

-   MVC/MVP/MVVM is simple for everyone, but it will be a nightmare when the project become more complicated and scaling
-   The bigger lie that developers buy into is the notion that writing messy/easy code makes them go fast in the short term, and just slows them down in the long term
-   Decide to use database, framework, patterns very soon - Developers did not focus/understand the requirements
-   Developers scaring to add/maintain unit test, because they don't understand the scope of unit test in the project. They just to finish the unit test coverage. They just to cheat it to pass the test coverage.
-   They never think that code is the real document, so they always try to create many documents. And then these documents become out updated when developer update the implementation.

=> THEY MUST FIND OUT THE BETTER SOLUTIONS.

> **CLEAN ARCHITECTURE can give them a better views.**

[Let's started](#summary)
