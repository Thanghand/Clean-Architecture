# Chapter 13 - Component Cohesion Principles

## Component level principle:

### The Reuse / Release Equivalence Principle (REP)

> The granularity of reuse is the granularity of release

REP is a component level principle. Reuse refers to a group of reusable classes or modules. Release refers to publishing it with a version number and its corresponding release documentation.

A component should be deployable as a whole and independent from other components.

This allow developers that use our component to decided if they want to upgrade the component or not.

Whatever you release should be reusable as a cohesive unit. It shouldn’t be a random collection of unrelated classes.

### The Common Closure Principle (CCP)

> Gather into components those classes that change for the same reasons and at the same times. Separate into different components those classes that change at different times and for different reasons.

This principle says that components should be a collection of classes that change for same reason at the same time. If there are different reasons to change or the classes change at different rates, then the component should be split up.

This is basically the same thing as the Single Responsibility Principle applied at the component level.

### The Common Reuse Principle (CRP)

Don't force users of a component to depend on things they don't need.

As with the REP and the CCP, the CRP also help us decide which classes shouldn't be placed together into the same component.

Those components should be split up so that the users don’t have to depend on classes that they don’t use.

This is basically the same thing as Interface Segregation Principle.

**Note**:
These three principles (REP, CCP, and CRP) are in tension with each other. Too much splitting up or too much grouping can both cause problems. One needs to balance these principles based on the situation.

## The next three principles deal with the coupling between components:

### Acyclic Dependency Principle (ADP)

> Allow no cycles in the component dependency graph.

ADP means that you shouldn’t have any dependency cycles in your project.

For example, if component A depends on component B, and component B depends on component C, and component C depends on component A, then you have a dependency cycle.

Having cycles in the source code component dependency graph brings the following complications and creates major problems when trying to make changes to the system because they depend each other. Some particularly painfuls:

    - Unit testing becomes very hard.
    - Working out the order of the build is difficult and there probably is no correct order.
    - You need to have version agreements between multiple components to be able to release. You lose independence of release-ability and the entangled components now need to be released together.

**Solution**:
**Technique 1**: Use Dependency Inversion Principle
**Technique 2**: Create a new component

### Stable Dependency Principle (SDP):

This principle says that dependencies should be in the direction of stability. That is, less stable components should depend on more stable components. This minimizes the effect of change.

In an application there must be components that are designed to be volatile because we expect them to change. This components should therefore be easy to change and should not be depended on by something that is difficult to change.

We should depend in the direction of stability. Again employing the DIP can help us to apply this principle breaking dependency on a stable component.

### Stable Abstraction Principle (SAP):

> High-level logic and policies should be placed into stable components and they should be depended on by other classes.

SAP says that the more stable a component is, the more abstract it should be, that is, the more abstract classes it should contain. Abstract classes are easier to extend so this keeps stable components from becoming too rigid.

The software should encapsulates the high level policies (business rules) of the system into stable component. Those policies will become difficult to change.
**So how to make them flexible enough to withstand change?**
By using Open Closed Principle and Abstract classes . So the SDP says that dependencies should run in the direction of stability and the SAP says that stability implies abstraction. So dependencies should run in the direction of abstraction.
