# Accessibility

## Overview

Accessibility is the practice of designing and building software that can be used by people with different abilities, technologies, environments, and interaction methods.

Accessibility is not a separate feature added at the end of development.

It is part of correct interface design and implementation.

Good accessibility supports users who may interact with an application through:

* Keyboard
* Screen readers
* Voice control
* Touch
* Switch devices
* Magnification
* High-contrast settings
* Reduced-motion preferences
* Different input methods
* Different browsers and devices

Accessible software should be:

* Perceivable
* Operable
* Understandable
* Robust

Accessibility also improves usability for users without permanent disabilities.

---

## 1. Use Semantic HTML

Start with the correct HTML element.

Prefer:

```html
<button type="button">
  Save
</button>
```

over:

```html
<div onclick="save()">
  Save
</div>
```

A native `button` already provides important browser behavior:

* Keyboard interaction
* Focus behavior
* Semantic meaning
* Accessibility tree information
* Form integration

Use native semantics before reaching for ARIA.

---

## 2. Use the Correct Element for the Job

Common semantic elements include:

```html
<header></header>
<nav></nav>
<main></main>
<section></section>
<article></article>
<aside></aside>
<footer></footer>
<button></button>
<form></form>
<label></label>
<table></table>
```

Choose elements according to meaning rather than appearance.

Do not select a `div` simply because it is visually convenient.

---

## 3. Do Not Use ARIA to Replace Native HTML

Weak:

```html
<div
  role="button"
  tabindex="0"
>
  Save
</div>
```

Better:

```html
<button type="button">
  Save
</button>
```

ARIA can communicate semantics that native HTML cannot express by itself.

It should not replace native controls unnecessarily.

---

## 4. Understand the Accessibility Tree

Browsers expose a representation of the page to assistive technologies.

The accessibility tree contains information such as:

* Role
* Name
* State
* Value
* Relationships

For example:

```html
<button type="button">
  Save
</button>
```

communicates a button role and an accessible name.

The visual appearance alone does not determine accessibility.

---

## 5. Provide an Accessible Name

Interactive controls need meaningful names.

Good:

```html
<button type="button" aria-label="Close">
  ×
</button>
```

Better when a visible label is practical:

```html
<button type="button">
  Close
</button>
```

Avoid controls with no meaningful accessible name.

---

## 6. Visible Text Often Provides the Best Name

Prefer visible labels when they make sense:

```html
<button type="button">
  Submit application
</button>
```

rather than:

```html
<button
  type="button"
  aria-label="Submit"
>
  <span aria-hidden="true">→</span>
</button>
```

Visible labels help both sighted users and assistive technology users.

---

## 7. Do Not Add Redundant ARIA

Unnecessary ARIA can create noise or conflicting semantics.

Avoid:

```html
<button
  role="button"
  aria-label="Save"
>
  Save
</button>
```

The native button already has the button role and accessible name.

Prefer:

```html
<button type="button">
  Save
</button>
```

---

## 8. Use Heading Hierarchy Meaningfully

Headings communicate document structure.

Example:

```html
<h1>Projects</h1>

<h2>Featured Projects</h2>
<h2>Recent Projects</h2>

<h3>JavaScript Reference</h3>
<h3>Portfolio</h3>
```

Do not choose heading levels merely because a certain font size looks correct.

CSS controls presentation.

Heading levels communicate structure.

---

## 9. Avoid Skipping Heading Levels Without a Reason

This:

```html
<h1>Projects</h1>
<h3>Featured Projects</h3>
```

may create a confusing document structure.

Prefer:

```html
<h1>Projects</h1>
<h2>Featured Projects</h2>
```

The exact heading hierarchy should reflect the content hierarchy.

---

## 10. One Main Heading Per Page Is a Useful Default

A page should normally have a clear primary heading.

Example:

```html
<main>
  <h1>Projects</h1>

  <section>
    <h2>Featured Projects</h2>
  </section>
</main>
```

Multiple `h1` elements can be valid in some document models, but a clear single primary page heading is usually easier to reason about.

---

## 11. Use Landmarks

Landmarks help users navigate major page regions.

Example:

```html
<header>
  ...
</header>

<nav aria-label="Primary">
  ...
</nav>

<main>
  ...
</main>

<aside>
  ...
</aside>

<footer>
  ...
</footer>
```

Landmarks should represent meaningful regions.

Do not add landmarks to every small container.

---

## 12. Use One Main Landmark

A page normally has one primary `main` region.

```html
<main>
  <h1>Projects</h1>
</main>
```

The `main` element identifies the primary content of the page.

Avoid using it for repeated nested content containers.

---

## 13. Label Multiple Navigation Regions

If a page contains multiple navigation regions, distinguish them.

```html
<nav aria-label="Primary">
  ...
</nav>

<nav aria-label="Footer">
  ...
</nav>
```

This helps users identify the purpose of each navigation landmark.

---

## 14. Provide Skip Links

A skip link allows keyboard and assistive technology users to bypass repeated navigation.

```html
<a href="#main-content">
  Skip to main content
</a>

<main id="main-content">
  ...
</main>
```

The link can be visually hidden until focused:

```css
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

The exact styling should preserve visibility when the link receives focus.

---

## 15. Keyboard Accessibility Is Mandatory for Interactive Controls

Every interactive action should be usable without a mouse.

Good:

```html
<button type="button">
  Open menu
</button>
```

Poor:

```html
<div onclick="openMenu()">
  Open menu
</div>
```

Keyboard users should not need to simulate mouse behavior.

---

## 16. Avoid Mouse-Only Interactions

Weak:

```js
element.addEventListener("mousedown", handleAction);
```

when the action is intended to be a general interactive control.

Prefer semantic controls that naturally support keyboard interaction.

---

## 17. Do Not Add Custom Keyboard Support Unless Necessary

Using native controls automatically provides common keyboard behavior.

For example:

```html
<button type="button">
  Save
</button>
```

does not require manually implementing:

```js
element.addEventListener("keydown", ...);
```

Do not recreate browser behavior unnecessarily.

---

## 18. If You Build a Custom Widget, Define Its Keyboard Model

A custom component may need explicit keyboard behavior.

For example, a custom menu may need:

```text
Enter
Space
Arrow Down
Arrow Up
Escape
```

The exact keyboard interactions should be consistent with the widget pattern being implemented.

Do not invent arbitrary keyboard conventions.

---

## 19. Preserve Logical Focus Order

Keyboard focus should generally follow the visual and semantic order of the page.

Avoid:

```html
<button tabindex="5">
  First
</button>

<button tabindex="1">
  Second
</button>
```

Positive `tabindex` values can create confusing focus sequences.

Prefer natural document order.

---

## 20. Use `tabindex="0"` Sparingly

A native interactive element is normally already keyboard focusable.

Do not add:

```html
<button tabindex="0">
  Save
</button>
```

unless there is a specific reason.

Use `tabindex="0"` mainly when making a non-native element keyboard focusable is unavoidable.

Even then, prefer a native semantic element when possible.

---

## 21. Avoid Negative `tabindex` for Interactive Content

This:

```html
<button tabindex="-1">
  Delete
</button>
```

removes the button from normal keyboard tab navigation.

That may be correct temporarily for controlled focus management, but it should not be used casually.

---

## 22. Never Use Positive `tabindex` for Layout

Avoid:

```html
<button tabindex="100">
  Save
</button>
```

Positive values create a custom tab order that is difficult to maintain.

Use document order and semantic HTML instead.

---

## 23. Visible Focus Is Essential

Do not remove focus outlines without providing an equivalent.

Avoid:

```css
button:focus {
  outline: none;
}
```

Prefer:

```css
button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}
```

Focus should remain visually obvious.

---

## 24. Use `:focus-visible` Appropriately

`:focus-visible` can help distinguish keyboard-relevant focus from pointer interactions.

Example:

```css
button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}
```

Do not hide focus simply because it is visually inconvenient.

---

## 25. Manage Focus After Dynamic Changes

When opening a dialog, focus should move appropriately.

Example concept:

```js id="q6bn3o"
dialog.open();

dialogButton.focus();
```

When the dialog closes, focus should usually return to the control that opened it.

Focus management should reflect the user's task.

---

## 26. Dialog Focus

A modal dialog should generally:

1. Receive focus when opened.
2. Keep focus within the dialog while modal.
3. Close using the appropriate mechanisms.
4. Return focus to a logical element afterward.

Native `<dialog>` can provide useful behavior, but implementation details still matter.

Example:

```html
<dialog id="settings-dialog">
  <h2>Settings</h2>

  <button
    type="button"
    commandfor="settings-dialog"
    command="close"
  >
    Close
  </button>
</dialog>
```

The exact API support should match the project's target environments.

---

## 27. Use `aria-expanded` for Expandable Controls

If a button controls an expandable region:

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="menu"
>
  Menu
</button>

<div id="menu" hidden>
  ...
</div>
```

When expanded:

```html
<button
  type="button"
  aria-expanded="true"
  aria-controls="menu"
>
  Menu
</button>
```

The state should reflect reality.

Do not leave `aria-expanded` permanently set to `true`.

---

## 28. Use `aria-controls` When a Relationship Is Useful

When a control explicitly controls another element:

```html
<button
  type="button"
  aria-controls="filters"
  aria-expanded="false"
>
  Filters
</button>

<section id="filters" hidden>
  ...
</section>
```

The relationship improves understanding for assistive technologies that expose it.

---

## 29. Keep ARIA State Synchronized

If a menu is open:

```html
aria-expanded="true"
```

If closed:

```html
aria-expanded="false"
```

Do not allow visual state and accessibility state to diverge.

Incorrect:

```text
Visual state → Open
ARIA state → Closed
```

Correct implementation keeps both synchronized.

---

## 30. Use `hidden` for Truly Hidden Content

Example:

```html
<section id="details" hidden>
  ...
</section>
```

The `hidden` attribute removes the content from normal rendering and accessibility exposure.

Use it when content is genuinely unavailable.

Do not use CSS hiding techniques accidentally when content should remain accessible.

---

## 31. Understand Visual Hiding vs Accessibility Hiding

These are different goals.

Visual hiding while preserving accessibility exposure can be appropriate for:

```text
Skip links
Screen-reader-only labels
Additional accessible descriptions
```

Removing content from both visual and accessibility experiences is appropriate when the content is not currently relevant.

Choose intentionally.

---

