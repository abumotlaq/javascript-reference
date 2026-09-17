# JavaScript Code Organization

## Overview

Code organization determines how easily developers can:

```text
Find code
Understand relationships
Trace dependencies
Change features
Reuse logic
Test behavior
Remove obsolete code
```

Good organization is not about creating many folders.

It is about creating boundaries that reflect the actual responsibilities of the application.

A useful principle is:

```text
Related code should stay close.
Unrelated code should stay separate.
Dependencies should be visible.
Responsibilities should have clear ownership.
```

The goal is to make the repository predictable.

---

# Organize Around Responsibility

Avoid putting unrelated code into one file:

```text
users
date formatting
API requests
storage
DOM helpers
validation
analytics
```

Instead, group related responsibilities:

```text
users/
date/
api/
storage/
validation/
analytics/
```

The exact structure depends on project size.

---

# Start Simple

A small project does not need a large architecture.

A simple structure may be enough:

```text
src/
├── main.js
├── api.js
├── utils.js
└── components/
```

As complexity grows, introduce clearer boundaries.

Do not create architectural layers before they solve an actual problem.

---

# Let Complexity Drive Structure

A useful progression is:

```text
Small project
    ↓
Simple files
    ↓
Related modules
    ↓
Feature boundaries
    ↓
More explicit domain boundaries
```

Organization should evolve with the application.

---

# Avoid Folder Explosion

Do not create:

```text
helpers/
services/
managers/
processors/
handlers/
adapters/
factories/
builders/
utilities/
```

for every small project.

Too many categories can make navigation slower rather than faster.

---

# Folder Names Should Communicate Purpose

Good:

```text
components/
features/
services/
api/
utils/
hooks/
```

Weak:

```text
misc/
stuff/
common/
other/
temp/
```

Generic folders tend to become dumping grounds.

---

# Avoid the `misc` Folder

A folder such as:

```text
misc/
```

usually means the code does not have a clear conceptual home.

Instead, ask:

```text
What responsibility does this code have?
Which feature owns it?
Is it actually shared?
```

Then place it accordingly.

---

# Avoid Giant `utils.js` Files

A utility file can start small:

```js id="f0v3x8"
export function formatDate() {}

export function formatCurrency() {}
```

But eventually become:

```text
utils.js
→ 800 lines
→ unrelated functions
→ unclear dependencies
```

Split utilities by coherent responsibility:

```text
date-utils.js
format-utils.js
validation.js
string-utils.js
```

when the project actually needs the separation.

---

# Avoid One-Function-Per-File as a Rule

This:

```text
get-user.js
save-user.js
delete-user.js
```

is not automatically better than:

```text
user-service.js
```

Group functions that form a coherent module.

A file is a boundary, not a score.

---

# Organize by Feature When the Project Grows

Instead of:

```text
components/
services/
utils/
```

for every part of a large application, a feature-oriented structure may be clearer:

```text
features/
├── users/
│   ├── components/
│   ├── api/
│   └── utils/
│
└── projects/
    ├── components/
    ├── api/
    └── utils/
```

Related code stays together.

---

# Feature Boundaries Reduce Coupling

With feature-oriented organization:

```text
features/users/
```

contains most code related to users.

A developer can inspect the feature without searching the entire repository.

This can make changes more localized.

---

# Do Not Force Feature Folders Too Early

For a project with only:

```text
users/
projects/
```

and a small number of files, a simple structure may be enough.

Feature architecture should solve navigation and ownership problems, not create ceremony.

---

# Separate Application Entry Points

A clear entry point makes startup behavior easier to understand.

Example:

```text
src/
├── main.js
└── app.js
```

Possible responsibilities:

```text
main.js
→ Bootstrap the environment.

app.js
→ Initialize the application.
```

The exact distinction depends on the project.

---

# Keep Bootstrap Code Small

Entry files should generally avoid containing the entire application.

Instead of:

```js id="7d6m2x"
initializeStorage();
connectDatabase();
loadConfig();
fetchUser();
renderPage();
registerListeners();
startPolling();
initializeAnalytics();
```

move responsibilities into appropriate modules:

```js id="n5q8c4"
async function startApp() {
  const config =
    loadConfig();

  initializeStorage(
    config
  );

  await initializeUser(
    config
  );

  initializeUI();
}
```

The entry point orchestrates rather than implementing everything.

---

# Make Dependencies Explicit

Prefer:

```js id="x4m7p2"
import {
  formatDate,
} from "./date-utils.js";
```

over relying on global variables:

```js id="g8q3n5"
window.formatDate;
```

Explicit imports make dependencies visible.

---

# Avoid Hidden Global Dependencies

Weak:

```js id="k2m6v9"
function renderUser(user) {
  return formatName(
    user.name
  );
}
```

when `formatName` exists only as an implicit global.

Prefer:

```js id="z7p4m1"
import {
  formatName,
} from "./format-utils.js";

function renderUser(user) {
  return formatName(
    user.name
  );
}
```

The module declares what it needs.

---

# Keep Dependency Direction Understandable

A simple application might have:

```text
UI
 ↓
Application logic
 ↓
Data/API
```

Avoid creating circular dependencies such as:

```text
UI
 ↓
Service
 ↓
UI helper
 ↓
Service
```

The dependency graph should be understandable.

---

# Avoid Circular Dependencies

Suppose:

```js id="r6m2x7"
// user.js
import {
  getProject,
} from "./project.js";
```

and:

```js id="q8v4n1"
// project.js
import {
  getUser,
} from "./user.js";
```

This creates:

```text
user
 ↓
project
 ↓
user
```

Circular dependencies can produce difficult initialization behavior.

Reconsider the ownership boundaries.

---

# Extract Shared Concepts Carefully

If two modules share a truly common concept:

```text
user.js
   ↓
shared domain concept
   ↑
project.js
```

a third module may remove the dependency cycle.

But do not create:

```text
shared/
```

as a generic dumping ground.

---

# Avoid `common.js`

A file named:

```text
common.js
```

often grows without clear ownership.

Prefer a more specific responsibility:

```text
date.js
validation.js
formatting.js
storage.js
```

The name should tell the reader why the file exists.

---

# Avoid Deep Import Paths When They Reveal Internal Details

Weak:

```js id="c3m7q1"
import {
  formatUser
} from
  "../../../features/users/internal/utils.js";
```

This often indicates that module boundaries are not well defined.

Prefer stable public entry points when useful:

```js id="m8x4p2"
import {
  formatUser
} from
  "../../features/users/index.js";
```

The internal structure can change without forcing every consumer to change.

---

# Public Module APIs

A module can expose a small public surface:

```js id="y4n7k2"
// users/index.js

export {
  createUser,
  getUser,
};
```

Internal details remain private.

This creates a boundary between:

```text
Public API
and
Implementation
```

---

# Do Not Export Everything

Avoid:

```js id="x7m3q8"
export {
  normalizeUser,
  validateUser,
  parseUser,
  internalCache,
  debugState,
  createUser,
};
```

when consumers only need:

```js id="p5v8n2"
export {
  createUser,
};
```

Every export can become a dependency that must later be preserved.

---

# Organize Files by Responsibility

A module should ideally have a clear reason to exist.

Examples:

```text
user-service.js
→ User-related operations

date-utils.js
→ Date transformations

api-client.js
→ HTTP communication

storage.js
→ Browser storage access
```

Avoid files whose contents have no coherent theme.

---

# Keep Related Files Close

If these files all belong to one feature:

```text
profile/
├── profile.js
├── profile-view.js
├── profile-api.js
└── profile-validation.js
```

keep them together rather than scattering them across unrelated global folders.

---

# Group by Feature, Not Technology, When Useful

Instead of:

```text
components/
hooks/
services/
utils/
```

a larger application may benefit from:

```text
profile/
projects/
auth/
settings/
```

where each feature contains its relevant technical pieces.

This can reduce the distance between related code.

---

# Shared Infrastructure Should Stay Shared

Some code genuinely belongs at the application level:

```text
router/
configuration/
API client
logging
storage abstraction
error handling
```

Keep these in shared modules when multiple features depend on them.

---

# Avoid Feature Leakage

A users feature should not casually manipulate another feature's internal files:

```js id="q3m8v7"
import {
  internalProjectCache
} from
  "../projects/internal/cache.js";
```

Prefer a public API:

```js id="h5k2x9"
import {
  getProject
} from
  "../projects/index.js";
```

This preserves ownership.

---

# Feature Ownership

If a module owns:

```text
User data
```

other modules should not directly mutate the user's internal collection.

Use operations such as:

```js id="v7m4p1"
userStore.addUser(user);
```

rather than:

```js id="w8q3n6"
userStore.users.push(user);
```

The owner maintains its invariants.

---

# Organize Around Changes

One way to evaluate structure is to ask:

```text
When this feature changes,
how many unrelated folders must I visit?
```

If one feature is spread across:

```text
components/
services/
utils/
constants/
api/
hooks/
```

a change may require navigation across the entire repository.

Feature-oriented organization can reduce that cost.

---

# Organize Around Domain Concepts

For example:

```text
users/
projects/
orders/
auth/
```

can be stronger boundaries than:

```text
components/
helpers/
managers/
```

when the application has distinct business concepts.

---

