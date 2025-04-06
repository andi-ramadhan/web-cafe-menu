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
    <article className="menu-card rounded-lg">
      <div className="relative flex-1 overflow-hidden scale-115">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="content-container bg-coffee-dark pb-4 px-4 py-2 z-10">
        <h2 className="font-poppins text-white text-xl sm:text-2xl md:text-2xl mb-2">
          {item.name.toUpperCase()}
        </h2>
        <p className="text-white/70 text-sm sm:text-sm mb-1 sm:mb-2 line-clamp-1">
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold font-[Onest] text-md md:text-xl">
            ${item.price}
          </span>
          <button 
            className={`bg-coffee-latte order-btn text-sm py-2 px-5 sm:py-2 sm:px-6 sm:text-md rounded-xl text-coffee-cho font-semibold ${isClicked ? 'scale-95' : ''}`}
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