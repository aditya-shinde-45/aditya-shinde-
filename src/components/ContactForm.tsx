import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// RFC 5322 simplified pattern
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBaseClasses =
  'w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-900 text-sm ' +
  'placeholder:text-gray-400 shadow-soft-sm ' +
  'transition-all duration-200 ease-in-out ' +
  'focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 focus:shadow-soft-md';

const errorInputClasses = 'border-red-400 focus:border-red-400 focus:ring-red-200';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ mode: 'onSubmit' });

  const onSubmit = (_data: ContactFormData) => {
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-soft-green shadow-soft-md">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">Message sent!</p>
        <p className="text-sm text-gray-500">Thanks for reaching out — I'll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-medium text-accent-blue underline-offset-2 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={`${inputBaseClasses} ${errors.name ? errorInputClasses : ''}`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="text-xs font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={`${inputBaseClasses} ${errors.email ? errorInputClasses : ''}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="text-xs font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="What's on your mind?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${inputBaseClasses} resize-none ${errors.message ? errorInputClasses : ''}`}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-xs font-medium text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={
          'inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded-2xl ' +
          'bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold text-sm ' +
          'shadow-soft-md transition-all duration-200 ease-in-out ' +
          'hover:scale-[1.04] hover:shadow-glow-blue focus:outline-none ' +
          'focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2'
        }
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