# Avoid Organizing Only Around File Types

Technology-based organization:

```text
components/
services/
utils/
```

is simple and valid for small applications.

As the project grows, it can become difficult to locate everything related to one domain feature.

Use the structure that best matches the project's complexity.

---

# Constants

Keep constants close to the domain that owns them.

Instead of:

```text
constants.js
```

containing everything:

```text
MAX_RETRIES
API_URL
USER_ROLES
DATE_FORMATS
UI_TEXT
CACHE_SIZE
```

consider:

```text
users/constants.js
api/constants.js
cache/constants.js
```

when those values belong to different responsibilities.

---

# Avoid Global Constant Dumping Grounds

A global file such as:

```text
constants.js
```

can become difficult to maintain when every feature adds unrelated values.

Separate constants when ownership differs.

---

# Configuration

Configuration should have a clear boundary:

```text
config/
├── environment.js
└── app.js
```

or another structure that fits the project.

Do not scatter environment-dependent logic across unrelated modules.

---

# Environment-Specific Configuration

Keep differences between environments explicit:

```text
development
test
production
```

Avoid conditions such as:

```js id="t6m2p9"
if (
  window.location.hostname ===
  "localhost"
) {
  // ...
}
```

throughout the application.

Centralize environment detection.

---

# Avoid Hard-Coded Environment Logic

Weak:

```js id="n4q8x2"
if (
  window.location.hostname ===
  "localhost"
) {
  apiUrl =
    "http://localhost:3000";
} else {
  apiUrl =
    "https://api.example.com";
}
```

Prefer:

```js id="b7m3v8"
const apiUrl =
  config.apiUrl;
```

The environment-specific value belongs in configuration.

---

# API Modules

Centralize API communication when it improves consistency.

For example:

```text
api/
├── client.js
├── users.js
└── projects.js
```

Possible responsibilities:

```text
client.js
→ Request configuration

users.js
→ User endpoints

projects.js
→ Project endpoints
```

---

# Avoid One Giant API Module

Avoid:

```text
api.js
→ 2,000 lines
→ users
→ projects
→ orders
→ authentication
→ analytics
```

Split by domain when the file becomes difficult to navigate.

---

# Keep Networking Separate From Domain Transformation

For example:

```js id="k4m8x2"
export async function fetchUser(
  userId
) {
  const response =
    await fetch(
      `/api/users/${userId}`
    );

  return response.json();
}
```

Then:

```js id="v6n2q5"
export function normalizeUser(
  user
) {
  return {
    ...user,
    name:
      user.name.trim(),
  };
}
```

The API layer retrieves data.

The transformation layer shapes data.

---

# Avoid Leaking HTTP Details Everywhere

Weak:

```js id="j3m7x9"
const response =
  await fetch(...);

if (!response.ok) {
  // ...
}

const data =
  await response.json();
```

repeated across dozens of modules.

A shared API client can centralize common behavior such as:

```text
Headers
Authentication
Error conversion
Parsing
Timeouts
Retries
```

when that complexity is real.

---

# Do Not Build an API Client Abstraction Too Early

For a small project:

```js id="x7p2m5"
const response =
  await fetch("/api/users");
```

may be perfectly reasonable.

Introduce a shared API layer when repeated behavior or consistency problems appear.

---

# Utility Modules

Utility modules should contain functions that are:

```text
Small
Focused
Reusable
Independent
Meaningfully generic
```

Example:

```js id="a5m8q3"
export function clamp(
  value,
  min,
  max
) {
  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );
}
```

---

# Avoid Business Logic in Generic Utilities

Do not put:

```js id="c9v4m7"
export function calculateUserSubscriptionPrice() {
  // ...
}
```

into:

```text
utils/
```

if it is specific to one domain.

It belongs near the subscription feature.

---

# Feature-Specific Utilities

A utility can belong inside the feature that owns its domain:

```text
features/
└── users/
    ├── user-utils.js
    └── user-service.js
```

Not every utility must be globally shared.

---

# Shared Utilities Should Actually Be Shared

If only one feature uses:

```text
normalizeUserName()
```

keep it inside that feature.

Move it to shared utilities when multiple unrelated features genuinely need it.

---

# Avoid Premature Shared Code

Sharing code creates coupling.

Before moving a helper into:

```text
shared/
utils/
common/
```

ask:

```text
Do multiple features use it?
Do they mean exactly the same thing?
Would changing it affect all of them?
Does shared ownership make sense?
```

---

# Duplication Can Be Safer Than Wrong Abstraction

Two similar functions may represent different domain concepts.

Forcing them into one generic helper can create:

```text
Flags
Options
Conditional branches
Complex naming
Hidden semantics
```

