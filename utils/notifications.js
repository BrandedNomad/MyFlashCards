/**
 * @overview This file contains all the methods used to manage notifications in the app
 */

//imports
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {AsyncStorage} from 'react-native'

//Setting Constant
export const NOTIFICATION_KEY = 'StudyCards:StudyNotification'


/**
 * @function
 * @description creates a trigger date delayed by one day
 * @param {number} hours - the time of day notification is triggered
 * @param {number} minutes - the time of day notification is triggered
 * @returns {Date}
 */
export function createTriggerTomorrow(hours, minutes){
    const notificationTrigger = new Date(Date.now());
    notificationTrigger.setDate(notificationTrigger.getDate() + 1)
    notificationTrigger.setHours(hours);
    notificationTrigger.setMinutes(minutes);
    notificationTrigger.setSeconds(0);

    return notificationTrigger
}

/**
 * @description creates a trigger date for the same day
 * @param {number} hours -the time of day notification is triggered
 * @param {number} minutes -the time of day notification is triggered
 * @returns {Date}
 */
export function createTrigger(hours, minutes){
    const notificationTrigger = new Date(Date.now());
    notificationTrigger.setHours(hours);
    notificationTrigger.setMinutes(minutes);
    notificationTrigger.setSeconds(0);

    return notificationTrigger
}

/**
 * @description Cancels all scheduled notifications
 * @returns {Promise<void>}
 */
export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync).catch((error)=>{
            console.log("Failed to cancel scheduled notifications",error)
        })
}

/**
 * @function
 * @description Creates a notification message
 * @param {String} title - title of the notification
 * @param {String} message - the message body
 * @returns {Object}
 */
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

/**
 * @function
 * @description Schedules notifications
 * @param {Object} message -the message object returned by createNotifications
 * @param {Object} trigger -the trigger object returned by createTrigger or createTriggerTomorrow
 * @returns {Promise<void>}
 */
export async function setLocalNotification(message,trigger){

    try{
        //Check if notification has already been scheduled
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data)=>{
                if(data === null){

                    //Get permission from device to schedule notifications
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


/**
 * @function
 * @description Checks if notification key has already been set or not
 * @returns {Boolean} true when notification key is found
 *
 */
export function isKeySet(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data)=>{
            return !!data
        })
}