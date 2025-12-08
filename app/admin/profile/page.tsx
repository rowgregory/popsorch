'use client'

import React, { useEffect, useState } from 'react'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import Switch from '@/app/forms/elements/Switch'
import { useUserSelector } from '@/app/redux/store'
import { Bell } from 'lucide-react'

const Profile = () => {
  const {
    requestNotificationPermission,
    unsubscribe,
    isNotificationPermissionGranted,
    saveToLocalStorage,
    saveSubscription
  } = usePushNotifications()

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(isNotificationPermissionGranted)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const user = useUserSelector()
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
            await saveSubscription(subscriptionData, userId)
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
    } catch {
      // Reset to previous state on error
      setNotificationsEnabled(!notificationsEnabled)
    }

    setIsSwitchLoading(false)
  }

  return (
    <div className="p-6">
      <div className="bg-neutral-900/50 border border-neutral-700/50 rounded-xl p-6 max-w-md hover:border-neutral-600/60 transition-all">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Push Notifications</h3>
            <p className="text-neutral-400 text-sm">Stay updated with important alerts</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-800/40 rounded-lg">
          <div>
            <div className="text-neutral-200 font-medium">Enable Notifications</div>
            <div className="text-neutral-400 text-sm">
              {notificationsEnabled ? "You'll receive real-time updates" : 'Turn on to stay informed'}
            </div>
          </div>
          <Switch
            enabled={notificationsEnabled}
            onChange={handleNotificationToggle}
            isLoading={isSwitchLoading}
            name="push-notification"
            color="indigo-500"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
