import { useState, useEffect } from 'react'
import MenuCard from './MenuCard'
import { menuItems } from '../js/menuItems'

const MenuGrid = ({ category }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const items = menuItems[category] || []

  useEffect(() => {
    setIsTransitioning(true);

    const grid = document.querySelector('.menu-grid');
    grid.classList.add('menu-exit');

    setTimeout(() => {
      grid.classList.add('menu-enter');
      grid.classList.remove('menu-exit');

      //remove class after frame
      requestAnimationFrame(() => {
        grid.classList.remove('menu-enter');
        setIsTransitioning(false);
      });
    }, 300);
  }, [category]);

  return (
    <div className="container mx-auto py-8">
      <div className="menu-grid menu-transition grid grid-cols-1 gap-4 mx-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 sm:mx-10">
        {items.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MenuGrid
