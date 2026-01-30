self.addEventListener('push', (event) => {
  let data = {
    title: 'New Camp Form',
    body: 'You have a new notification!',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    // vibrate: [100, 50, 100],
    data: {
      url: 'https://www.thepopsorchestra.org/' // URL that will be used on click
    },
    requireInteraction: true,
    tag: `msg-${Date.now()}`, // forces stacking
    timestamp: Date.now(),
    renotify: false
  }

  if (event.data) {
    try {
      const payload = event.data.json()

      data = {
        ...data,
        ...payload // This will override the defaults if server sent custom title/body/icon/badge
      }
    } catch {
      data.body = event.data.text() // fallback in case it’s not valid JSON
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    data: data.data // Ensure data is passed here
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  const notificationData = event.notification.data

  // Check if data exists and contains the URL
  if (notificationData && notificationData.url) {
    const url = notificationData.url

    // Open the URL in a new tab
    event.waitUntil(
      clients.openWindow(url) // This opens the URL in a new tab
    )
  }

  // Close the notification
  event.notification.close()
})
