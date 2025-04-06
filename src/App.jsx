import { useState, useTransition } from 'react'
import Header from './components/Header'
import MenuNav from './components/MenuNav'
import SearchBar from './components/SearchBar'
import MenuGrid from './components/MenuGrid'
import Contact from './components/ContactUs'
import './styles/index.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('coffee')
  const [activeSection, setActiveSection] = useState('menu')
  const [, startTransition] = useTransition()

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
      <div className="fixed inset-0 -z-10 overflow-hidden bg-coffee-bg"></div>
      <div className="relative w-auto m-4 min-h-screen z-20">
        <Header
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
        />

        <div className="section-transition">
          {activeSection === 'menu' ? (
            <main id="menu" className="flex-1 container mx-auto">
              <div className="sticky top-0 z-50 py-2 px-2 sm:py-4 backdrop-blur-md">
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
        <footer className="w-full mt-5 absolute bottom-0">
          <p className="text-xs text-center text-black">
            &copy; 2025 Web Cafe Menu - Andi Fajar Ramadhan
          </p>
        </footer>
      </div>
    </>
  )
}

export default App