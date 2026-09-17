# Environment and Configuration

## Overview

Environment and configuration management determines how an application receives values that vary between machines, environments, deployments, and runtime contexts.

Examples include:

* API URLs
* Database connections
* Feature flags
* Runtime modes
* Port numbers
* Logging levels
* External service configuration
* Authentication settings
* Build configuration
* Deployment-specific behavior

Good configuration management should provide:

* Explicit configuration
* Safe defaults
* Clear ownership
* Environment separation
* Validation
* Secure secret handling
* Predictable startup behavior
* Minimal duplication

Configuration is part of application architecture.

Poor configuration practices can create security problems, deployment failures, inconsistent behavior, and difficult debugging.

---

## 1. Separate Code From Environment-Specific Values

Avoid hard-coding environment-specific values directly into application logic.

Weak:

```js
const apiUrl = "https://production.example.com";
```

Better:

```js
const apiUrl = process.env.API_URL;
```

The same application code can then operate in different environments.

---

## 2. Configuration Is Not the Same as Secrets

Configuration may include:

```text
API URL
Port
Feature flag
Environment name
Logging level
```

Secrets include:

```text
API secret
Database password
Private key
Authentication credential
Encryption key
```

Both require careful handling, but secrets require stronger protection.

---

## 3. Never Commit Secrets

Do not commit:

```text
.env
.env.local
.env.production
private-key.pem
credentials.json
```

when they contain secrets.

Use:

```gitignore
.env
.env.local
.env.*.local
```

and provide a safe example file when appropriate.

---

## 4. Use Example Environment Files

A repository can document required variables with a non-secret example:

```text
.env.example
```

Example:

```text
API_URL=
DATABASE_URL=
PUBLIC_APP_NAME=
```

Do not put real credentials into the example file.

---

## 5. Document Required Configuration

Developers should know which values are required.

Example:

```text
Required:
API_URL
DATABASE_URL

Optional:
LOG_LEVEL
FEATURE_NEW_DASHBOARD
```

Configuration should not require reading implementation details to discover required variables.

---

## 6. Validate Configuration at Startup

A missing configuration value should fail clearly.

Weak:

```js
const apiUrl = process.env.API_URL;

fetch(`${apiUrl}/users`);
```

If `API_URL` is missing, the failure may occur much later.

Better:

```js
function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

const apiUrl = requireEnv("API_URL");
```

Fail early when configuration is invalid.

---

## 7. Do Not Silently Accept Missing Required Values

Avoid:

```js
const apiUrl =
  process.env.API_URL ||
  "https://example.com";
```

when the application requires an explicitly configured endpoint.

This can cause the application to connect to the wrong system.

Use defaults only when the default is genuinely safe and intended.

---

## 8. Distinguish Required and Optional Configuration

Required:

```js
const apiUrl = requireEnv("API_URL");
```

Optional:

```js
const logLevel =
  process.env.LOG_LEVEL ?? "info";
```

This distinction should be intentional.

---

## 9. Validate Configuration Types

Environment variables are commonly strings.

```js
const port = process.env.PORT;
```

This is a string, not a number.

Convert explicitly:

```js
const port = Number(
  process.env.PORT ?? "3000"
);

if (!Number.isInteger(port)) {
  throw new Error("Invalid PORT");
}
```

Do not rely on implicit conversion.

---

## 10. Validate Boolean Configuration Carefully

Environment variables do not automatically become booleans.

Weak:

```js
const enabled = Boolean(
  process.env.FEATURE_ENABLED
);
```

Both:

```text
"true"
"false"
```

are non-empty strings and therefore truthy.

Use explicit parsing:

```js
function parseBoolean(value, defaultValue = false) {
  if (value == null) {
    return defaultValue;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  throw new Error("Invalid boolean configuration");
}
```

---

## 11. Validate Enumerated Configuration

If a configuration value has known options:

```js
const allowedLevels = new Set([
  "debug",
  "info",
  "warn",
  "error"
]);

const logLevel =
  process.env.LOG_LEVEL ?? "info";

if (!allowedLevels.has(logLevel)) {
  throw new Error(
    `Invalid LOG_LEVEL: ${logLevel}`
  );
}
```

Reject unsupported values early.

---

## 12. Centralize Configuration

Avoid reading environment variables throughout the entire application.

Weak:

```js
process.env.API_URL;
process.env.API_URL;
process.env.API_URL;
process.env.LOG_LEVEL;
process.env.LOG_LEVEL;
```

Prefer:

```js
const config = {
  apiUrl: requireEnv("API_URL"),
  logLevel: process.env.LOG_LEVEL ?? "info"
};

export default config;
```

Application code can depend on a stable configuration interface.

---

## 13. Keep Configuration Access Explicit

Prefer:

```js
import config from "./config.js";

fetch(`${config.apiUrl}/users`);
```

over:

```js
fetch(
  `${process.env.API_URL}/users`
);
```

throughout dozens of files.

Centralization makes configuration easier to validate and change.

---

## 14. Avoid Global Configuration Mutation

Weak:

```js
config.apiUrl = "https://other.example.com";
```

after application startup.

Configuration should generally be treated as immutable:

```js
const config = Object.freeze({
  apiUrl: requireEnv("API_URL")
});
```

Changing configuration dynamically should be an intentional design decision.

---

## 15. Freeze Configuration When Appropriate

Example:

```js
const config = Object.freeze({
  apiUrl: requireEnv("API_URL"),
  environment: process.env.NODE_ENV ?? "development"
});

export default config;
```

