import { useState } from 'react';
import { X, Send, User, Mail, MessageSquare } from 'lucide-react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose, recipientName, recipientRole, ideaTitle }) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState(`Regarding your idea: ${ideaTitle}`);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    setIsSending(true);
    // Mock sending email or internal message
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
        setMessage('');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-icon-wrapper">
              <Mail size={20} className="modal-icon" />
            </div>
            <div>
              <h3>Message Founder</h3>
              <p>Sending a message to <strong>{recipientName}</strong> {recipientRole && `(${recipientRole})`}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="modal-success-state">
            <div className="success-circle">
              <Send size={24} />
            </div>
            <h4>Message Sent!</h4>
            <p>Your message has been delivered to {recipientName}. They will reply to your registered email.</p>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSend}>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                required
                className="modal-input"
              />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${recipientName.split(' ')[0]}, I'm interested in discussing your idea...`}
                rows={5}
                required
                className="modal-input modal-textarea"
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-icon" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'}
                {!isSending && <Send size={16} />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