## 32. Do Not Use `display: none` for Content That Should Be Read

Example:

```css
.visually-hidden {
  display: none;
}
```

This is not visually hiding while preserving accessibility.

If content should remain available to assistive technologies, use a proper visually-hidden pattern instead.

---

## 33. Visually Hidden Utility

A common pattern is:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

Use such utilities intentionally and consistently.

---

## 34. Images Need Appropriate Alternatives

Informative image:

```html
<img
  src="osama-profile.png"
  alt="Osama Abu Motlaq"
>
```

Decorative image:

```html
<img
  src="decorative-line.svg"
  alt=""
>
```

The alternative depends on the image's purpose.

---

## 35. Do Not Describe Decorative Images

If an image adds no meaningful information:

```html
<img
  src="decorative-shape.svg"
  alt=""
>
```

Do not use:

```html
alt="Decorative shape"
```

when the image is truly decorative.

An empty alternative tells assistive technologies that the image can be skipped.

---

## 36. Do Not Use Redundant Image Alt Text

Weak:

```html
<img
  src="profile.png"
  alt="Image of Osama Abu Motlaq"
>
```

Better:

```html
<img
  src="profile.png"
  alt="Osama Abu Motlaq"
>
```

The word "image" is often unnecessary because assistive technology already identifies the element as an image.

---

## 37. Alt Text Should Convey Purpose

An image's alternative should answer:

> What information does this image provide here?

Example:

```html
<img
  src="dashboard.png"
  alt="Project dashboard showing active tasks"
>
```

The correct description depends on context.

---

## 38. Complex Images Need More Than Short Alt Text

Charts, diagrams, and infographics may require additional explanation.

Example:

```html
<figure>
  <img
    src="revenue-chart.png"
    alt="Monthly revenue chart"
  >

  <figcaption>
    Revenue increased steadily from January through June.
  </figcaption>
</figure>
```

The exact accessible representation should communicate the important information, not every visual detail.

---

## 39. Decorative Icons Should Usually Be Hidden

If an icon is purely decorative:

```html
<button type="button">
  <svg aria-hidden="true">
    ...
  </svg>
  Save
</button>
```

The visible text provides the accessible name.

---

## 40. Icon-Only Controls Need Accessible Names

Weak:

```html
<button type="button">
  <svg aria-hidden="true">
    ...
  </svg>
</button>
```

Better:

```html
<button
  type="button"
  aria-label="Close"
>
  <svg aria-hidden="true">
    ...
  </svg>
</button>
```

Every icon-only action needs a meaningful accessible name.

---

## 41. Avoid Text Inside Images

Important text should normally remain real text.

Weak:

```html
<img
  src="sale-banner.png"
  alt="50 percent off today"
>
```

when the text is important and could be rendered as HTML.

Prefer:

```html
<div class="sale-banner">
  <strong>50% off today</strong>
</div>
```

Real text is more adaptable, searchable, zoomable, and accessible.

---

## 42. Form Controls Need Labels

Good:

```html
<label for="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
>
```

The label gives the field a clear accessible name.

---

## 43. Do Not Use Placeholder Text as the Only Label

Weak:

```html
<input
  type="email"
  placeholder="Email"
/>
```

The placeholder should not be the only labeling mechanism.

Prefer:

```html
<label for="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
  placeholder="you@example.com"
/>
```

---

## 44. Associate Labels Correctly

Explicit association:

```html
<label for="username">
  Username
</label>

<input
  id="username"
  name="username"
>
```

Or implicit association:

```html
<label>
  Username

  <input
    name="username"
  >
</label>
```

Use a consistent, clear pattern.

---

## 45. Group Related Form Controls

For related radio buttons or checkboxes:

```html
<fieldset>
  <legend>Preferred theme</legend>

  <label>
    <input
      type="radio"
      name="theme"
      value="light"
    >
    Light
  </label>

  <label>
    <input
      type="radio"
      name="theme"
      value="dark"
    >
    Dark
  </label>
</fieldset>
```

`fieldset` and `legend` communicate the relationship.

---

## 46. Use Native Input Types

Choose the appropriate type:

```html
<input type="email">
<input type="number">
<input type="date">
<input type="password">
<input type="search">
<input type="tel">
```

Native input types provide useful semantics and browser behavior.

Do not use:

```html
<input type="text">
```

for every kind of data.

---

## 47. Use `autocomplete`

Autocomplete helps users fill common information.

Example:

```html
<input
  type="email"
  name="email"
  autocomplete="email"
>
```

Other examples:

```html
autocomplete="name"
autocomplete="given-name"
autocomplete="family-name"
autocomplete="street-address"
autocomplete="postal-code"
```

Choose values appropriate to the field.

---

## 48. Mark Required Fields Explicitly

Example:

```html
<label for="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
  required
>
```

If a custom validation UI is used, communicate the required state accessibly as well.

---

## 49. Do Not Rely on Color Alone for Required State

Weak:

```text id="u3x8vi"
Red border = invalid
```

Users with color-vision differences may not distinguish the state.

Combine color with:

* Text
* Icons with appropriate accessible names
* `aria-invalid`
* Error messages

---

## 50. Use `aria-invalid` When Appropriate

Example:

```html
<input
  id="email"
  name="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
>
```

Then:

```html
<p id="email-error">
  Enter a valid email address.
</p>
```

Keep the state synchronized with actual validation.

---

## 51. Associate Error Messages With Fields

Use:

```html
<input
  id="email"
  aria-describedby="email-error"
>

<p id="email-error">
  Enter a valid email address.
</p>
```

Now assistive technology can associate the additional description with the field.

---

## 52. Do Not Clear User Input Unnecessarily

When validation fails, preserve valid user input whenever possible.

Bad experience:

```text id="m7g1s4"
User fills five fields
 ↓
One error
 ↓
All fields cleared
```

Preserving input reduces repetitive work and improves usability.

---

## 53. Identify Errors Clearly

Avoid:

```text id="km7yze"
Invalid form.
```

Prefer:

```text id="d4qjzs"
Email address is invalid.
Password must contain at least 8 characters.
```

Users need enough information to correct the problem.

---

## 54. Focus the First Relevant Error When Appropriate

After form submission, focus management can move the user toward the first invalid field or an error summary.

Example concept:

```js id="zhs6yc"
firstInvalidField.focus();
```

Do this carefully.

Do not unexpectedly move focus during ordinary typing.

---

## 55. Error Summaries

For long forms, an error summary can help users understand what failed.

Example:

```html
<div
  role="alert"
  aria-labelledby="form-error-title"
>
  <h2 id="form-error-title">
    Please fix the following errors
  </h2>

  <ul>
    <li>Email address is invalid.</li>
    <li>Password is too short.</li>
  </ul>
</div>
```

Links can point directly to invalid fields.

---

## 56. Use `aria-describedby` for Additional Instructions

Example:

```html
<label for="password">
  Password
</label>

<input
  id="password"
  type="password"
  aria-describedby="password-help"
>

<p id="password-help">
  Use at least 8 characters.
</p>
```

This communicates supporting information without replacing the label.

---

## 57. Use `aria-labelledby` for Visible Titles

Example:

```html
<section aria-labelledby="projects-title">
  <h2 id="projects-title">
    Featured projects
  </h2>

  ...
</section>
```

This can make the section's accessible name explicit.

---

## 58. Live Regions for Dynamic Messages

Dynamic status updates may need to be announced.

Example:

```html
<p aria-live="polite">
  Profile saved successfully.
</p>
```

Use live regions intentionally.

Do not make entire pages live regions.

---

## 59. Choose Live Region Urgency Carefully

Common politeness levels include:

```html
aria-live="polite"
```

and:

```html
aria-live="assertive"
```

Use `polite` for non-urgent updates.

Use stronger urgency sparingly because frequent interruptions can make the interface difficult to use.

---

## 60. Loading Indicators Need Accessible State

A visual spinner alone may not communicate loading status.

Example:

```html
<div
  role="status"
  aria-live="polite"
>
  Saving changes...
</div>
```

The exact pattern depends on whether the loading state is local or global.

---

## 61. Do Not Announce Every Visual Change

Assistive technologies should not receive unnecessary announcements for ordinary visual updates.

Only announce meaningful changes that users need to know about.

---

## 62. Progress Indicators Should Communicate Progress

For a determinate operation:

```html
<progress
  value="60"
  max="100"
>
  60%
</progress>
```

For unknown duration:

```html
<progress>
  Loading...
</progress>
```

Use the correct semantics.

---

## 63. Accessible Tables

Use a table for tabular data.

```html
<table>
  <caption>
    Project status
  </caption>

  <thead>
    <tr>
      <th scope="col">Project</th>
      <th scope="col">Status</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Portfolio</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>
```

Do not use CSS grids or nested `div`s to recreate tables when the data is genuinely tabular.

---

## 64. Use Table Headers

Example:

```html
<th scope="col">
  Project
</th>
```

For row headers:

```html
<th scope="row">
  Portfolio
</th>
```

Proper headers improve navigation for assistive technologies.

---

## 65. Caption Tables When Useful

A caption identifies the table's purpose:

```html
<table>
  <caption>
    Recent projects
  </caption>
</table>
```

The caption can provide context before the user navigates the table cells.

---

## 66. Accessible Lists

Use list elements for lists.

```html
<ul>
  <li>JavaScript</li>
  <li>React</li>
  <li>Next.js</li>
</ul>
```

Ordered content:

```html
<ol>
  <li>Install dependencies</li>
  <li>Run the application</li>
  <li>Open the browser</li>
</ol>
```

Do not manually create list semantics using repeated `div`s when a native list is appropriate.

---

## 67. Links vs Buttons

Use a link for navigation:

```html
<a href="/projects">
  Projects
</a>
```

Use a button for an action:

```html
<button type="button">
  Open menu
</button>
```

A link and button have different semantics.

Do not use one as a replacement for the other.

---

## 68. Do Not Use Buttons for Navigation

Avoid:

```html
<button
  type="button"
  onclick="location.href='/projects'"
>
  Projects
</button>
```

Prefer:

```html
<a href="/projects">
  Projects
</a>
```

---

## 69. Do Not Use Links for Actions

Avoid:

```html
<a href="#" onclick="deleteUser()">
  Delete
</a>
```

Prefer:

```html
<button type="button">
  Delete
</button>
```

Actions should be represented by controls designed for actions.

---

## 70. Ensure Links Have Meaningful Text

