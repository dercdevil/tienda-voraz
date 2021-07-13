const PUBLIC_VAPID_KEY =
  process.env.PUBLIC_VAPID_KEY ||
  "BNQPLb6Vpkat1P9_zE1j10BJJfJI6H6BiWtQYAp-hzqD_-Smg88Zy-OHKJD7SiBGDIZz3vJ2kwqcaItnYw2U8H8";

export const subscription = async () => {
  // Service Worker
  if ("serviceWorker" in navigator) {
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/",
    });

    // Listen Push Notifications

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
    });

    // Send Notification
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(process.env.REACT_APP_BASE_URL + "/subscription", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
    }

    console.log("Subscribed!");
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Service Worker Support
if ("serviceWorker" in navigator) {
  subscription().catch((err) => console.log(err));
}
