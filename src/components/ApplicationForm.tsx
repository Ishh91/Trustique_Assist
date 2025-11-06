import React, { useState } from 'react';
import Modal from './Modal';

interface OpenRole {
  id: string;
  title: string;
  department: string;
}

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  availableRoles: OpenRole[];
  selectedRoleId?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  isOpen,
  onClose,
  availableRoles,
  selectedRoleId
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleId: selectedRoleId || '',
    experience: '',
    message: '',
    resume: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const sendEmail = async () => {
    // In a real implementation, you would use a service like EmailJS, SendGrid, or your backend API
    console.log('Sending application via email:', formData);
    return new Promise<void>(resolve => setTimeout(resolve, 1000));
  };

  const sendWhatsApp = () => {
    const selectedRole = availableRoles.find(role => role.id === formData.roleId);
    const roleName = selectedRole ? selectedRole.title : 'Not specified';

    // Format the message for WhatsApp
    const message = `*New Job Application*%0A
Name: ${formData.fullName}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A
Role: ${roleName}%0A
Experience: ${formData.experience}%0A
Message: ${formData.message}`;

    // Replace with the actual business phone number
    const phoneNumber = '918112403000'; // Format: country code + number

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Send via email
      await sendEmail();

      // Send via WhatsApp
      sendWhatsApp();

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          roleId: '',
          experience: '',
          message: '',
          resume: null,
        });
      }, 2000);
    } catch (error) {
      setSubmitError('Failed to submit application. Please try again.');
      console.error('Application submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply for a Position">
      {submitSuccess ? (
        <div className="text-center py-4">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600">Thank you for your interest. We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="roleId" className="block text-sm font-medium text-gray-700">Position *</label>
            <select
              id="roleId"
              name="roleId"
              required
              value={formData.roleId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a position</option>
              {availableRoles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.title} - {role.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Cover Letter / Message</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume/CV</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
          </div>

          {submitError && (
            <div className="text-red-500 text-sm">{submitError}</div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ApplicationForm;