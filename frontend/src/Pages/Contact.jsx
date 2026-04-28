import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('reservation')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', phone: '', date: '', guests: '2', message: '' })
  }

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#0d0b07', minHeight: '100vh', color: '#e8dcc8' }}>
      
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-hero {
          position: relative;
          height: 55vh;
          min-height: 380px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .contact-hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
          filter: brightness(0.45) sepia(0.3);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,11,7,1) 0%, rgba(13,11,7,0.3) 60%, transparent 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 3rem 6vw;
          width: 100%;
        }

        .hero-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 400;
          line-height: 1;
          color: #f5ede0;
          letter-spacing: 0.05em;
        }

        .gold-line {
          width: 60px;
          height: 1px;
          background: #c9a84c;
          margin: 1.5rem 0;
        }

        .main-layout {
          max-width: 1280px;
          margin: 0 auto;
          padding: 5rem 6vw;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 6rem;
        }

        @media (max-width: 900px) {
          .main-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
            padding: 3rem 5vw;
          }
        }

        /* Left column */
        .section-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          line-height: 1.15;
          color: #f0e6d3;
          margin-bottom: 2rem;
        }

        .section-heading em {
          font-style: italic;
          color: #c9a84c;
        }

        .info-block {
          border-left: 1px solid rgba(201,168,76,0.3);
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-label {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.4em;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .info-value {
          font-size: 1.05rem;
          font-weight: 300;
          color: #d4c4a8;
          line-height: 1.7;
        }

        .info-value a {
          color: #d4c4a8;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          transition: color 0.2s, border-color 0.2s;
        }

        .info-value a:hover {
          color: #c9a84c;
          border-color: #c9a84c;
        }

        .map-container {
          margin-top: 2.5rem;
          position: relative;
          border: 1px solid rgba(201,168,76,0.2);
          overflow: hidden;
        }

        .map-container img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          opacity: 0.75;
          display: block;
          transition: opacity 0.3s;
        }

        .map-container:hover img { opacity: 0.9; }

        .map-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem 1.25rem;
          background: linear-gradient(to top, rgba(13,11,7,0.95), transparent);
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: #c9a84c;
        }

        /* Right column — form */
        .tab-row {
          display: flex;
          border-bottom: 1px solid rgba(201,168,76,0.2);
          margin-bottom: 2.5rem;
          gap: 0;
        }

        .tab-btn {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #7a6a4e;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1.5rem 0.75rem 0;
          position: relative;
          transition: color 0.2s;
        }

        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.3s;
        }

        .tab-btn.active { color: #c9a84c; }
        .tab-btn.active::after { width: calc(100% - 1.5rem); }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full { grid-column: 1 / -1; }

        .form-group label {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.4em;
          color: #c9a84c;
          text-transform: uppercase;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          color: #e8dcc8;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
          border-radius: 0;
          width: 100%;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: rgba(201,168,76,0.6);
          background: rgba(255,255,255,0.06);
        }

        .form-group select option {
          background: #1a1610;
          color: #e8dcc8;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 110px;
        }

        .submit-btn {
          margin-top: 2rem;
          width: 100%;
          padding: 1rem 2rem;
          background: transparent;
          border: 1px solid #c9a84c;
          color: #c9a84c;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.3s;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a84c;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .submit-btn:hover { color: #0d0b07; }
        .submit-btn:hover::before { transform: translateX(0); }
        .submit-btn span { position: relative; z-index: 1; }

        .success-msg {
          margin-top: 1.5rem;
          padding: 1rem 1.25rem;
          border: 1px solid rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.06);
          font-size: 0.95rem;
          color: #c9a84c;
          font-style: italic;
          text-align: center;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        /* Hours strip */
        .hours-strip {
          background: #121009;
          border-top: 1px solid rgba(201,168,76,0.15);
          border-bottom: 1px solid rgba(201,168,76,0.15);
          padding: 3rem 6vw;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
          max-width: 100%;
        }

        .hours-item { text-align: center; }
        .hours-day {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .hours-time {
          font-size: 1rem;
          font-weight: 300;
          color: #a89880;
        }

        /* Footer strip */
        .footer-strip {
          text-align: center;
          padding: 3rem 6vw;
          border-top: 1px solid rgba(201,168,76,0.1);
        }

        .footer-tagline {
          font-size: 1.1rem;
          font-style: italic;
          color: #6b5d45;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* Hero */}
      <div className="contact-hero">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format&fit=crop"
          alt="Restaurant dining room"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Est. 2015 — New York City</p>
          <h1 className="hero-title">Contact</h1>
          <div className="gold-line" />
          <p style={{ fontStyle: 'italic', color: '#a89070', fontSize: '1.1rem', fontWeight: 300 }}>
            Reservations, enquiries & private dining
          </p>
        </div>
      </div>

      {/* Hours Strip */}
      <div className="hours-strip">
        {[
          { day: 'Mon — Tue', time: 'Closed' },
          { day: 'Wed — Thu', time: '5:00 — 10:00 pm' },
          { day: 'Fri — Sat', time: '5:00 — 11:30 pm' },
          { day: 'Sunday', time: '11:00 am — 9:00 pm' },
        ].map(({ day, time }) => (
          <div className="hours-item" key={day}>
            <div className="hours-day">{day}</div>
            <div className="hours-time">{time}</div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="main-layout">

        {/* Left: Info */}
        <div>
          <p className="section-label">Find Us</p>
          <h2 className="section-heading">
            Come dine with<br /><em>us tonight</em>
          </h2>

          <div className="info-block">
            <div className="info-label">Address</div>
            <div className="info-value">
              142 West 10th Street<br />
              West Village, New York, NY 10014
            </div>
          </div>

          <div className="info-block">
            <div className="info-label">Reservations</div>
            <div className="info-value">
              <a href="tel:+12125550198">+1 (212) 555-0198</a>
            </div>
          </div>

          <div className="info-block">
            <div className="info-label">Email</div>
            <div className="info-value">
              <a href="mailto:hello@restaurant.com">hello@restaurant.com</a>
            </div>
          </div>

          <div className="info-block">
            <div className="info-label">Private Dining</div>
            <div className="info-value">
              Our cellar room accommodates up to<br />
              30 guests for private events.
            </div>
          </div>

          <div className="map-container">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=70&auto=format&fit=crop"
              alt="West Village, New York"
            />
            <div className="map-overlay">West Village, Manhattan</div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <p className="section-label">Get in Touch</p>
          <h2 className="section-heading" style={{ marginBottom: '2rem' }}>
            Make a<br /><em>reservation</em>
          </h2>

          <div className="tab-row">
            {[
              { key: 'reservation', label: 'Reservation' },
              { key: 'inquiry', label: 'General Inquiry' },
              { key: 'private', label: 'Private Event' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`tab-btn${activeTab === key ? ' active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (000) 000-0000"
                />
              </div>

              {activeTab !== 'inquiry' && (
                <div className="form-group">
                  <label>Guests</label>
                  <select name="guests" value={formData.guests} onChange={handleChange}>
                    {[1,2,3,4,5,6,7,8,'9+'].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab !== 'inquiry' && (
                <div className="form-group full">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              )}

              <div className="form-group full">
                <label>
                  {activeTab === 'reservation' ? 'Special Requests' :
                   activeTab === 'private' ? 'Event Details' : 'Your Message'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    activeTab === 'reservation' ? 'Dietary restrictions, special occasions…' :
                    activeTab === 'private' ? 'Date, number of guests, occasion, preferred menu…' :
                    'How can we help you?'
                  }
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <span>
                {activeTab === 'reservation' ? 'Request Reservation' :
                 activeTab === 'private' ? 'Enquire About Private Dining' :
                 'Send Message'}
              </span>
            </button>
          </form>

          {submitted && (
            <div className="success-msg">
              Thank you — we'll confirm your {activeTab === 'reservation' ? 'reservation' : 'enquiry'} within 24 hours.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-strip">
        <p className="footer-tagline">
          "Where every evening becomes a memory."
        </p>
      </div>
    </div>
  )
}

export default Contact