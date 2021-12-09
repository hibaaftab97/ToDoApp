import PushNotification from 'react-native-push-notification';
class Notifications {
    constructor() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                // console.log('TOKEN:', token);
            },
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                //notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true,
            requestPermissions: true,
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: false,
                sound: false,
            },
        });
        PushNotification.createChannel(
            {
                channelId: 'reminders', // (required)
                channelName: 'Task reminder notifications', // (required)
                channelDescription: 'Reminder for any tasks',
            },
            () => { },
        );
        PushNotification.getScheduledLocalNotifications(rn => {
            //console.log('SN --- ', rn);
        });
    }
    scheduleNotification(data) {
        //console.log(date, 'from Push Notification');
        const { date, title } = data;
        PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: title,
            message: 'Todays task',
            date,
            // actions: '["Yes", "No"]'
        });
    }
}
export default new Notifications();