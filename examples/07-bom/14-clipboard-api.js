"use strict";

// Clipboard API availability
console.log(
"Clipboard API available:",
"clipboard" in navigator
);

console.log(
"Secure context:",
window.isSecureContext
);

// Get clipboard object
if ("clipboard" in navigator) {
console.log(
"Clipboard:",
navigator.clipboard
);
}

// Write text to clipboard
async function copyText(text) {
if (!navigator.clipboard) {
throw new Error(
"Clipboard API is not available."
);
}

await navigator.clipboard.writeText(text);

console.log(
"Text copied successfully."
);
}

const copyButton = document.querySelector(
"#copy-button"
);

if (copyButton) {
copyButton.addEventListener(
"click",
async () => {
try {
await copyText(
"Hello, Osama Abu Motlaq!"
);
} catch (error) {
console.error(
"Copy error:",
error.message
);
}
}
);
}

// Read text from clipboard
async function readClipboardText() {
if (!navigator.clipboard) {
throw new Error(
"Clipboard API is not available."
);
}

const text =
await navigator.clipboard.readText();

console.log(
"Clipboard text:",
text
);

return text;
}

const readButton = document.querySelector(
"#read-button"
);

if (readButton) {
readButton.addEventListener(
"click",
async () => {
try {
await readClipboardText();
} catch (error) {
console.error(
"Read error:",
error.message
);
}
}
);
}

// Copy text from an input
const textInput = document.querySelector(
"#text-input"
);

const inputCopyButton =
document.querySelector(
"#input-copy-button"
);

if (inputCopyButton && textInput) {
inputCopyButton.addEventListener(
"click",
async () => {
try {
await copyText(
textInput.value
);
} catch (error) {
console.error(
"Input copy error:",
error.message
);
}
}
);
}

// Copy text from a textarea
const textarea = document.querySelector(
"#textarea"
);

const textareaCopyButton =
document.querySelector(
"#textarea-copy-button"
);

if (textareaCopyButton && textarea) {
textareaCopyButton.addEventListener(
"click",
async () => {
try {
await copyText(
textarea.value
);
} catch (error) {
console.error(
"Textarea copy error:",
error.message
);
}
}
);
}

// Clipboard event: copy
document.addEventListener(
"copy",
(event) => {
console.log(
"Copy event fired."
);

```
console.log(
  "Selected text:",
  window.getSelection()?.toString()
);

const selectedText =
  window.getSelection()?.toString();

if (
  selectedText &&
  event.clipboardData
) {
  event.clipboardData.setData(
    "text/plain",
    selectedText
  );
}
```

}
);

// Clipboard event: cut
document.addEventListener(
"cut",
(event) => {
console.log(
"Cut event fired."
);

```
console.log(
  "Selected text:",
  window.getSelection()?.toString()
);
```

}
);

// Clipboard event: paste
document.addEventListener(
"paste",
(event) => {
console.log(
"Paste event fired."
);

```
const pastedText =
  event.clipboardData?.getData(
    "text/plain"
  );

console.log(
  "Pasted text:",
  pastedText
);
```

}
);

// Handle paste inside an input
const pasteInput = document.querySelector(
"#paste-input"
);