This prevents accidental mutation.

---

## 16. Separate Build-Time and Runtime Configuration

Some values are embedded into a build:

```text
Build time
↓
Application bundle
```

Others are read when the application starts:

```text
Application starts
↓
Runtime configuration
```

Do not assume these mechanisms are interchangeable.

The exact behavior depends on the runtime and framework.

---

## 17. Public Client Configuration Is Not Secret

Any value exposed to browser JavaScript should be considered public.

Example:

```js
const publicApiUrl = process.env.PUBLIC_API_URL;
```

This may be safe if the value is intentionally public.

A secret is not safe merely because it comes from an environment variable.

---

## 18. Environment Variables Are Not a Security Boundary

This is unsafe:

```js
const secret = process.env.SECRET;
```

if the code runs in the browser and exposes `secret` to client-side code.

Environment variables protect values only when the surrounding architecture keeps them on trusted systems.

---

## 19. Keep Server Secrets on the Server

Example:

```js
const databaseUrl =
  requireEnv("DATABASE_URL");
```

This should remain in trusted server-side code.

Do not send it to browser clients.

---

## 20. Separate Public and Private Configuration

A configuration model can make the distinction explicit:

```js
const config = {
  public: {
    apiUrl: requireEnv("PUBLIC_API_URL")
  },

  server: {
    databaseUrl: requireEnv("DATABASE_URL"),
    apiSecret: requireEnv("API_SECRET")
  }
};
```

Do not serialize private configuration into client-visible data.

---

## 21. Do Not Expose Entire Environment Objects

Avoid:

```js
return process.env;
```

or:

```js
window.__CONFIG__ = process.env;
```

This risks exposing secrets and unrelated configuration.

Expose only the values intentionally required by the client.

---

## 22. Use Least Privilege for Configuration

A component should receive only the configuration it needs.

Instead of:

```js
createUserService({
  ...entireConfig
});
```

prefer:

```js
createUserService({
  database: config.database
});
```

or:

```js
createApiClient({
  baseUrl: config.apiUrl
});
```

Smaller configuration surfaces reduce accidental dependencies.

---

## 23. Configuration Should Have Clear Ownership

Ask:

> Which part of the application owns this setting?

For example:

```text
Database configuration
→ infrastructure

UI theme preference
→ UI state

API endpoint
→ application configuration

Business rule
→ domain logic
```

Not every constant belongs in a global configuration file.

---

## 24. Do Not Put Business Logic in Environment Variables

Avoid:

```text
MAX_DISCOUNT=25
```

if `25` represents an important business rule that should be version-controlled and reviewed as code or domain configuration.

Environment variables are useful for deployment-specific values.

Business rules should not become invisible configuration.

---

## 25. Configuration vs Constants

A constant can be part of the application:

```js
const MAX_RETRIES = 3;
```

Configuration varies by environment:

```js
const apiUrl = requireEnv("API_URL");
```

Do not move every constant into `.env`.

That makes normal application behavior harder to understand.

---

## 26. Keep Configuration Close to Its Domain

Avoid a giant:

```text
config.js
```

containing unrelated settings.

A growing application may separate:

```text
config/
├── app.js
├── database.js
├── api.js
├── auth.js
└── logging.js
```

The exact structure should match actual complexity.

---

## 27. Avoid Configuration Folder Explosion

Do not create:

```text
config/
├── tiny-feature-a.js
├── tiny-feature-b.js
├── tiny-feature-c.js
├── tiny-feature-d.js
├── tiny-feature-e.js
```

before the application has enough complexity to justify it.

Start simple.

Split configuration when the boundaries become meaningful.

---

## 28. Use Names That Describe Configuration Meaning

Weak:

```js
const config1 = "...";
const value2 = "...";
```

Better:

```js
const apiBaseUrl = "...";
const requestTimeoutMs = 5000;
```

Configuration names should describe what the value means.

---

## 29. Include Units in Configuration Names When Useful

Avoid:

```js
const timeout = 5000;
```

Prefer:

```js
const requestTimeoutMs = 5000;
```

or:

```js
const requestTimeoutSeconds = 5;
```

This prevents unit confusion.

---

## 30. Use Explicit Time Conversion

If the environment contains:

```text
REQUEST_TIMEOUT_SECONDS=5
```

convert deliberately:

```js
const timeoutMs =
  Number(process.env.REQUEST_TIMEOUT_SECONDS) *
  1000;
```

Do not assume all consumers understand the same unit.

---

## 31. Validate URLs

Do not accept arbitrary URL strings without validation.

```js
function parseUrl(value, name) {
  try {
    return new URL(value);
  } catch {
    throw new Error(
      `Invalid URL configuration: ${name}`
    );
  }
}

const apiUrl = parseUrl(
  requireEnv("API_URL"),
  "API_URL"
);
```

URL validation catches deployment mistakes early.

---

## 32. Validate Origins Separately From URLs

An application may require an origin rather than an arbitrary URL.

Example:

```js
const url = new URL(
  requireEnv("APP_ORIGIN")
);

if (!["https:", "http:"].includes(url.protocol)) {
  throw new Error(
    "Invalid application origin"
  );
}
```

The exact allowed protocols depend on the environment.

---

## 33. Do Not Blindly Trust Configuration

Environment variables can be:

* Missing
* Empty
* Malformed
* Stale
* Wrong for the environment
* Typoed
* Incompatible with the application version

