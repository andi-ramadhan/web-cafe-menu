import { useState, useEffect, useRef } from 'react'
import MenuCard from './MenuCard'
import { fetchData } from '../js/fetchedData';

const MenuGrid = ({ category }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoading(true);
        const response = await fetchData(category);
        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMenus();

    if (gridRef.current) {
      setIsTransitioning(true);
      gridRef.current.classList.add('menu-exit');
      
      setTimeout(() => {
        gridRef.current?.classList.add('menu-enter');
        gridRef.current?.classList.remove('menu-exit');
  
        requestAnimationFrame(() => {
          gridRef.current?.classList.remove('menu-enter');
          setIsTransitioning(false);
        });
      }, 300);
    }
  }, [category]);

  if (loading) {
    return <div className='text-white text-center py-8'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white text-center py-8'>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div
        ref={gridRef} 
        className="menu-grid menu-transition grid grid-cols-1 gap-8 mx-4 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3"
      >
        {items.map(item => (
          <MenuCard key={item.menuId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
