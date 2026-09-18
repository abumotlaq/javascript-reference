if (!navigator.mediaDevices?.getUserMedia) {
  throw new Error("Media Devices API is not supported");
}

try {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });

  console.log("Media stream:", stream);

  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    console.log({
      kind: track.kind,
      label: track.label
    });
  });

  tracks.forEach((track) => {
    track.stop();
  });
} catch (error) {
  console.error("Media access failed:", error);
}