Configuration should be treated as external input at startup.

---

## 34. Validate Configuration Once

Avoid repeatedly validating the same environment variable throughout the application.

Prefer:

```js
const config = loadConfig();
```

where validation happens once.

Then:

```js
config.apiUrl;
```

provides the validated value.

---

## 35. Fail Fast During Application Startup

If the application cannot run without:

```text
DATABASE_URL
API_SECRET
```

fail during startup.

Do not allow the server to start successfully and fail later when the first user sends a request.

---

## 36. Make Configuration Errors Actionable

Weak:

```text
Configuration invalid
```

Better:

```text
Missing required environment variable: DATABASE_URL
```

Even better when appropriate:

```text
Missing required environment variable: DATABASE_URL.
See .env.example for required configuration.
```

Useful errors reduce deployment debugging time.

---

## 37. Do Not Include Secret Values in Errors

Good:

```text
Missing required environment variable: API_SECRET
```

Bad:

```text
API_SECRET contains: super-secret-value
```

Configuration errors should identify the variable, not reveal its contents.

---

## 38. Avoid Logging the Complete Configuration

Do not use:

```js
console.log(config);
```

if it contains secrets or sensitive infrastructure information.

Instead log safe metadata:

```js
console.log({
  environment: config.environment,
  apiConfigured: Boolean(config.apiUrl)
});
```

---

## 39. Development and Production Configuration

Different environments may legitimately use different values:

```text
Development
→ local services

Test
→ isolated test services

Staging
→ staging infrastructure

Production
→ production infrastructure
```

Do not accidentally connect development tools to production systems.

---

## 40. Separate Environment Data Sources

A useful pattern is:

```text
Code
↓
Configuration loader
↓
Environment-specific values
```

Application code should not need to know whether a value came from:

```text
Environment variable
Secret manager
Deployment platform
Configuration file
Command-line argument
```

when those differences are infrastructure concerns.

---

## 41. Environment Names Should Be Explicit

A common value is:

```js
const environment =
  process.env.NODE_ENV;
```

Application code may distinguish:

```text
development
test
production
```

Avoid inventing dozens of subtly different modes unless required.

---

## 42. Do Not Use Environment Names as Business Logic

Avoid:

```js
if (environment === "production") {
  allowDelete();
} else {
  allowDelete();
}
```

Environment should control deployment behavior, not replace authorization.

Security and business rules should remain explicit.

---

## 43. Avoid Environment-Specific Code Paths When Possible

Weak:

```js
if (process.env.NODE_ENV === "production") {
  useOneImplementation();
} else {
  useAnotherImplementation();
}
```

This can create two applications that behave differently.

Prefer configuration:

```js
createService({
  endpoint: config.serviceEndpoint
});
```

when the behavior itself is otherwise identical.

---

## 44. Environment-Specific Behavior Should Be Intentional

Some differences are legitimate:

```text
Development logging
Production caching
Test database
Development mock service
```

Document meaningful differences.

Do not let them accumulate accidentally.

---

## 45. Test Configuration Loading

Configuration code should be tested.

Examples:

```text
Missing required variable
Invalid URL
Invalid number
Invalid boolean
Unsupported enum
Valid configuration
```

This catches deployment failures before production.

---

## 46. Example Configuration Test

```js
function loadConfig(env) {
  if (!env.API_URL) {
    throw new Error("Missing API_URL");
  }

  return {
    apiUrl: new URL(env.API_URL)
  };
}
```

Test:

```js
const config = loadConfig({
  API_URL: "https://example.com"
});

console.assert(
  config.apiUrl.origin ===
  "https://example.com"
);
```

Configuration loading should be testable independently.

---

## 47. Dependency Injection for Configuration

Instead of reading environment variables inside every service:

```js
function createUserService() {
  const apiUrl = process.env.API_URL;

  return {
    // ...
  };
}
```

Inject validated configuration:

```js
function createUserService({
  apiUrl
}) {
  return {
    // ...
  };
}
```

This improves testability and reduces hidden dependencies.

---

## 48. Configuration Objects Should Be Stable

Consumers should ideally depend on:

```js
config.api.baseUrl
```

rather than directly on:

```js
process.env.API_URL
```

A stable interface makes the underlying configuration source replaceable.

---

## 49. Configuration Schemas

For larger projects, define a schema for configuration.

Conceptually:

```text
API_URL → required URL
PORT → integer
LOG_LEVEL → enum
FEATURE_X → boolean
```

A schema can centralize:

* Validation
* Defaults
* Types
* Error messages
* Documentation

Use a schema library when the project complexity justifies it.

---

## 50. Do Not Add Schema Libraries Automatically

For a small application:

```js
function requireEnv(name) {
  ...
}
```

may be enough.

A full configuration framework is useful only when the complexity warrants it.

Avoid introducing dependencies merely for theoretical completeness.

---

## 51. Configuration Defaults

Defaults should be:

* Safe
* Documented
* Predictable
* Appropriate for the environment

Example:

```js
const port = Number(
  process.env.PORT ?? "3000"
);
```

A default is acceptable when `3000` is genuinely the intended fallback.

---

## 52. Avoid Unsafe Defaults

Do not use:

```js
const databaseUrl =
  process.env.DATABASE_URL ??
  "production-database-url";
```

A missing variable should never silently connect a development environment to production.

---

## 53. Safe Development Defaults

Development defaults may be appropriate:

