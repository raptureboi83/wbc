import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FilmsPage from './pages/Films'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/films" element={<FilmsPage />} />
    </Routes>
  )
}