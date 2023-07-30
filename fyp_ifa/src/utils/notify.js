export function notifyOnMobile(information) {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }
  function requestNotificationPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted!");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }

  function showNotification() {
    if (Notification.permission === "granted") {
      const notificationOptions = {
        body: information,
        icon: "path_to_icon.png",
      };

      const notification = new Notification(
        "Notification Title",
        notificationOptions
      );

      notification.onclick = function () {
        console.log("Notification clicked!");
      };
    }
  }

  function sendNotification() {
    requestNotificationPermission();
    showNotification();
  }

  sendNotification();
}