Weak:

```html
<a href="/projects">
  Click here
</a>
```

Better:

```html
<a href="/projects">
  View projects
</a>
```

The link text should communicate the destination.

---

## 71. Avoid Repeated Ambiguous Link Labels

A page containing:

```text id="w6rw3l"
Read more
Read more
Read more
```

is difficult to understand out of context.

Prefer:

```html
<a href="/projects/javascript-reference">
  Read more about the JavaScript Reference
</a>
```

or provide additional accessible context.

---

## 72. Use Descriptive Page Titles

Example:

```html
<title>
  Projects | Osama Abu Motlaq
</title>
```

Page titles help users identify the current document.

Each important page should have an appropriate title.

---

## 73. Update Titles on Client-Side Navigation

Single-page applications and client-side routers should update the document title when the page changes.

The title should correspond to the current content.

---

## 74. Language Declaration

Declare the primary language of the document:

```html
<html lang="en">
```

For content written in another language, use an appropriate language value.

For mixed-language fragments:

```html
<p>
  English text
  <span lang="fr">Bonjour</span>
</p>
```

Language metadata helps assistive technology choose appropriate pronunciation rules.

---

## 75. Do Not Fake Language With Styling

Changing fonts or visual appearance does not communicate language semantics.

Use:

```html
lang="fr"
```

instead of trying to signal language through CSS.

---

## 76. Text Must Be Resizable

Do not design interfaces that break when users enlarge text.

Avoid hard-coded layouts that assume one exact font size.

Prefer:

```css
body {
  font-size: 1rem;
}
```

and scalable units where appropriate.

---

## 77. Use Relative Units Where Appropriate

Prefer:

```css
font-size: 1rem;
padding: 1rem;
gap: 1rem;
```

instead of making the entire interface depend on fixed pixel values.

Pixels are not inherently inaccessible, but excessive fixed sizing can create problems when text or zoom settings change.

---

## 78. Support Browser Zoom

Do not disable zoom:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
>
```

Avoid preventing users from enlarging the interface.

Users may depend on browser zoom.

---

## 79. Do Not Use Tiny Text

Text should remain readable at the intended viewing sizes.

Avoid:

```css
font-size: 10px;
```

for essential content.

Use typography that remains legible and adaptable.

---

## 80. Color Contrast

Text and interactive controls should have sufficient contrast against their backgrounds.

Do not rely on intuition alone.

Use contrast measurement tools during accessibility testing.

Consider:

* Normal text
* Large text
* Icons
* Borders
* Focus indicators
* Disabled states where applicable

---

## 81. Do Not Use Color Alone to Convey Meaning

Weak:

```text id="a7b5xw"
Green = success
Red = error
```

Some users may not distinguish the colors.

Add another signal:

```text id="f8p2xy"
Success: check icon + text
Error: icon + text
```

Example:

```html
<p>
  <span aria-hidden="true">✓</span>
  Profile saved successfully.
</p>
```

The text communicates the meaning independently of color.

---

## 82. Focus Indicators Need Contrast

A focus outline should remain visible against the surrounding interface.

Do not use a focus style that disappears on similar backgrounds.

```css
button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

---

## 83. Avoid Text Embedded in Background Images

Background images should not carry essential instructions or labels.

Keep meaningful text in the DOM.

---

## 84. Respect Reduced Motion Preferences

Some users prefer reduced motion.

Use the media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

The exact implementation should preserve usability rather than simply disabling everything blindly.

---

## 85. Do Not Depend on Animation to Communicate Information

If the only indication that something changed is movement:

```text id="kz9d7s"
Button flashes
```

some users may miss the information.

Provide persistent semantic or textual feedback.

---

## 86. Avoid Flashing Content

Rapid flashing can create serious accessibility and health risks.

Avoid designs with frequent high-intensity flashes.

Animations should be purposeful and controlled.

---

## 87. Avoid Autoplaying Audio

Unexpected audio can interfere with:

* Screen readers
* Users in quiet environments
* Users with sensitivity to sound

Audio should generally require clear user intent.

---

## 88. Provide Controls for Media

For video and audio, provide:

* Play/pause
* Volume control
* Captions where needed
* Keyboard controls
* Accessible names

Native media controls are often a useful foundation.

---

## 89. Provide Captions for Relevant Video

Example:

```html
<video controls>
  <source
    src="lesson.mp4"
    type="video/mp4"
  >

  <track
    kind="captions"
    src="lesson.en.vtt"
    srclang="en"
    label="English"
  >
</video>
```

Captions provide access to spoken content and relevant audio information.

---

## 90. Provide Text Alternatives for Audio Information

If meaningful information exists only in audio, provide an appropriate text alternative.

The specific format depends on the content.

---

## 91. Keyboard Accessible Menus

A navigation menu should be reachable and usable with the keyboard.

Example:

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="site-menu"
>
  Menu
</button>

<nav id="site-menu">
  ...
</nav>
```

The exact interaction model should remain predictable.

---

## 92. Mobile Menus Need Focus Management

When a menu opens:

```text id="ou3p8p"
Button activates
 ↓
Menu becomes available
 ↓
Focus moves logically
 ↓
User navigates
 ↓
Escape closes when appropriate
 ↓
Focus returns to menu button
```

Do not leave focus somewhere unrelated.

---

## 93. Dropdowns Are Not the Same as Menus

A simple disclosure control:

```html
<button
  aria-expanded="false"
  aria-controls="details"
>
  Details
</button>
```

is different from a complex application menu with menu-item keyboard semantics.

Choose the correct interaction pattern.

---

## 94. Accordions

A basic accordion can use:

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="panel-1"
>
  Project details
</button>

<div id="panel-1" hidden>
  ...
</div>
```

The button communicates state.

The controlled panel has a stable ID.

---

## 95. Tabs Need Appropriate Semantics

A tab interface may use:

```html
<div role="tablist">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-projects"
  >
    Projects
  </button>
</div>
```

Tabs are more complex than simple links.

If the UI is merely navigation between pages, use normal links instead of implementing a tab widget.

---

## 96. Tooltips Should Not Contain Essential Information

A tooltip may supplement information:

```text id="1b8t1t"
Delete
```

with additional detail.

Do not put essential instructions only in a tooltip that disappears on keyboard navigation or touch.

---

## 97. Use Native Controls for Select Menus

Prefer:

```html
<label for="country">
  Country
</label>

<select id="country" name="country">
  <option value="ps">Palestine</option>
  <option value="fr">France</option>
</select>
```

before building a custom combobox.

Native controls provide substantial accessibility behavior.

---

## 98. Custom Select Components Are Complex

A custom select may need to support:

```text id="w5f2wr"
Opening
Closing
Arrow navigation
Home/End
Typeahead
Selected state
Focus management
Screen reader semantics
Mobile interaction
```

Do not build one casually.

Use native controls or well-tested accessible implementations when possible.

---

## 99. Search Inputs

Use appropriate semantics:

```html
<form role="search">
  <label for="search">
    Search
  </label>

  <input
    id="search"
    name="q"
    type="search"
  >

  <button type="submit">
    Search
  </button>
</form>
```

The exact structure should reflect the page.

---

## 100. Accessible Autocomplete

Autocomplete widgets can be complex.

When suggestions appear, users need to understand:

* Current input
* Available suggestions
* Current selection
* Keyboard navigation
* Expanded/collapsed state

Do not implement an autocomplete as an unstructured list of clickable `div`s.

---

## 101. Preserve Native Keyboard Behavior

Do not intercept keyboard events unnecessarily.

For example, avoid:

```js id="uv3kfd"
document.addEventListener("keydown", (event) => {
  event.preventDefault();
});
```

unless there is a very specific reason.

Global keyboard interception can break:

* Browser behavior
* Text editing
* Screen readers
* Assistive technologies
* User expectations

---

## 102. Use `event.key` Rather Than Key Codes

For keyboard logic:

```js id="b2m43j"
if (event.key === "Escape") {
  closeMenu();
}
```

This is clearer than relying on older numeric key codes.

---

## 103. Support Escape for Dismissible Interfaces

Dialogs, menus, and overlays often need an Escape behavior.

For example:

```js id="xx95y8"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});
```

The exact behavior should match the interaction model.

---

## 104. Do Not Hijack the Escape Key Globally

A nested component may already need Escape.

Manage keyboard behavior according to component ownership.

Do not attach unrelated global listeners for every widget.

---

## 105. Focus Trap Only When Appropriate

A modal dialog usually needs focus containment.

An ordinary page section does not.

Do not trap focus in regular content.

---

## 106. Prevent Focus Traps From Becoming Dead Ends

A focus trap must still allow users to:

* Close the dialog
* Move through controls
* Return to the invoking context

Always provide a clear exit path.

---

## 107. Manage Focus After Route Changes

For applications with client-side routing, the visible page can change without a full document reload.

After navigation, users may need focus moved to a logical heading or main region.

The implementation should avoid unexpected focus jumps.

---

## 108. Do Not Steal Focus During Typing

Avoid automatically focusing unrelated elements whenever state changes.

Bad:

```js id="uzno7q"
useEffect(() => {
  inputRef.current.focus();
}, [value]);
```

This can move the caret or focus unexpectedly.

Focus changes should correspond to user-facing interaction changes.

---

## 109. Accessible Notifications

Notifications should communicate meaningful status changes.

Example:

```html
<div role="status">
  Changes saved.
</div>
```

Use assertive interruption only when the information is genuinely urgent.

---

## 110. Error Notifications Need Appropriate Urgency

Critical failures may need immediate announcement.

Less urgent messages can use:

```html
<div role="status">
  Profile saved.
</div>
```

Choose the least disruptive mechanism that communicates the information.

---

## 111. Do Not Duplicate Announcements

A message should not be announced through multiple overlapping mechanisms.

For example, avoid having:

```text id="4ed7v8"
aria-live
+
role="alert"
+
focus movement
```

all announce the same message unless the combination is intentionally designed.

---

## 112. Accessible Loading States

A loading state should communicate:

```text id="9upjxw"
What is loading
Whether interaction is temporarily unavailable
What happens next
```

Example:

```html
<button
  type="button"
  disabled
>
  Saving...
</button>
```

The visible text communicates the current action.

---

## 113. Do Not Remove Context During Loading

Avoid replacing:

```html
<button>
  Save profile
</button>
```

with:

```html
<button>
  ...
</button>
```

