const MenuNav = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'coffee', label: 'Coffee' },
    { id: 'nonCoffee', label: 'Non-Coffee' },
    { id: 'food', label: 'Food' }
  ]

  const getSliderPosition = () => {
    const index = categories.findIndex(cat => cat.id === activeCategory);
    return `translateX(${100 * index}%)`;
  }

  return (
    <nav className="w-full max-w-[800px] mx-auto mb-2 sm:mb-4">
      <div className="flex flex-row justify-around items-center text-[var(--color-coffee-smoke)] nav-menu-container">
        <div 
          className="nav-menu-slider"
          style={{ transform: getSliderPosition() }}
        ></div>
        
        {categories.map((category, index) => (
          <a
            key={category.id}
            className={`nav-menu ${activeCategory === category.id ? 'active' : ''}`}
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory(category.id);
            }}
          >
            {category.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default MenuNav