/**
 * Generates a punk silkscreen-inspired HTML email
 * matching the portfolio's Living Poster design system.
 *
 * Palette:
 *   --charcoal   #141414
 *   --ink        #0A0A0A
 *   --vermilion  #E4401C
 *   --acid       #FFD500
 *   --cream      #F4EDD8
 *   --font-display  Space Grotesk (web-safe fallback: Arial Black)
 *   --font-mono     IBM Plex Mono (web-safe fallback: Courier New)
 */
export function buildContactEmail({ name, email, message }) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Escape HTML to prevent injection
  const safe = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");

  const safeName    = safe(name);
  const safeEmail   = safe(email);
  const safeMessage = safe(message).replace(/\n/g, "<br/>");

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Transmission</title>
</head>
<body style="
  margin: 0; padding: 0;
  background-color: #0A0A0A;
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #0A0A0A; padding: 40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 600px; width: 100%;">

          <!-- ── TOP ACID STRIPE ─────────────────────── -->
          <tr>
            <td style="
              background: #FFD500;
              padding: 10px 32px;
              border-left: 6px solid #E4401C;
              border-right: 6px solid #E4401C;
            ">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    font-family: 'Arial Black', Arial, sans-serif;
                    font-size: 9px;
                    font-weight: 900;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #0A0A0A;
                  ">⬛ INCOMING TRANSMISSION</td>
                  <td align="right" style="
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 9px;
                    letter-spacing: 0.12em;
                    color: #0A0A0A;
                    opacity: 0.7;
                  ">${timestamp} IST</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── HEADER BLOCK ────────────────────────── -->
          <tr>
            <td style="
              background: #141414;
              padding: 36px 32px 28px;
              border-left: 6px solid #E4401C;
              border-right: 6px solid #E4401C;
              border-top: 1px solid rgba(244,237,216,0.08);
            ">
              <!-- Label pill -->
              <div style="
                display: inline-block;
                padding: 4px 12px;
                border: 1.5px solid #E4401C;
                font-family: 'Courier New', Courier, monospace;
                font-size: 9px;
                letter-spacing: 0.22em;
                text-transform: uppercase;
                color: #E4401C;
                margin-bottom: 20px;
              ">◉ OPEN COMMS · PORTFOLIO</div>

              <!-- Big headline -->
              <div style="
                font-family: 'Arial Black', Arial, sans-serif;
                font-size: 42px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: -0.03em;
                line-height: 0.9;
                color: #F4EDD8;
                margin-bottom: 6px;
              ">NEW<br/>
                <span style="color: #E4401C;">PAYLOAD.</span>
              </div>

              <p style="
                font-family: 'Courier New', Courier, monospace;
                font-size: 11px;
                color: rgba(244,237,216,0.35);
                letter-spacing: 0.08em;
                margin: 14px 0 0;
              ">
                Someone just fired a message through your contact form.
              </p>
            </td>
          </tr>

          <!-- ── DIVIDER: jagged tear simulation ──────── -->
          <tr>
            <td style="
              background: #141414;
              border-left: 6px solid #E4401C;
              border-right: 6px solid #E4401C;
              padding: 0 32px;
            ">
              <div style="
                border-top: 2px dashed rgba(244,237,216,0.1);
                margin: 0;
              "></div>
            </td>
          </tr>

          <!-- ── SENDER BLOCK ────────────────────────── -->
          <tr>
            <td style="
              background: #141414;
              padding: 28px 32px;
              border-left: 6px solid #E4401C;
              border-right: 6px solid #E4401C;
            ">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>

                  <!-- Name cell -->
                  <td width="50%" style="padding-right: 12px; vertical-align: top;">
                    <div style="
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 8px;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: rgba(244,237,216,0.3);
                      margin-bottom: 6px;
                    ">◆ SENDER NAME</div>
                    <div style="
                      background: rgba(244,237,216,0.04);
                      border: 1.5px solid rgba(244,237,216,0.12);
                      border-left: 3px solid #FFD500;
                      padding: 10px 14px;
                      font-family: 'Arial Black', Arial, sans-serif;
                      font-size: 15px;
                      font-weight: 900;
                      color: #F4EDD8;
                      text-transform: uppercase;
                      letter-spacing: -0.01em;
                      word-break: break-word;
                    ">${safeName}</div>
                  </td>

                  <!-- Email cell -->
                  <td width="50%" style="padding-left: 12px; vertical-align: top;">
                    <div style="
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 8px;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: rgba(244,237,216,0.3);
                      margin-bottom: 6px;
                    ">✉ REPLY-TO</div>
                    <div style="
                      background: rgba(244,237,216,0.04);
                      border: 1.5px solid rgba(244,237,216,0.12);
                      border-left: 3px solid #E4401C;
                      padding: 10px 14px;
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 11px;
                      color: #E4401C;
                      word-break: break-all;
                    ">
                      <a href="mailto:${safeEmail}"
                        style="color: #E4401C; text-decoration: none;">
                        ${safeEmail}
                      </a>
                    </div>
                  </td>

                </tr>
              </table>
            </td>
          </tr>

          <!-- ── MESSAGE BLOCK ───────────────────────── -->
          <tr>
            <td style="
              background: #141414;
              padding: 0 32px 32px;
              border-left: 6px solid #E4401C;
              border-right: 6px solid #E4401C;
            ">
              <div style="
                font-family: 'Courier New', Courier, monospace;
                font-size: 8px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: rgba(244,237,216,0.3);
                margin-bottom: 8px;
              ">▲ MESSAGE BODY</div>

              <div style="
                background: #1c1c1c;
                border: 1.5px solid rgba(244,237,216,0.1);
                border-left: 4px solid #E4401C;
                padding: 20px 20px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 13px;
                line-height: 1.75;
                color: #F4EDD8;
                white-space: pre-wrap;
                word-break: break-word;
              ">${safeMessage}</div>

              <!-- CTA reply button -->
              <div style="margin-top: 20px; text-align: center;">
                <a href="mailto:${safeEmail}?subject=Re: Your message to Shivam Kishore"
                  style="
                    display: inline-block;
                    padding: 14px 36px;
                    background: #E4401C;
                    color: #F4EDD8;
                    font-family: 'Arial Black', Arial, sans-serif;
                    font-size: 11px;
                    font-weight: 900;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    text-decoration: none;
                    border: 2.5px solid #0A0A0A;
                  ">
                  ↩ REPLY TO ${safeName.toUpperCase()} →
                </a>
              </div>
            </td>
          </tr>

          <!-- ── ACID DIVIDER ────────────────────────── -->
          <tr>
            <td style="
              background: #E4401C;
              height: 4px;
              border-left: 6px solid #E4401C;
              border-right: 6px solid #E4401C;
            "></td>
          </tr>

          <!-- ── FOOTER ──────────────────────────────── -->
          <tr>
            <td style="
              background: #0A0A0A;
              border: 6px solid #E4401C;
              border-top: none;
              padding: 20px 32px;
            ">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 9px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: rgba(244,237,216,0.2);
                  ">
                    SHIVAM KISHORE · IIIT DHARWAD · 2026
                  </td>
                  <td align="right" style="
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 9px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(228,64,28,0.4);
                  ">
                    1977 PUNK × 2026 SWE
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}
