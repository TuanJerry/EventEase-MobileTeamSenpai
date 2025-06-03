import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

class NotificationService {
  constructor() {
    this.configure();
  }

  configure = async () => {
    // Configure notification settings
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    // Request permissions
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("event-reminders", {
        name: "Event Reminders",
        description: "Notifications for event reminders",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  scheduleNotification = async (title: string, message: string, date: Date) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        date,
        channelId: "event-reminders",
      },
    });
  };

  cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  cancelNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  };
}

export default new NotificationService();
