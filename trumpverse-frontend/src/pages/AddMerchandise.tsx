import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Merchandise } from '../interfaces/Merchandise';

const AddMerchandise: React.FC = () => {
  const navigate = useNavigate();
  const [newMerchandise, setNewMerchandise] = useState<Merchandise>({
    name: '',
    price: '',  
    description: '',
    image: null,
    stock: 0,  
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setNewMerchandise((prevState) => ({
      ...prevState,
      [name]: name === 'price' || name === 'stock' ? value : value,  
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewMerchandise((prevState) => ({ ...prevState, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', newMerchandise.name);
    formData.append('Price', newMerchandise.price);  
    formData.append('Description', newMerchandise.description);
    formData.append('Stock', newMerchandise.stock.toString());  
    if (newMerchandise.image) {
      formData.append('Image', newMerchandise.image);
    }

    try {
      await axios.post('http://localhost:5259/api/TrumpMerch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('New merchandise added successfully!');
      navigate('/merch-list');
    } catch (error) {
      console.error('Error adding merchandise:', error);
      alert('Error adding merchandise!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Add Merchandise</h2>

    
      <div className="w-full max-w-xl mx-auto flex justify-center">
        <div className="border rounded-lg shadow p-4 w-full flex flex-col justify-between h-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newMerchandise.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter merchandise name"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newMerchandise.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newMerchandise.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="stock" className="block text-gray-700 font-semibold mb-1">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"  
                value={newMerchandise.stock} 
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter stock"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-between mt-6 space-x-4">
              <button
                type="button"
                onClick={() => navigate('/merch')}
                className="bg-gray-500 text-white p-1 rounded-md w-full hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-1 rounded-md w-full hover:bg-blue-600"
              >
                Add Merchandise
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMerchandise;