```js
const port = Number(
  process.env.PORT ?? "3000"
);

const logLevel =
  process.env.LOG_LEVEL ?? "debug";
```

Make sure the defaults are clearly development-safe.

---

## 54. Make Production Requirements Stricter

Production environments may require:

```text
HTTPS
Database URL
Authentication secrets
Trusted origins
Secure cookies
Strict logging policy
```

Do not assume development defaults remain appropriate in production.

---

## 55. Validate Production-Only Requirements

Example:

```js
if (
  config.environment === "production" &&
  !config.apiSecret
) {
  throw new Error(
    "API_SECRET is required in production"
  );
}
```

Environment-specific validation should be explicit.

---

## 56. Avoid Using `NODE_ENV` for Everything

`NODE_ENV` is useful for broad environment distinctions.

It should not become a general-purpose feature flag:

```js
if (process.env.NODE_ENV === "production") {
  enableFeature();
}
```

Use dedicated configuration for independent behavior:

```js
const featureEnabled =
  parseBoolean(
    process.env.FEATURE_ENABLED
  );
```

---

## 57. Feature Flags

Feature flags control behavior independently from deployment environment.

Example:

```js
const newDashboardEnabled =
  parseBoolean(
    process.env.NEW_DASHBOARD_ENABLED
  );
```

Use them for controlled rollout when appropriate.

---

## 58. Feature Flags Need Ownership

Each flag should have:

* Name
* Purpose
* Owner
* Expected lifetime
* Default behavior
* Removal plan

Otherwise temporary flags become permanent complexity.

---

## 59. Remove Stale Feature Flags

Avoid:

```js
if (featureFlags.newDashboard) {
  // New implementation.
} else {
  // Legacy implementation.
}
```

remaining for years after the new implementation becomes standard.

Remove obsolete flags and dead branches.

---

## 60. Avoid Boolean Flag Explosion

A component with:

```js
{
  newHeader,
  compactMode,
  newSearch,
  betaFilters,
  experimentalCards,
  alternateLayout,
  newNavigation
}
```

can become difficult to reason about.

Too many interacting flags create a large behavior matrix.

Prefer simpler rollout strategies when possible.

---

## 61. Feature Flag Combinations

If there are:

```text
3 boolean flags
```

there can already be:

```text
8 combinations
```

With more flags, combinations grow rapidly.

Testing must account for meaningful combinations.

---

## 62. Use Feature Flags for Deployment Concerns, Not Core Domain Rules

A feature flag may control:

```text
New dashboard
Experimental search
Gradual rollout
```

It should not become:

```text
if flag then user.canDelete
```

for permanent authorization logic.

---

## 63. Configuration Precedence

Some systems combine multiple sources:

```text
Default
↓
Configuration file
↓
Environment variable
↓
Command-line argument
```

Define precedence clearly.

A developer should know which value wins when multiple sources provide the same setting.

---

## 64. Avoid Ambiguous Configuration Precedence

If:

```text
config.json → API_URL = A
.env → API_URL = B
```

the system should have a documented rule.

Hidden precedence creates deployment confusion.

---

## 65. Configuration Immutability

Once startup configuration has been loaded:

```js
const config = Object.freeze(
  loadConfig()
);
```

Treat it as immutable.

Dynamic configuration should use a deliberately designed mechanism.

---

## 66. Runtime Configuration Changes

If configuration must change without restarting:

```text
Admin updates setting
↓
Configuration service
↓
Application refreshes
```

This introduces concurrency and consistency concerns.

Do not implement runtime configuration mutation accidentally.

---

## 67. Configuration and Caching

Configuration may itself be cached.

If configuration changes dynamically, determine:

```text
Cache lifetime
Refresh mechanism
Consistency model
Fallback behavior
```

Otherwise different application instances may use different values unexpectedly.

---

## 68. Configuration Across Multiple Instances

In distributed systems:

```text
Instance A → config version 5
Instance B → config version 4
Instance C → config version 5
```

can create inconsistent behavior.

For critical configuration, use centralized configuration management or controlled deployment processes.

---

## 69. Configuration Versioning

For important configuration structures, track versions.

Example:

```js
const configVersion = 3;
```

This can help diagnose incompatible application/configuration combinations.

Do not add versions where they provide no practical value.

---

## 70. Database Configuration

Database configuration often includes:

```text
Host
Port
Database name
Username
Password
SSL settings
Pool limits
Timeouts
```

Keep credentials secure.

Validate connectivity during startup or health checks as appropriate.

---

## 71. Do Not Hard-Code Database Credentials

Never:

```js
const password = "database-password";
```

Use a secure configuration source.

```js
const password =
  requireEnv("DATABASE_PASSWORD");
```

---

## 72. Database Connection Strings

A connection string may contain sensitive credentials.

Do not log it:

```js
console.log(process.env.DATABASE_URL);
```

If diagnostic output is needed, log safe metadata:

```js
console.log({
  databaseConfigured:
    Boolean(process.env.DATABASE_URL)
});
```

---

## 73. Database Pool Configuration

Database pools may need settings such as:

```text
Maximum connections
Idle timeout
Connection timeout
```

Use explicit units:

```js
const connectionTimeoutMs = 5000;
```

Validate values before creating the pool.

---

## 74. External Service Configuration

External APIs may require:

```text
Base URL
API key
Timeout
Retry policy
Version
```

Keep these in one coherent configuration boundary.

---

## 75. Do Not Mix Credentials With Public API URLs

For example:

