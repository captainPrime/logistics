import db from "../models";

const Notification = db.Notifications;
type NotificationTypes = "POST" | "COMMENT" | "POSTREACTION"

class NotificationService {
    public createNotification = async (notificationId:string, userId: string, firstName: string, lastName: string, eventId: string, eventType: NotificationTypes): Promise<unknown> => {
        let createNotification
        
        if(eventType === "COMMENT"){
            createNotification = await Notification.create({
                id: notificationId,
                userId: userId,
                title: `${firstName} ${lastName} has commented to your post`,
                eventType,
                eventId,
                hasVisited: false,
                hasCancelled: false
              })
        }
        else if(eventType === "POST") {
            createNotification = await Notification.create({
                id: notificationId,
                userId: userId,
                title: `${firstName} ${lastName} has made a new post`,
                eventType,
                eventId,
                hasVisited: false,
                hasCancelled: false
              })
        } else if( eventType === "POSTREACTION") {
            createNotification = await Notification.create({
                id: notificationId,
                userId: userId,
                title: `${firstName} ${lastName} has reacted to your post`,
                eventType,
                eventId,
                hasVisited: false,
                hasCancelled: false
              })
        }
          return createNotification;
    }
}
export const notificationService =  new NotificationService();
