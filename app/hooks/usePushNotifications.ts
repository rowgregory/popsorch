import { useCallback, useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setPermissionGranted, setSubscription } from '../redux/features/pushNotificationSlice'

function urlBase64ToUint8Array(base64String: any) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// Check if the browser supports Push API and Service Workers
const isPushNotificationSupported = () => 'serviceWorker' in navigator && 'PushManager' in window

export const usePushNotifications = () => {
  const dispatch = useAppDispatch()
  const { isNotificationPermissionGranted, subscription } = useAppSelector((state: RootState) => state.pushNotification)

  // Save subscription and notification state to localStorage
  const saveToLocalStorage = (notificationsEnabled: boolean, subscription: any) => {
    try {
      localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled))
      if (subscription) {
        localStorage.setItem('pushSubscription', JSON.stringify(subscription))
      }
    } catch {}
  }

  const requestNotificationPermission = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        dispatch(setPermissionGranted(true))

        const registration = await navigator.serviceWorker.ready
        const existingSub = await registration.pushManager.getSubscription()
        if (!existingSub) {
          const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
          })

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

          // Dispatch subscription and save it to localStorage
          dispatch(setSubscription(subscriptionData))
          saveToLocalStorage(true, subscriptionData)
        }
      }
    } catch {}
  }, [dispatch])

  const unsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()

      if (sub) {
        const success = await sub.unsubscribe()
        if (success) {
          // Remove the subscription from Redux (set it to null)
          dispatch(setSubscription(null))
          dispatch(setPermissionGranted(false))

          // Save the new state to localStorage
          saveToLocalStorage(false, null)
        }
      }
    } catch {}
  }

  useEffect(() => {
    const checkSubscription = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready
          const subscription = await registration.pushManager.getSubscription()

          if (subscription) {
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
              endpoint: subscription.endpoint,
              keys: {
                p256dh: encodeKey(subscription.getKey('p256dh')),
                auth: encodeKey(subscription.getKey('auth'))
              }
            }

            dispatch(setSubscription(subscriptionData))
            saveToLocalStorage(true, subscriptionData) // Save subscription data to localStorage
          }
        } catch {}
      }
    }

    checkSubscription()
  }, [dispatch])

  useEffect(() => {
    // Register the service worker
    const registerServiceWorker = async () => {
      try {
        if (isPushNotificationSupported()) {
          await navigator.serviceWorker.register('/push-notifications-sw.js', {
            scope: '/',
            updateViaCache: 'none'
          })
        }
      } catch {}
    }

    // Only call these if push notifications are supported by the browser
    if (isPushNotificationSupported()) {
      registerServiceWorker()
    }
  }, [])

  // Load notification state and subscription from localStorage on page load
  useEffect(() => {
    const storedNotificationState = localStorage.getItem('notificationsEnabled')
    const storedSubscription = localStorage.getItem('pushSubscription')

    if (storedNotificationState) {
      try {
        const parsedState = JSON.parse(storedNotificationState)
        if (typeof parsedState === 'boolean') {
          dispatch(setPermissionGranted(parsedState))
        }
      } catch {}
    }

    if (storedSubscription) {
      try {
        const parsedSubscription = JSON.parse(storedSubscription)
        dispatch(setSubscription(parsedSubscription))
      } catch {}
    }
  }, [dispatch])

  return {
    isNotificationPermissionGranted,
    subscription,
    unsubscribe,
    requestNotificationPermission,
    saveToLocalStorage
  }
}
