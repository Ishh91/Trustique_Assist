import LegalPolicyLayout from './LegalPolicyLayout';
import SEO from '../components/SEO';

export default function TermsAndConditions() {
  return (
    <>
      <SEO 
        title="Trustique Assist Terms and Conditions"
        description="Read Trustique Assist's terms and conditions for using our website and services."
        keywords="terms and conditions, terms of service, trustique assist terms"
        url="https://trustiqueassist.com/terms-and-conditions"
      />
      <LegalPolicyLayout
      title="Terms and Conditions"
      lastUpdated="March 24, 2026"
      pdfPath="/terms-and-conditions.pdf"
      sections={[
        '1. Acceptance of Terms',
        '2. Services and Deliverables',
        '3. Intellectual Property',
        '4. Payment Terms',
        '5. Limitation of Liability',
        '6. Contact Us',
      ]}
    >
      <h2 id="section-1">1. Acceptance of Terms</h2>
      <p>
        Welcome to Trustique Assist. These Terms and Conditions govern your use of our website
        and services, including our pre-built applications and custom development projects. By
        accessing or using our services, you agree to be bound by these terms. If you disagree
        with any part of the terms, then you may not access the service.
      </p>

      <h2 id="section-2">2. Services and Deliverables</h2>
      <p>
        We provide both pre-built software solutions and custom development services. Specific
        deliverables, timelines, and costs are outlined in your individual project agreement or
        invoice.
      </p>
      <ul>
        <li>Pre-built Solutions: Delivered as described on our product pages.</li>
        <li>
          Custom Development: Timelines are estimates and subject to the prompt provision of
          materials by the client.
        </li>
      </ul>

      <h2 id="section-3">3. Intellectual Property</h2>
      <p>
        Upon full payment, Trustique Assist transfers the authority of the code to the client
        as specified in our FAQ. Until final payment is processed, all code, designs, and
        assets remain the property of Trustique Assist.
      </p>
      <p>
        You are granted a limited license to use the website and our services for personal or
        business use, subject to these restrictions.
      </p>

      <h2 id="section-4">4. Payment Terms</h2>
      <p>
        Payments are due upon receipt of invoice unless otherwise agreed. We reserve the right
        to suspend services or withhold delivery of source code for overdue accounts.
      </p>

      <h2 id="section-5">5. Limitation of Liability</h2>
      <p>
        In no event shall Trustique Assist, nor its directors, employees, partners, agents,
        suppliers, or affiliates, be liable for any indirect, incidental, special,
        consequential or punitive damages, including without limitation, loss of profits, data,
        use, goodwill, or other intangible losses.
      </p>

      <h2 id="section-6">6. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at:
        info@trustiqueassist.com
      </p>
    </LegalPolicyLayout>
    </>
  );
}
