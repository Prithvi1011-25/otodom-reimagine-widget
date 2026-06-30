import { buildContactMessage } from '../lib/contactMessage.js';

export function ListingContactSidebar({ listing, agency, onContactAdvertiser }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onContactAdvertiser?.();
  };

  const agentPhoto = listing.agent?.photo;

  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar__card">
        <div className="ad-sidebar__agent">
          {agentPhoto ? (
            <img
              className="ad-sidebar__avatar"
              src={agentPhoto}
              alt={listing.agent.name}
            />
          ) : (
            <div className="ad-sidebar__avatar ad-sidebar__avatar-fallback" aria-hidden>
              {listing.agent.initials}
            </div>
          )}

          <div className="ad-sidebar__agent-info">
            <p className="ad-sidebar__agent-name">{listing.agent.name}</p>
            <p className="ad-sidebar__agent-company">
              {listing.agent.company ?? agency.name}
            </p>
          </div>
        </div>

        <form className="ad-sidebar__form" onSubmit={handleSubmit}>
          <label className="ad-sidebar__field">
            <span className="ad-sidebar__label">Name*</span>
            <input type="text" placeholder="Type your name" />
          </label>

          <label className="ad-sidebar__field">
            <span className="ad-sidebar__label">E-mail*</span>
            <input type="email" placeholder="Type your e-mail" />
          </label>

          <label className="ad-sidebar__field">
            <span className="ad-sidebar__label">Phone Number*</span>
            <div className="ad-sidebar__phone-input">
              <select defaultValue="+48" aria-label="Country code">
                <option value="+48">+48</option>
              </select>
              <input type="tel" placeholder="Type your phone number" />
            </div>
          </label>

          <label className="ad-sidebar__field">
            <span className="ad-sidebar__label">Your message</span>
            <textarea rows={4} defaultValue={buildContactMessage(listing)} />
          </label>

          <button type="submit" className="ad-sidebar__submit">
            Send message
          </button>

          <p className="ad-sidebar__legal">
            The administrator of your personal data is Grupa OLX Sp. z o.o. More
            information can be found in our{' '}
            <a href="#">privacy policy</a>.
          </p>
        </form>
      </div>
    </aside>
  );
}
