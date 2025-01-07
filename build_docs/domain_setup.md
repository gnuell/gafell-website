# Domain and Form Setup Instructions

## Setting up reCAPTCHA

1. Go to https://www.google.com/recaptcha/admin
2. Sign in with your Google account
3. Register a new site:
   - Label: Gafell Website
   - Type: reCAPTCHA v2
   - Domains: Add both gafell.com and gnuell.github.io
4. reCAPTCHA keys have been configured:
   - Site Key: 6LdSdq8qAAAAABgTDGLPePsCVOva-M4lOyDoZyz4 (already added to index.html)
   - Secret Key: 6LdSdq8qAAAAABKAq0TwW51vSZJ6b0ShJzPBBYq- (keep secure, used server-side)

## Pointing gafell.com to GitHub Pages (Cloudflare Setup)

1. In GitHub repository first:
   - Go to Settings > Pages
   - Under "Build and deployment", ensure Source is set to "Deploy from a branch"
   - Select "main" branch and "/" (root) folder
   - Under "Custom domain", enter: gafell.com
   - Click Save
   - Wait for GitHub to verify the domain

2. In Cloudflare DNS settings:
   - Go to dash.cloudflare.com and select gafell.com
   - Go to DNS > Records
   - Keep all MX, TXT, and special CNAME records (like _domainconnect, email, send)
   - Update the main domain records:
     ```
     Type    Name    Content               Proxy status
     A       @       185.199.108.153      DNS only (gray cloud)
     A       @       185.199.109.153      DNS only (gray cloud)
     A       @       185.199.110.153      DNS only (gray cloud)
     A       @       185.199.111.153      DNS only (gray cloud)
     CNAME   www     gnuell.github.io     DNS only (gray cloud)
     ```
   - Remove or update these records if they exist:
     * CNAME ftp -> remove
     * CNAME mail -> remove (since you're using Google MX)

   Note: We're setting records to "DNS only" (gray cloud) initially to resolve the SSL issue. Once the site is working, we can re-enable Cloudflare proxy.

3. Configure Cloudflare SSL/TLS:
   - Go to SSL/TLS > Overview
   - Set SSL/TLS encryption mode to "Flexible" temporarily
   - Go to SSL/TLS > Edge Certificates
   - Enable all of these options:
     * Always Use HTTPS
     * Automatic HTTPS Rewrites
     * Opportunistic Encryption
     * TLS 1.3
   - Set Minimum TLS Version to 1.2
   - Under "Origin Server":
     * Go to "Origin Server" tab
     * Click "Install Certificate"
     * The Origin Certificate and Private Key have been generated and saved
     * Verify the certificate is active for:
       - gafell.com
       - *.gafell.com
     * Certificate is valid until January 4, 2040

Note: The Origin Certificate and Private Key have been securely saved. Do not share these credentials. They are required if you need to reinstall the certificate in the future.

4. Wait for Certificate Propagation:
   - It may take 5-15 minutes for the SSL certificate to become active
   - During this time, you might see Error 526 (Invalid SSL certificate)
   - Once propagation is complete, the site will be accessible via HTTPS

4. Configure Page Rules:
   - Go to Rules > Page Rules
   - Create a new page rule:
     * URL: http://gafell.com/*
     * Setting: Always Use HTTPS

5. Verify Setup:
   - Wait 5-10 minutes for initial propagation
   - Try accessing https://gafell.com
   - If you see a 404, go back to GitHub Pages settings and ensure:
     * Custom domain is still set to gafell.com
     * "Enforce HTTPS" option is available (may take up to 24 hours)
     * The site is being built from the correct branch

## Email Form Setup

The contact form is configured to use Formspree for handling email submissions. To set this up:

1. Go to https://formspree.io/
2. Sign up and create a new form
3. Formspree has been configured:
   - Form endpoint: https://formspree.io/f/mzzzkjor
   - Submissions will be forwarded to tommy.leung@gafell.com

## Verification

After setup:
1. Test the contact form with reCAPTCHA
2. Verify the domain is working with HTTPS
3. Confirm emails are being received at tommy.leung@gafell.com
