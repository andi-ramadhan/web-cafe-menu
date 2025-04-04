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
    <article className="menu-card">
      <div className="absolute inset-0">
        <img 
          src={`/assets/${item.image}`} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-cho/50  via-coffee-cho/30 to-transparent"></div>
      </div>

      <div className="content-container">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
          {item.name}
        </h2>
        <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4">
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-sm sm:text-base">
            ${item.price}
          </span>
          <button 
            className={`order-btn text-sm sm:text-base ${isClicked ? 'order-btn-scalefx' : ''}`}
            onClick={handleClick}
          >
            Order
          </button>
        </div>
      </div>
    </article>
  )
}

export default MenuCard