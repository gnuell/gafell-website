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

## Pointing gafell.com to GitHub Pages

1. In your DNS provider's settings (where gafell.com is registered):

   Add these DNS records:
   ```
   Type    Name     Value
   A       @        185.199.108.153
   A       @        185.199.109.153
   A       @        185.199.110.153
   A       @        185.199.111.153
   CNAME   www     gnuell.github.io
   ```

2. In your GitHub repository:
   - Go to Settings > Pages
   - Under "Custom domain", enter: gafell.com
   - Click Save
   - Check "Enforce HTTPS" once the certificate is ready

3. Wait for DNS propagation (can take up to 48 hours)

## Email Form Setup

The contact form is configured to use Formspree for handling email submissions. To set this up:

1. Go to https://formspree.io/
2. Sign up and create a new form
3. Replace the form action URL in index.html with your Formspree endpoint
4. Configure the form to forward submissions to info@gafell.com

## Verification

After setup:
1. Test the contact form with reCAPTCHA
2. Verify the domain is working with HTTPS
3. Confirm emails are being received at info@gafell.com
