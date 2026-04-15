import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TimelineProvider } from './context/TimelineContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FriendDetail from './pages/FriendDetail'
import Timeline from './pages/Timeline'
import Stats from './pages/Stats'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <TimelineProvider>
      <Navbar />

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/friend/:id" element={<FriendDetail />} />
        <Route path="/timeline"   element={<Timeline />} />
        <Route path="/stats"      element={<Stats />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Geist, sans-serif',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '10px',
            background: '#101727',
            color: '#fff',
            padding: '12px 18px',
          },
          success: {
            iconTheme: { primary: '#1A8862', secondary: '#fff' },
          },
        }}
      />
    </TimelineProvider>
  )
}
