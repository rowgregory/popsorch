import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'

const PrivacyPolicy = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-4 990:px-12 1200:px-4 py-32 text-white">
        <h1 className="text-3xl font-changa mb-8">Privacy Policy</h1>
        <h2 className="text-xl font-changa mb-3">Who we are</h2>
        <p className="font-lato mb-6">
          Our website address is:{' '}
          <a href="https://thepopsorchestra.org" className="text-blaze underline">
            https://thepopsorchestra.org
          </a>
          .
        </p>
        <h2 className="text-xl font-changa mb-3">Comments</h2>
        <ul className="list-disc list-outside pl-6 font-lato space-y-2 mb-6">
          <li className="pl-6">
            When visitors leave comments, we collect the data shown in the comment form, the visitor&apos;s IP address,
            and browser user agent string to help with spam detection.
          </li>
          <li className="pl-6">
            An anonymized string (hash) of your email address may be sent to the Gravatar service. Their privacy policy
            is available at{' '}
            <a href="https://automattic.com/privacy/" className="text-blaze underline">
              automattic.com/privacy
            </a>
            .
          </li>
          <li className="pl-6">Once approved, your profile picture will be visible publicly next to your comment.</li>
        </ul>
        <h2 className="text-xl font-changa mb-3">Media</h2>
        <p className="font-lato mb-6">
          If you upload images, avoid embedding location data (EXIF GPS). Visitors can download and extract this
          information from images on the site.
        </p>
        <h2 className="text-xl font-changa mb-3">Cookies</h2>
        <ul className="list-disc list-inside font-lato space-y-2 mb-6">
          <li className="pl-6">
            If you comment, you may opt-in to saving your name, email, and website in cookies for convenience — they
            last for one year.
          </li>
          <li className="pl-6">
            Visiting the login page sets a temporary cookie to test if your browser accepts cookies. It contains no
            personal data and is discarded when you close your browser.
          </li>
          <li className="pl-6">
            When you log in, several cookies save your login and screen preferences. Login cookies last two days (or two
            weeks with “Remember Me”), and screen option cookies last a year.
          </li>
          <li className="pl-6">If you log out, login cookies are removed.</li>
          <li className="pl-6">
            Publishing or editing a post sets a cookie with the post ID. It contains no personal data and expires after
            one day.
          </li>
        </ul>
        <h2 className="text-xl font-changa mb-3">Embedded content from other websites</h2>
        <p className="font-lato mb-6">
          Articles may include embedded content (videos, images, articles, etc.) which behaves as if you visited the
          other site directly. These sites may collect data, use cookies, and monitor your interaction — especially if
          you&apos;re logged in to those services.
        </p>
        <h2 className="text-xl font-changa mb-3">Who we share your data with</h2>
        <p className="font-lato mb-6">
          If you request a password reset, your IP address will be included in the reset email.
        </p>
        <h2 className="text-xl font-changa mb-3">How long we retain your data</h2>
        <ul className="list-disc list-inside font-lato space-y-2 mb-6">
          <li className="pl-6">
            Comments and metadata are retained indefinitely for moderation and follow-up purposes.
          </li>
          <li className="pl-6">
            For registered users, we store the personal information in their profile. Users can view, edit, or delete
            their info (except username). Admins can also manage this data.
          </li>
        </ul>
        <h2 className="text-xl font-changa mb-3">What rights you have over your data</h2>
        <p className="font-lato mb-6">
          If you have an account or left comments, you can request an exported file of your personal data or ask us to
          erase it. This excludes data we&apos;re required to keep for legal or security reasons.
        </p>
        <h2 className="text-xl font-changa mb-3">Where your data is sent</h2>
        <p className="font-lato">Visitor comments may be checked through an automated spam detection service.</p>
      </div>
    </>
  )
}

export default PrivacyPolicy