Duplication is sometimes cheaper than a misleading abstraction.

---

# Entry Points and Public Boundaries

Large features can expose an entry module:

```text
users/
├── index.js
├── user-service.js
├── user-validation.js
└── user-api.js
```

Consumers import through:

```js id="z5q2m7"
import {
  getUser
} from
  "./users/index.js";
```

rather than depending on the internal structure.

---

# Barrel Files

A barrel file re-exports symbols:

```js id="m4x8q2"
export {
  getUser,
} from "./user-service.js";

export {
  validateUser,
} from "./user-validation.js";
```

This can create a convenient public entry point.

But excessive barrel usage can:

```text
Hide dependency origins
Create circular dependencies
Increase import complexity
```

Use it when it improves the module API.

---

# File Naming Consistency

Choose one project-wide naming convention.

For example:

```text
user-service.js
user-validation.js
api-client.js
date-utils.js
```

or:

```text
userService.js
userValidation.js
apiClient.js
dateUtils.js
```

Do not alternate randomly.

---

# Names Should Match Contents

A file named:

```text
user-service.js
```

should not contain:

```text
date formatting
browser storage
unrelated DOM helpers
```

The file name is part of the organizational contract.

---

# Keep Tests Near Their Subjects When Useful

Possible structure:

```text
users/
├── user-service.js
└── user-service.test.js
```

This keeps implementation and tests together.

Alternatively:

```text
tests/
└── users/
```

may be useful for a project with a centralized testing strategy.

Choose one convention consistently.

---

# Keep Documentation Near the Relevant Code

For project-specific documentation:

```text
feature/
├── README.md
├── api.js
└── service.js
```

can be useful when the feature has setup or operational details.

Do not duplicate the same documentation across many locations.

---

# README Files Should Have a Purpose

A `README.md` inside a directory should explain:

```text
Why this directory exists
How to use it
Important conventions
Relevant dependencies
```

Do not create empty README files only because every folder "should have one."

---

# Avoid Deep Folder Nesting

This:

```text
src/
  features/
    users/
      services/
        internal/
          helpers/
            formatting/
              names/
```

may be technically organized but practically painful.

Prefer a flatter structure when the responsibilities do not justify deep nesting.

---

# Folder Depth Should Reflect Meaningful Boundaries

Each folder should answer:

```text
Why is this code separated from its parent?
```

If the answer is merely:

```text
"Because it felt organized."
```

the boundary may not be useful.

---

# Avoid Organizing by History

Do not create folders such as:

```text
old/
new/
legacy/
temporary/
future/
```

unless there is a specific operational reason.

Version control already records history.

---

# Avoid Temporary Code in Production Folders

Do not leave:

```text
test.js
backup.js
old.js
new.js
final.js
final2.js
```

inside the source tree.

Use version control branches and commits for temporary experiments.

---

# Keep Generated Files Separate

Build outputs such as:

```text
dist/
build/
coverage/
```

should generally not be mixed with source files.

Use `.gitignore` when appropriate.

---

# Keep Source and Output Clearly Separated

A typical structure:

```text
project/
├── src/
├── public/
├── tests/
├── docs/
└── dist/
```

makes the distinction clear.

The exact folders depend on the tooling.

---

# Organize Browser Assets Deliberately

Possible structure:

```text
public/
├── images/
├── icons/
└── fonts/
```

and:

```text
src/
├── styles/
├── components/
└── features/
```

The distinction between imported assets and public static assets should be clear.

---

# Avoid Duplicate Asset Locations

Do not keep the same image in:

```text
public/
src/assets/
```

unless there is a specific reason.

Duplicate assets can drift out of sync and increase repository size.

---

# Organize Styles by Ownership

For large projects:

```text
styles/
├── globals.css
└── components/
```

or feature-specific styles can be useful.

Do not put all styles into one massive stylesheet if it becomes difficult to navigate.

---

# Organize Tests Around Behavior

Instead of:

```text
tests/
  functions/
  objects/
  arrays/
```

for an application, feature-oriented tests can be easier:

```text
tests/
  users/
  projects/
  authentication/
```

The test structure can mirror the application structure.

---

# Organize Scripts Separately

Project maintenance scripts can live in:

```text
scripts/
```

rather than being mixed into application source.

Examples:

```text
scripts/
├── generate-data.js
└── cleanup.js
```

Scripts should have clear ownership and documentation.

---

# CLI and Application Code

Do not mix command-line entry logic with reusable business logic when both are substantial.

Prefer:

```text
cli.js
service.js
```

where:

```text
cli.js
→ Handles command-line input/output.

service.js
→ Contains reusable application logic.
```

---

# Keep Infrastructure Code at the Boundary

Infrastructure includes:

