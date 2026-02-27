import { sendGAEvent } from '@next/third-parties/google'

export function sendEnrichedGAEvent(eventName: string, value: string, label: string, section: string) {
  sendGAEvent('event', eventName, {
    value,
    button_text: label,
    section,
    user_scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
    time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
    referrer: document.referrer || 'direct',
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
    timestamp: new Date().toISOString()
  })
}