A simple spinner may communicate less than text.

Prefer:

```html
<button disabled>
  Saving profile...
</button>
```

when appropriate.

---

## 114. Disabled vs Read-Only

These states are different.

Disabled:

```html
<input disabled>
```

The control is unavailable for interaction.

Read-only:

```html
<input readonly value="Osama Abu Motlaq">
```

The value can still participate in some interactions and form semantics.

Choose according to the intended behavior.

---

## 115. Do Not Disable Controls Without Explanation

If an action is unavailable because a requirement is missing, communicate the reason.

Weak:

```html
<button disabled>
  Submit
</button>
```

Better:

```html
<p id="submit-help">
  Complete all required fields before submitting.
</p>

<button
  disabled
  aria-describedby="submit-help"
>
  Submit
</button>
```

The exact interaction may vary, but the reason should be understandable.

---

## 116. Error Prevention Is Accessibility

Preventing avoidable errors improves usability.

Examples:

```text id="n2f5p3"
Input formatting
Clear labels
Required field identification
Confirmation for destructive actions
Preserving user input
Helpful validation
```

Accessibility includes reducing unnecessary cognitive and interaction barriers.

---

## 117. Destructive Actions Need Clear Labels

Weak:

```html
<button type="button">
  Continue
</button>
```

Better:

```html
<button type="button">
  Delete project
</button>
```

Users should understand the consequence of the action.

---

## 118. Confirm Dangerous Actions When Appropriate

For irreversible actions:

```text id="m4km7w"
Delete account
Remove data
Cancel subscription
```

A confirmation step may be appropriate when accidental activation has significant consequences.

Do not add confirmation dialogs to every action.

---

## 119. Keep Instructions Close to Inputs

Instructions should appear where users need them.

Example:

```html
<label for="username">
  Username
</label>

<p id="username-help">
  Use 3 to 20 characters.
</p>

<input
  id="username"
  aria-describedby="username-help"
>
```

Users should not need to search elsewhere for basic requirements.

---

## 120. Use Plain, Predictable Language

Accessibility includes cognitive usability.

Prefer:

```text id="d41j5f"
Save changes
```

over:

```text id="j6c1sx"
Execute persistence operation
```

Interfaces should use terminology users understand.

---

## 121. Consistent Interface Patterns

If one page uses:

```text id="6o7c1d"
Save
Cancel
```

another page should not unexpectedly use:

```text id="6m1mxa"
Apply
Abort
```

for the same concepts.

Consistency reduces cognitive effort.

---

## 122. Avoid Unexpected Context Changes

Do not unexpectedly:

* Open a new window
* Navigate away
* Submit a form
* Change context
* Move focus

without clear user action or indication.

Predictability is an accessibility feature.

---

## 123. Links That Open New Tabs Should Be Indicated When Useful

Example:

```html
<a href="https://example.com">
  External documentation
</a>
```

If opening a new browsing context is necessary:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener"
>
  External documentation
  <span class="sr-only">
    (opens in a new tab)
  </span>
</a>
```

Use new tabs only when there is a good reason.

---

## 124. Avoid Automatic New Windows

Unexpected windows can be confusing, particularly for screen reader and keyboard users.

Navigation should generally happen in the expected browsing context.

---

## 125. Responsive Design Is Accessibility

A layout should remain usable across:

* Small screens
* Large screens
* Zoomed views
* Landscape orientation
* Different text sizes

Do not design exclusively around one viewport size.

---

## 126. Reflow Content

When users zoom or use narrow viewports, content should remain usable.

Avoid horizontal scrolling caused by fixed-width essential content when responsive alternatives are possible.

---

## 127. Do Not Hide Important Content on Mobile Without a Reason

Responsive layouts can rearrange content.

They should not silently remove important information simply because the screen is smaller.

---

## 128. Touch Targets Need Practical Size

Interactive targets should be large enough to activate reliably.

Avoid tiny controls such as:

```css
button {
  width: 12px;
  height: 12px;
}
```

especially for primary actions.

Touch accessibility requires considering spacing and accidental activation.

---

## 129. Do Not Place Controls Too Close Together

A user with motor difficulties may accidentally activate the wrong control.

Use sufficient spacing between unrelated actions.

This is especially important for:

```text id="9kqa07"
Delete
Edit
Save
Cancel
```

---

## 130. Avoid Hover-Only Information

Important functionality should not require mouse hover.

Hover does not exist in the same way for:

* Keyboard users
* Touch users
* Many assistive technologies

Provide another accessible way to access the same information.

---

## 131. Tooltips Must Support Keyboard Access

If a tooltip provides supplementary information, it should be accessible through keyboard interaction as well as pointer interaction.

Do not implement:

```css
button:hover .tooltip {
  display: block;
}
```

as the only mechanism.

---

## 132. Use Pointer Events Carefully

Do not make important controls depend exclusively on:

```js id="m8h8ub"
pointerenter
pointerleave
```

Keyboard and touch interactions may require different event behavior.

Native interactive elements provide safer defaults.

---

## 133. Avoid `pointer-events: none` on Interactive Elements

This can make an element visually present but impossible to interact with.

Inspect the resulting hit target during debugging.

---

## 134. Ensure Disabled State Is Honest

A visually disabled button should have equivalent semantic behavior.

Do not style:

```css
button.disabled {
  opacity: 0.5;
}
```

without actually disabling the control when appropriate.

Use:

```html
<button disabled>
  Submit
</button>
```

when the action truly cannot be performed.

---

## 135. Do Not Use Opacity Alone to Indicate Disabled State

A low-opacity control can become difficult to read.

Use semantic disabled state together with clear visual differentiation.

---

## 136. Avoid Placeholder-Only Instructions

Weak:

```html
<input
  placeholder="Enter your email"
>
```

Better:

```html
<label for="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
  placeholder="you@example.com"
>
```

The label remains available after the user enters text.

---

## 137. Preserve Form State During Errors

If submission fails because of one field:

```text id="x5jvb8"
Do not erase:
Name
Email
Message
```

Users should not need to re-enter information unnecessarily.

---

## 138. Input Validation Should Be Clear, Not Punitive

Avoid:

```text id="u8d4x4"
Invalid!
```

Prefer:

```text id="6s7z4v"
Email must include an address such as:
you@example.com
```

Explain how to recover.

---

## 139. Do Not Use Color as the Only Validation Signal

Example:

```text id="7v9j1s"
Red → invalid
Green → valid
```

Add text or semantic state:

```html
<p>
  Email address is invalid.
</p>
```

---

## 140. Accessible Data Visualization

Charts should have a text alternative or accessible summary when the visual contains meaningful information.

Example:

```html
<figure>
  <div
    role="img"
    aria-label="Revenue increased from January through June"
  >
    ...
  </div>

  <figcaption>
    Revenue increased each month from January through June.
  </figcaption>
</figure>
```

The appropriate implementation depends on the visualization.

---

## 141. Do Not Hide Complex Data Behind an Inaccessible Canvas

If a canvas contains important information:

```html
<canvas>
  ...
</canvas>
```

provide an accessible alternative.

Possible alternatives include:

```text id="7h0d4s"
Text summary
Accessible data table
Equivalent textual content
```

---

## 142. SVG Accessibility

For meaningful standalone SVG:

```html
<svg
  role="img"
  aria-labelledby="chart-title"
>
  <title id="chart-title">
    Revenue growth from January to June
  </title>
</svg>
```

For decorative SVG:

```html
<svg aria-hidden="true">
  ...
</svg>
```

Use semantics according to the SVG's purpose.

---

## 143. Avoid Duplicate Accessible Names

If visible text already names a control, do not create conflicting ARIA labels.

Weak:

```html
<button aria-label="Delete">
  Remove project
</button>
```

The visible text and ARIA name differ.

Prefer:

```html
<button>
  Remove project
</button>
```

unless there is a clear reason for a different accessible name.

---

## 144. Keep Visible and Accessible Names Consistent

If a button visibly says:

```text id="1rsv7x"
Search
```

do not give it an unrelated accessible name:

```html
aria-label="Find records"
```

Users may encounter the visible term while voice-control users interact using the accessible name.

Consistency helps all users.

---

## 145. Accessible Custom Buttons

If a custom button is unavoidable:

```html
<div
  role="button"
  tabindex="0"
  aria-label="Save"
>
  Save
</div>
```

you must also implement appropriate keyboard behavior and state management.

This is why native `<button>` is preferable.

---

## 146. Custom Checkboxes and Radios Are Complex

Native:

```html
<input
  type="checkbox"
  name="newsletter"
>
```

is generally preferable to reproducing the control with:

```html
<div
  role="checkbox"
  tabindex="0"
>
</div>
```

Custom controls require correct:

* Role
* State
* Focus
* Keyboard interaction
* Click handling
* Accessible naming

---

## 147. Do Not Hide Native Controls Without a Reason

Custom styling can be useful, but do not remove semantics accidentally.

If visually replacing a native control, ensure its underlying semantics remain correct.

---

## 148. Accessible Status for Selection

If a selectable control has state:

```html
<button
  type="button"
  aria-pressed="true"
>
  Favorite
</button>
```

`aria-pressed` communicates toggle state.

Use it for toggle buttons rather than inventing unrelated ARIA states.

---

## 149. Toggle Buttons

Example:

```html
<button
  type="button"
  aria-pressed="false"
>
  Dark mode
</button>
```

When activated:

```html
<button
  type="button"
  aria-pressed="true"
>
  Dark mode
</button>
```

The state should reflect the actual application state.

---

## 150. Expandable and Selectable Are Different States

Do not confuse:

```text id="b8x8a6"
aria-expanded
aria-selected
aria-pressed
```

Use the state that corresponds to the interaction model.

---

## 151. Accessible Modal Dialogs

A dialog should have:

```html
<dialog aria-labelledby="dialog-title">
  <h2 id="dialog-title">
    Delete project
  </h2>

  <p>
    This action cannot be undone.
  </p>

  <button type="button">
    Cancel
  </button>

  <button type="button">
    Delete
  </button>
</dialog>
```

The exact implementation should correctly manage focus and modal behavior.

---

## 152. Avoid Automatically Opening Modals

Unexpected dialogs can interrupt the user's workflow.

Open them in response to meaningful actions whenever possible.

---

## 153. Accessible Confirmation Dialogs

A confirmation dialog should explain:

```text id="0tqwhs"
What will happen
Whether the action is reversible
Which action is primary
How to cancel
```

Example:

```text id="g6r4ad"
Delete project?
This will permanently remove the project.