```text
Filesystem
HTTP
Database
Environment
Browser APIs
External services
```

Keep these dependencies close to the boundaries that need them.

Core transformations can remain independent where practical.

---

# Dependency Direction

A useful principle:

```text
UI
 ↓
Application
 ↓
Domain logic
 ↓
Infrastructure
```

The exact architecture varies.

The important point is that lower-level infrastructure should not unexpectedly control higher-level UI behavior.

---

# Avoid Importing UI Code Into Data Modules

Weak:

```js id="n8m3p7"
// api.js
import {
  showError
} from "./ui.js";
```

An API layer should generally not know how the UI renders errors.

Instead:

```js id="q6v4m2"
try {
  await fetchUser();
} catch (error) {
  showError(
    getUserMessage(error)
  );
}
```

The UI layer decides how to present the problem.

---

# Avoid Importing Database Details Into UI Components

Weak:

```js id="x4m8q1"
component.js
→ database.query(...)
```

A component should generally depend on a data operation rather than database implementation details.

---

# Keep Framework-Specific Code Near Framework Boundaries

For example:

```text
React components
```

should contain UI concerns.

Pure data transformations can often live outside the component system.

This improves reuse and testing.

---

# Avoid Putting Everything Into Components

A component should not become:

```text
UI
validation
database
networking
business logic
data transformation
analytics
caching
```

all at once.

Move non-UI responsibilities into appropriate modules as complexity grows.

---

# Keep Hooks Focused

In React-style projects, a custom hook should generally represent a focused behavior:

```js id="m7x3n8"
useUserProfile();
useDebouncedValue();
useOnlineStatus();
```

Avoid one hook that controls every application concern.

---

# Organize Contexts by Responsibility

Instead of one:

```text
AppContext
```

containing:

```text
Auth
Theme
Cart
Notifications
Projects
User
```

separate contexts when they represent independently changing state.

---

# Avoid Deep Provider Nesting Without a Reason

Too many global providers can make application structure difficult to understand.

Providers should correspond to real shared concerns.

---

# Organize State by Ownership

A useful model:

```text
Local component state
→ UI-specific state

Feature state
→ Feature-specific shared state

Application state
→ Cross-feature state

Server state
→ Remote data
```

Do not place every value into global state.

---

# Avoid Global State for Everything

Global state is easy to access.

That is exactly why it can become difficult to control.

Prefer the narrowest scope that satisfies the requirement.

---

# Organize Async Logic With Its Owner

If user loading belongs to:

```text
users/
```

keep its request, transformation, and user-specific error handling close to that feature.

Do not scatter one workflow across unrelated application folders.

---

# Keep Cross-Cutting Concerns Deliberate

Some concerns genuinely span features:

```text
Logging
Authentication
Configuration
Error reporting
Analytics
Routing
```

These can belong in shared infrastructure.

The key is to distinguish true cross-cutting concerns from code that is merely convenient to share.

---

# Avoid Catch-All Architecture

Be careful with directories such as:

```text
core/
common/
shared/
helpers/
services/
```

If everything ends up there, the organization has stopped communicating ownership.

---

# Repository-Level Organization

A mature JavaScript repository may look conceptually like:

```text
project/
├── docs/
├── scripts/
├── tests/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── lib/
│   └── main.js
├── package.json
└── README.md
```

This is only an example.

Do not copy it blindly.

---

# Keep Root Files Purposeful

The repository root should contain important project-level files:

```text
README.md
package.json
.gitignore
configuration files
license
```

Avoid dumping source modules directly into the root.

---

# README as the Entry Point

The root `README.md` should answer:

```text
What is this project?
How do I install it?
How do I run it?
How is it organized?
What technologies does it use?
Where are the important directories?
```

Keep the root README focused on onboarding.

---

# Documentation Hierarchy

A useful documentation structure:

```text
README
   ↓
Getting started
   ↓
Architecture / organization
   ↓
Feature-specific docs
   ↓
Detailed reference
```

Do not put every technical detail in the root README.

---

# Code Comments vs Documentation

Comments explain:

```text
Why this line or block exists.
```

Documentation explains:

```text
How a system or feature is used.
How modules relate.
How a workflow operates.
```

Use the right level for the information.

---

# Avoid Documentation Duplication

Do not document the same contract independently in:

```text
README
docs/
comments
code
```

unless each location serves a different purpose.

Duplicated documentation becomes stale.

---

# Organize by Stable Concepts

Good boundaries are usually based on concepts likely to remain meaningful:

```text
users
projects
authentication
storage
networking
```

Avoid boundaries based only on temporary implementation details.

---

# Refactoring Organization

When a project becomes difficult to navigate, signs include:

