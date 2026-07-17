import LegalPolicyLayout from './LegalPolicyLayout';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Trustique Assist Privacy Policy"
        description="Read Trustique Assist's privacy policy to understand how we collect, use, and protect your data."
        keywords="privacy policy, data protection, trustique assist privacy"
        url="https://trustiqueassist.com/privacy-policy"
      />
      <LegalPolicyLayout
      title="Privacy Policy"
      lastUpdated="March 24, 2026"
      pdfPath="/privacy-policy.pdf"
      sections={[
        '1. Information We Collect',
        '2. How We Use Information',
        '3. Code Authority & Data Security',
        '4. Cookies',
        '5. Third-Party Links',
        '6. Contact Us',
      ]}
    >
      <h2 id="section-1">1. Information We Collect</h2>
      <p>
        At Trustique Assist, we prioritize the protection of your data. We collect information
        that you provide directly to us, such as when you subscribe to our newsletter, request
        a quote, or purchase a pre-built solution.
      </p>
      <p>Types of data collected:</p>
      <ul>
        <li>Personal identifiers (Name, Email address, Phone number).</li>
        <li>Project details and specifications for custom development.</li>
        <li>Payment information (processed securely through third-party providers).</li>
      </ul>

      <h2 id="section-2">2. How We Use Information</h2>
      <p>
        We use the collected data for specific business purposes, including but not limited to:
      </p>
      <ul>
        <li>Delivering your custom or pre-built software solutions.</li>
        <li>Communicating project updates and support.</li>
        <li>
          Sending you newsletters (only if you have opted in via our footer subscription).
        </li>
        <li>Improving our website functionality and user experience.</li>
      </ul>

      <h2 id="section-3">3. Code Authority &amp; Data Security</h2>
      <p>
        We respect the confidentiality of your projects. As outlined in our FAQ, once full
        payment is received, the complete source code authority is transferred to you. We do
        not retain rights to use your custom project code for other clients without your
        explicit permission.
      </p>

      <h2 id="section-4">4. Cookies</h2>
      <p>
        Our website uses cookies to enhance your browsing experience. You can choose to disable
        cookies through your individual browser options, though this may affect the
        functionality of certain site features.
      </p>

      <h2 id="section-5">5. Third-Party Links</h2>
      <p>
        Our website may contain links to other sites. If you click on a third-party link, you
        will be directed to that site. Note that these external sites are not operated by us,
        and we advise you to review their Privacy Policies.
      </p>

      <h2 id="section-6">6. Contact Us</h2>
      <p>
        If you have any questions or suggestions about our Privacy Policy, do not hesitate to
        contact us at: info@trustiqueassist.com
      </p>
    </LegalPolicyLayout>
    </>
  );
}
