import { useState } from 'react'
import { useFriends } from '../hooks/useFriends'
import FriendCard from '../components/FriendCard'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'
import AddFriendModal from '../components/AddFriendModal'
import './Home.css'

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default function Home() {
  const { friends: initialFriends, loading } = useFriends()
  const [friends, setFriends] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const allFriends = friends ?? initialFriends

  const overdue = allFriends.filter(f => f.status === 'overdue').length
  const onTrack = allFriends.filter(f => f.status === 'on-track').length

  function handleAddFriend(newFriend) {
    setFriends(prev => [...(prev ?? initialFriends), newFriend])
  }

  return (
    <div className="page">
      <main className="page-content">
        <section className="banner">
          <h1 className="banner-title">Friends to keep close in your life</h1>
          <p className="banner-sub">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            <PlusIcon />
            Add a Friend
          </button>

          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-number">{allFriends.length}</span>
              <span className="summary-label">Total Friends</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">{onTrack}</span>
              <span className="summary-label">On Track</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">{overdue}</span>
              <span className="summary-label">Need Attention</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">12</span>
              <span className="summary-label">Interactions This Month</span>
            </div>
          </div>
        </section>

        <section className="friends-section">
          <h2 className="section-title">Your Friends</h2>

          {loading ? (
            <Spinner />
          ) : (
            <div className="friends-grid">
              {allFriends.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {showModal && (
        <AddFriendModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddFriend}
        />
      )}
    </div>
  )
}
