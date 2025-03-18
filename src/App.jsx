import { useState } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import MenuNav from './components/MenuNav'
import SearchBar from './components/SearchBar'
import MenuGrid from './components/MenuGrid'
import './styles/index.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('coffee')

  return (
    <>
      <Background />
      <div className="relative w-full min-h-screen z-20">
        <Header />
        <main id="menu" className="flex-1 container mx-auto px-4 bg-black/30 backdrop-blur-sm">
          <div className="sticky top-0 z-50 py-2 sm:py-4 bg-[var(--color-coffee-dark2)]/80 backdrop-blur-sm">
            <MenuNav 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
            <SearchBar />
          </div>
          <MenuGrid category={activeCategory} />
        </main>
        <footer className="w-full bg-black py-4">
          <p className="text-center text-[var(--color-coffee-smoke)]">
            &copy; 2025 Coffee Cafe - Andi Ramadhan
          </p>
        </footer>
      </div>
    </>
  )
}

export default App