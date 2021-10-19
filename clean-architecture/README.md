# **Summary**

- [Introduction](#introduction)
- [Starting with the Bricks: Programming Paradigms](ProgrammingParadigms.md)
- [Design Principles](DesignPrinciple.md)
- [Component Principles](ComponentPrinciple.md)
- Architectures
  - [Part 1](Architecture-1.md)
  - [Part 2](Architecture-2.md)
- [Details](Details.md)
- [Demo](examples/ecomerce/README.md)
- [Conclusion](Conclusion.md)

# **Introduction**

## What is **Clean Architecture** ?

1. We've already talked about **Clean Code** - How to define naming of variables, function and class

- Defining and developing rules of functions and class
- Unit test
- SOLID Principles
- ...

=> Is it enough for developing the software application ?
=> Maybe/No

### What should you/team do when starting the project?

- Get summary requirements
- Research and decide to use which technologies/patterns
- Define the codebase
- Start to code quickly with many assumptions

### After a few weeks/months/years, Do you have these problems?

- Business always changes. How can you refactor the current implementation without affected another logic?
- How does the new member understand the overview of the project quickly?
- How can the new member follow the current structure without asking for a tech lead/other developers?
- How can we manage the unit test easily?
- Change the framework or database, when you realize that they are not adapt to the business.
- ...

## **The Story about developing e-commerce application**

Build an platform e-commerce (B2C and C2C)

<p align="center">
  <img src="images/e-commerce.png" />
</p>

### Quick technical decision

- Frontend: Angular >= 2
- POS Desktop app: Xamarin
- Mobile: Native App
- Backend: node.js, Loopback v2, RabbitMQ
- Database: Mongodb (easy)
- Process: Scrum

### Manager decision

- Should use "MVC" for backend and MVVM for frontend, because it is really easy to understand for fresher/junior developer so they can catch up easy.
- Ignore unit test in the first time (because time is really rush) because it makes the process slow down.
-

### After a few months, code become bigger. And business become more complicated. It change all the time.

**They have many problems**

- One file has more than a thousand lines
- Hard to change the logic
- Conflict all the time
- Update one thing and create many bugs (no unit test)
- Nightmare with conflict when there are some developers working into the same module.
- Combine UI/DB logic with business logic
- Change Mongodb to MySql for "Order" (because at that time MongoDB did not support transactions). Destroy and do again
- There are many styles of code
- New member cannot follow which code structures
- Later, our client wants to apply ElasticSearch for searching key index "Product data"
- Overtime on the weekend
- Dependency release is pending all of the time on every platform.

=> Code is really hard to control and change. Its hard to adapt to new/updated technologies. Implementation is slow down.

**Solutions**:

- Separate teams
- Team focus on implementing features
- Team focus on writing unit test
- Try adding more shadow developers to write unit test
- Overtime everyday and weekend
- Destroy the old module and make a new one to adapt the new technologies (still keep MVC)

**Pros**:

- Solving the current problems at a time
- 

**Cons**:

- Take a lot of resources
- Overtime
- Release is delayed much time on every platform
- There are many technical debts and never solve them because Leader/PM did not allow them.
- Applying ElasticSearch, Redis to improve querying performance? => Destroy again
- Managing many resources for every platform
- Lost a lot of money - Scaling is really slow.
- Many members/developers feel boring and want to be left the team

**Conclusion**:

- MVC/MVP/MVVM is very simple for everyone, but it will be a nightmare when the project becomes more complicated and scaling. Because Controller/Presenter/ViewModel combine DB/API/UI logics to business logics
- The bigger lie that developers buy into is the notion that writing messy/easy code makes them go fast in the short term and just slows them down in the long term
- Decide to use database, framework, patterns very soon when they actually don't understand the business logics
- Developers did not focus/understand the requirements, they spend time to research technical/libraries/framework. For example the animation, UI, database, ...
- Developers scaring to add/maintain unit tests, because they don't understand the scope of unit tests in the project. 
- To finish the unit test coverage. They try to cheat it to pass the test coverage without thinking the business
- They never think that code and unit test is the real document, because they bring many technical detail to the business code. Therefore, they create many documents, but they don't realize that document will be out updated when the implementation change all the time.

=> THEY MUST FIND OUT THE BETTER SOLUTIONS.

=> **CLEAN ARCHITECTURE is the answer**

## Let's started

### What is Design and Architecture?**

- **What is the difference between design and architecture?** There is no difference between them.
	- **Architecture** is often referred to as the high-level structure, whereas **design** as the low-level details. However, they both form a continuum. You cannot have one without the other.

- **What is the Goal of architecture?** 
 	- To minimize the human resources required to build and maintain the required system.

<p align="center">
  <img src="images/container-house-architecture.jpeg" />
</p>


Let's move to [Starting with the Bricks: Programming Paradigms](ProgrammingParadigms.md)