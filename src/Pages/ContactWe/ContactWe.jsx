import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // منطق ارسال فرم را اینجا پیاده‌سازی کنید
        console.log('ارسال فرم:', formData);
        // بعد از ارسال، می‌توانید فیلدها را پاک کنید
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <h2>ارتباط با ما</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">نام:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="email">ایمیل:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="message">پیام:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">ارسال</button>
            </form>
        </div>
    );
};

export default ContactUs;
