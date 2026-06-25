import { buildContactMessage } from '../lib/contactMessage.js';

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

export function ListingContactSidebar({ listing, agency, onContactAdvertiser }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onContactAdvertiser?.();
  };

  return (
    <aside className="listing-sidebar">
      <div className="listing-sidebar__card">
        <div className="listing-sidebar__agent">
          <div className="listing-sidebar__avatar">{listing.agent.initials}</div>
          <div className="listing-sidebar__agent-info">
            <p className="listing-sidebar__agent-name">{listing.agent.name}</p>
            <p className="listing-sidebar__agent-company">
              {listing.agent.company ?? agency.name}
            </p>
            <button type="button" className="listing-sidebar__phone">
              <PhoneIcon />
              Show phone
            </button>
          </div>
        </div>

        <form className="listing-sidebar__form" onSubmit={handleSubmit}>
          <label className="listing-sidebar__field">
            <span className="listing-sidebar__label">Name*</span>
            <input type="text" placeholder="Type your name" />
          </label>

          <label className="listing-sidebar__field">
            <span className="listing-sidebar__label">E-mail*</span>
            <input type="email" placeholder="Type your e-mail" />
          </label>

          <label className="listing-sidebar__field">
            <span className="listing-sidebar__label">Phone Number*</span>
            <div className="listing-sidebar__phone-input">
              <select defaultValue="+48" aria-label="Country code">
                <option value="+48">+48</option>
              </select>
              <input type="tel" placeholder="Type your phone number" />
            </div>
          </label>

          <label className="listing-sidebar__field">
            <span className="listing-sidebar__label">Your message</span>
            <textarea rows={5} defaultValue={buildContactMessage(listing)} />
          </label>

          <button type="submit" className="listing-sidebar__submit">
            Send message
          </button>
        </form>
      </div>
    </aside>
  );
}
