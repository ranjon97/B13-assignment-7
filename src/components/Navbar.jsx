import { NavLink } from 'react-router-dom'
import './Navbar.css'

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function StatsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        Keen<span>Keeper</span>
      </NavLink>

      <nav className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <HomeIcon />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/timeline"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <ClockIcon />
          <span>Timeline</span>
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <StatsIcon />
          <span>Stats</span>
        </NavLink>
      </nav>
    </header>
  )
}
