export const adminWelcomeTemplate = (firstName: string, email: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You've been added as an admin — The Pops Orchestra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000;">
    <tr>
      <td style="padding: 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; margin: 0 auto;">

          <!-- Logo -->
          <tr>
            <td style="padding: 0 0 36px 0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #da0032;">The Pops Orchestra</p>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase;">
                <span style="color: #ffffff;">Bradenton </span><span style="color: rgba(255,255,255,0.2);">&amp;</span><span style="color: #ffffff;"> Sarasota</span>
              </h1>
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 14px auto 0 auto;">
                <tr>
                  <td style="width: 32px; height: 1px; background-color: #da0032;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color: #0d0d0d; border: 1px solid rgba(255,255,255,0.06);">

              <!-- Red top border -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height: 2px; background-color: #da0032;"></td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 36px 36px 12px 36px;">

                    <!-- Eyebrow -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="width: 16px; height: 1px; background-color: #da0032; vertical-align: middle;"></td>
                        <td style="padding-left: 10px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #da0032; white-space: nowrap;">Admin Access Granted</td>
                      </tr>
                    </table>

                    <h2 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; color: #ffffff; line-height: 1.1;">
                      Hi ${firstName},
                    </h2>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                      <tr>
                        <td style="width: 28px; height: 1px; background-color: #da0032;"></td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                      <tr>
                        <td style="border-left: 2px solid #da0032; padding-left: 16px;">
                          <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.8;">
                            You've been added as an admin for <strong style="color: #ffffff;">The Pops Orchestra</strong> dashboard. Use the button below to log in with your email address.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Email pill -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 10px 16px; background-color: #111; border: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: rgba(255,255,255,0.6); letter-spacing: 0.05em;">
                          ${email}
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/login" style="display: inline-block; padding: 13px 28px; background-color: #da0032; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">
                      Log in to Dashboard
                    </a>

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

              <!-- Note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 20px 36px 32px 36px;">
                    <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.2);">
                      Getting started
                    </p>
                    <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.25); line-height: 1.7; font-style: italic;">
                      "Log in using the email address this message was sent to. If you have any trouble accessing your account, contact your system administrator."
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
