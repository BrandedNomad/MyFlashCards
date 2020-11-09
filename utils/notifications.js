import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {AsyncStorage} from 'react-native'

export const NOTIFICATION_KEY = 'StudyCards:StudyNotification'




export function createTriggerTomorrow(hours, minutes){
    const notificationTrigger = new Date(Date.now());
    notificationTrigger.setDate(notificationTrigger.getDate() + 1)
    notificationTrigger.setHours(hours);
    notificationTrigger.setMinutes(minutes);
    notificationTrigger.setSeconds(0);

    return notificationTrigger
}

export function createTrigger(hours, minutes){
    const notificationTrigger = new Date(Date.now());
    notificationTrigger.setHours(hours);
    notificationTrigger.setMinutes(minutes);
    notificationTrigger.setSeconds(0);

    return notificationTrigger
}

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync).catch((error)=>{
            console.log("Failed to cancel scheduled notifications",error)
        })
}

export function createNotification(title, message){
    return {
        title:title,
        body:message,
        ios:{
            sound:true,
        },
        android:{
            sound:true,
            priority:'high',
            sticky:false,
            vibrate:true,
        }
    }

}

export async function setLocalNotification(message,trigger){

    try{
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data)=>{
                if(data === null){

                    Permissions.askAsync(Permissions.NOTIFICATIONS)
                        .then(({status})=>{
                            console.log("Permission", status)
                            if(status === 'granted'){

                                //cancel all previous notifications
                                Notifications.cancelAllScheduledNotificationsAsync().catch((error)=>{
                                    console.log("Failed to cancel previous notifications",error)
                                })


                                //schedule the notification
                                Notifications.scheduleNotificationAsync({
                                    content:message,
                                    trigger:trigger
                                }).catch((error)=>{
                                    console.log("Unable to schedule notifications",error)
                                })

                                //Setting the notification key to the store
                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                            }
                        }).catch((error)=>{
                        console.log("Unable to set get permission", error)
                    })

                }
            })

    }catch(error){
        console.log("Error setting local Notification",error)
    }


}


export function isKeySet(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data)=>{
            return !!data
        })
}