```text
Repeated long import paths
Huge files
Generic utility modules
Circular dependencies
Cross-feature mutation
Duplicated code
Unclear ownership
```

Use these signals to reconsider structure.

---

# Do Not Reorganize Without a Problem

Moving 100 files simply to produce a "cleaner" folder tree can create:

```text
Broken imports
Merge conflicts
Unnecessary churn
Harder review
No actual benefit
```

Refactor organization when the current structure creates measurable friction.

---

# Use Git Carefully During Reorganization

Large file moves should be isolated from unrelated functional changes.

A clean sequence can be:

```text
Move files
   ↓
Fix imports
   ↓
Run tests
   ↓
Commit organization change
   ↓
Implement behavior changes separately
```

This makes history easier to understand.

---

# Organize Commits by Intent

Prefer commits such as:

```text
refactor: reorganize user feature
refactor: extract shared API client
docs: update project structure
```

instead of mixing structural and unrelated behavioral changes.

---

# Keep Imports Predictable

A consistent import order can help readability.

Example:

```js id="g8m3x1"
import fs from "node:fs";

import {
  validateUser,
} from "./validation.js";

import {
  saveUser,
} from "./user-service.js";
```

The exact convention can be automated with tooling.

---

# Avoid Deep Relative Imports

Repeated:

```js id="p7m2x4"
../../../utils.js
```

often indicates that:

```text
The folder is too deeply nested
A public module boundary is missing
A path alias could improve clarity
```

Do not add aliases just to hide poor structure.

---

# Module Aliases

A project may configure imports such as:

```js id="n4q8m1"
import {
  getUser
} from
  "@/features/users";
```

This can improve navigation in larger projects.

Use aliases consistently and document them.

---

# Avoid Aliases That Hide Ownership

An alias should simplify navigation:

```js id="t6m2p8"
@/features/users
```

not make it impossible to understand where the module actually lives.

Good aliases should correspond to meaningful project boundaries.

---

# Organize by Stable Public APIs

If a feature exposes:

```js id="q3m8x5"
features/users
```

consumers should ideally not depend on:

```text
features/users/internal/
```

This keeps internal organization flexible.

---

# Internal Directories

An `internal/` directory can communicate:

```text
Do not import this directly from outside the feature.
```

But conventions must be respected by the team and tooling.

It is a boundary signal, not automatic enforcement.

---

# Organize Generated Code Separately

If a tool generates:

```text
generated/
```

keep generated files clearly separated from manually maintained source.

Do not manually edit generated files unless the generation workflow expects it.

---

# Avoid Storing Generated Files Unnecessarily

Generated output can increase:

```text
Repository size
Merge conflicts
Review noise
Maintenance cost
```

Commit it only when the project actually requires version-controlled generated artifacts.

---

# Organize Environment-Specific Files Carefully

Avoid:

```text
src/
  app-production.js
  app-development.js
  app-test.js
```

when configuration can express the differences more cleanly.

Separate files are appropriate when behavior genuinely differs significantly.

---

# Organize Assets by Usage

For example:

```text
assets/
├── icons/
├── images/
└── fonts/
```

or:

```text
features/
└── profile/
    ├── profile.js
    └── profile-assets/
```

Choose based on whether assets are global or feature-specific.

---

# Avoid Duplicate Data Sources

Do not keep the same configuration in:

```text
.env
config.js
constants.js
README
```

without an intentional relationship.

One authoritative source is easier to maintain.

---

# Organize External Integrations

If the application connects to:

```text
Supabase
Stripe
GitHub API
Email provider
Analytics provider
```

keep integration-specific code behind clear module boundaries.

For example:

```text
integrations/
├── supabase/
├── analytics/
└── email/
```

when the application actually has multiple external providers.

---

# Do Not Let Integration Details Spread Everywhere

Prefer:

```js id="x7m4q3"
import {
  createUser
} from "./integrations/users.js";
```

rather than many modules directly constructing provider-specific requests.

This keeps external coupling localized.

---

# Replaceable Dependencies

A clean boundary makes it easier to replace:

```text
HTTP provider
Database
Storage mechanism
Analytics platform
Email service
```

without rewriting unrelated application code.

The goal is not to guarantee replacement.

The goal is to avoid unnecessary coupling.

---

# Organize Tests Around the Same Boundaries

If the application is organized by features:

```text
features/users/
```

tests can follow:

```text
features/users/
  user-service.js
  user-service.test.js
```

The code and its verification stay close.

---

# Organize Test Fixtures

Shared fixtures can live in:

```text
tests/fixtures/
```

but avoid making one huge fixture file.

Split fixtures by meaningful domain when the collection grows.

---

# Avoid Test Utility Dumping Grounds

