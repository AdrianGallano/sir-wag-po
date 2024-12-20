import React, { useEffect } from 'react';
import dataFetch from '@/services/data-service';
import { useAuth } from '@/context/authContext';

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const PosFilter = ({ onFilter }: { onFilter: (categoryName: string) => void }) => {

  const [categories, setCategories] = React.useState<Category[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
      const response: Category[] = await dataFetch('/api/categories/', 'GET', {}, token);
      setCategories(response); // Set fetched categories
      console.log('Fetched categories:', response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilter = (categoryName: string | 'all') => {
    console.log(`Filter applied: ${categoryName}`);
    onFilter(categoryName); // Pass category name directly to parent
  };
  

  return (
    <div className="mb-6">
      <h2 className="text-lg text-gray-700 font-semibold mb-2">Filter by Category</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => handleFilter('all')}
          className="px-4 py-2 border border-black rounded-md font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilter(category.name)}
            className="px-4 py-2 border border-black rounded-md font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PosFilter;
