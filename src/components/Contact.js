import React, { useEffect, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('contactDraft'));
    if (saved) {
      setFormData(saved);
      setCharCount(saved.message.length);
    }
  }, []);

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
          localStorage.setItem('contactDraft', JSON.stringify(formData));
       }
  }, [formData]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let msg = '';
    if (!value.trim()) msg = 'مطلوب';
    else if (name === 'email' && !emailRegex.test(value)) msg = 'بريد غير صالح';
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') setCharCount(value.length);
    setFormData((p) => ({ ...p, [name]: value }));
    validateField(name, value);          
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);         
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ['name', 'email', 'message'].forEach((k) => validateField(k, formData[k]));
    if (Object.values(errors).every((v) => v === '') &&
        formData.name && formData.email && formData.message && emailRegex.test(formData.email)) {
      setSubmitted(true);
      localStorage.removeItem('contactDraft');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>

      {submitted ? (
        <p className="confirmation">✔️ تم إرسال رسالتك بنجاح!</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {/* Name */}
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          {/* Email */}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Message:
            <textarea
              name="message"
              rows="5"
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="char-count">{charCount}/500</div>
            {errors.message && <span className="error">{errors.message}</span>}
          </label>

          <button type="submit" className="send-btn">Send</button>
        </form>
      )}
    </section>
  );
};

export default Contact;
