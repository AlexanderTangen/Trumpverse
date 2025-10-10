import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MerchandiseGrid from '../components/MerchandiseGrid';
import { SearchableProps } from '../interfaces/SearchableProps';
import Modal from '../components/Modal'; 
import { MerchandiseItem } from '../interfaces/MerchandiseItem';
import { EditedItem } from '../interfaces/EditedItem';

const EditMerchandise: React.FC<SearchableProps> = ({ searchTerm, setSearchTerm }) => {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<EditedItem>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    stock: 0, 
    image: null,
  });
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await axios.get('http://localhost:5259/api/TrumpMerch');
        setMerchandise(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, []);

  const filteredMerchandise = merchandise.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (item: MerchandiseItem) => {
    setEditedItem({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      stock: item.stock,  
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedItem((prevState) => ({
      ...prevState,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setEditedItem((prevState) => ({ ...prevState, image: file }));
    setImageError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editedItem.image) {
      setImageError('You need to update the image.');
      return;
    }

    const formData = new FormData();
    formData.append('Id', editedItem.id.toString());
    formData.append('Name', editedItem.name);
    formData.append('Price', editedItem.price.toString());
    formData.append('Description', editedItem.description);
    formData.append('Stock', editedItem.stock.toString());  
    formData.append('Image', editedItem.image);

    try {
      await axios.put(`http://localhost:5259/api/TrumpMerch/${editedItem.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const response = await axios.get('http://localhost:5259/api/TrumpMerch');
      setMerchandise(response.data);
      setIsModalOpen(false);
      alert('Item edited successfully!');
    } catch (error) {
      console.error('Error editing merchandise:', error);
      alert('Error editing merchandise!');
    }
  };

  if (loading) return <p>Loading merchandise...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-6 top-0 bg-white z-10 transition-colors">
        Edit Merchandise
      </h2>

      <MerchandiseGrid
        items={filteredMerchandise}
        onActionClick={handleEditClick}
        actionButtonLabel="Edit"
        actionButtonClassName="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        enableDetailLink={false}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Edit Merchandise">
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedItem.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editedItem.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedItem.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-gray-700 font-semibold mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={editedItem.stock}
                  onChange={handleInputChange}
                  placeholder="Stock"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {imageError && (
                <div className="text-red-500 text-sm mt-2">{imageError}</div>
              )}
            </div>
            
            <div className="flex justify-between mt-6 space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-1 rounded-md w-full hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-1 rounded-md w-full hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default EditMerchandise;
