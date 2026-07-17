import LegalPolicyLayout from './LegalPolicyLayout';
import SEO from '../components/SEO';

export default function RefundPolicy() {
  return (
    <>
      <SEO 
        title="Trustique Assist Refund Policy"
        description="Read Trustique Assist's refund policy for our software development and related services."
        keywords="refund policy, trustique assist refund, terms of refund"
        url="https://trustiqueassist.com/refund-policy"
      />
      <LegalPolicyLayout
      title="Refund Policy"
      lastUpdated="March 24, 2026"
      pdfPath="/refund-policy.pdf"
      sections={[
        '1. No Refund Policy',
        '2. Service Commitment',
        '3. Project Execution',
        '4. Third-Party Services',
        '5. Project Cancellation',
        '6. Agreement Acceptance',
        '7. Contact Information',
      ]}
    >
      <p>
        At Trustique Assist Services, we are committed to delivering high-quality website and
        application development solutions, including pre-built SaaS platforms and custom
        development services.
      </p>
      <p>
        This Refund Policy outlines the terms regarding payments and refunds for all services
        offered by Trustique Assist Services.
      </p>

      <h2 id="section-1">1. No Refund Policy</h2>
      <p>
        All payments made to Trustique Assist Services are strictly non-refundable. Once the
        payment has been received and the project has been initiated, no refund requests will
        be accepted under any circumstances, including but not limited to:
      </p>
      <ul>
        <li>Change of mind after payment</li>
        <li>Change in business plans</li>
        <li>Delay caused by the client</li>
        <li>Client not providing required information or materials</li>
        <li>Client deciding not to continue the project</li>
        <li>Dissatisfaction after development has begun</li>
      </ul>
      <p>
        By making payment to Trustique Assist Services, the client acknowledges and agrees to
        this No Refund Policy.
      </p>

      <h2 id="section-2">2. Service Commitment</h2>
      <p>
        Trustique Assist Services guarantees that all services and deliverables promised at the
        time of agreement or quotation will be provided to the client.
      </p>
      <p>Deliverables may include but are not limited to:</p>
      <ul>
        <li>Mobile applications (Android / iOS)</li>
        <li>Website or web platform</li>
        <li>Admin panel or dashboard</li>
        <li>Source code (if included in agreement)</li>
        <li>Technical deployment support</li>
        <li>Bug fixing during the agreed maintenance period</li>
      </ul>

      <h2 id="section-3">3. Project Execution</h2>
      <p>
        Once payment is received:
      </p>
      <ul>
        <li>The project will be scheduled and development will begin.</li>
        <li>
          The client must provide all required content, details, branding materials, and
          approvals on time.
        </li>
        <li>Any delay caused by the client will not make the project eligible for a refund.</li>
      </ul>

      <h2 id="section-4">4. Third-Party Services</h2>
      <p>
        Trustique Assist Services may integrate third-party tools, APIs, hosting services,
        payment gateways, or external platforms.
      </p>
      <p>Please note:</p>
      <ul>
        <li>
          Third-party service charges are not controlled by Trustique Assist Services.
        </li>
        <li>
          Any payment made for third-party services is non-refundable and subject to the
          policies of the respective service provider.
        </li>
      </ul>

      <h2 id="section-5">5. Project Cancellation</h2>
      <p>If the client decides to cancel the project after payment:</p>
      <ul>
        <li>The project will be considered voluntarily terminated by the client.</li>
        <li>No refund will be issued.</li>
        <li>
          Any completed work or partially developed modules may be shared at the discretion of
          Trustique Assist Services.
        </li>
      </ul>

      <h2 id="section-6">6. Agreement Acceptance</h2>
      <p>
        By making payment to Trustique Assist Services or starting a project with us, the
        client confirms that they have:
      </p>
      <ul>
        <li>Read this Refund Policy</li>
        <li>Understood the terms</li>
        <li>Agreed to the No Refund condition</li>
      </ul>

      <h2 id="section-7">7. Contact Information</h2>
      <p>For any queries regarding this policy, please contact:</p>
      <p>
        Trustique Assist Services
        <br />
        Email: info@trustiqueassist.com
        <br />
        Phone: +91 8112403000
      </p>
    </LegalPolicyLayout>
    </>
  );
}