Cancel
Delete project
```

Avoid ambiguous buttons such as:

```text id="wzh2cz"
Yes
No
```

---

## 154. Accessible Breadcrumbs

Breadcrumbs can use:

```html
<nav
  aria-label="Breadcrumb"
>
  <ol>
    <li>
      <a href="/">
        Home
      </a>
    </li>

    <li>
      <a href="/projects">
        Projects
      </a>
    </li>

    <li aria-current="page">
      JavaScript Reference
    </li>
  </ol>
</nav>
```

`aria-current="page"` communicates the current location.

---

## 155. Use `aria-current` Correctly

Examples include:

```html
aria-current="page"
```

for current navigation pages.

Other values exist for other contexts.

Use the value that matches the semantic relationship.

---

## 156. Pagination Accessibility

Pagination should communicate the current page.

Example:

```html
<nav aria-label="Pagination">
  <a href="/projects?page=1">
    1
  </a>

  <a
    href="/projects?page=2"
    aria-current="page"
  >
    2
  </a>

  <a href="/projects?page=3">
    3
  </a>
</nav>
```

The exact pattern depends on the implementation.

---

## 157. Search Results Accessibility

When search results update dynamically, communicate meaningful changes.

Example:

```html
<p role="status">
  12 results found.
</p>
```

Do not announce every individual keystroke unnecessarily.

---

## 158. Infinite Scroll Needs an Accessible Alternative

Infinite scrolling can be difficult for some users.

Consider:

* Load more button
* Keyboard access
* Visible progress
* Stable focus
* Ability to reach footer content
* Clear loading state

Avoid relying exclusively on automatic infinite loading.

---

## 159. Focus After Dynamic Content Insertion

When a new panel appears, decide whether focus should:

```text id="7pgqu0"
Stay where it is
Move into the new content
Move to a relevant status message
```

There is no universal answer.

The correct choice depends on the user's task and interaction model.

---

## 160. Avoid Unnecessary Auto-Focus

This:

```html
<input autofocus>
```

can be useful in carefully designed contexts.

But automatic focus can be disruptive when users did not expect it.

Use it only when focus placement clearly benefits the task.

---

## 161. Accessible Navigation on Single-Page Applications

Client-side navigation should preserve:

* URL changes
* Page title
* Main content identification
* Focus management
* Browser history behavior
* Keyboard usability

Navigation should not leave users unsure which content changed.

---

## 162. Keep URLs Meaningful

Readable URLs help everyone.

Prefer:

```text id="e2p1l7"
/projects/javascript-reference
```

over:

```text id="mndxwx"
/page?id=93842
```

when the architecture allows meaningful resource paths.

---

## 163. Do Not Use URL Changes Without Navigation Semantics

If a control performs an action rather than navigation, use a button.

Do not update the URL merely to imitate navigation unless the state genuinely belongs in the URL.

---

## 164. Accessibility in Error Pages

404 and error pages should remain navigable.

Example:

```html
<main>
  <h1>Page not found</h1>

  <p>
    The page you requested does not exist.
  </p>

  <a href="/">
    Return to home
  </a>
</main>
```

The user should have a clear recovery path.

---

## 165. Accessibility in Loading and Suspense States

Loading states should preserve context.

Example:

```html
<section aria-labelledby="projects-title">
  <h1 id="projects-title">
    Projects
  </h1>

  <div role="status">
    Loading projects...
  </div>
</section>
```

Do not replace the entire page with an unexplained spinner when a localized loading state is sufficient.

---

## 166. Accessibility of Skeleton Screens

A skeleton is primarily visual.

Users should still receive semantic status information when needed:

```html
<div role="status">
  Loading projects...
</div>
```

Avoid flooding assistive technology with the structure of every placeholder element.

---

## 167. Accessible Empty States

An empty state should explain:

```text id="z8a1k1"
What is empty
Why it may be empty
What the user can do next
```

Example:

```html
<section>
  <h2>No projects yet</h2>

  <p>
    Create your first project to see it here.
  </p>

  <a href="/projects/new">
    Create project
  </a>
</section>
```

---

## 168. Accessible Error States

An error state should explain:

```text id="f65m6f"
What failed
What the user can do
Whether retrying is possible
```

Example:

```html
<section>
  <h2>Projects could not be loaded</h2>

  <p>
    Check your connection and try again.
  </p>

  <button type="button">
    Try again
  </button>
</section>
```

---

## 169. Avoid Time-Limited Interactions Without Warning

Users may need more time to read or complete tasks.

Avoid unnecessary automatic timeouts.

If a timeout is required, provide suitable warning and extension mechanisms where appropriate.

---

## 170. Avoid Auto-Refreshing Content Without Need

Automatically replacing content can:

* Interrupt reading
* Move focus
* Confuse screen readers
* Break keyboard interaction

If automatic updates are necessary, communicate them appropriately.

---

## 171. Preserve User Context During Updates

When data refreshes:

```text id="b8ph3c"
Do not unnecessarily:
Change scroll position
Move focus
Reset form values
Reorder content unexpectedly
```

Stable interfaces are easier to use.

---

## 172. Do Not Reorder Content With CSS in a Confusing Way

CSS layout can visually reorder content.

Example:

```css
.container {
  display: flex;
}

.first {
  order: 2;
}

.second {
  order: 1;
}
```

The visual order may differ from DOM order.

Use this carefully because keyboard navigation, reading order, and visual order can become confusing.

---

## 173. DOM Order Should Usually Match Visual Order

Prefer:

```text id="mq8v5w"
DOM order
=
Visual order
=
Interaction order
```

This creates a more predictable experience.

---

## 174. Avoid Placeholder Content That Looks Like Real Controls

Users should be able to distinguish:

```text id="0a6k2d"
Interactive controls
Static content
Disabled controls
Loading placeholders
```

Visual ambiguity can become an accessibility issue.

---

## 175. Use Clear State Styling

Controls should communicate state through multiple signals:

```text id="d3k4ja"
Focused
Selected
Pressed
Expanded
Disabled
Invalid
Loading
```

Do not rely on a subtle color change alone.

---

## 176. Accessible Disabled States

For actual native controls:

```html
<button disabled>
  Save
</button>
```

For custom components, ensure the state is exposed semantically.

Do not create a custom disabled style without corresponding interaction behavior.

---

## 177. Readability Matters

Use:

* Adequate line height
* Clear font size
* Comfortable spacing
* Sufficient contrast
* Reasonable line length

Example:

```css
.article {
  max-width: 70ch;
  line-height: 1.6;
}
```

Readable content benefits all users.

---

## 178. Avoid Extremely Long Lines

Long text lines increase reading difficulty.

A reasonable maximum width improves readability:

```css
.content {
  max-width: 70ch;
}
```

The exact value can vary with the design.

---

## 179. Do Not Justify Text Automatically

Fully justified text can create uneven spacing that is harder for some readers.

Prefer natural text alignment unless there is a strong typographic reason otherwise.

---

## 180. Use Adequate Line Height

Avoid overly compressed text:

```css
body {
  line-height: 1;
}
```

A comfortable value such as:

```css
body {
  line-height: 1.5;
}
```

often improves readability.

The exact value depends on typography.

---

## 181. Avoid All-Caps Body Text

Large amounts of:

```text id="u8u4g2"
ALL CAPS TEXT
```

can reduce readability.

Use capitalization for headings and emphasis where appropriate, not as a default body-text strategy.

---

## 182. Avoid Text That Depends on Visual Position

Do not write instructions such as:

```text id="h3b8p1"
"Click the button on the right."
```

Responsive layouts can move the control.

Prefer:

```text id="w9f7vq"
"Select Save to continue."
```

The instruction refers to meaning, not location.

---

## 183. Avoid Instructions Based on Color

Weak:

```text id="k8s6n0"
"Click the green button."
```

Better:

```text id="g6t6e4"
"Select Save."
```

Color should not be the only identifying characteristic.

---

## 184. Accessible Notifications Should Survive Context Changes

Important notifications should remain discoverable if the user changes focus or navigates within the same task.

Transient animations alone are unreliable.

Use appropriate status messaging.

---

## 185. Support Reduced Transparency and Contrast Preferences Where Practical

Some users configure system or browser accessibility preferences.

Do not depend on:

```text id="mm7j1a"
Transparency
Blur
Subtle shadows
Very low contrast
```

to convey important information.

Provide robust semantic and visual signals.

---

## 186. Do Not Use Blur as the Only Focus or State Signal

A blurred or glowing effect may look attractive but can be difficult to perceive.

Combine visual styling with clear semantic state.

---

## 187. Accessibility and Dark Mode

Dark mode does not automatically mean accessible.

Check:

* Text contrast
* Placeholder contrast
* Borders
* Focus rings
* Icons
* Disabled states
* Error states
* Success states

Every theme should preserve meaningful distinctions.

---

## 188. Test Both Light and Dark Themes

An element that is readable in light mode may become low-contrast in dark mode.

Test important states in every supported theme.

---

## 189. Avoid Theme-Dependent Meaning

Do not make a status distinguishable only because a color looks different in one theme.

Use semantics and text as well.

---

## 190. Accessibility and Custom Fonts

Custom fonts can affect:

* Legibility
* Character distinction
* Rendering
* Loading behavior

Do not let typography become a barrier to understanding.

Provide reasonable fallbacks.

---

## 191. Avoid Unreadable Icon Fonts

Icon fonts can create semantic and rendering problems.

Inline SVG or accessible image/icon techniques can provide more control.

Whatever mechanism is used, icon-only controls still need accessible names.

---

## 192. Accessibility and JavaScript Failures

Core content should remain as usable as practical when JavaScript fails or is unavailable.

Semantic HTML helps.

Example:

```html
<a href="/projects">
  Projects
</a>
```

A navigation link has useful semantics even before JavaScript enhancement.

---

## 193. Progressive Enhancement

Start with a functional baseline.

Example:

```html
<form action="/search" method="get">
  <label for="query">
    Search
  </label>

  <input
    id="query"
    name="q"
  >

  <button type="submit">
    Search
  </button>
</form>
```

JavaScript can enhance this behavior without replacing the semantic foundation.

---

## 194. Do Not Build Essential Navigation Entirely in JavaScript

A page should not become unusable simply because a click handler failed to initialize.

Use real links for navigation:

```html
<a href="/projects">
  Projects
