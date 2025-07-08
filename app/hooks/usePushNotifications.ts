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

  // Save subscription to database AND localStorage
  const saveSubscriptionToDatabase = async (subscriptionData: any, userId?: string) => {
    try {
      const response = await fetch('/api/push-notification/save-push-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId, // Pass userId if available (from auth context/redux)
          endpoint: subscriptionData.endpoint,
          keys: subscriptionData.keys,
          userAgent: navigator.userAgent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save subscription to database')
      }

      const result = await response.json()
      console.log('Subscription saved to database:', result)
      return result
    } catch (error) {
      console.error('Error saving subscription to database:', error)
      // Still continue with localStorage as fallback
      throw error
    }
  }

  // Remove subscription from database
  const removeSubscriptionFromDatabase = async (endpoint: string) => {
    try {
      const response = await fetch(
        `/api/push-notification/delete-subscription?endpoint=${encodeURIComponent(endpoint)}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to remove subscription from database')
      }

      console.log('Subscription removed from database')
    } catch (error) {
      console.error('Error removing subscription from database:', error)
    }
  }

  // Save subscription and notification state to localStorage (keep your existing function)
  const saveToLocalStorage = (notificationsEnabled: boolean, subscription: any) => {
    try {
      localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled))
      if (subscription) {
        localStorage.setItem('pushSubscription', JSON.stringify(subscription))
      } else {
        localStorage.removeItem('pushSubscription')
      }
    } catch {}
  }

  // Enhanced version that saves to both database and localStorage
  const saveSubscription = useCallback(async (subscriptionData: any, userId?: string) => {
    // Always save to localStorage first (immediate)
    saveToLocalStorage(true, subscriptionData)

    // Then try to save to database (background)
    try {
      await saveSubscriptionToDatabase(subscriptionData, userId)
    } catch {
      console.warn('Failed to save to database, but localStorage backup is available')
    }
  }, [])

  const requestNotificationPermission = useCallback(
    async (userId?: string) => {
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

            // Dispatch subscription and save it to both localStorage and database
            dispatch(setSubscription(subscriptionData))
            await saveSubscription(subscriptionData, userId)
          } else {
            // If subscription already exists, make sure it's in our database
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
              endpoint: existingSub.endpoint,
              keys: {
                p256dh: encodeKey(existingSub.getKey('p256dh')),
                auth: encodeKey(existingSub.getKey('auth'))
              }
            }

            dispatch(setSubscription(subscriptionData))
            await saveSubscription(subscriptionData, userId)
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error)
      }
    },
    [dispatch, saveSubscription]
  )

  const unsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()

      if (sub) {
        // Remove from database first
        await removeSubscriptionFromDatabase(sub.endpoint)

        // Then unsubscribe from browser
        const success = await sub.unsubscribe()
        if (success) {
          // Remove the subscription from Redux (set it to null)
          dispatch(setSubscription(null))
          dispatch(setPermissionGranted(false))

          // Save the new state to localStorage
          saveToLocalStorage(false, null)
        }
      }
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  // Send notification to all admins (new function)
  const sendNotificationToAllAdmins = async (message: string, title?: string) => {
    try {
      const response = await fetch('/api/push-notification/send-push-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          title: title || 'New Notification'
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send notification')
      }

      console.log('Notification sent to all admins:', result)
      return result
    } catch (error) {
      console.error('Error sending notification to admins:', error)
      throw error
    }
  }

  // 🔥 FIXED: This useEffect only checks subscription, doesn't save to database
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
            saveToLocalStorage(true, subscriptionData)

            // ❌ REMOVED: Don't automatically save to database on page load
            // await saveSubscriptionToDatabase(subscriptionData)
          }
        } catch (error) {
          console.error('Error checking subscription:', error)
        }
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
    saveToLocalStorage,
    saveSubscription,
    sendNotificationToAllAdmins,
    isPushNotificationSupported: isPushNotificationSupported()
  }
}
