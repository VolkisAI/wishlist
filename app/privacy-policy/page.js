import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

/**
 * Privacy Policy page
 * 
 * This is a page where you explain how you handle user data.
 * It's important to be transparent about data collection and usage.
 * 
 * REQUIRED: update the content of this page to match your business needs:
 * - Website: https://santaswishlist.app
 * - Name: SantasWishlist
 * - Description: A magical platform for creating and managing Christmas wishlists
 * - Features: 
 *   - User accounts
 *   - Wishlist creation and management
 *   - Email notifications
 *   - Google authentication
 * - Contact information: sebastian@volkis.co.uk
 */

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <div className="prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          {`Thank you for visiting SantasWishlist ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://santaswishlist.app (the "Website").

1. Information We Collect

We collect the following types of information:

a) Personal Information:
- Email address (when you sign up)
- Authentication data (when you log in with Google)
- Wishlist data (when you create wishlists)
- Communication preferences

b) Non-Personal Information:
- Browser type
- Device information
- Usage data
- IP address

2. How We Use Your Information

We use your information to:
- Provide and maintain our services
- Send you important updates
- Improve our website
- Respond to your requests
- Send Christmas-related communications

3. Data Storage and Security

We use industry-standard security measures to protect your data. Your information is stored securely on our servers and we use encryption to protect sensitive data.

4. Third-Party Services

We use trusted third-party services:
- Google (for authentication)
- Supabase (for database)
- Vercel (for hosting)
- Resend (for emails)

5. Children's Privacy

SantasWishlist is not intended for children under the age of 13 without parental consent. Parents can create and manage wishlists on behalf of their children.

6. Data Retention

We retain your data as long as your account is active or as needed to provide you services. You can request data deletion at any time.

7. Your Rights

You have the right to:
- Access your data
- Correct your data
- Delete your data
- Export your data
- Opt out of communications

8. Changes to Privacy Policy

We may update this policy occasionally. We will notify you of significant changes via email.

9. Contact Us

For privacy concerns:
Email: sebastian@volkis.co.uk

10. Consent

By using SantasWishlist, you consent to the terms of this Privacy Policy.`}
        </div>
      </div>
    </main>
  );
}