A file such as:

```text
test-utils.js
```

can grow just like `utils.js`.

Split by responsibility if it becomes difficult to understand.

---

# Organize Mock Implementations

Mocks should communicate what they replace:

```text
mocks/
├── api-client.js
└── storage.js
```

Avoid:

```text
mock1.js
mock2.js
mockFinal.js
```

Naming remains part of organization.

---

# Code Organization and Discoverability

A good repository should allow a developer to answer:

```text
Where does user data come from?
Where is it validated?
Where is it transformed?
Where is it saved?
Where is it rendered?
```

without searching the entire codebase.

---

# Organization as a Navigation System

A repository should act like a map.

For example:

```text
features/users/
```

suggests:

```text
User-related implementation
```

while:

```text
integrations/
```

suggests:

```text
External system boundaries
```

Folder structure should communicate this map.

---

# Do Not Optimize for Folder Symmetry

It is not necessary for every feature to contain:

```text
components/
api/
hooks/
utils/
tests/
constants/
```

If one feature only needs:

```text
users/
└── user-service.js
```

that is enough.

Structure should reflect actual needs.

---

# Avoid Empty Architectural Folders

Do not create:

```text
repositories/
adapters/
factories/
```

before any code actually belongs there.

Empty structure adds noise.

---

# Keep Organizational Rules Documented

Large repositories benefit from a short document describing:

```text
Where features live
Where shared code lives
What can import what
Where tests belong
Where integrations live
```

This makes organizational rules explicit.

---

# Organization and Architecture Are Related but Different

Organization answers:

```text
Where does code live?
```

Architecture answers:

```text
How do responsibilities interact?
```

A beautiful folder tree cannot compensate for poor dependencies.

Likewise, good architecture becomes harder to use if code is impossible to find.

Both matter.

---

# A Practical Layering Model

For many applications:

```text
Presentation
    ↓
Application / Feature Logic
    ↓
Data / API
    ↓
External Systems
```

Not every project needs all layers.

Use only the boundaries that solve real problems.

---

# Keep Pure Logic Portable

If a function does not need:

```text
window
document
fetch
localStorage
React
Node-specific APIs
```

consider keeping it independent of those environments.

For example:

```js id="m4q8x7"
export function calculateTotal(
  items
) {
  return items.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );
}
```

Portable functions are easier to test and reuse.

---

# Browser and Server Boundaries

Avoid importing browser-only APIs into code that may execute on the server.

Likewise, avoid server-only dependencies in client-side modules.

Keep environment-specific responsibilities explicit.

---

# Shared Is Not Universal

A module can be:

```text
Shared
```

without being:

```text
Used by everything
```

Only expose shared modules that have a clear purpose.

---

# Avoid Premature Abstraction Layers

Do not create:

```text
Repository
Service
Manager
Adapter
Facade
Factory
```

for every simple operation.

Start with the smallest useful boundary.

Introduce additional layers when complexity makes them worthwhile.

---

# Refactoring a Monolithic File

Suppose:

```text
user.js
→ 1,500 lines
```

with:

```text
validation
API
formatting
storage
rendering
state management
```

A useful refactoring might be:

```text
users/
├── api.js
├── validation.js
├── formatting.js
├── storage.js
├── rendering.js
└── index.js
```

provided these are genuinely separate responsibilities.

---

# Do Not Split a Monolith Blindly

Before extracting files, identify:

```text
Responsibilities
Dependencies
Shared state
Public API
Lifecycle
```

Then split around stable boundaries.

Otherwise, you may simply create:

```text
Many small files
with many cross-imports
```

which is worse.

---

# Module Cohesion Test

Ask:

```text
Would I explain all functions
in this file as part of one concept?
```

If yes:

```text
The module is probably cohesive.
```

If no:

```text
Consider separating responsibilities.
```

---

# Coupling Test

Ask:

```text
How many unrelated modules
must change when this module changes?
```

High coupling can indicate that:

```text
Responsibilities are leaking
Boundaries are too broad
Shared state is uncontrolled
```

---

# Change Amplification

A poorly organized codebase often exhibits:

```text
One feature change
      ↓
Many unrelated file changes
```

Good organization aims to keep changes localized.

---

# Stable Boundaries Reduce Change Amplification

For example:

```text
Feature
  ↓
Public API
  ↓
Internal implementation
```

If the internal implementation changes:

```text
Consumers
↓
remain unchanged
```

as long as the public contract remains stable.

---

# Code Organization and Reusability

Reusability improves when modules:

```text
Have focused responsibilities
Have explicit inputs
Have predictable outputs
Hide internal details
Avoid unnecessary global state
```

Organization supports these properties.

---

# Code Organization and Testing

