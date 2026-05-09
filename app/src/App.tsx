import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FilmsPage from './pages/Films'
import FilmDetailPage from './pages/FilmDetailPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/films/:slug" element={<FilmDetailPage />} />
      </Routes>
    </>
  )
}