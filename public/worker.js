console.log("Service Worker Works");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Notification Received");
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "favicon.png",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: "vibration-sample",
  });
});
