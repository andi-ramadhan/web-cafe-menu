import { useState } from "react";

const MenuCard = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <article className="menu-card mb-9 md:mb-0]">
      <div className="relative flex-1 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="content-container bg-coffee-cho p-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-coffee-latte mb-2">
          {item.name}
        </h2>
        <p className="text-sm sm:text-sm text-coffee-latte mb-1 sm:mb-2 line-clamp-2">
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-coffee-latte font-bold text-base">
            ${item.price}
          </span>
          <button 
            className={`order-btn text-base ${isClicked ? 'order-btn-scalefx' : ''}`}
            onClick={handleClick}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

export default MenuCard