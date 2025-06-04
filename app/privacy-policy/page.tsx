import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'

const PrivacyPolicy = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-4 990:px-12 1200:px-4 py-32 text-white">
        <h1 className="text-3xl font-changa mb-8">Privacy Policy</h1>

        <p className="font-lato mb-8 text-lg">
          At The Pops Orchestra, we keep things simple. This policy explains how we handle any information you share
          with us through our website.
        </p>

        <h2 className="text-xl font-changa mb-3">Who We Are</h2>
        <p className="font-lato mb-6">
          We&apos;re The Pops Orchestra of Bradenton and Sarasota, and our website is{' '}
          <a href="https://thepopsorchestra.org" className="text-sunburst underline">
            https://thepopsorchestra.org
          </a>
          . Our site was built by{' '}
          <a href="https://sqysh.io" className="text-lime-400 underline">
            Sqysh
          </a>
          , who helps us maintain a secure and user-friendly experience.
        </p>

        <h2 className="text-xl font-changa mb-3">When You Fill Out Our Forms</h2>
        <p className="font-lato mb-6">
          We have a few contact forms on our website where you can reach out to us with questions, requests, or to get
          more information about our orchestra. When you fill these out, we collect basic information like your name,
          email address, and your message. We use this information solely to get back to you - that&apos;s it!
        </p>

        <h2 className="text-xl font-changa mb-3">What We Don&apos;t Do</h2>
        <ul className="list-disc list-outside pl-6 font-lato space-y-2 mb-6">
          <li className="pl-6">We don&apos;t sell your information to anyone</li>
          <li className="pl-6">We don&apos;t share your details with third parties</li>
          <li className="pl-6">We don&apos;t send spam or unwanted emails</li>
          <li className="pl-6">We don&apos;t require you to create accounts or log in</li>
        </ul>

        <h2 className="text-xl font-changa mb-3">Tickets & Events</h2>
        <p className="font-lato mb-6">
          When you&apos;re ready to buy tickets for our concerts, you&apos;ll be directed to AudienceView, our ticketing
          partner. Any ticket purchases happen on their secure platform, not ours. Check out their privacy policy for
          details on how they handle your purchase information.
        </p>

        <h2 className="text-xl font-changa mb-3">Website Basics</h2>
        <p className="font-lato mb-6">
          Like most websites, ours automatically collects some basic information like your browser type and which pages
          you visit. This helps us understand how people use our site and make it better. We also use simple cookies to
          remember your preferences and make sure our forms work properly.
        </p>

        <h2 className="text-xl font-changa mb-3">Photos at Our Concerts</h2>
        <p className="font-lato mb-6">
          We love capturing the joy at our performances! We sometimes take photos and videos at concerts to share on our
          website and social media. If you&apos;d prefer not to be included, just let our volunteers know at the event.
        </p>

        <h2 className="text-xl font-changa mb-3">Keeping Things Secure</h2>
        <p className="font-lato mb-6">
          We take reasonable steps to protect any information you share with us. Our website uses secure connections,
          and only a few orchestra administrators have access to form submissions.
        </p>

        <h2 className="text-xl font-changa mb-3">Your Questions & Requests</h2>
        <p className="font-lato mb-6">
          If you have questions about this policy, want to know what information we have about you, or would like us to
          delete your contact details, just reach out! You can contact us at{' '}
          <a href="mailto:info@thepopsorchestra.org" className="text-sunburst underline">
            info@thepopsorchestra.org
          </a>{' '}
          or call us at{' '}
          <a href="tel:941-926-7677" className="text-sunburst underline">
            (941) 926-POPS
          </a>
          .
        </p>

        <h2 className="text-xl font-changa mb-3">Updates</h2>
        <p className="font-lato mb-6">
          If we ever need to update this policy, we&apos;ll post the changes here. Since we keep things pretty simple,
          we don&apos;t expect many changes!
        </p>

        <p className="font-lato text-sm opacity-75">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </>
  )
}

export default PrivacyPolicy