```js
const service = {
  baseUrl: config.public.serviceUrl,
  apiKey: config.server.apiKey
};
```

Keep public and private configuration separate.

---

## 76. Configuration and Logging

Logging configuration should support levels such as:

```text
debug
info
warn
error
```

Avoid exposing sensitive information merely because debug mode is enabled.

---

## 77. Development Logging Should Not Become Production Logging

Debug logs may contain:

```text
Request payload
State transitions
Detailed stack traces
Timing information
```

Review logging before production.

Production logs should be useful without exposing unnecessary sensitive data.

---

## 78. Configuration for Error Reporting

External error reporting services may require:

```text
DSN
Endpoint
Environment
Release version
```

Treat credentials according to whether they are public or secret in the specific service architecture.

---

## 79. Avoid Sending Sensitive Configuration to Error Reporting

Do not attach:

```js
error.context = process.env;
```

Instead:

```js
error.context = {
  environment: config.environment,
  release: config.release
};
```

Send only useful, non-sensitive diagnostics.

---

## 80. Configuration and Deployment

A deployment should explicitly provide required configuration.

Example:

```text
Build
↓
Validate configuration
↓
Deploy
↓
Start application
↓
Run health checks
```

Do not discover missing variables only after a user triggers an endpoint.

---

## 81. Health Checks

A health endpoint may verify whether the application is operational.

Example:

```text
GET /health
```

A readiness check may be more specific:

```text
GET /ready
```

The exact design depends on the deployment system.

---

## 82. Do Not Expose Secrets Through Health Checks

Avoid:

```js
return {
  databaseUrl: process.env.DATABASE_URL
};
```

Health checks should expose only safe status information.

---

## 83. Readiness vs Liveness

Liveness asks:

> Is the process alive?

Readiness asks:

> Can this instance receive traffic?

These are different concepts.

An application can be alive but not ready because a required dependency is unavailable.

---

## 84. Configuration Validation vs Dependency Health

This:

```text
API_URL exists
```

does not prove:

```text
API is reachable
```

Likewise:

```text
DATABASE_URL exists
```

does not prove:

```text
Database connection works
```

Configuration validation and dependency health checks are different concerns.

---

## 85. Test Deployment Configuration

Where possible, test deployment configuration before production.

Checks can include:

```text
Required variables present
Valid URLs
Valid ports
Correct environment
Correct feature flags
Expected service connectivity
```

---

## 86. Avoid Environment Drift

Environment drift occurs when:

```text
Development ≠ Staging ≠ Production
```

in unexpected ways.

Reduce drift by using:

* Reproducible configuration
* Infrastructure as code where appropriate
* Versioned deployment configuration
* Shared defaults
* Automated validation

---

## 87. Configuration as Code

Configuration can be version-controlled when it is not secret.

Example:

```js
const defaultConfig = {
  requestTimeoutMs: 5000,
  maxRetries: 3
};
```

Environment-specific secrets should remain outside source control.

---

## 88. Do Not Store Secret Configuration in Git History

Removing a secret from the latest commit does not necessarily remove it from Git history.

If a secret has been committed:

1. Revoke or rotate it.
2. Remove it from active configuration.
3. Clean repository history if required.
4. Verify it is no longer used.

Treat leaked secrets as compromised.

---

## 89. Secret Rotation

Applications should not assume secrets are permanent.

Design authentication credentials so they can be rotated without unnecessary downtime when practical.

Configuration should support replacement of secrets.

---

## 90. Avoid Naming Secrets Inconsistently

Choose clear names:

```text
DATABASE_URL
API_SECRET
AUTH_SECRET
```

instead of:

```text
DB1
SECRET2
KEYX
```

Clear naming reduces deployment mistakes.

---

## 91. Prefix Public Configuration Clearly

Some frameworks distinguish client-exposed variables through naming conventions.

Use the framework's intended convention consistently.

For example:

```text
PUBLIC_API_URL
```

can communicate that a value is intended for client exposure.

The exact prefix depends on the framework.

---

## 92. Never Assume a Public Prefix Makes a Secret Safe

This:

```text
PUBLIC_API_SECRET
```

would still be public if the framework exposes it to browser code.

Naming conventions communicate intent.

They do not provide cryptographic protection.

---

## 93. Avoid Environment Variables for Large Structured Data

Environment variables are not always appropriate for large configuration objects.

Avoid:

```text
LARGE_JSON_CONFIG={...huge object...}
```

unless there is a strong reason.

Consider structured configuration files or dedicated configuration systems.

---

## 94. Parse Structured Configuration Carefully

If JSON must be provided through an environment variable:

```js
const config = JSON.parse(
  process.env.APP_CONFIG
);
```

handle malformed JSON:

```js
function parseJsonConfig(value) {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(
      "APP_CONFIG contains invalid JSON"
    );
  }
}
```

---

## 95. Avoid Nested Configuration Without Need

Do not turn every setting into a deeply nested structure:

```js
config.application.runtime.network.client.options.timeout.value
```

Prefer:

```js
config.network.requestTimeoutMs
```

Configuration should remain easy to understand.

---

## 96. Use Configuration Names That Match the Domain

Good:

```js
config.upload.maxFileSizeMb
```

Less clear:

```js
config.files.limit1
```

Configuration should communicate domain meaning.

---

## 97. Configuration Should Not Replace Dependency Injection

Avoid making every module read global environment variables.

Prefer injecting validated values:

```js
function createApiClient({
  baseUrl,
  timeoutMs
}) {
  // ...
}
```

