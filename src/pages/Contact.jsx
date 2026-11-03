import "./Contact.css";
import { useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";
import SEO from "../utils/seo";

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/backend-php/api/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });

        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert("❌ Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SEO
        title="Contact Us | Indo Sparsh Studio"
        description="Get in touch with Indo Sparsh Studio for web development, app development, digital marketing, UI/UX design, branding and business solutions."
        keywords="contact Indo Sparsh Studio, web development company, app development, digital marketing, UI UX design, branding, business consultancy"
      />
      <section className="contact-section-page">
        {/* Header */}
        <div className="contact-header">
          <h1>
            Contact <span>Us</span>
          </h1>
          <p>
            Feel free to contact us with any questions or concerns. We will get
            back to you within 24 hours.
          </p>
        </div>

        {/* Form Card */}
        <div className="contact-card-page">
          <form className="contact-form-page" onSubmit={handleSubmit}>
            <div className="form-row-page">
              <div className="form-group-contact">
                <label>First Name *</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-group-contact">
                <label>Last Name </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group-contact">
              <label>Phone No. *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact Number"
                required
              />
            </div>
            <div className="form-group-contact">
              <label>Email Id *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group-contact">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
              />
            </div>

            <button className="contact-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {success && (
            <div className="success-overlay">
              <div className="success-box">
                <div className="success-check">✓</div>
                <h2>Message Sent</h2>
                <p>We’ll contact you very soon.</p>
              </div>
            </div>
          )}
        </div>

        <div className="info-card why-card">
          <h2>Contacts</h2>
          <p className="info-highlight">contact@indosparsh.com</p>
          <p>+91 80053 51770</p>
        </div>

        <div className="info-card why-card">
          <h2>Address</h2>
          <p>
            Incuspaze, 11th Floor Rohtas Summit, Vibhuti Khand, Gomtinagar,
            Lucknow – 226010, Uttar Pradesh, India
          </p>
        </div>

        <div className="info-card why-card">
          <h2>Opening Hours</h2>
          <p>
            Monday – Saturday: <span>10:00 AM – 5:00 PM</span>
          </p>
          <p>
            Sunday: <span className="closed">Closed</span>
          </p>
        </div>

        {/* MAP CARD */}
        <div className="map-card">
          <iframe
            title="Indo Sparsh Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2887749198094!2d80.99241317414739!3d26.862564862246256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c9d61cb27b%3A0x2b7487eae56b0919!2sSumit%20Complex%2C%20Vibhuti%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1769161850031!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* <SocialLinks /> */}
      </section>
    </>
  );
}
