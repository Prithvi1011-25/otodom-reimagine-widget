import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { buildContactMessage } from '../lib/contactMessage.js';
import '../contact-advertiser-modal.css';

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8a13.4 13.4 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.25 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ContactAdvertiserModal({ listing, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !listing) {
    return null;
  }

  return createPortal(
    <div className="contact-modal" role="presentation">
      <button
        type="button"
        className="contact-modal__backdrop"
        aria-label="Close contact form"
        onClick={onClose}
      />

      <div
        className="contact-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          className="contact-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="contact-modal__agent">
          <div className="contact-modal__avatar">{listing.agent.initials}</div>
          <div>
            <p className="contact-modal__agent-name" id="contact-modal-title">
              {listing.agent.name}
            </p>
            <p className="contact-modal__agent-meta">{listing.agent.meta}</p>
            <button type="button" className="contact-modal__phone-link">
              <PhoneIcon />
              Show number
            </button>
          </div>
        </div>

        <form className="contact-modal__form" onSubmit={(event) => event.preventDefault()}>
          <label className="contact-modal__field">
            <span className="contact-modal__label">Name*</span>
            <input type="text" name="name" placeholder="Name" autoComplete="name" />
          </label>

          <label className="contact-modal__field">
            <span className="contact-modal__label">E-mail*</span>
            <input
              type="email"
              name="email"
              defaultValue="prithvi@styldod.com"
              autoComplete="email"
            />
          </label>

          <label className="contact-modal__field">
            <span className="contact-modal__label">Phone number*</span>
            <div className="contact-modal__phone">
              <select defaultValue="+48" aria-label="Country code">
                <option value="+48">+48</option>
              </select>
              <input type="tel" name="phone" placeholder="Phone number" autoComplete="tel" />
            </div>
          </label>

          <label className="contact-modal__field">
            <span className="contact-modal__label">Your message*</span>
            <textarea
              name="message"
              rows={5}
              defaultValue={buildContactMessage(listing)}
            />
          </label>

          <p className="contact-modal__legal">
            Your data will be transferred to the advertiser to enable communication. The
            administrator of your personal data is Grupa OLX Sp. z o.o.{' '}
            <a href="#">more</a>
          </p>

          <button type="submit" className="contact-modal__submit">
            Send a message
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
