"use strict";

// Select the form
const form = document.querySelector("#form");

// Select form fields
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const roleSelect = document.querySelector("#role");
const messageInput = document.querySelector("#message");
const termsCheckbox = document.querySelector("#terms");

if (form) {
// Submit event
form.addEventListener("submit", (event) => {
event.preventDefault();

```
console.log("Form submitted.");
```

});
}

// Reading input values
if (usernameInput) {
usernameInput.addEventListener("input", () => {
console.log(
"Username:",
usernameInput.value
);
});
}

if (emailInput) {
emailInput.addEventListener("input", () => {
console.log(
"Email:",
emailInput.value
);
});
}

if (passwordInput) {
passwordInput.addEventListener("input", () => {
console.log(
"Password length:",
passwordInput.value.length
);
});
}

// Reading select value
if (roleSelect) {
roleSelect.addEventListener("change", () => {
console.log(
"Selected role:",
roleSelect.value
);
});
}

// Reading checkbox value
if (termsCheckbox) {
termsCheckbox.addEventListener("change", () => {
console.log(
"Terms accepted:",
termsCheckbox.checked
);
});
}

// FormData
if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault();

```
const formData = new FormData(form);

console.log(
  "Username:",
  formData.get("username")
);

console.log(
  "Email:",
  formData.get("email")
);

console.log(
  "Role:",
  formData.get("role")
);

console.log(
  "Message:",
  formData.get("message")
);

console.log(
  "Terms:",
  formData.get("terms")
);
```

});
}

// Convert FormData to an object
if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault();

```
const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());

console.log("Form object:", data);
```

});
}

// Form validation
if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault();

```
const username = usernameInput?.value.trim() ?? "";
const email = emailInput?.value.trim() ?? "";
const password = passwordInput?.value ?? "";

if (!username) {
  console.error("Username is required.");
  return;
}

if (!email) {
  console.error("Email is required.");
  return;
}

if (password.length < 8) {
  console.error(
    "Password must contain at least 8 characters."
  );
  return;
}

console.log("Form validation passed.");
```

});
}

// checkValidity()
if (emailInput) {
emailInput.addEventListener("input", () => {
console.log(
"Email valid:",
emailInput.checkValidity()
);
});
}

// reportValidity()
if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault();

```
if (!form.checkValidity()) {
  form.reportValidity();
  return;
}

console.log("Native validation passed.");
```

});
}

// setCustomValidity()
if (usernameInput) {
usernameInput.addEventListener("input", () => {
if (usernameInput.value.length > 0) {
usernameInput.setCustomValidity("");
} else {
usernameInput.setCustomValidity(
"Please enter your username."
);
}
});
}

// required attribute validation
if (messageInput) {
messageInput.addEventListener("blur", () => {
if (messageInput.value.trim() === "") {
console.error("Message is required.");
}
});
}

// Radio buttons
const roleRadios = document.querySelectorAll(
'input[name="experience"]'
);

roleRadios.forEach((radio) => {
radio.addEventListener("change", () => {
if (radio.checked) {
console.log(
"Selected experience:",
radio.value
);
}
});
});

// Multiple checkboxes
const skillCheckboxes = document.querySelectorAll(
'input[name="skills"]'
);

skillCheckboxes.forEach((checkbox) => {
checkbox.addEventListener("change", () => {
const selectedSkills = [...skillCheckboxes]
.filter((item) => item.checked)
.map((item) => item.value);

```
console.log(
  "Selected skills:",
  selectedSkills
);
```

});
});

// Form reset
if (form) {
form.addEventListener("reset", () => {
console.log("Form reset.");
});
}

// Reset form programmatically
const resetButton = document.querySelector(
"#reset-button"
);

if (resetButton && form) {
resetButton.addEventListener("click", () => {
form.reset();
});
}

// Disable and enable a field
const toggleEmailButton = document.querySelector(
"#toggle-email"
);

if (toggleEmailButton && emailInput) {
toggleEmailButton.addEventListener(
"click",
() => {
emailInput.disabled = !emailInput.disabled;

```
  console.log(
    "Email disabled:",
    emailInput.disabled
  );
}
```

);
}

// Focus a field
const focusButton = document.querySelector(
"#focus-username"
);

if (focusButton && usernameInput) {
focusButton.addEventListener("click", () => {
usernameInput.focus();
});
}

// Select all form controls
if (form) {
const controls = form.elements;

console.log("Form controls:", controls);
console.log("Control count:", controls.length);
}

// Access a form control by name
if (form) {
const namedUsername = form.elements.namedItem(
"username"
);

console.log(
"Named username control:",
namedUsername
);
}

// File input
const fileInput = document.querySelector(
"#file"
);

if (fileInput) {
fileInput.addEventListener("change", () => {
const file = fileInput.files?.[0];

```
if (!file) {
  return;
}

console.log("File name:", file.name);
console.log("File type:", file.type);
console.log("File size:", file.size);
```

});
}

// Form submit using FormData entries
if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault();

```
const formData = new FormData(form);

for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
```

});
}
