import { useState } from 'react'
import { useTimeline } from '../context/TimelineContext'
import Footer from '../components/Footer'
import './Timeline.css'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function MeetupIcon() {
  return <span className="tl-emoji">🤝</span>
}

function CallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function TextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const iconMap = {
  Meetup: { component: MeetupIcon, bg: '#FFF3CD' },
  Call:   { component: CallIcon,   bg: '#F1F5F9' },
  Text:   { component: TextIcon,   bg: '#F1F5F9' },
  Video:  { component: VideoIcon,  bg: '#F1F5F9' },
}

const filterOptions = ['All', 'Call', 'Text', 'Video', 'Meetup']

export default function Timeline() {
  const { timeline } = useTimeline()
  const [filter, setFilter] = useState('All')

  const sorted = [...timeline].sort((a, b) => new Date(b.date) - new Date(a.date))
  const filtered = filter === 'All' ? sorted : sorted.filter(e => e.type === filter)

  const Icon = iconMap[filter] ?? null

  return (
    <div className="page">
      <main className="page-content">
        <div className="timeline-page">
          <h1 className="timeline-title">Timeline</h1>

          <div className="filter-wrap">
            <select
              className="filter-select"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              aria-label="Filter timeline"
            >
              {filterOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'Filter timeline' : opt}
                </option>
              ))}
            </select>
            <span className="filter-chevron"><ChevronIcon /></span>
          </div>

          <div className="timeline-list">
            {filtered.length === 0 ? (
              <p className="timeline-empty">No interactions found for this filter.</p>
            ) : (
              filtered.map(entry => {
                const config = iconMap[entry.type] ?? iconMap.Call
                const IconComp = config.component
                return (
                  <div key={entry.id} className="timeline-item">
                    <div className="tl-icon-wrap" style={{ background: config.bg }}>
                      <IconComp />
                    </div>
                    <div className="tl-content">
                      <p className="tl-text">
                        <strong>{entry.type}</strong> with {entry.friendName}
                      </p>
                      <p className="tl-date">{formatDate(entry.date)}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
