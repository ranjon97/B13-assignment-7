import { useState } from 'react'
import './AddFriendModal.css'

const defaultForm = {
  name: '',
  email: '',
  tags: '',
  bio: '',
  goal: 30,
}

export default function AddFriendModal({ onClose, onAdd }) {
  const [form, setForm] = useState(defaultForm)

  function update(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) return

    const gender = Math.random() > 0.5 ? 'women' : 'men'
    const num = Math.floor(Math.random() * 60) + 1

    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      picture: `https://randomuser.me/api/portraits/${gender}/${num}.jpg`,
      days_since_contact: 0,
      status: 'on-track',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      bio: form.bio.trim(),
      goal: parseInt(form.goal) || 30,
      next_due_date: new Date(Date.now() + (parseInt(form.goal) || 30) * 86400000)
        .toISOString()
        .split('T')[0],
      preferred: 'email',
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title">Add a Friend</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="f-name">Full Name *</label>
            <input
              id="f-name"
              className="form-input"
              placeholder="e.g. Alex Johnson"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f-email">Email</label>
            <input
              id="f-email"
              type="email"
              className="form-input"
              placeholder="alex@example.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f-tags">Tags <span className="form-hint">(comma separated)</span></label>
            <input
              id="f-tags"
              className="form-input"
              placeholder="work, college, family"
              value={form.tags}
              onChange={e => update('tags', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f-bio">Bio</label>
            <textarea
              id="f-bio"
              className="form-input form-textarea"
              placeholder="How do you know this person?"
              value={form.bio}
              onChange={e => update('bio', e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="f-goal">Contact Goal <span className="form-hint">(days)</span></label>
            <input
              id="f-goal"
              type="number"
              min="1"
              className="form-input"
              placeholder="30"
              value={form.goal}
              onChange={e => update('goal', e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Add Friend</button>
          </div>
        </form>
      </div>
    </div>
  )
}
