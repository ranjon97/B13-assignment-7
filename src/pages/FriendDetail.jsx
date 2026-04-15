import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useTimeline } from '../context/TimelineContext'
import friendsData from '../data/friends.json'
import Footer from '../components/Footer'
import './FriendDetail.css'

function getStatusClass(status) {
  if (status === 'on-track') return 'status-badge status-on-track'
  if (status === 'almost-due') return 'status-badge status-almost-due'
  return 'status-badge status-overdue'
}

function getStatusLabel(status) {
  if (status === 'on-track') return 'On-Track'
  if (status === 'almost-due') return 'Almost Due'
  return 'Overdue'
}

function getTagClass(tag) {
  const green = ['work', 'family', 'college']
  return green.includes(tag) ? 'tag tag-green' : 'tag tag-gray'
}

function formatDueDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/* Icons */
function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}

function ArchiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

function CallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function TextIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export default function FriendDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addEntry } = useTimeline()

  const friend = friendsData.find(f => f.id === parseInt(id))

  if (!friend) {
    navigate('/404')
    return null
  }

  function handleCheckin(type) {
    addEntry(type, friend.name)
    toast.success(`${type} with ${friend.name} logged!`, {
      style: {
        fontFamily: 'Geist, sans-serif',
        fontSize: '0.875rem',
        fontWeight: '500',
        borderRadius: '10px',
        background: '#101727',
        color: '#fff',
      },
      iconTheme: { primary: '#1A8862', secondary: '#fff' },
    })
  }

  return (
    <div className="page">
      <main className="page-content">
        <div className="detail-page">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <BackIcon />
            Back
          </button>

          <div className="detail-grid">
            {/* Left column */}
            <div className="detail-left">
              <div className="profile-card">
                <div className="profile-avatar">
                  <img src={friend.picture} alt={friend.name} />
                </div>
                <h2 className="profile-name">{friend.name}</h2>
                <div className="profile-badges">
                  <span className={getStatusClass(friend.status)}>
                    {getStatusLabel(friend.status)}
                  </span>
                  {friend.tags.map(tag => (
                    <span key={tag} className={getTagClass(tag)}>
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                <p className="profile-bio">"{friend.bio}"</p>
                <p className="profile-pref">Preferred: {friend.preferred}</p>
              </div>

              <div className="action-card">
                <button className="action-btn">
                  <BellIcon />
                  Snooze 2 Weeks
                </button>
                <button className="action-btn">
                  <ArchiveIcon />
                  Archive
                </button>
                <button className="action-btn action-delete">
                  <TrashIcon />
                  Delete
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="detail-right">
              {/* Stat cards */}
              <div className="detail-stats">
                <div className="detail-stat-card">
                  <span className="detail-stat-number">{friend.days_since_contact}</span>
                  <span className="detail-stat-label">Days Since Contact</span>
                </div>
                <div className="detail-stat-card">
                  <span className="detail-stat-number">{friend.goal}</span>
                  <span className="detail-stat-label">Goal (Days)</span>
                </div>
                <div className="detail-stat-card">
                  <span className="detail-stat-number detail-stat-date">{formatDueDate(friend.next_due_date)}</span>
                  <span className="detail-stat-label">Next Due</span>
                </div>
              </div>

              {/* Relationship goal */}
              <div className="info-card">
                <div className="info-card-header">
                  <h3 className="info-card-title">Relationship Goal</h3>
                  <button className="btn-edit">Edit</button>
                </div>
                <p className="goal-text">
                  Connect every <strong>{friend.goal} days</strong>
                </p>
              </div>

              {/* Quick check-in */}
              <div className="info-card">
                <div className="info-card-header">
                  <h3 className="info-card-title">Quick Check-In</h3>
                </div>
                <div className="checkin-grid">
                  <button className="checkin-btn" onClick={() => handleCheckin('Call')}>
                    <CallIcon />
                    Call
                  </button>
                  <button className="checkin-btn" onClick={() => handleCheckin('Text')}>
                    <TextIcon />
                    Text
                  </button>
                  <button className="checkin-btn" onClick={() => handleCheckin('Video')}>
                    <VideoIcon />
                    Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
