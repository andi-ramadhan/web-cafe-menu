import { useState, useTransition } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import MenuNav from './components/MenuNav'
import SearchBar from './components/SearchBar'
import MenuGrid from './components/MenuGrid'
import Contact from './components/ContactUs'
import './styles/index.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('coffee')
  const [activeSection, setActiveSection] = useState('menu')
  const [, startTransition] = useTransition() // Remove isPending

  const handleSectionChange = (section) => {
    if (section === activeSection) return;

    startTransition(() => {
      //add exit class
      document.querySelector('.section-transition').classList.add('section-exit');

      //wait for exit animation
      setTimeout(() => {
        setActiveSection(section);
        //add enter class
        document.querySelector('.section-transition').classList.add('section-enter');

        //remove enter class after frame
        requestAnimationFrame(() => {
          document.querySelector('.section-transition').classList.remove('section-enter', 'section-exit');
        });
      }, 200);
    });
  }

  return (
    <>
      <Background />
      <div className="relative w-full min-h-screen z-20">
        <Header
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
        />

        <div className="section-transition">
          {activeSection === 'menu' ? (
            <main id="menu" className="flex-1 container mx-auto bg-black/30 backdrop-blur-sm">
              <div className="sticky top-0 z-50 py-2 px-2 sm:py-4 bg-[var(--color-coffee-dark2)]/80 backdrop-blur-sm">
                <MenuNav 
                  activeCategory={activeCategory} 
                  setActiveCategory={setActiveCategory} 
                />
                <SearchBar />
              </div>
              <MenuGrid category={activeCategory} />
            </main>
          ) : (
            <Contact />
          )}
        </div>
        <footer className="w-full bg-black pt-4">
          <p className="text-center text-[var(--color-coffee-smoke)]">
            &copy; 2025 Web Cafe Menu - Andi Fajar Ramadhan
          </p>
        </footer>
      </div>
    </>
  )
}

export default App