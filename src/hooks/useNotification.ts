import { useCallback } from "react";
import notificationService from "../services/notificationService";

export const useNotification = () => {
  const scheduleEventReminder = useCallback(
    (eventTitle: string, eventTime: Date) => {
      // Schedule notification 30 minutes before the event
      const notificationTime = new Date(eventTime.getTime() * 60000);

      notificationService.scheduleNotification(
        "Event Reminder",
        `Your event "${eventTitle}" starts in 30 minutes!`,
        notificationTime
      );
    },
    []
  );

  const cancelEventReminder = useCallback((notificationId: string) => {
    notificationService.cancelNotification(notificationId);
  }, []);

  const cancelAllReminders = useCallback(() => {
    notificationService.cancelAllNotifications();
  }, []);

  return {
    scheduleEventReminder,
    cancelEventReminder,
    cancelAllReminders,
  };
};
