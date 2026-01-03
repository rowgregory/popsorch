import { useCallback, useEffect } from 'react'
import { useAppDispatch, usePushNotificationSelector } from '../redux/store'
import { setPermissionGranted, setSubscription } from '../redux/features/pushNotificationSlice'

const isPushNotificationSupported = () => 'serviceWorker' in navigator && 'PushManager' in window

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function encodeKey(key: ArrayBuffer | null) {
  if (!key) return ''
  const uint8Array = new Uint8Array(key)
  return window
    .btoa(String.fromCharCode(...uint8Array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function getSubscriptionData() {
  const registration = await navigator.serviceWorker.ready
  const sub = await registration.pushManager.getSubscription()

  if (!sub) return null

  return {
    endpoint: sub.endpoint,
    keys: {
      p256dh: encodeKey(sub.getKey('p256dh')),
      auth: encodeKey(sub.getKey('auth'))
    }
  }
}

export const usePushNotifications = () => {
  const dispatch = useAppDispatch()
  const { isNotificationPermissionGranted } = usePushNotificationSelector()

  // Initialize on mount
  useEffect(() => {
    if (!isPushNotificationSupported()) return

    // Register service worker
    navigator.serviceWorker.register('/push-notifications-sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })

    // Restore from localStorage
    const stored = localStorage.getItem('notificationsEnabled')
    if (stored) {
      dispatch(setPermissionGranted(JSON.parse(stored)))
    }

    // Check existing subscription
    ;(async () => {
      const subData = await getSubscriptionData()
      if (subData) {
        dispatch(setSubscription(subData))
        localStorage.setItem('notificationsEnabled', 'true')
      }
    })()
  }, [dispatch])

  const toggleNotifications = useCallback(
    async (userId?: string) => {
      try {
        if (isNotificationPermissionGranted) {
          // Unsubscribe
          const registration = await navigator.serviceWorker.ready
          const sub = await registration.pushManager.getSubscription()

          if (sub) {
            await fetch(`/api/push-notification/delete-subscription?endpoint=${encodeURIComponent(sub.endpoint)}`, {
              method: 'DELETE'
            })
            await sub.unsubscribe()
            dispatch(setSubscription(null))
            dispatch(setPermissionGranted(false))
            localStorage.setItem('notificationsEnabled', 'false')
          }
        } else {
          // Subscribe
          const permission = await Notification.requestPermission()
          if (permission === 'granted') {
            const subData = (await getSubscriptionData()) || (await createSubscription())

            if (subData) {
              await fetch('/api/push-notification/save-push-notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId,
                  endpoint: subData.endpoint,
                  keys: subData.keys,
                  userAgent: navigator.userAgent
                })
              })

              dispatch(setSubscription(subData))
              dispatch(setPermissionGranted(true))
              localStorage.setItem('notificationsEnabled', 'true')
            }
          }
        }
      } catch (error) {
        throw error
      }
    },
    [dispatch, isNotificationPermissionGranted]
  )

  return {
    isEnabled: isNotificationPermissionGranted,
    toggleNotifications,
    isSupported: isPushNotificationSupported()
  }
}

async function createSubscription() {
  const registration = await navigator.serviceWorker.ready
  await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
  })
  return getSubscriptionData()
}
