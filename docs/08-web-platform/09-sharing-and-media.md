# Sharing and Media

Modern browsers can integrate web applications with operating-system sharing features and device media hardware.

This topic covers:

* Web Share API
* File sharing
* MediaDevices
* Camera access
* Microphone access
* Media streams
* Permission handling
* Resource cleanup
* Secure-context requirements

These APIs provide powerful capabilities, but they also require careful handling because they can involve user privacy, hardware access, and explicit permission.

---

# Web Share API

The Web Share API allows a web application to request that the operating system share content through an available native sharing target.

Typical data can include:

* Title
* Text
* URL
* Files

## Basic Sharing

```js id="a6v4mx"
const shareData = {
  title: "JavaScript Reference",
  text: "JavaScript Web Platform",
  url: location.href
};

if (navigator.share) {
  await navigator.share(
    shareData
  );
}
```

The browser or operating system decides which sharing targets are available.

The application should not assume that a particular target exists.

## Feature Detection

Not every browser supports Web Share.

Use feature detection:

```js id="4c2p7m"
if (
  typeof navigator.share ===
  "function"
) {
  console.log(
    "Web Share API is available."
  );
}
```

A fallback should be provided when the API is unavailable:

```js id="h5iv3p"
async function sharePage() {
  const shareData = {
    title: "JavaScript Reference",
    text: "JavaScript Web Platform",
    url: location.href
  };

  if (navigator.share) {
    await navigator.share(
      shareData
    );

    return;
  }

  await copyFallbackUrl(
    shareData.url
  );
}
```

The fallback might use another supported mechanism such as copying the URL or displaying a regular link.

---

# Handling Share Errors

A call to `navigator.share()` can fail.

For example:

```js id="4obf1s"
try {
  await navigator.share({
    title: "JavaScript Reference",
    text: "Web Platform",
    url: location.href
  });

  console.log(
    "Share request completed."
  );
} catch (error) {
  console.error(
    "Share failed:",
    error
  );
}
```

An application should distinguish an intentional user cancellation from a real platform or application failure when its UX requires that distinction.

---

# Sharing Files

Supported implementations can also share files.

Create a file:

```js id="m8fkwq"
const file = new File(
  [
    "JavaScript Reference"
  ],
  "reference.txt",
  {
    type: "text/plain"
  }
);
```

Before sharing a file, check whether the platform supports it:

```js id="csj4pq"
if (
  navigator.canShare &&
  navigator.canShare({
    files: [file]
  })
) {
  await navigator.share({
    title: "JavaScript Reference",
    files: [file]
  });
}
```

`navigator.canShare()` is useful because browser and operating-system capabilities can differ.

Do not assume that because `navigator.share` exists, file sharing is also supported.

---

# Security and User Interaction

Sharing should normally happen in response to a user action.

For example:

```js id="w2z8t6"
shareButton.addEventListener(
  "click",
  async () => {
    await navigator.share({
      title: "JavaScript Reference",
      url: location.href
    });
  }
);
```

This makes the sharing request explicit and understandable to the user.

Avoid surprising automatic share attempts.

---

# MediaDevices API

The MediaDevices API exposes access to media input capabilities such as:

* Cameras
* Microphones
* Other media input devices

The main entry point is:

```js id="p3d4ot"
navigator.mediaDevices
```

Feature detection:

```js id="2w6g5f"
if (
  navigator.mediaDevices
) {
  console.log(
    "Media devices are available."
  );
}
```

For camera and microphone access, the most commonly used method is:

```js id="7z2rwx"
navigator.mediaDevices.getUserMedia()
```

---

# Requesting Camera Access

To request camera access:

```js id="k8iy6f"
const stream =
  await navigator.mediaDevices
    .getUserMedia({
      video: true
    });
```

The browser can present a permission request to the user.

The application must be prepared for the user to deny access.

```js id="q2eqiw"
try {
  const stream =
    await navigator.mediaDevices
      .getUserMedia({
        video: true
      });

  console.log(
    "Camera access granted."
  );
} catch (error) {
  console.error(
    "Camera access failed:",
    error
  );
}
```

---

# Requesting Microphone Access

Microphone access can be requested similarly:

```js id="un6jbt"
const stream =
  await navigator.mediaDevices
    .getUserMedia({
      audio: true
    });
```

Camera and microphone can also be requested together:

```js id="fr5zy9"
const stream =
  await navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true
    });
```

Only request the capabilities the application actually needs.

For example, a camera preview should not request microphone access if audio is unnecessary.

---

# Permission Denial

Users can deny media access.

A robust application should handle this as an expected outcome:

```js id="4boq9a"
try {
  const stream =
    await navigator.mediaDevices
      .getUserMedia({
        video: true
      });

  startCamera(stream);
} catch (error) {
  console.error(
    "Unable to access camera:",
    error
  );

  showCameraPermissionMessage();
}
```

Do not treat permission denial as an unexpected system crash.

---

# Displaying a Camera Stream

A media stream can be connected to a `<video>` element.

HTML:

```html id="ykh8k6"
<video
  id="camera"
  autoplay
  playsinline
></video>
```

JavaScript:

```js id="sqdc2c"
const video =
  document.querySelector(
    "#camera"
  );

const stream =
  await navigator.mediaDevices
    .getUserMedia({
      video: true
    });

video.srcObject = stream;
```

The `playsinline` attribute is useful for camera previews on supported mobile environments.

---

# Understanding `MediaStream`

A `MediaStream` contains one or more media tracks.

```js id="1w9v0y"
console.log(
  stream.getTracks()
);
```

Tracks can be inspected:

```js id="se9e5z"
for (
  const track of
  stream.getTracks()
) {
  console.log({
    kind: track.kind,
    label: track.label
  });
}
```

A track can represent:

```text id="6nszjq"
audio
video
```

---

# Stopping Media Tracks

When the application no longer needs the stream, stop its tracks:

```js id="uk5tms"
for (
  const track of
  stream.getTracks()
) {
  track.stop();
}
```

This is an important cleanup step.

For example:

```js id="a7rc0h"
function stopCamera(stream) {
  for (
    const track of
    stream.getTracks()
  ) {
    track.stop();
  }
}
```

Without cleanup, the browser may continue using camera or microphone resources longer than necessary.

---

# Camera Lifecycle

A camera feature should have an explicit lifecycle:

```text id="7v4q1t"
User requests camera
        ↓
Permission
        ↓
MediaStream created
        ↓
Video preview
        ↓
User finishes
        ↓
Stop tracks
```

This pattern should be reflected in application logic.

---

# Enumerating Devices

Applications can inspect available media devices:

```js id="ccff05"
const devices =
  await navigator.mediaDevices
    .enumerateDevices();

for (
  const device of devices
) {
  console.log({
    kind: device.kind,
    label: device.label,
    id: device.deviceId
  });
}
```

Possible device kinds include:

```text id="7j8g6y"
videoinput
audioinput
audiooutput
```

Device labels may be restricted until the appropriate permission has been granted.

---

# Selecting a Specific Camera or Microphone

Applications can request a specific device using constraints.

For example:

```js id="dy0jyh"
const stream =
  await navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: {
          exact: selectedDeviceId
        }
      }
    });
```

More advanced constraints can include:

```js id="sc3j6v"
{
  video: {
    width: {
      ideal: 1280
    },
    height: {
      ideal: 720
    }
  }
}
```

Constraints communicate the application's preferences or requirements to the browser.

The browser does not necessarily guarantee that every requested value can be satisfied.

---

# Media Constraints

Media constraints describe desired media characteristics.

Example:

```js id="41d7i7"
const constraints = {
  video: {
    width: {
      ideal: 1280
    },
    height: {
      ideal: 720
    },
    facingMode: "user"
  },
  audio: false
};
```

Then:

```js id="1f1n0x"
const stream =
  await navigator.mediaDevices
    .getUserMedia(
      constraints
    );
```

Constraints are especially useful for mobile camera applications.

---

# Applying Device Selection

A typical flow is:

```text id="n9xk4f"
enumerateDevices()
        ↓
Show available cameras
        ↓
User selects device
        ↓
getUserMedia()
        ↓
Create stream
        ↓
Display stream
```

This allows an application such as a video-call interface to provide a camera selector.

---

# Media Errors

`getUserMedia()` can reject for different reasons.

Applications should avoid assuming every failure has the same cause.

Examples can include:

```text id="n7xv2r"
Permission denied
No suitable device
Constraint could not be satisfied
Security restriction
Device unavailable
```

A production interface can provide clearer feedback based on the error type.

For example:

```js id="qocb4c"
try {
  const stream =
    await navigator.mediaDevices
      .getUserMedia({
        video: true
      });
} catch (error) {
  switch (error.name) {
    case "NotAllowedError":
      console.error(
        "Permission denied."
      );
      break;

    case "NotFoundError":
      console.error(
        "No suitable device found."
      );
      break;

    case "NotReadableError":
      console.error(
        "Device could not be accessed."
      );
      break;

    default:
      console.error(
        "Media error:",
        error
      );
  }
}
```

The exact set of errors depends on the API, browser, device, and situation.

---

# Secure Context Requirements

Camera and microphone access require secure contexts in normal browser deployments.

Production applications should use HTTPS.

Local development can typically use:

```text id="f7gsg8"
http://localhost
```

Do not build a production media feature around insecure deployment assumptions.

---

# Privacy Considerations

Media access is privacy-sensitive.

Applications should:

* Explain why access is required.
* Request only required devices.
* Avoid requesting audio when only video is needed.
* Stop media tracks when finished.
* Provide clear controls for starting and stopping capture.
* Avoid leaving cameras or microphones active unnecessarily.

A good interface should make the current capture state clear.

---

# Combining Web Share and Media

A media application may combine these APIs.

For example:

```text id="5zjkjr"
Camera
  ↓
Capture Media
  ↓
Create File
  ↓
Web Share
```

The same application could:

1. Access a camera.
2. Capture an image or video.
3. Convert the result into a `File`.
4. Check `navigator.canShare()`.
5. Use `navigator.share()` to request native sharing.

The APIs solve different stages of the workflow.

---

# Resource Management

Platform capabilities often require explicit cleanup.

For media:

```js id="62s4ag"
stream
  .getTracks()
  .forEach(
    (track) => track.stop()
  );
```

For a video element:

```js id="y9vypk"
video.srcObject = null;
```

For channels:

```js id="6yejqv"
channel.close();
```

The general principle is:

```text id="hw9pjj"
Acquire Resource
      ↓
Use Resource
      ↓
Release Resource
```

This is especially important for hardware-backed resources.

---

# Common Mistakes

## Requesting Excessive Permissions

Avoid:

```js id="t4bm5k"
getUserMedia({
  video: true,
  audio: true
});
```

when the application only needs the camera.

Request only what is necessary.

## Forgetting to Stop Tracks

Do not leave camera or microphone tracks running after the feature ends.

```js id="wf63u3"
stream
  .getTracks()
  .forEach(
    (track) => track.stop()
  );
```

## Assuming Media Devices Exist

Always handle:

* Unsupported browsers
* Devices not connected
* Permission denial
* Device failures

## Assuming Web Share Is Always Available

Use:

```js id="1s32hd"
if (navigator.share) {
  // Native share
}
```

and provide a fallback.

## Treating Permission Denial as an Application Error

Users are allowed to deny access.

Design a normal user experience for this case.

## Leaving Hardware Active

Camera and microphone resources should be released as soon as the feature no longer needs them.

---

# Best Practices

* Use feature detection.
* Use HTTPS in production.
* Request the minimum required permissions.
* Explain sensitive permission requests.
* Handle permission denial gracefully.
* Validate media capability before starting.
* Stop media tracks when finished.
* Clear `video.srcObject` when the stream is no longer used.
* Provide visible start and stop controls.
* Avoid unnecessary hardware access.
* Test on different browsers and devices.
* Provide fallbacks for optional sharing capabilities.

# Mental Model

A useful way to think about these APIs is:

```text id="cqed8e"
Web Share
→ "Let the user share this content."

MediaDevices
→ "Let the application request media hardware."

MediaStream
→ "Represent the captured media."

MediaStreamTrack
→ "Represent an individual audio or video track."
```

The application remains responsible for permission handling, lifecycle management, privacy, and graceful failure.

## References

* Web Share API
* Navigator Share
* Media Capture and Streams API
* MediaDevices
* MediaStream
* MediaStreamTrack
* `getUserMedia()`
* `enumerateDevices()`
