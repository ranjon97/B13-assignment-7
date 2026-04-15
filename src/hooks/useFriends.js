import { useState, useEffect } from 'react'
import friendsData from '../data/friends.json'

export function useFriends() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate async data fetch
    const timer = setTimeout(() => {
      setFriends(friendsData)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { friends, loading }
}
