import Breadcrumb from '../components/common/Breadcrumb'

const Accessibility = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Accessibility" />
      <div className="max-w-4xl mx-auto px-6 py-32 text-white">
        <h1 className="text-3xl font-changa mb-4">The Pops Orchestra Accessibility Statement</h1>
        <p className="font-lato text-sm mb-10">Updated: April 2024.</p>

        <p className="font-lato mb-6">
          Accessibility is a priority for us. The Pops Orchestra strives to ensure that its services are accessible to
          people with disabilities. We&apos;ve invested significantly in resources to help make our website easier to
          use and more accessible — because we believe everyone has the right to live with dignity, equality, comfort,
          and independence.
        </p>

        <h2 className="text-xl font-changa mt-10 mb-3">Accessibility on ThePopsOrchestra.org</h2>
        <p className="font-lato mb-6">
          We use the UserWay Website Accessibility Widget powered by a dedicated server. This helps ThePopsOrchestra.org
          improve compliance with the Web Content Accessibility Guidelines (WCAG 2.1).
        </p>

        <h2 className="text-xl font-changa mt-10 mb-3">Enabling the Accessibility Menu</h2>
        <p className="font-lato mb-6">
          You can activate our accessibility menu by pressing the <strong>Tab</strong> key when the page first loads or
          by clicking the accessibility icon in the page corner. Please allow a moment for the menu to load fully.
        </p>

        <h2 className="text-xl font-changa mt-10 mb-3">Disclaimer</h2>
        <p className="font-lato mb-6">
          We&apos;re always working to improve the accessibility of our site. We believe it&apos;s our collective
          responsibility to provide seamless, accessible experiences to everyone.
        </p>
        <ul className="list-disc list-inside font-lato space-y-2 mb-6">
          <li>We regularly scan ThePopsOrchestra.org using UserWay&apos;s Website Accessibility Scanner.</li>
          <li>
            Some content may not yet meet the strictest accessibility standards — we&apos;re actively identifying the
            best solutions for improvement.
          </li>
        </ul>

        <h2 className="text-xl font-changa mt-10 mb-3">Here For You</h2>
        <p className="font-lato mb-6">
          If you&apos;re experiencing difficulty with any content or need help using our site, please don&apos;t
          hesitate to reach out during business hours.
        </p>

        <h2 className="text-xl font-changa mt-10 mb-3">Contact Us</h2>
        <p className="font-lato mb-1">
          <strong>Email:</strong>{' '}
          <a href="mailto:gayle@thepopsorchestra.org" className="text-blaze underline">
            gayle@thepopsorchestra.org
          </a>
        </p>
        <p className="font-lato">
          <strong>Phone:</strong>{' '}
          <a href="tel:+19419267677" className="text-blaze underline">
            +1-941-926-7677
          </a>
        </p>
      </div>
    </>
  )
}

export default Accessibility