Clear boundaries produce better test boundaries.

For example:

```text
validation
→ unit tests

API client
→ integration tests

UI
→ component tests

Full workflow
→ end-to-end tests
```

The structure of the code can help determine the appropriate test scope.

---

# Code Organization and Performance

Organization can affect performance indirectly.

Poor structure can encourage:

```text
Duplicate requests
Duplicate computations
Unnecessary initialization
Large dependency graphs
```

Clear ownership can make resource management easier.

---

# Code Organization and Security

Clear boundaries can also help security:

```text
Credentials
→ Server-only configuration

External APIs
→ Integration module

User input
→ Validation boundary

Authorization
→ Trusted server layer
```

Organization should reinforce security boundaries.

---

# Organization Checklist

Before considering a project structure healthy, ask:

```text
[ ] Can I quickly find the entry point?

[ ] Can I find each feature without searching the whole repository?

[ ] Are related files close together?

[ ] Are unrelated responsibilities separated?

[ ] Are dependencies explicit?

[ ] Are public module APIs clear?

[ ] Are internal details hidden?

[ ] Are shared modules genuinely shared?

[ ] Are generic folders becoming dumping grounds?

[ ] Are there circular dependencies?

[ ] Is folder nesting reasonable?

[ ] Are environment-specific concerns isolated?

[ ] Are external integrations contained?

[ ] Is application state owned clearly?

[ ] Are browser/server boundaries clear?

[ ] Are tests easy to locate?

[ ] Are generated files separated?

[ ] Does every directory exist for a reason?

[ ] Does the structure help developers navigate the code?
```

---

# Recommended Rules for This Reference

The examples and projects in this repository should generally follow these principles:

```text
Start with a simple structure.

Let complexity drive organization.

Group related responsibilities together.

Separate unrelated responsibilities.

Prefer feature boundaries as projects grow.

Keep public APIs small.

Keep implementation details private.

Make dependencies explicit.

Avoid hidden global dependencies.

Avoid circular dependencies.

Avoid generic dumping-ground folders.

Do not create empty architecture.

Avoid one-function-per-file rules.

Avoid unnecessary folder depth.

Keep browser and server concerns separated.

Keep external integrations behind clear boundaries.

Keep application logic separate from infrastructure when useful.

Keep shared code genuinely shared.

Organize around concepts, not temporary implementation details.

Do not reorganize files without a real problem.

Use structure to reduce change amplification.
```

---

# Practical Structure: Small Project

A small JavaScript project may use:

```text
src/
├── main.js
├── api.js
├── storage.js
├── utils.js
└── components/
```

This is enough when the project is small.

---

# Practical Structure: Growing Project

A growing application may use:

```text
src/
├── app/
├── components/
├── features/
│   ├── users/
│   ├── projects/
│   └── authentication/
├── lib/
├── integrations/
└── main.js
```

The feature boundaries provide stronger organization.

---

# Practical Structure: Feature-Oriented

A feature can own its implementation:

```text
features/
└── users/
    ├── api.js
    ├── validation.js
    ├── formatting.js
    ├── components/
    └── index.js
```

This keeps related logic close.

---

# Practical Structure: Shared Infrastructure

Application-wide infrastructure can live separately:

```text
src/
├── features/
├── lib/
│   ├── storage.js
│   ├── api-client.js
│   └── logger.js
└── integrations/
```

Only genuinely shared code should enter these areas.

---

# Avoid Copying Example Structures Blindly

These structures are examples, not rules.

A repository should reflect:

```text
Project size
Feature count
Team size
Runtime
Framework
Testing strategy
Deployment model
```

Choose the smallest structure that remains understandable.

---

# Final Principles

```text
Code organization is a navigation system.

A folder should have a reason to exist.

A file should have a coherent responsibility.

A module should have a clear public API.

Dependencies should be visible.

Ownership should be clear.

Shared code should actually be shared.

Features should stay close together.

Infrastructure should stay near its boundaries.

Folder depth should reflect meaningful separation.

Architecture should grow from real complexity.

Do not reorganize simply for visual neatness.

Optimize for discoverability, change isolation, and clarity.
```

---

# Summary

Good code organization answers three questions quickly:

```text
Where does this code belong?
Who owns this responsibility?
What can depend on it?
```

A practical model is:

```text
Project
   ↓
Feature
   ↓
Module
   ↓
Function
```

with explicit boundaries between:

```text
UI
Application logic
Data
Infrastructure
External systems
```

The strongest organization is not the one with the most folders.

It is the one that makes the repository predictable.

```text
Clear ownership
      +
Cohesive modules
      +
Visible dependencies
      +
Reasonable structure
      =
Discoverable codebase
```