This makes dependencies explicit.

---

## 98. Test With Different Configurations

A service may behave differently under:

```text
Short timeout
Long timeout
Feature enabled
Feature disabled
Development endpoint
Test endpoint
```

Important configuration-dependent behavior should have tests.

---

## 99. Avoid Branch Explosion From Configuration

Too many configurations can produce many code paths.

Example:

```js
if (config.a) {
  if (config.b) {
    if (config.c) {
      // ...
    }
  }
}
```

If configuration combinations become difficult to reason about, simplify the design.

---

## 100. Prefer Configuration With Stable Semantics

Good:

```text
REQUEST_TIMEOUT_MS
```

Unclear:

```text
MODE=fast
```

unless "fast" has a precisely defined behavior.

Configuration should describe stable concepts rather than vague adjectives.

---

## 101. Configuration Documentation

Document:

```text
Name
Purpose
Required/optional
Type
Allowed values
Default
Environment scope
Secret/public status
```

Example:

```text
API_URL
Type: URL
Required: Yes
Public: Yes
Purpose: Base URL for API requests
```

---

## 102. Use `.env.example` as Documentation

Example:

```text
API_URL=
DATABASE_URL=
LOG_LEVEL=info
REQUEST_TIMEOUT_MS=5000
```

Do not put secrets into examples.

---

## 103. Keep Example Configuration Updated

When adding a required environment variable:

```text
Application
+
.env.example
+
Documentation
+
Deployment configuration
```

should remain synchronized.

Missing documentation is a common deployment problem.

---

## 104. Configuration Drift Between Code and Documentation

If code requires:

```text
API_URL
DATABASE_URL
```

but the documentation only lists:

```text
API_URL
```

developers may incorrectly configure the application.

Treat configuration documentation as part of the feature.

---

## 105. Configuration and Monorepos

In larger repositories, different applications may need different configuration.

Avoid assuming:

```text
ROOT_API_URL
```

must be shared by every package.

Use package-specific configuration when appropriate.

---

## 106. Avoid Global Environment Variable Collisions

In a monorepo:

```text
API_URL
```

may mean different things to different applications.

Use clear naming or scoped configuration.

For example:

```text
WEB_PUBLIC_API_URL
WORKER_API_URL
```

when the distinction is meaningful.

---

## 107. Configuration Loading Order

A reliable application should have a predictable configuration-loading sequence:

```text
Load defaults
↓
Load environment-specific values
↓
Load environment variables
↓
Validate
↓
Normalize
↓
Freeze
↓
Expose configuration
```

The exact steps may vary.

The important principle is deterministic configuration resolution.

---

## 108. Normalize Configuration Once

For example:

```js
const config = {
  port: Number(
    process.env.PORT ?? "3000"
  ),
  apiUrl: new URL(
    requireEnv("API_URL")
  ),
  debug:
    process.env.DEBUG === "true"
};
```

Consumers receive normalized values rather than repeating parsing logic.

---

## 109. Avoid Re-Parsing Environment Variables

Weak:

```js
Number(process.env.PORT)
Number(process.env.PORT)
Number(process.env.PORT)
```

Prefer:

```js
config.port
```

The parser exists in one place.

---

## 110. Avoid Runtime Environment Logic Scattered Everywhere

Weak:

```js
if (process.env.NODE_ENV === "production") {
  // ...
}

if (process.env.NODE_ENV === "production") {
  // ...
}

if (process.env.NODE_ENV === "production") {
  // ...
}
```

Prefer:

```js
if (config.production) {
  // ...
}
```

or better, design the service so the environment difference is expressed through explicit configuration.

---

## 111. Configuration and Dependency Boundaries

A useful architecture is:

```text
Environment
    ↓
Configuration Loader
    ↓
Validated Config
    ↓
Application Services
```

Only the configuration boundary needs to understand the environment source.

---

## 112. Do Not Make Configuration Mutable Through Arbitrary Modules

Avoid:

```js
import config from "./config.js";

config.apiUrl = "other-url";
```

Configuration should have one source of truth.

---

## 113. Configuration and Testing Isolation

Tests should not accidentally consume production configuration.

Use:

```text
TEST_DATABASE_URL
TEST_API_URL
```

or a dedicated test configuration.

Always verify which environment the tests are using.

---

## 114. Protect Test Environments

A test that accidentally connects to production can:

* Delete data
* Modify records
* Send emails
* Trigger payments
* Consume production resources

Test configuration should make accidental production access difficult.

---

## 115. Use Explicit Test Configuration

Example:

```js
const config = loadConfig({
  API_URL: "http://localhost:3000",
  DATABASE_URL: "postgres://test"
});
```

Inject configuration into the application rather than relying entirely on developer machines.

---

## 116. Avoid Developer-Machine Dependencies

Do not assume:

```text
C:\Users\Developer\service
```

exists on every machine.

Use configuration or project-relative paths.

---

## 117. Configuration for File Paths

Use platform-aware path utilities where necessary.

```js
import path from "node:path";

const dataPath = path.resolve(
  config.dataDirectory,
  "users.json"
);
```

Do not manually concatenate path separators.

---

## 118. Configuration for Ports

Validate:

```js
function parsePort(value) {
  const port = Number(value);

  if (
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error("Invalid port");
  }

  return port;
}
```

This prevents confusing startup failures.

---

## 119. Configuration for URLs and Hosts

Do not confuse:

```text
http://example.com
```

