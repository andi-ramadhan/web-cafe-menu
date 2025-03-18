import MenuCard from './MenuCard'
import { menuItems } from '../js/menuItems'

const MenuGrid = ({ category }) => {
  const items = menuItems[category] || []

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-4 mx-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 sm:mx-10">
        {items.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MenuGrid
