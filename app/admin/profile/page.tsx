'use client'

import React, { useEffect, useState } from 'react'
import PageTitle from '@/app/components/admin/PageTitle'
import { usePushNotifications } from '@/app/hooks/usePushNotifications'
import Switch from '@/app/forms/elements/Switch'

const Profile = () => {
  const { requestNotificationPermission, unsubscribe, isNotificationPermissionGranted, saveToLocalStorage } =
    usePushNotifications()

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(isNotificationPermissionGranted)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  useEffect(() => {
    const checkPushState = async () => {
      try {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.getSubscription()
        const isSubscribed = !!sub?.endpoint

        // If permission is granted and user is subscribed, enable
        if (Notification.permission === 'granted' && isSubscribed) {
          setNotificationsEnabled(true)
          saveToLocalStorage(true, sub)
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
  }, [saveToLocalStorage])

  // Handle the notification toggle
  const handleNotificationToggle = async () => {
    setIsSwitchLoading(true)

    try {
      if (notificationsEnabled) {
        await unsubscribe()
      } else {
        await requestNotificationPermission()
      }

      // Check actual subscription after action
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()
      const isSubscribed = !!sub?.endpoint

      setNotificationsEnabled(isSubscribed)
      saveToLocalStorage(isSubscribed, sub || null)
    } catch {}

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
      </div>
    </>
  )
}

export default Profile