with:

```text
example.com
```

when the application expects a complete URL.

Normalize the required format.

---

## 120. Configuration for Time Zones

If an application depends on a specific timezone, make that dependency explicit:

```js
const timeZone =
  process.env.TIME_ZONE ?? "UTC";
```

Do not silently depend on the machine's local timezone when the business domain requires a specific one.

---

## 121. Configuration for Locales

Similarly:

```js
const locale =
  process.env.LOCALE ?? "en-US";
```

Use explicit locale configuration when reproducibility matters.

---

## 122. Tests Should Not Depend on Machine Locale

A test such as:

```js
const result = new Intl.DateTimeFormat().format(date);
```

can differ across machines.

Use explicit locale:

```js
const result =
  new Intl.DateTimeFormat("en-US")
    .format(date);
```

Configuration should help make behavior deterministic.

---

## 123. Configuration and Reproducibility

A developer should ideally be able to recreate the same application behavior with:

```text
Source version
+
Dependencies
+
Configuration
```

Unknown environment assumptions reduce reproducibility.

---

## 124. Configuration and Build Reproducibility

A build should clearly depend on:

```text
Source
Dependencies
Build configuration
Environment
```

Unexpected machine-specific values can create "works on my machine" problems.

---

## 125. Pin Important Tooling When Appropriate

Package manifests and lockfiles help keep dependency versions reproducible.

Do not casually delete lockfiles from application repositories.

The exact strategy depends on the package manager and repository type.

---

## 126. Configuration and Dependency Versions

A configuration value may become invalid after an upgrade.

Examples:

```text
Deprecated API URL
Removed feature flag
Changed authentication option
Changed database parameter
```

Review configuration during dependency upgrades.

---

## 127. Configuration Migration

When a configuration name changes:

```text
OLD_API_URL
```

to:

```text
API_URL
```

handle migration intentionally.

Avoid silently supporting old and new names forever.

---

## 128. Avoid Ambiguous Fallback Between Old and New Variables

Weak:

```js
const apiUrl =
  process.env.API_URL ??
  process.env.OLD_API_URL;
```

This may hide incomplete migrations.

Temporary compatibility can be appropriate, but it should have a removal plan.

---

## 129. Configuration Deprecation

If a configuration variable is being retired:

```text
OLD_OPTION
```

document:

```text
Deprecated
Replacement: NEW_OPTION
Removal target: future release
```

Then remove it deliberately.

---

## 130. Configuration and Backward Compatibility

Configuration changes can break deployments even when application code remains compatible.

Treat configuration schemas as interfaces.

---

## 131. Secret Managers

For production secrets, use an appropriate secret management system when available.

A secret manager can provide:

* Access control
* Rotation
* Auditing
* Centralized storage
* Reduced exposure

The exact tool depends on the infrastructure.

---

## 132. Do Not Build a Homemade Secret Manager

Avoid storing secrets in:

```text
Custom database table
Plain JSON file
Git repository
Shared spreadsheet
Source code
```

unless the system is specifically designed as a secure secrets service.

Use established infrastructure.

---

## 133. Limit Access to Secrets

Not every process needs every secret.

For example:

```text
Frontend process
→ no database password

Background worker
→ queue credentials

API server
→ database credentials
```

Least privilege reduces impact if one component is compromised.

---

## 134. Rotate Compromised Secrets Immediately

If a secret is exposed:

```text
1. Revoke or rotate it.
2. Update deployments.
3. Remove exposed copies.
4. Investigate access.
5. Review how exposure occurred.
```

Do not assume deleting the visible copy is sufficient.

---

## 135. Configuration Auditing

For important production configuration, maintain enough information to answer:

```text
What changed?
When?
Why?
Who changed it?
Which deployment used it?
```

Configuration changes can affect application behavior just like code changes.

---

## 136. Avoid Configuration Changes Without Review

Changing:

```text
Database URL
Authentication policy
CORS origin
Rate limit
Feature flag
```

can materially change application behavior.

Treat important configuration changes with similar care to code changes.

---

## 137. Configuration and Rollbacks

A code rollback may not be sufficient if configuration also changed.

Consider:

```text
Code version
Configuration version
Database schema version
```

when planning rollback procedures.

---

## 138. Backward-Compatible Configuration Changes

When possible, deploy systems in a sequence that remains compatible during transition.

For example:

```text
1. Add support for new configuration.
2. Deploy.
3. Update configuration.
4. Verify.
5. Remove old compatibility.
```

Avoid changing both code and configuration incompatibly at the same moment when a safer migration is possible.

---

## 139. Configuration and Observability

Useful safe diagnostics include:

```js
console.log({
  environment: config.environment,
  apiConfigured: Boolean(config.apiUrl),
  featureEnabled: config.features.newDashboard
});
```

Do not include secrets.

---

## 140. Never Log Raw Environment Files

Avoid commands or code that dump:

```text
.env
```

contents into shared logs or terminals.

Configuration debugging should reveal metadata, not credentials.

---

## 141. Configuration and Client Builds

When building browser applications, inspect the resulting bundle if necessary.

If a supposed secret appears in client code, it is not secret.

The important security question is:

> Can a client obtain this value?

If yes, treat it as public.

---

## 142. Avoid Environment Variables as an Access-Control Mechanism

This:

```js
if (process.env.ALLOW_ADMIN === "true") {
  // ...
}
```

does not replace user-level authorization.

Deployment configuration and authorization solve different problems.

---