if (pasteInput) {
pasteInput.addEventListener(
"paste",
(event) => {
const text =
event.clipboardData?.getData(
"text/plain"
);

```
  console.log(
    "Input pasted text:",
    text
  );
}
```

);
}

// Prevent paste
const protectedInput =
document.querySelector(
"#protected-input"
);

if (protectedInput) {
protectedInput.addEventListener(
"paste",
(event) => {
event.preventDefault();

```
  console.log(
    "Paste prevented."
  );
}
```

);
}

// Handle clipboard data types
document.addEventListener(
"paste",
(event) => {
const types =
event.clipboardData?.types ?? [];

```
console.log(
  "Clipboard data types:",
  types
);
```

}
);

// Read HTML clipboard data
document.addEventListener(
"paste",
(event) => {
const html =
event.clipboardData?.getData(
"text/html"
);

```
if (html) {
  console.log(
    "Pasted HTML:",
    html
  );
}
```

}
);

// Read plain text clipboard data
document.addEventListener(
"paste",
(event) => {
const text =
event.clipboardData?.getData(
"text/plain"
);

```
if (text) {
  console.log(
    "Pasted plain text:",
    text
  );
}
```

}
);

// Clipboard permission
if ("permissions" in navigator) {
navigator.permissions
.query({
name: "clipboard-read",
})
.then((permission) => {
console.log(
"Clipboard read permission:",
permission.state
);
})
.catch((error) => {
console.log(
"Clipboard read permission unavailable:",
error.message
);
});

navigator.permissions
.query({
name: "clipboard-write",
})
.then((permission) => {
console.log(
"Clipboard write permission:",
permission.state
);
})
.catch((error) => {
console.log(
"Clipboard write permission unavailable:",
error.message
);
});
}

// Copy button with user feedback
const feedbackButton =
document.querySelector(
"#copy-with-feedback"
);

const feedbackElement =
document.querySelector(
"#copy-feedback"
);

if (feedbackButton) {
feedbackButton.addEventListener(
"click",
async () => {
try {
await copyText(
"JavaScript Reference"
);

```
    if (feedbackElement) {
      feedbackElement.textContent =
        "Copied!";
    }
  } catch (error) {
    if (feedbackElement) {
      feedbackElement.textContent =
        "Copy failed.";
    }

    console.error(
      "Clipboard error:",
      error.message
    );
  }
}
```

);
}

// Copy a URL
const copyUrlButton =
document.querySelector(
"#copy-url-button"
);

if (copyUrlButton) {
copyUrlButton.addEventListener(
"click",
async () => {
try {
await copyText(
window.location.href
);

```
    console.log(
      "Current URL copied."
    );
  } catch (error) {
    console.error(
      "URL copy error:",
      error.message
    );
  }
}
```

);
}

// Copy structured data as text
const copyJsonButton =
document.querySelector(
"#copy-json-button"
);

if (copyJsonButton) {
copyJsonButton.addEventListener(
"click",
async () => {
const data = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
};

```
  try {
    await copyText(
      JSON.stringify(
        data,
        null,
        2
      )
    );

    console.log(
      "JSON copied."
    );
  } catch (error) {
    console.error(
      "JSON copy error:",
      error.message
    );
  }
}
```

);
}

// Write multiple clipboard formats
const richCopyButton =
document.querySelector(
"#rich-copy-button"
);

if (
richCopyButton &&
"clipboard" in navigator &&
"ClipboardItem" in window
) {
richCopyButton.addEventListener(
"click",
async () => {
const text =
"Hello, Osama Abu Motlaq!";

```
  const html =
    "<strong>Hello, Osama Abu Motlaq!</strong>";

  const item =
    new ClipboardItem({
      "text/plain": new Blob(
        [text],
        {
          type: "text/plain",
        }
      ),
      "text/html": new Blob(
        [html],
        {
          type: "text/html",
        }
      ),
    });

  try {
    await navigator.clipboard.write([
      item,
    ]);

    console.log(
      "Rich clipboard content copied."
    );
  } catch (error) {
    console.error(
      "Rich clipboard error:",
      error.message
    );
  }
}
```

);
}

// Read clipboard items
const readItemsButton =
document.querySelector(
"#read-items-button"
);

if (
readItemsButton &&
"clipboard" in navigator
) {
readItemsButton.addEventListener(
"click",
async () => {
try {
const items =
await navigator.clipboard.read();

```
    for (const item of items) {
      console.log(
        "Clipboard types:",
        item.types
      );

      for (const type of item.types) {
        console.log(
          "Clipboard type:",
          type
        );

        const blob =
          await item.getType(type);

        console.log(
          "Clipboard blob:",
          blob
        );
      }
    }
  } catch (error) {
    console.error(
      "Clipboard read error:",
      error.message
    );
  }
}
```

);
}

// Clipboard availability helper
function isClipboardAvailable() {
return (
window.isSecureContext &&
"clipboard" in navigator
);
}

console.log(
"Clipboard available:",
isClipboardAvailable()
);

// Safe clipboard writer
async function safeCopy(text) {
if (!isClipboardAvailable()) {
return false;
}

try {
await navigator.clipboard.writeText(
text
);

```
return true;
```

} catch {
return false;
}
}

const safeCopyButton =
document.querySelector(
"#safe-copy-button"
);

if (safeCopyButton) {
safeCopyButton.addEventListener(
"click",
async () => {
const success = await safeCopy(
"JavaScript Reference"
);

```
  console.log(
    "Safe copy success:",
    success
  );
}
```

);
}
