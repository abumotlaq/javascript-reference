"use strict";

// alert()
const alertButton = document.querySelector(
"#alert-button"
);

if (alertButton) {
alertButton.addEventListener(
"click",
() => {
window.alert(
"Hello, Osama Abu Motlaq!"
);
}
);
}

// alert() with a dynamic message
const messageButton = document.querySelector(
"#message-button"
);

if (messageButton) {
messageButton.addEventListener(
"click",
() => {
const message =
"JavaScript Reference is running.";

```
  window.alert(message);
}
```

);
}

// confirm()
const confirmButton = document.querySelector(
"#confirm-button"
);

if (confirmButton) {
confirmButton.addEventListener(
"click",
() => {
const confirmed = window.confirm(
"Do you want to continue?"
);

```
  console.log(
    "User confirmed:",
    confirmed
  );
}
```

);
}

// confirm() with conditional logic
const deleteButton = document.querySelector(
"#delete-button"
);

if (deleteButton) {
deleteButton.addEventListener(
"click",
() => {
const confirmed = window.confirm(
"Are you sure you want to delete this item?"
);

```
  if (confirmed) {
    console.log(
      "Delete operation confirmed."
    );
  } else {
    console.log(
      "Delete operation canceled."
    );
  }
}
```

);
}

// confirm() returning a Boolean
function askConfirmation(message) {
return window.confirm(message);
}

const confirmation = askConfirmation(
"Continue with the operation?"
);

console.log(
"Confirmation result:",
confirmation
);

// prompt()
const promptButton = document.querySelector(
"#prompt-button"
);

if (promptButton) {
promptButton.addEventListener(
"click",
() => {
const name = window.prompt(
"Enter your name:"
);

```
  console.log(
    "Entered name:",
    name
  );
}
```

);
}

// prompt() with a default value
const defaultPromptButton =
document.querySelector(
"#default-prompt-button"
);

if (defaultPromptButton) {
defaultPromptButton.addEventListener(
"click",
() => {
const role = window.prompt(
"Enter your role:",
"Frontend Developer"
);

```
  console.log(
    "Entered role:",
    role
  );
}
```

);
}

// Handling prompt cancellation
const optionalPromptButton =
document.querySelector(
"#optional-prompt-button"
);

if (optionalPromptButton) {
optionalPromptButton.addEventListener(
"click",
() => {
const value = window.prompt(
"Enter a value:"
);

```
  if (value === null) {
    console.log(
      "Prompt was canceled."
    );

    return;
  }

  console.log(
    "Entered value:",
    value
  );
}
```

);
}

// Handling an empty prompt
const requiredPromptButton =
document.querySelector(
"#required-prompt-button"
);

if (requiredPromptButton) {
requiredPromptButton.addEventListener(
"click",
() => {
const name = window.prompt(
"Enter your name:"
);

```
  if (name === null) {
    console.log(
      "Prompt was canceled."
    );

    return;
  }

  if (name.trim() === "") {
    console.log(
      "No name was entered."
    );

    return;
  }

  console.log(
    "Hello:",
    name.trim()
  );
}
```

);
}

// Converting prompt input to a number
const numberPromptButton =
document.querySelector(
"#number-prompt-button"
);

if (numberPromptButton) {
numberPromptButton.addEventListener(
"click",
() => {
const input = window.prompt(
"Enter a number:"
);

```
  if (input === null) {
    console.log(
      "Prompt was canceled."
    );

    return;
  }

  const number = Number(input);

  if (Number.isNaN(number)) {
    console.log(
      "Invalid number."
    );

    return;
  }

  console.log(
    "Number:",
    number
  );
}
```

);
}

// confirm() before an action
function confirmAction(action) {
const confirmed =
window.confirm(
`Do you want to ${action}?`
);

if (!confirmed) {
console.log(
"Action canceled."
);

```
return false;
```

}

console.log(
"Action confirmed:",
action
);

return true;
}

const actionButton = document.querySelector(
"#action-button"
);

if (actionButton) {
actionButton.addEventListener(
"click",
() => {
confirmAction(
"continue with the operation"
);
}
);
}

// alert() after an operation
function completeOperation() {
console.log(
"Operation completed."
);

window.alert(
"Operation completed successfully."
);
}

const completeButton =
document.querySelector(
"#complete-button"
);

if (completeButton) {
completeButton.addEventListener(
"click",
completeOperation
);
}

// Multiple dialog steps
const workflowButton =
document.querySelector(
"#workflow-button"
);

if (workflowButton) {
workflowButton.addEventListener(
"click",
() => {
const name = window.prompt(
"Enter your name:"
);

```
  if (name === null) {
    return;
  }

  const confirmed =
    window.confirm(
      `Continue as ${name.trim()}?`
    );

  if (!confirmed) {
    window.alert(
      "Operation canceled."
    );

    return;
  }

  window.alert(
    `Welcome, ${name.trim()}!`
  );
}
```

);
}

// Dialog methods through a helper
const dialog = {
alert(message) {
window.alert(message);
},

confirm(message) {
return window.confirm(message);
},

prompt(message, defaultValue = "") {
return window.prompt(
message,
defaultValue
);
},
};

const helperButton = document.querySelector(
"#helper-button"
);

if (helperButton) {
helperButton.addEventListener(
"click",
() => {
dialog.alert(
"Dialog helper example."
);

```
  const confirmed =
    dialog.confirm(
      "Continue to the next step?"
    );

  if (!confirmed) {
    return;
  }

  const value = dialog.prompt(
    "Enter a value:",
    "JavaScript"
  );

  console.log(
    "Dialog value:",
    value
  );
}
```

);
}

// Dialog result handling
function collectUserInput() {
const name = window.prompt(
"Enter your name:"
);

if (name === null) {
return null;
}

const confirmed =
window.confirm(
`Is "${name.trim()}" correct?`
);

if (!confirmed) {
return null;
}

return {
name: name.trim(),
};
}

const collectButton =
document.querySelector(
"#collect-button"
);

if (collectButton) {
collectButton.addEventListener(
"click",
() => {
const user =
collectUserInput();

```
  if (!user) {
    console.log(
      "No user data collected."
    );

    return;
  }

  console.log(
    "Collected user:",
    user
  );
}
```

);
}

// Preventing accidental empty input
function requestName() {
while (true) {
const name = window.prompt(
"Enter your name:"
);

```
if (name === null) {
  return null;
}

if (name.trim() !== "") {
  return name.trim();
}

window.alert(
  "Please enter a valid name."
);
```

}
}

const requestNameButton =
document.querySelector(
"#request-name-button"
);

if (requestNameButton) {
requestNameButton.addEventListener(
"click",
() => {
const name = requestName();

```
  if (name === null) {
    console.log(
      "Name input canceled."
    );

    return;
  }

  console.log(
    "Name:",
    name
  );
}
```

);
}

// Dialog availability
console.log(
"alert available:",
typeof window.alert === "function"
);

console.log(
"confirm available:",
typeof window.confirm === "function"
);

console.log(
"prompt available:",
typeof window.prompt === "function"
);

// Dialog method references
const showAlert = window.alert;
const showConfirm = window.confirm;
const showPrompt = window.prompt;

console.log(
"Alert reference:",
typeof showAlert
);

console.log(
"Confirm reference:",
typeof showConfirm
);

console.log(
"Prompt reference:",
typeof showPrompt
);