## 143. Environment-Specific Feature Defaults

Development might enable:

```text
DEBUG_FEATURE=true
```

Production might disable it.

Make defaults explicit:

```js
const debugFeature =
  parseBoolean(
    process.env.DEBUG_FEATURE,
    false
  );
```

Do not rely on accidental missing values.

---

## 144. Do Not Make Missing Configuration Mean Different Things Everywhere

Weak:

```js
process.env.FEATURE
```

in one place means `false`.

Elsewhere it means `undefined`.

Elsewhere it triggers a fallback.

Define one normalized representation:

```js
config.features.example
```

---

## 145. Configuration Errors Should Be Tested in CI

CI should fail if required configuration is unavailable where appropriate.

This prevents broken deployments from reaching production.

---

## 146. Do Not Put Local Developer Preferences Into Shared Production Configuration

Examples:

```text
LOCAL_EDITOR
LOCAL_THEME
LOCAL_PORT
LOCAL_PATH
```

should not affect production behavior unless they represent genuine application configuration.

---

## 147. Local Development Configuration

A developer may need:

```text
API_URL=http://localhost:3000
LOG_LEVEL=debug
```

Keep local-only values local.

Do not commit developer-specific configuration accidentally.

---

## 148. Document Local Setup Clearly

A project should explain:

```text
1. Copy .env.example to .env.local.
2. Fill required variables.
3. Start the application.
```

The exact commands depend on the project.

The goal is predictable onboarding.

---

## 149. Configuration Checklist for New Features

When adding a configuration value:

* [ ] Define a clear name.
* [ ] Decide whether it is required or optional.
* [ ] Decide whether it is public or private.
* [ ] Add validation.
* [ ] Add a safe default if appropriate.
* [ ] Add it to `.env.example`.
* [ ] Document its purpose.
* [ ] Update deployment configuration.
* [ ] Add tests.
* [ ] Verify it is not exposed to clients accidentally.
* [ ] Decide whether it requires versioning or migration.
* [ ] Remove old configuration when no longer needed.

---

## 150. Configuration Review Checklist

Before production:

* [ ] Required configuration exists.
* [ ] Values have been validated.
* [ ] URLs are correct.
* [ ] Ports are valid.
* [ ] Timeouts use explicit units.
* [ ] Environment is correct.
* [ ] Public and private configuration are separated.
* [ ] Secrets are stored securely.
* [ ] No secrets are committed.
* [ ] No secrets are logged.
* [ ] Production does not use development endpoints.
* [ ] Test environments cannot accidentally target production.
* [ ] Feature flags have intended values.
* [ ] Deprecated variables are removed or intentionally supported.
* [ ] Configuration documentation is current.
* [ ] Health checks do not reveal sensitive information.
* [ ] Configuration changes are traceable.
* [ ] Rollback implications have been considered.

---

## 151. Practical Configuration Decision Framework

When adding a new setting, ask:

### Does this value actually vary by environment?

If not, it may belong in normal application code.

### Is it a secret?

If yes, use secure secret management and keep it server-side where appropriate.

### Should the browser see it?

If yes, treat it as public.

### Is it required?

If yes, validate it at startup.

### Is there a safe default?

If yes, document the default.

If no, fail fast.

### What type is it?

String, number, boolean, URL, enum, or structured object?

Parse and validate explicitly.

### Who owns it?

Application, infrastructure, feature, database, or deployment system?

### How is it tested?

Test valid, missing, and invalid values.

### How is it deployed?

Make sure deployment configuration provides it.

### How will it evolve?

Consider migration, compatibility, and removal.

---

## 152. Final Principles

1. Treat configuration as part of the application contract.
2. Separate application code from environment-specific values.
3. Distinguish configuration from secrets.
4. Never commit secrets.
5. Never assume environment variables are secret.
6. Validate required configuration early.
7. Fail fast when required configuration is missing or invalid.
8. Parse strings into correct types explicitly.
9. Validate URLs, numbers, booleans, enums, and structured values.
10. Centralize configuration loading.
11. Normalize configuration once.
12. Expose a stable configuration interface to application code.
13. Keep configuration immutable when practical.
14. Use safe defaults only when they are genuinely safe.
15. Never default development systems to production resources.
16. Separate public and private configuration.
17. Never expose server secrets to browser code.
18. Use least privilege for configuration access.
19. Keep business rules separate from deployment configuration.
20. Use dedicated feature flags for independent rollout behavior.
21. Remove obsolete feature flags and configuration.
22. Document every important configuration value.
23. Keep `.env.example` synchronized with application requirements.
24. Test configuration loading and validation.
25. Keep test configuration isolated from production.
26. Avoid environment-specific behavior unless it is intentional.
27. Use dependency injection to make configuration explicit and testable.
28. Define configuration precedence clearly.
29. Avoid giant global configuration objects when smaller boundaries are clearer.
30. Avoid configuration folder and variable explosion.
31. Protect configuration diagnostics from leaking secrets.
32. Treat configuration changes as operational changes that require review.
33. Consider configuration compatibility during deployments and rollbacks.
34. Rotate compromised secrets instead of merely deleting them.
35. Use established secret management systems for production secrets when appropriate.
36. Make configuration reproducible across environments.
37. Reduce environment drift.
38. Keep runtime and build-time configuration concepts separate.
39. Make deployment failures obvious and actionable.
40. Configuration should make the application easier to deploy, test, operate, and understand rather than becoming a hidden source of complexity.
