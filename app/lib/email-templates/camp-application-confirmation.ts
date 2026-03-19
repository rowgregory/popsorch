export const campApplicationConfirmationTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Camp Application Received - The Pops Orchestra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000;">
    <tr>
      <td style="padding: 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; margin: 0 auto;">

          <!-- Header -->
          <tr>
            <td style="padding: 0 0 36px 0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #ff9000;">The Pops Orchestra</p>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase;">
                <span style="color: #ffffff;">Bradenton </span><span style="color: rgba(255,255,255,0.2);">&amp;</span><span style="color: #ffffff;"> Sarasota</span>
              </h1>
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 14px auto 0 auto;">
                <tr>
                  <td style="width: 32px; height: 1px; background-color: #ff9000;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color: #0d0d0d; border: 1px solid rgba(255,255,255,0.06);">

              <!-- Blaze top border -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height: 2px; background: linear-gradient(90deg, #da0032 0%, #ff9000 100%);"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 36px 36px 12px 36px;">

                    <!-- Eyebrow -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="width: 16px; height: 1px; background-color: #ff9000; vertical-align: middle;"></td>
                        <td style="padding-left: 10px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #ff9000; white-space: nowrap;">Application Received</td>
                      </tr>
                    </table>

                    <h2 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; color: #ffffff; line-height: 1.1;">We got it, {{ firstName }}!</h2>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="width: 28px; height: 1px; background-color: #ff9000;"></td>
                      </tr>
                    </table>

                    <!-- Border-left blurb -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                      <tr>
                        <td style="border-left: 2px solid #ff9000; padding-left: 16px;">
                          <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.7;">
                            Thank you for submitting a camp application for <span style="color: #ffffff;">{{ studentFirstName }} {{ studentLastName }}</span>. We've received it and will be in touch soon with next steps.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Application summary -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px; background-color: rgba(255,255,255,0.03); border-left: 2px solid rgba(255,255,255,0.08);">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 10px;">
                                <p style="margin: 0 0 2px 0; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.25);">Student</p>
                                <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.7);">{{ studentFirstName }} {{ studentLastName }}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 10px;">
                                <p style="margin: 0 0 2px 0; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.25);">Instrument</p>
                                <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.7);">{{ instrument }}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="margin: 0 0 2px 0; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.25);">Submitted</p>
                                <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.7);">{{ submittedDate }}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- View application CTA -->
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7;">
                      You can log in to your account at any time to view your full submission using the email address this was sent to.
                    </p>

                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                      <tr>
                        <td style="background: linear-gradient(90deg, #da0032 0%, #ff9000 100%);">
                          <a href="{{ loginUrl }}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none;">
                            View My Application
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 0 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="height: 1px; background-color: rgba(255,255,255,0.06);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 20px 36px 32px 36px;">
                    <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.25); line-height: 1.7;">
                      Questions? Reply to this email or reach us at
                      <a href="mailto:info@thepopsorchestra.org" style="color: #ff9000; text-decoration: none;">info@thepopsorchestra.org</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0 0; text-align: center;">
              <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.15);">
                © 2026 The Pops Orchestra of Bradenton &amp; Sarasota
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