</a>
```

---

## 195. Accessibility and Server Rendering

Server-rendered HTML can provide meaningful content before client-side JavaScript executes.

This can improve robustness and perceived availability.

Ensure the server output itself contains meaningful semantics rather than depending entirely on client hydration.

---

## 196. React Accessibility

React uses regular DOM accessibility semantics.

Use:

```jsx
<button
  type="button"
  onClick={handleSave}
>
  Save
</button>
```

rather than:

```jsx
<div
  onClick={handleSave}
>
  Save
</div>
```

React does not remove the importance of semantic HTML.

---

## 197. Use `htmlFor` With React Labels

React uses `htmlFor`:

```jsx
<label htmlFor="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
/>
```

This preserves the explicit label relationship.

---

## 198. React ARIA Attributes

ARIA attributes use their standard names in JSX:

```jsx
<button
  aria-expanded={isOpen}
  aria-controls="menu"
>
  Menu
</button>
```

Keep the state synchronized with the actual component state.

---

## 199. React Focus Management

Use refs when focus must move intentionally:

```jsx
const inputRef = useRef(null);

function focusInput() {
  inputRef.current?.focus();
}
```

Focus management should correspond to a meaningful interaction.

Do not use refs to control every aspect of the interface.

---

## 200. Avoid Using `useEffect` for Every Focus Requirement

If focus can be controlled directly as part of an event:

```jsx
function handleOpen() {
  setOpen(true);
}
```

and the resulting component lifecycle handles focus appropriately, avoid unnecessary effects.

Effects should synchronize with external systems, not replace simple event-driven logic without reason.

---

## 201. Accessible React Lists

Use stable keys:

```jsx
users.map((user) => (
  <li key={user.id}>
    {user.name}
  </li>
))
```

Correct keys improve UI consistency, although keys themselves are not an accessibility feature.

Unstable rendering can indirectly create confusing focus and state behavior.

---

## 202. Do Not Use Index Keys for Dynamic Interactive Lists Without Reason

If items can be inserted, deleted, or reordered:

```jsx
items.map((item, index) => (
  <Item key={index} item={item} />
))
```

can cause component identity problems.

Prefer stable identifiers:

```jsx
items.map((item) => (
  <Item
    key={item.id}
    item={item}
  />
))
```

Stable identity helps preserve user interaction state predictably.

---

## 203. Accessible React Forms

Example:

```jsx
function ContactForm() {
  return (
    <form>
      <label htmlFor="name">
        Name
      </label>

      <input
        id="name"
        name="name"
        type="text"
      />

      <button type="submit">
        Send message
      </button>
    </form>
  );
}
```

Start with native semantics before adding abstractions.

---

## 204. React Error Messages

Example:

```jsx
<input
  id="email"
  aria-invalid={Boolean(error)}
  aria-describedby={
    error ? "email-error" : undefined
  }
/>

{error && (
  <p id="email-error">
    {error}
  </p>
)}
```

The error relationship should appear only when the error exists.

---

## 205. React Dialogs

Dialog state should remain explicit:

```jsx
<button
  type="button"
  onClick={() => setOpen(true)}
>
  Delete project
</button>
```

When open, manage:

* Focus
* Escape
* Dialog labelling
* Background interaction
* Return focus

Do not rely on visual overlays alone.

---

## 206. Do Not Disable Background Content Visually Only

A modal backdrop does not automatically make the background inaccessible.

A true modal experience must appropriately manage focus and interaction with the background.

Use well-tested dialog primitives when implementing complex modal behavior.

---

## 207. Accessibility and Next.js

Framework routing does not remove the need for:

* Meaningful headings
* Focus management
* Page titles
* Accessible links
* Semantic HTML
* Error states

After client-side route changes, verify that users can identify the new page context.

---

## 208. Accessibility Testing With Keyboard

Perform a manual keyboard pass.

Typical sequence:

```text id="7a9x2a"
Tab
Shift + Tab
Enter
Space
Arrow keys where relevant
Escape
```

Check whether every interactive feature can be completed.

---

## 209. Test Without a Mouse

A practical test:

1. Put the mouse aside.
2. Start at the top of the page.
3. Use only the keyboard.
4. Complete the primary workflow.

Examples:

```text id="1jx3e4"
Navigate
Search
Open menu
Submit form
Open dialog
Confirm action
Close dialog
```

If the workflow cannot be completed, there may be an accessibility problem.

---

## 210. Test With Screen Reader Semantics

A screen reader test should verify:

* Page title
* Heading structure
* Landmarks
* Link names
* Button names
* Form labels
* Error messages
* Dynamic updates
* Dialogs
* Current navigation state

Do not rely only on visual inspection.

---

## 211. Inspect the Accessibility Tree

Browser developer tools can expose the accessibility tree.

Use it to inspect:

```text id="k0wh2y"
Role
Name
Description
State
Value
Relationships
```

The accessibility tree often reveals why a visually correct component is not exposed correctly.

---

## 212. Use Automated Accessibility Testing

Automated testing can identify common issues such as:

* Missing labels
* Invalid ARIA
* Contrast problems
* Missing alternative text
* Duplicate IDs
* Structural problems

Automated tools are useful but incomplete.

---

## 213. Do Not Treat Automated Results as Complete Accessibility

A tool cannot fully evaluate:

```text id="zq5w1s"
Whether instructions are understandable
Whether keyboard flow makes sense
Whether focus placement is appropriate
Whether content order is logical
Whether an interaction is genuinely usable
```

Manual testing remains important.

---

## 214. Use Browser Accessibility Audits

Browser tools can provide useful automated checks.

Use them during development, but investigate findings rather than blindly suppressing warnings.

---

## 215. Test With Multiple Interaction Modes

Where practical, test:

```text id="k3q2ca"
Mouse
Keyboard
Touch
Screen reader
Zoom
High contrast or forced colors
Reduced motion
```

Different modes can reveal different problems.

---

## 216. Test Zoom and Text Scaling

Increase browser zoom or text size.

Check:

* Navigation
* Forms
* Dialogs
* Tables
* Buttons
* Long text
* Error messages

The interface should remain usable rather than becoming clipped or overlapping.

---

## 217. Test Narrow Widths

At narrow widths, inspect:

```text id="3w5g7f"
Horizontal scrolling
Clipped controls
Overlapping text
Hidden labels
Unreachable content
Broken dialogs
```

Responsive accessibility is part of overall accessibility.

---

## 218. Test Reduced Motion

Enable the operating system or browser preference for reduced motion.

Verify that:

* Important content remains visible
* Animations become less intense
* Functionality remains usable
* Transitions do not become confusing

---

## 219. Test High Contrast and Forced Colors

Some users rely on high-contrast or forced-color environments.

Avoid designs that depend entirely on:

```text id="xj78t1"
Background images
Subtle shadows
Color-only borders
Very low contrast effects
```

Use semantic boundaries and adaptable CSS.

---

## 220. Do Not Override User Preferences Unnecessarily

Respect user settings where applicable:

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

Other user preferences may affect contrast, color, text, and interaction.

Robust interfaces adapt rather than fighting user configuration.

---

## 221. Accessibility and Performance

Accessibility features should not require excessive client-side complexity.

Semantic HTML often provides accessibility with little code:

```html
<button type="button">
  Save
</button>
```

Compared with implementing a custom interactive widget:

```text id="4k2q9k"
ARIA
Keyboard handling
Focus management
State synchronization
Pointer events
Screen reader testing
```

Prefer the simpler native solution when it meets the requirement.

---

## 222. Avoid Accessibility Abstraction That Hides Semantics

A custom component API should make accessibility visible.

Prefer:

```jsx
<Dialog
  title="Delete project"
  open={open}
>
  ...
</Dialog>
```

over:

```jsx
<UniversalOverlay
  mode="7"
  roleType="x"
  behavior="complex"
>
  ...
