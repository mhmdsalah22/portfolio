import React, { useEffect, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('contactDraft'));
    if (savedData) {
      setFormData(savedData);
      setCharCount(savedData.message.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactDraft', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }
    if (!formData.message.trim()) newErrors.message = 'الرسالة مطلوبة';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      localStorage.removeItem('contactDraft');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') setCharCount(value.length);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      {submitted ? (
        <p className="confirmation">✔️ تم إرسال رسالتك بنجاح!</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Message:
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
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
