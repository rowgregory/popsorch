'use client'

import React, { useEffect, useState } from 'react'
import PageTitle from '@/app/components/admin/PageTitle'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import Switch from '@/app/forms/elements/Switch'
import { RootState, useAppSelector } from '@/app/redux/store'

const useBrowserAPIs = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return {
    isClient,
    hasNotificationAPI: isClient && 'Notification' in window,
    hasServiceWorker: isClient && 'serviceWorker' in navigator,
    hasPushManager: isClient && 'PushManager' in window,
    notificationPermission: isClient && 'Notification' in window ? Notification.permission : 'default'
  }
}

const Profile = () => {
  const {
    requestNotificationPermission,
    unsubscribe,
    isNotificationPermissionGranted,
    saveToLocalStorage,
    saveSubscription
  } = usePushNotifications()

  const { isClient, notificationPermission } = useBrowserAPIs()

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(isNotificationPermissionGranted)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const user = useAppSelector((state: RootState) => state.user)
  const userId = user.user.id

  useEffect(() => {
    const checkPushState = async () => {
      try {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.getSubscription()
        const isSubscribed = !!sub?.endpoint

        // If permission is granted and user is subscribed, enable
        if (Notification.permission === 'granted' && isSubscribed) {
          setNotificationsEnabled(true)

          // Save to both localStorage and database
          if (sub) {
            const encodeKey = (key: ArrayBuffer | null) => {
              if (key) {
                const uint8Array = new Uint8Array(key)
                const base64String = window
                  .btoa(String.fromCharCode(...uint8Array))
                  .replace(/\+/g, '-')
                  .replace(/\//g, '_')
                  .replace(/=+$/, '')
                return base64String
              }
              return ''
            }

            const subscriptionData = {
              endpoint: sub.endpoint,
              keys: {
                p256dh: encodeKey(sub.getKey('p256dh')),
                auth: encodeKey(sub.getKey('auth'))
              }
            }

            saveToLocalStorage(true, subscriptionData)
            // Also save to database
            try {
              await saveSubscription(subscriptionData, userId)
            } catch (error) {
              console.warn('Failed to save subscription to database:', error)
            }
          }
        } else {
          // Otherwise, disable it and clear the sub
          setNotificationsEnabled(false)
          saveToLocalStorage(false, null)
        }
      } catch {
        setNotificationsEnabled(false)
      }
    }

    checkPushState()
  }, [saveToLocalStorage, saveSubscription, userId])

  // Handle the notification toggle
  const handleNotificationToggle = async () => {
    setIsSwitchLoading(true)

    try {
      if (notificationsEnabled) {
        // Unsubscribe
        await unsubscribe()
        setNotificationsEnabled(false)
        saveToLocalStorage(false, null)
      } else {
        // Subscribe with userId
        await requestNotificationPermission(userId)

        // Check actual subscription after action
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.getSubscription()
        const isSubscribed = !!sub?.endpoint

        if (isSubscribed && sub) {
          const encodeKey = (key: ArrayBuffer | null) => {
            if (key) {
              const uint8Array = new Uint8Array(key)
              const base64String = window
                .btoa(String.fromCharCode(...uint8Array))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '')
              return base64String
            }
            return ''
          }

          const subscriptionData = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: encodeKey(sub.getKey('p256dh')),
              auth: encodeKey(sub.getKey('auth'))
            }
          }

          setNotificationsEnabled(true)
          saveToLocalStorage(true, subscriptionData)
        }
      }
    } catch (error) {
      console.error('Error toggling notifications:', error)
      // Reset to previous state on error
      setNotificationsEnabled(!notificationsEnabled)
    }

    setIsSwitchLoading(false)
  }

  return (
    <>
      <div className="mb-20">
        <PageTitle title="Profile" color="bg-indigo-500" />
      </div>
      <div className="p-9 bg-inkblack rounded-sm aspect-square max-w-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-3 font-changa">Push Notifications</h2>
        <Switch
          enabled={notificationsEnabled}
          onChange={handleNotificationToggle}
          isLoading={isSwitchLoading}
          name="push-notification"
          color="indigo-500"
        />

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 text-xs text-gray-400 text-center">
            <div>Permission: {notificationPermission}</div>
            <div>Enabled: {notificationsEnabled ? 'Yes' : 'No'}</div>
            <div>User ID: {userId}</div>
            <div>Client: {isClient ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
