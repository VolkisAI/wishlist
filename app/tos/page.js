/**
 * Terms of Service page
 * 
 * This is a page where you explain the terms and conditions for using your service.
 * It's important to be clear and comprehensive about what users can and cannot do.
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

export default function TermsOfService() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <div className="prose dark:prose-invert">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          {`Welcome to SantasWishlist!

These Terms of Service ("Terms") govern your use of the SantasWishlist website at https://santaswishlist.app ("Website") and the services provided by SantasWishlist. By using our Website and services, you agree to these Terms.

1. Description of Service

SantasWishlist is a platform that allows families to create and manage Christmas wishlists, receive personalized letters from Santa, and share the magic of Christmas with their loved ones.

2. User Accounts

2.1. You must be at least 18 years old to create an account.
2.2. Parents/guardians can create and manage wishlists on behalf of their children.
2.3. You are responsible for maintaining the security of your account.
2.4. You must provide accurate and complete information when creating an account.

3. Use of Service

3.1. You agree to use the service for its intended purpose.
3.2. You will not use the service for any illegal or unauthorized purpose.
3.3. You will not attempt to harm or disrupt the service.

4. Content Guidelines

4.1. All content must be appropriate for children.
4.2. No inappropriate, offensive, or harmful content is allowed.
4.3. We reserve the right to remove any content that violates these guidelines.

5. Privacy

5.1. We respect your privacy and handle your data according to our Privacy Policy.
5.2. You can view our complete Privacy Policy at https://santaswishlist.app/privacy-policy.

6. Intellectual Property

6.1. The service and its content are protected by copyright and other laws.
6.2. You retain ownership of your content but grant us license to use it for providing the service.

7. Termination

7.1. We may terminate or suspend your account for violations of these Terms.
7.2. You may delete your account at any time.

8. Changes to Terms

8.1. We may update these Terms from time to time.
8.2. We will notify you of significant changes via email.

9. Disclaimer

9.1. The service is provided "as is" without warranties.
9.2. We are not responsible for user-generated content.

10. Contact

For any questions or concerns regarding these Terms of Service, please contact us at sebastian@volkis.co.uk.

Thank you for using SantasWishlist!`}
        </div>
      </div>
    </main>
  );
}
