import React, { useState, useEffect } from 'react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledService = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    serviceInterest: prefilledService,
    projectDescription: '',
    budgetRange: '',
    timeline: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData((prev) => ({ ...prev, serviceInterest: prefilledService }));
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, prefilledService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'projectDescription') {
      if (value.length <= 500) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('fullName', formData.fullName);
      formBody.append('email', formData.email);
      formBody.append('companyName', formData.companyName);
      formBody.append('phone', formData.phone);
      formBody.append('serviceInterest', formData.serviceInterest);
      formBody.append('projectDescription', formData.projectDescription);
      formBody.append('budgetRange', formData.budgetRange);
      formBody.append('timeline', formData.timeline);

      const response = await fetch('https://readdy.ai/api/form/d6jj58vrgrhbthj8n090', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          phone: '',
          serviceInterest: '',
          projectDescription: '',
          budgetRange: '',
          timeline: '',
        });
        setCharCount(0);
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <i className="ri-close-line text-xl text-black/60"></i>
        </button>

        {/* Header */}
        <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 border-b border-black/[0.08]">
          <div
            className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4 md:mb-6"
            style={{
              background: 'linear-gradient(135deg, #5B2DFF 0%, #4A1FE6 100%)',
              boxShadow: '0 4px 24px rgba(91,45,255,0.25)',
            }}
          >
            <i className="ri-mail-send-line text-2xl md:text-3xl text-white"></i>
          </div>
          <h2 className="font-editorial font-black text-2xl md:text-3xl lg:text-4xl text-[#0D0D0D] mb-2">
            Book Us for This
          </h2>
          <p className="text-black/50 text-sm md:text-base">
            Share your project details and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <form
          id="project-inquiry-form"
          data-readdy-form
          onSubmit={handleSubmit}
          className="px-6 md:px-10 py-6 md:py-8"
        >
          <div className="space-y-5 md:space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                Full Name <span className="text-[#5B2DFF]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                Email <span className="text-[#5B2DFF]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200"
                placeholder="john@company.com"
              />
            </div>

            {/* Company Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Service of Interest */}
            <div>
              <label htmlFor="serviceInterest" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                Service of Interest <span className="text-[#5B2DFF]">*</span>
              </label>
              <select
                id="serviceInterest"
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200 bg-white cursor-pointer"
              >
                <option value="">Select a service</option>
                <option value="Go-To-Market Launchpad">Go-To-Market Launchpad</option>
                <option value="SEG Framework">SEG Framework</option>
                <option value="Performance Marketing">Performance Marketing</option>
                <option value="Marketing Audit">Marketing Audit</option>
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                Project Description <span className="text-[#5B2DFF]">*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200 resize-none"
                placeholder="Tell us about your project, goals, and what you're looking to achieve..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-black/40">Maximum 500 characters</p>
                <p className={`text-xs font-medium ${charCount >= 500 ? 'text-[#5B2DFF]' : 'text-black/40'}`}>
                  {charCount}/500
                </p>
              </div>
            </div>

            {/* Budget Range & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200 bg-white cursor-pointer"
                >
                  <option value="">Select budget</option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000+">$50,000+</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-[#0D0D0D] mb-2">
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm md:text-base border border-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B2DFF]/30 focus:border-[#5B2DFF] transition-all duration-200 bg-white cursor-pointer"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <i className="ri-checkbox-circle-fill text-xl text-green-600"></i>
              <p className="text-sm text-green-800 font-medium">
                Thank you! We'll be in touch within 24 hours.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <i className="ri-error-warning-fill text-xl text-red-600"></i>
              <p className="text-sm text-red-800 font-medium">
                Something went wrong. Please try again or email us directly.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1 px-6 py-3.5 text-white text-sm md:text-base font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #5B2DFF 0%, #4A1FE6 100%)',
                boxShadow: '0 4px 24px rgba(91,45,255,0.35)',
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Sending...
                </span>
              ) : submitStatus === 'success' ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-check-line"></i>
                  Sent Successfully
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Inquiry
                  <i className="ri-arrow-right-line"></i>
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 border border-black/15 text-black/60 text-sm md:text-base font-semibold rounded-full hover:border-black/30 hover:text-black/80 transition-all duration-300 whitespace-nowrap"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectInquiryModal;