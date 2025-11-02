import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import ModulePage from './pages/ModulePage'
import MapPage from './pages/MapPage'
import ResultsPage from './pages/ResultsPage'
import { useSupabase } from './context/SupabaseContext'
import { BackgroundMusicToggle } from './components/BackgroundMusicToggle'
import MascotGuide from './components/MascotGuide'

function RequireUser({ children }) {
  const { currentUser } = useSupabase()
  if (!currentUser) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  const location = useLocation()
  const { currentUser, fetchUserScores } = useSupabase()
  const [theme, setTheme] = useState('theme-ocean')

  useEffect(() => {
    if (currentUser) {
      fetchUserScores(currentUser.id)
    }
  }, [currentUser, fetchUserScores])

  const themedClass = useMemo(() => {
    return `min-h-screen transition-colors duration-500 ease-out ${theme}`
  }, [theme])

  return (
    <div className={themedClass}>
      <div className="min-h-screen pb-20">
        <BackgroundMusicToggle />
        {currentUser && (
          <MascotGuide onThemeChange={setTheme} />
        )}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profil" element={<ProfilePage onThemeChange={setTheme} />} />
            <Route
              path="/tableau-de-bord"
              element={
                <RequireUser>
                  <DashboardPage />
                </RequireUser>
              }
            />
            <Route
              path="/carte"
              element={
                <RequireUser>
                  <MapPage onThemeChange={setTheme} />
                </RequireUser>
              }
            />
            <Route
              path="/module/:moduleId"
              element={
                <RequireUser>
                  <ModulePage />
                </RequireUser>
              }
            />
            <Route
              path="/resultats/:moduleId"
              element={
                <RequireUser>
                  <ResultsPage />
                </RequireUser>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
