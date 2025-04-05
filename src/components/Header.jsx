const Header = ({ activeSection, setActiveSection}) => {
  return (
    <header className="max-w-[1400px] mx-auto py-1 px-4 sm:py-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl md:text-5xl text-coffee-cho">
          <span className="font-[Poppins] font-extralight italic text-xs">RE:</span>Coffee
        </h1>
        <nav className="flex flex-row items-center gap-5">
          <button
            className={`nav-link ${activeSection === 'menu' ? 'font-medium' : ''}`}
            href="#menu"
            onClick={() => setActiveSection('menu')}
          >
            Menu
          </button>
          <button
            className={`nav-link ${activeSection === 'contact' ? 'font-medium' : ''}`}
            href="#contact"
            onClick={() => setActiveSection('contact')}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