</UniversalOverlay>
```

Abstractions should preserve semantic clarity.

---

## 223. Reusable Components Should Encode Accessibility

A shared button component can establish a strong baseline:

```jsx
function Button({
  children,
  type = "button",
  disabled = false,
  onClick
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

Consumers receive correct native semantics by default.

---

## 224. Do Not Hide Required Accessibility Props

For a generic component:

```jsx
function IconButton({
  label,
  children,
  onClick
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

Requiring `label` makes the accessibility contract explicit.

---

## 225. Accessibility and Component APIs

A component API should make incorrect accessibility usage difficult.

Example:

```jsx
<IconButton
  label="Close"
  onClick={handleClose}
>
  <CloseIcon aria-hidden="true" />
</IconButton>
```

The API communicates that icon-only controls require a label.

---

## 226. Avoid Making `aria-label` the Universal Solution

Developers sometimes add:

```jsx
aria-label="..."
```

to everything.

This is not always correct.

Use the strongest native or visible semantic relationship available:

```text id="c1m7os"
Visible text
Associated label
Heading
Description
ARIA only when needed
```

---

## 227. Use `aria-hidden` Carefully

Example:

```html
<span aria-hidden="true">
  →
</span>
```

This is appropriate when the icon is decorative.

Do not hide content from assistive technologies if it contains meaningful information.

---

## 228. Never Hide Interactive Content With `aria-hidden`

Avoid:

```html
<button aria-hidden="true">
  Save
</button>
```

An interactive control that is visually available but hidden from the accessibility tree creates an inconsistent experience.

---

## 229. Keep Focusable Elements Available to Assistive Technology

Avoid combinations such as:

```html
<div
  aria-hidden="true"
  tabindex="0"
>
  Content
</div>
```

Focusable content should not be arbitrarily removed from the accessibility tree.

---

## 230. Accessibility and CSS Pseudo-Elements

Do not rely on:

```css
button::before {
  content: "Delete";
}
```

for essential text.

Pseudo-elements are presentation mechanisms, not a reliable source of semantic content.

---

## 231. Do Not Put Meaningful Content Only in CSS

This:

```css
.status::before {
  content: "Success";
}
```

should not be the only representation of important information.

Use actual DOM text:

```html
<p class="status">
  Success
</p>
```

---

## 232. Use Semantic State Before Visual State

Instead of:

```css
.selected {
  background: blue;
}
```

also represent selection semantically when appropriate:

```html
<button
  aria-pressed="true"
>
  Favorite
</button>
```

The visual style communicates appearance.

The semantic state communicates meaning.

---

## 233. Accessibility and Routing Links

Links should work as links:

```html
<a href="/projects">
  Projects
</a>
```

Users should be able to:

* Open in a new tab
* Copy the link
* Focus it with the keyboard
* Use browser navigation
* Use assistive technology to navigate links

Do not replace normal links with JavaScript click handlers without need.

---

## 234. Accessibility and Forms Without JavaScript

A form should have a meaningful fallback where the application architecture permits.

Example:

```html
<form action="/contact" method="post">
  ...
</form>
```

JavaScript can improve the experience while the semantic form remains understandable.

---

## 235. Preserve Native Form Submission Semantics

Do not unnecessarily prevent default form behavior.

If JavaScript handles submission, ensure equivalent semantics remain.

A submit button should still be:

```html
<button type="submit">
  Send message
</button>
```

---

## 236. Use the Correct Button Type

Inside forms:

```html
<button type="submit">
  Save
</button>

<button type="button">
  Cancel
</button>

<button type="reset">
  Reset
</button>
```

Without an explicit type, a button inside a form may act as a submit button.

Make the intention explicit.

---

## 237. Avoid Nested Interactive Elements

Do not place:

```html
<button>
  <a href="/projects">
    Projects
  </a>
</button>
```

Interactive elements should not be nested unnecessarily.

Use the correct single interactive element.

---

## 238. Avoid Clickable Containers With Nested Controls

A whole card might appear clickable, but placing buttons inside it can create interaction conflicts.

Instead of:

```html
<article onclick="openProject()">
  <h2>Project</h2>

  <button type="button">
    Delete
  </button>
</article>
```

consider making the title or explicit action a link/button.

Interaction boundaries should be clear.

---

## 239. Accessible Cards

A card can contain:

```html
<article>
  <h2>
    <a href="/projects/javascript-reference">
      JavaScript Reference
    </a>
  </h2>

  <p>
    A structured JavaScript learning reference.
  </p>
</article>
```

This gives the user a clear navigation target without making the entire container a custom interactive element.

---

## 240. Avoid Huge Click Targets That Contain Multiple Actions

If a card includes:

```text id="4i8p8r"
Open
Edit
Delete
```

making the entire card one giant clickable target can conflict with the smaller actions.

Represent each action separately.

---

## 241. Accessible Search Filters

When filters can be expanded or collapsed:

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="filters"
>
  Filters
</button>

<form id="filters" hidden>
  ...
</form>
```

State should remain synchronized.

---

## 242. Accessible Sort Controls

A sorting control should identify its current state.

Example:

```html
<label for="sort">
  Sort by
</label>

<select id="sort" name="sort">
  <option value="name">
    Name
  </option>
  <option value="date">
    Date
  </option>
</select>
```

Native controls often provide the simplest accessible solution.

---

## 243. Accessible Pagination Controls

Use meaningful labels for next and previous actions:

```html
<a href="?page=2" aria-label="Next page">
  Next
</a>
```

For icon-only controls:

```html
<button
  type="button"
  aria-label="Next page"
>
  →
</button>
```

---

## 244. Accessible Breadcrumb Current State

Mark the current location:

```html
<li aria-current="page">
  Projects
</li>
```

Do not make the current page item a redundant link unless the design requires it.

---

## 245. Use `aria-current` for Current Context, Not Selection

For example:

```html
<a
  href="/projects"
  aria-current="page"
>
  Projects
</a>
```

communicates the current page.

For a selected tab, use the semantics appropriate to tabs.

Do not use `aria-current` for every kind of selected state.

---

## 246. Accessible Multi-Step Forms

Communicate:

```text id="qf0vxb"
Current step
Completed steps
Remaining steps
Progress
```

Example:

```html
<nav aria-label="Progress">
  <ol>
    <li aria-current="step">
      Account
    </li>
    <li>
      Profile
    </li>
    <li>
      Confirmation
    </li>
  </ol>
</nav>
```

The exact pattern depends on the interface.

---

## 247. Do Not Rely Only on a Progress Bar

A visual progress bar may not communicate the current step adequately.

Provide text:

```text id="5go9g7"
Step 2 of 3: Profile
```

This helps users understand the context.

---

## 248. Preserve Focus in Multi-Step Forms

When moving between steps, focus should move logically to the new step heading or first relevant control.

Avoid leaving keyboard focus on an element that no longer exists.

---

## 249. Accessibility and Drag-and-Drop

Drag-and-drop can be difficult for keyboard and motor-impaired users.

If dragging is important, provide an alternative interaction.

For example:

```text id="cm55u6"
Move up
Move down
Move to position
```

Do not make drag-and-drop the only way to perform a task.

---

## 250. Reordering Lists

A draggable list should also provide keyboard-accessible controls.

Example concept:

```html
<button type="button">
  Move project up
</button>

<button type="button">
  Move project down
</button>
```

The exact controls depend on the feature.

---

## 251. Accessibility and File Uploads

Provide:

```html
<label for="resume">
  Resume
</label>

<input
  id="resume"
  name="resume"
  type="file"
>
```

Explain:

* Accepted file types
* Maximum size
* Whether multiple files are allowed

Example:

```html
<p id="resume-help">
  PDF files only. Maximum size: 5 MB.
</p>
```

---

## 252. Do Not Rely Only on `accept`

This:

```html
<input
  type="file"
  accept=".pdf"
>
```

helps guide the browser UI but does not replace server-side validation.

The server must validate uploaded files independently.

---

## 253. Accessible File Upload Errors

Clearly communicate:

```text id="jv3j5y"
Unsupported file type
File too large
Upload failed
Upload cancelled
Upload complete
```

For long uploads, provide progress information when appropriate.

---

## 254. Accessible Drag-and-Drop Uploads

If drag-and-drop is provided, also provide a normal file selection mechanism.

Example:

```html
<label for="file">
  Choose file
</label>

<input
  id="file"
  type="file"
>
```

Drag-and-drop should enhance, not replace, basic access.

---

## 255. Accessible Authentication Forms

Login forms should clearly label:

```text id="9g5y2a"
Email
Password
Remember me
Submit
Forgot password
```

Errors should identify the affected field or authentication state.

---

## 256. Password Visibility Controls

A password visibility toggle should have an accessible name and state.

Example:

```html
<button
  type="button"
  aria-pressed="false"
  aria-label="Show password"
>
  ...
</button>
```

When visible:

```html
<button
  type="button"
  aria-pressed="true"
  aria-label="Hide password"
>
  ...
</button>
```

Keep visible state and semantic state synchronized.

---

## 257. Avoid Requiring Complex Password Interaction

Do not impose unnecessary interaction requirements such as:

```text id="1skn1j"
Click three hidden icons
Use a specific pointer gesture
```

Authentication should remain usable with keyboard and assistive technologies.

---

## 258. Accessible Error Recovery

After an error:

```text id="3xaxu1"
Tell the user what went wrong
 ↓
Explain what can be done
 ↓
Provide the relevant action
```

Example:

```html
<p role="alert">
  The upload failed.
</p>

<button type="button">
  Try again
</button>
```

---

## 259. Accessibility and Data Privacy

Accessibility information should not expose private data unintentionally.

For example, hidden text used only for screen readers should still respect the same privacy considerations as visible text.

Do not assume:

```css
.sr-only
```

means:

```text
safe to expose
```

Screen readers can access hidden accessible content.

---

## 260. Do Not Hide Sensitive Content From Visual Users Only

If sensitive content must not be exposed, do not merely visually hide it.

Use actual authorization and data-access controls.

CSS is not a security boundary.

---

## 261. Accessibility and Security Are Different Concerns

A screen-reader-only element:

```html
<span class="sr-only">
  Internal secret
</span>
```

is still content.

Do not use visual hiding as a security mechanism.

---

## 262. Accessibility and Internationalization

Accessible interfaces should accommodate languages with different:

* Text lengths
* Writing directions
* Sentence structures
* Number formats
* Date formats

Avoid fixed-width layouts that assume English-length strings.

---

## 263. Support Right-to-Left Interfaces

If the application supports RTL languages:

```html
<html dir="rtl">
```

Use logical CSS properties where appropriate:

```css
padding-inline-start: 1rem;
margin-inline-end: 1rem;
```

Avoid hard-coding left/right assumptions unnecessarily.

---

## 264. Prefer Logical CSS Properties

Use:

```css
margin-inline-start
padding-inline-end
inset-inline-start
border-inline-start
```

when the layout should adapt to writing direction.

This improves internationalization and reduces direction-specific overrides.

---

## 265. Do Not Encode Direction Into Content

Avoid labels such as:

```text id="01r4c0"
Arrow pointing left = Back
```

Instead, use semantic labels:

```html
<button aria-label="Previous">
  ...
</button>
```

Visual direction can adapt to the interface language.

---

## 266. Dates and Numbers

Use locale-aware formatting where relevant:

```js id="z2m7n4"
const formatted = new Intl.DateTimeFormat(
  "en-US"
).format(new Date());
```

Accessible interfaces should not assume that one formatting convention works for everyone.

---

## 267. Avoid Ambiguous Date Formats

Dates like:

```text id="5h9q4w"
03/04/2026
```

can be ambiguous across locales.

Prefer formats or surrounding text that make the intended date clear.

---

## 268. Accessible Time Information

When displaying time:

```html
<time datetime="2026-09-17T14:30:00Z">
  2:30 PM
</time>
```

The machine-readable representation can remain precise while the visible representation can follow the user's locale.

---

## 269. Accessibility in Documentation

Documentation should use:

```text id="qwv0zh"
Clear headings
Descriptive links
Readable code examples
Meaningful tables
Logical structure
```

Do not make documentation itself inaccessible while discussing accessibility.

---

## 270. Accessible Markdown

For Markdown:

```md
[View projects](https://example.com/projects)
```

is better than:

```md
[Click here](https://example.com/projects)
```

Use headings:

```md
# Projects

## Featured Projects

### JavaScript Reference
```

Structure should reflect meaning.

---

## 271. Avoid Link URLs as Link Text When Meaning Is Better

Weak:

```md
[https://example.com/projects](https://example.com/projects)
```

Better:

```md
[View projects](https://example.com/projects)
```

unless displaying the literal URL itself is the purpose.

---

## 272. Accessible Tables in Documentation

Use a clear header row:

```md
| Method | Purpose |
| --- | --- |
| GET | Read data |
| POST | Create data |
```

Avoid tables when content is not naturally tabular.

---

## 273. Accessibility and Error Logging

Error messages should remain useful without exposing sensitive details.

Example:

```js id="m9br3c"
console.error("User save failed", {
  requestId
});
```

Avoid:

```js id="hr4q0k"
console.error(user.password);
```

---

## 274. Accessibility and Performance

Slow interfaces can become less accessible.

Users may experience difficulty when:

* Content appears unpredictably
* Focus moves slowly
* Controls remain unresponsive
* Loading states provide no feedback
* Large scripts block interaction

Accessibility and performance are often connected.

---

## 275. Avoid Blocking the Main Thread

Long synchronous work can delay:

* Keyboard input
* Screen reader updates
* Focus changes
* Visual rendering
* User interaction

If computation is expensive, consider appropriate optimization or offloading.

---

## 276. Accessibility and Error Recovery After Network Failures

If a network failure occurs:

```text id="xcy8x7"
Do not silently do nothing.
```

Instead:

```html
<div role="alert">
  Could not save changes.
</div>

<button type="button">
  Try again
</button>
```

The user should understand the current state.

---

## 277. Do Not Announce Every Network Event

Not every request needs an announcement.

A background refresh may not require a user-visible message.

Announce only meaningful state changes.

---

## 278. Accessibility and Background Updates

If content changes in the background, ensure that:

* Focus remains stable
* Important updates are announced when necessary
* The interface does not unexpectedly reorder
* Users can continue their task

Dynamic systems should preserve predictability.

---

## 279. Accessible Search Suggestions

If a search box displays suggestions:

```text id="w7r2f8"
Input
 ↓
Suggestions appear
 ↓
Keyboard selection
 ↓
Selection announced
 ↓
Submit or navigate
```

The widget should expose appropriate relationships and states.

---

## 280. Do Not Treat Accessibility as a CSS Task

Accessibility is not just:

```text id="g87u6u"
Contrast
Font size
Spacing
```

It also includes:

```text id="f7x9c4"
Semantics
Keyboard
Focus
Forms
Errors
Screen readers
State
Interaction
Navigation
Content structure
```

Visual accessibility is only one part of the problem.

---

## 281. Do Not Treat Accessibility as an ARIA Task

Adding:

```html
aria-label="..."
```

does not automatically make a component accessible.

Accessibility begins with:

```text id="v3ckqa"
Correct semantics
Correct behavior
Correct interaction
Correct focus
```

ARIA supplements those foundations.

---

## 282. Prefer Platform Semantics

Browsers already understand many controls:

```html
<button></button>
<input>
<select></select>
<textarea></textarea>
<a href=""></a>
```

The platform provides robust baseline accessibility.

Use it.

---

## 283. Accessibility as Progressive Enhancement

Start with:

```text id="g8x2t4"
Semantic HTML
 ↓
Keyboard support
 ↓
Visible focus
 ↓
Accessible states
 ↓
Enhanced interaction
```

Do not begin with a completely custom widget when native HTML is sufficient.

---

## 284. Reusable Accessibility Patterns

Common reusable patterns include:

```text id="q2r7ku"
Accessible button
Form field
Icon button
Disclosure
Dialog
Tabs
Accordion
Pagination
Breadcrumbs
Status message
Error message
```

Centralizing these patterns can reduce repeated accessibility mistakes.

---

## 285. Test Reusable Components Across Contexts

A component may be accessible in one context and broken in another.

Test:

```text id="09lyap"
Different labels
Different sizes
Loading state
Disabled state
Error state
Keyboard use
Screen reader use
Responsive layouts
```

---

## 286. Accessibility Regression Testing

Once an accessibility bug is fixed, add a test where practical.

Examples:

```text id="4b7h9h"
Missing label
Missing accessible name
Broken keyboard focus
Incorrect ARIA state
Dialog focus failure
```

Regression tests protect against future changes.

---

## 287. Use Automated Checks in CI

Where practical, run accessibility checks automatically.

The exact tooling depends on the stack.

Automated checks should complement:

* Unit tests
* Integration tests
* Manual keyboard testing
* Screen reader testing
* Visual inspection

---

## 288. Accessibility Testing Matrix

For important workflows, test combinations such as:

```text id="pp7xhz"
Keyboard + desktop
Screen reader + keyboard
Zoom + keyboard
Mobile touch
Reduced motion
Dark mode
```

Not every feature needs every combination every time, but critical workflows deserve broader testing.

---

## 289. Accessibility Audit Workflow

A practical audit can follow:

```text id="9a2f71"
Semantic structure
        ↓
Keyboard navigation
        ↓
Focus management
        ↓
Forms and errors
        ↓
Screen reader semantics
        ↓
Contrast and visual states
        ↓
Zoom and responsive behavior
        ↓
Reduced motion
        ↓
Automated checks
        ↓
Real user workflows
```

---

## 290. Test Primary User Journeys

Prioritize workflows such as:

```text id="sm4x5n"
Sign in
Search
Create
Edit
Delete
Checkout
Upload
Submit contact form
Navigate between pages
```

An accessible isolated button is useful.

An accessible complete workflow is more important.

---

## 291. Accessibility and Testing Strategy

A strong testing strategy combines:

```text id="21mtq4"
Static analysis
Automated accessibility checks
Unit tests
Integration tests
Keyboard testing
Screen reader testing
Manual interaction testing
```

No single technique finds every accessibility problem.

---

## 292. Document Known Accessibility Constraints

If a component has a known limitation, document it clearly.

Example:

```text id="74p3r1"
This component currently supports keyboard navigation but does not
yet provide typeahead interaction.
```

Known limitations should not be hidden.

---

## 293. Accessibility Checklist

Before shipping a page or feature:

* [ ] Semantic HTML is used.
* [ ] Interactive elements use native controls where possible.
* [ ] Every important control has an accessible name.
* [ ] Links represent navigation.
* [ ] Buttons represent actions.
* [ ] Heading hierarchy reflects content structure.
* [ ] Landmarks are meaningful.
* [ ] The page has a clear main content region.
* [ ] Skip navigation is available where appropriate.
* [ ] Everything works with a keyboard.
* [ ] Focus indicators are visible.
* [ ] Focus order is logical.
* [ ] Focus moves intentionally after dialogs and major state changes.
* [ ] No positive `tabindex` values are used unnecessarily.
* [ ] Images have appropriate alternatives.
* [ ] Decorative images use empty alternatives when appropriate.
* [ ] Form fields have labels.
* [ ] Required fields are identified.
* [ ] Validation errors are clear.
* [ ] Errors are associated with relevant fields.
* [ ] Dynamic status changes are communicated appropriately.
* [ ] Color is not the only way meaning is communicated.
* [ ] Text and important controls have sufficient contrast.
* [ ] Zoom remains usable.
* [ ] Responsive layouts remain usable at narrow widths.
* [ ] Reduced motion is respected.
* [ ] Media has appropriate alternatives.
* [ ] Tables use proper headers and captions where useful.
* [ ] Custom widgets expose correct roles and states.
* [ ] `aria-expanded`, `aria-selected`, `aria-pressed`, and similar states reflect reality.
* [ ] `aria-hidden` is not hiding meaningful interactive content.
* [ ] Navigation updates page context appropriately.
* [ ] Loading, empty, and error states are distinguishable.
* [ ] Destructive actions are clearly labeled.
* [ ] Important workflows can be completed without a mouse.
* [ ] Accessibility has been checked with more than one method.
* [ ] Accessibility regressions have tests where practical.

---

## 294. Practical Accessibility Decision Framework

When building an interactive feature, ask:

### Is there a native HTML element for this?

Use it first.

### What is the semantic role?

Identify what the control actually represents.

### What is its accessible name?

Make sure users can identify it.

### Can it be completed with a keyboard?

Test the entire workflow.

### What happens to focus?

Define focus movement intentionally.

### What states exist?

Consider:

```text
Expanded
Collapsed
Selected
Pressed
Disabled
Invalid
Loading
```

### What changes dynamically?

Determine whether announcements are needed.

### What happens under zoom?

Test enlarged content.

### What happens with reduced motion?

Respect the preference.

### What happens without color perception?

Use multiple visual and semantic cues.

### What happens with a screen reader?

Inspect the accessibility tree and complete the workflow.

### Can the native platform solve this?

Prefer native semantics over custom implementations.

---

## 295. Final Principles

1. Accessibility is part of correct interface engineering.
2. Start with semantic HTML.
3. Prefer native controls over custom widgets.
4. Use ARIA to supplement semantics, not replace them unnecessarily.
5. Give every important interactive control a meaningful accessible name.
6. Use links for navigation and buttons for actions.
7. Make complete workflows keyboard accessible.
8. Preserve visible focus indicators.
9. Keep focus order logical.
10. Manage focus intentionally after dialogs and major navigation changes.
11. Use meaningful headings and landmarks.
12. Provide appropriate text alternatives for meaningful images.
13. Mark decorative images so assistive technologies can ignore them.
14. Label every form control properly.
15. Associate validation errors with the fields they describe.
16. Distinguish loading, success, empty, and error states.
17. Do not rely on color alone.
18. Maintain sufficient contrast and readable typography.
19. Support browser zoom and responsive layouts.
20. Respect reduced-motion preferences.
21. Keep important content out of images and CSS-only content.
22. Make custom widgets expose correct roles, names, states, and keyboard behavior.
23. Avoid positive `tabindex` values.
24. Avoid unnecessary automatic focus changes.
25. Preserve user context during dynamic updates.
26. Keep DOM order aligned with visual and interaction order where possible.
27. Use clear, predictable interface language.
28. Provide accessible alternatives for drag-and-drop and other specialized interactions.
29. Do not use visual hiding as a security mechanism.
30. Treat screen-reader-only content as real user-facing content.
31. Test keyboard workflows manually.
32. Test with assistive technologies for important workflows.
33. Use automated accessibility checks as one part of a broader strategy.
34. Test responsive, zoomed, dark-mode, and reduced-motion states.
35. Encode accessibility into reusable component APIs.
36. Add regression tests for important accessibility fixes.
37. Treat accessibility problems as engineering defects, not cosmetic issues.
38. Prefer the simplest semantic implementation that meets the requirement.
39. Design for different users and interaction methods from the beginning.
40. An accessible interface should remain understandable, operable, and predictable throughout the entire user journey.
