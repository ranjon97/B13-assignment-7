import { useNavigate } from 'react-router-dom'
import './FriendCard.css'

function getStatusClass(status) {
  if (status === 'on-track') return 'status-on-track'
  if (status === 'almost-due') return 'status-almost-due'
  return 'status-overdue'
}

function getStatusLabel(status) {
  if (status === 'on-track') return 'On-Track'
  if (status === 'almost-due') return 'Almost Due'
  return 'Overdue'
}

function getTagClass(tag) {
  const greenTags = ['work', 'family', 'college']
  return greenTags.includes(tag) ? 'tag-green' : 'tag-gray'
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate()

  return (
    <article
      className="friend-card"
      onClick={() => navigate(`/friend/${friend.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/friend/${friend.id}`)}
    >
      <div className="friend-card-avatar">
        <img src={friend.picture} alt={friend.name} loading="lazy" />
      </div>

      <h3 className="friend-card-name">{friend.name}</h3>
      <p className="friend-card-days">{friend.days_since_contact}d ago</p>

      <div className="friend-card-tags">
        {friend.tags.map(tag => (
          <span key={tag} className={`tag ${getTagClass(tag)}`}>
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <span className={`status-badge ${getStatusClass(friend.status)}`}>
        {getStatusLabel(friend.status)}
      </span>
    </article>
  )
}
