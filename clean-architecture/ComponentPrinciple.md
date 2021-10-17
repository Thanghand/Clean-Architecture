# **Summary**

-   [The Reuse/Release Equivalence Principle (REP)](#the-reuse-release-equivalence-principle-rep)
-   [The Common Closure Principle (CCP)](#the-common-closure-principle-ccp)
-   [The Common Reuse Principle (CRP)](#the-common-reuse-principle-crp)
-   [Acyclic Dependency Principle (ADP)](#acyclic-dependency-principle-adp)
-   [Stable Dependency Principle (SDP)](#stable-dependency-principle-sdp)
-   [Stable Abstraction Principle (SAP)](#stable-abstraction-principle-sap)

# **The Reuse/Release Equivalence Principle (REP)**

> The granularity of reuse is the granularity of release

-   REP is a component level principle. Reuse refers to a group of reusable classes or modules. Release refers to publishing it with a version number and its corresponding release documentation.

-   A component should be deployable as a whole and independent from other components.

-   This allow developers that use our component to decided if they want to upgrade the component or not.

-   Whatever you release should be reusable as a cohesive unit. It shouldn’t be a random collection of unrelated classes.

# **The Common Closure Principle (CCP)**

> Gather into components those classes that change for the same reasons and at the same times. Separate into different components those classes that change at different times and for different reasons.

-   This principle says that components should be a collection of classes that change for same reason at the same time. If there are different reasons to change or the classes change at different rates, then the component should be split up.

-   This is basically the same thing as the Single Responsibility Principle applied at the component level.

# **The Common Reuse Principle (CRP)**

-   Don't force users of a component to depend on things they don't need.
    As with the REP and the CCP, the CRP also help us decide which classes shouldn't be placed together into the same component.

-   Those components should be split up so that the users don’t have to depend on classes that they don’t use.

-   This is basically the same thing as Interface Segregation Principle.

**Note**:

> -   These three principles (REP, CCP, and CRP) are in tension with each other. Too much splitting up or too much grouping can both cause problems. One needs to balance these principles based on the situation.
>
> -   Uncle Bob advises us to focus on CCP than REP on early stage of development because develop-ability is more important than reuse.

# **Acyclic Dependency Principle (ADP)**

> **Allow no cycles in the component dependency graph.**

-   ADP means that you shouldn’t have any dependency cycles in your project.

**For example:** If **_component A_** depends on **_component B_**, and **_component B_** depends on **_component C_**, and **_component C_** depends on **_component A_**, then you have a **dependency cycle.**

Having cycles in the source code component dependency graph brings the following complications and creates major problems when trying to make changes to the system because they depend each other. Some particularly painfuls:

-   Unit testing becomes very hard.
-   Working out the order of the build is difficult and there probably is no correct order.
-   You need to have version agreements between multiple components to be able to release. You lose independence of release-ability and the entangled components now need to be released together.

**Example**:

**_Role Service Module_**

```typescript
packageJson {
    "version": "2.0.0",
    "dependencies": {
        "user-service": "2.0.0"
    }
}

class RoleService {

    constructor(private readonly userService: UserService,
        private readonly httpClient: HttpClient) {
    }

    async getRoles(userId) {
        const user = await this.userService.getById(userId);
        if (!user) {
            throw new NotFoundException();
        }

        const roles = await this.httpClient.get(`https://dasda/${user.organizationId}/roles`);
        return roles;
    }

}
```

**_User Service Module_**

```typescript
packageJson {
    "version": "2.0.0",
    "dependencies": {
        "authorize-service": "2.0.0"
    }
}

class UserService {

    constructor(private readonly authorizeService: AuthorizeService,
        private readonly userRepository: IUserRepository) {
    }

    getById(userId, tokenPayload = {}) {

        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new NotFoundException();
        }

        if (isEmptyObject(tokenPayload)) {
            return user;
        }

        const hasPermission = await this.authorizerService.hasPermission(user.id, user.roleId);
        if (!hasPermission) {
            throw new ForBiddenException();
        }
        return user;

    }
}
```

**_Authorizer Service Module_**

```typescript
packageJson {
    "version": "2.0.0",
    "dependencies": {
        "role-service": "2.0.0"
    }
}

class AuthorizeService {
    constructor {private readonly roleService: RoleService}

     async someFunction(userId) {
        const roles = await this.roleService.getRoles(userId);
        for (const role of roles) {
            if (hasPermission(userId, role.id);
                // ...
        }
    }

    hasPermission(userId, roleId) {
        // Update logic to check permission
    }
}
```

### **Solution**:

Add **Permission Module** to cut the cycle

**_Permission Module_**

```typescript
packageJson {
    "name": "permission-service",
    "version": "1.0.0"
}
class Permission {
    constructor {}

    async checkPermission(userId, roleId) {
        const roles = await this.roleService.getRoles(userId);
        const foundRole = roles.find(r => r.id === roleId);
        return roles.find(r => r.id === roleId) !== undefined;
        // Update logic to check permission
    }
}
```

**_Role Service Module_**

```typescript
packageJson {
    "name": "role-service",
    "version": "1.0.0",
    "dependencies": {
        "user-service": "1.0.0",
    }
}

class RoleService {

    constructor(private readonly userService: UserService,
        private readonly httpClient: HttpClient) {
    }

    async getRoles(userId) {
        const user = await this.userService.getById(userId);
        if (!user) {
            throw new NotFoundException();
        }

        const roles = await this.httpClient.get(`https://dasda/${user.organizationId}/roles`);
        return roles;
    }

}
```

**_User Service Module_**

```typescript
packageJson {
    "name": "user-service",
    "version": "1.0.0",
    "dependencies": {
        "core-authorize-service": "1.0.0"
    }
}

class UserService {

    constructor(private readonly authorizeService: IAuthorizeService,
        private readonly userRepository: IUserRepository) {
    }

    getById(userId, tokenPayload = {}) {

        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new NotFoundException();
        }

        if (isEmptyObject(tokenPayload)) {
            return user;
        }

        const hasPermission = await this.authorizerService.hasPermission(user.id, user.roleId);
        if (!hasPermission) {
            throw new ForBiddenException();
        }
        return user;

    }
}
```

**_Authorize Service Module_**

```typescript
packageJson {
    "name": "authorize-service",
    "version": "1.0.0",
    "dependencies": {
        "role-service": "1.0.0"
    }
}

class AuthorizeService {
    constructor {private readonly roleService: RoleService,
        private readonly permission: Permission}

    async someFunction(userId) {
        const roles = await this.roleService.getRoles(userId);
        for (const role of roles) {
            if (this.permission.hasPermission(userId, role.id);
                // ...
        }
    }
}
```

# **Stable Dependency Principle (SDP)**

-   This principle says that dependencies should be in the direction of stability. That is, less stable components should depend on more stable components. This minimizes the effect of change.

-   In an application there must be components that are designed to be volatile because we expect them to change. This components should therefore be easy to change and should not be depended on by something that is difficult to change.

-   We should depend in the direction of stability. Again employing the DIP can help us to apply this principle breaking dependency on a stable component.

# **Stable Abstraction Principle (SAP)**

> High-level logic and policies should be placed into stable components and they should be depended on by other classes.

-   SAP says that the more stable a component is, the more abstract it should be, that is, the more abstract classes it should contain. Abstract classes are easier to extend so this keeps stable components from becoming too rigid.

-   The software should encapsulates the high level policies (business rules) of the system into stable component. Those policies will become difficult to change.

**So how to make them flexible enough to withstand change?**

By using **Open Closed Principle** and **Abstract classes**. So the **SDP** says that dependencies should run in the direction of stability and the SAP says that stability implies abstraction. So dependencies should run in the direction of abstraction.
