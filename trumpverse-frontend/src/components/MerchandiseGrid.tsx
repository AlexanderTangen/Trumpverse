import React from 'react';
import { Link } from 'react-router-dom';
import { MerchandiseGridProps } from '../interfaces/MerchandiseGridProps';

const MerchandiseGrid: React.FC<MerchandiseGridProps> = ({
  items,
  onActionClick,
  actionButtonLabel,
  actionButtonClassName,
  enableDetailLink = true, 
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {items.map((item) => (
      <div key={item.id} className="border rounded-lg shadow p-4 flex flex-col justify-between h-full">
        {enableDetailLink ? (
          <Link to={`/merch-list/${item.id}`} className="flex flex-col h-full">
            <img
              src={`http://localhost:5259${item.imageUrl}`}
              alt={item.name}
              className="w-full h-78 object-cover mb-2 rounded"
            />
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-auto font-semibold">${item.price.toFixed(2)}</div>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col h-full">
            <img
              src={`http://localhost:5259${item.imageUrl}`}
              alt={item.name}
              className="w-full h-78 object-cover mb-2 rounded"
            />
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-auto font-semibold">${item.price.toFixed(2)}</div>
            </div>
          </div>
        )}
        
        {onActionClick && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => onActionClick(item)}
              className={`px-4 py-2 rounded ${actionButtonClassName}`}
            >
              {actionButtonLabel}
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default MerchandiseGrid;
