import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <main className="notfound-main">
        <div className="notfound-content">
          <span className="notfound-code">404</span>
          <h1 className="notfound-title">Page not found</h1>
          <p className="notfound-sub">
            The page you're looking for doesn't exist or was moved.
          </p>
          <button className="notfound-btn" onClick={() => navigate('/')}>
            Go back home
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
