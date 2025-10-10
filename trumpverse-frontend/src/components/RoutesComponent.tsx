import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EditMerchandise from '../pages/EditMerchandise';
import MerchList from '../pages/MerchList';
import AddMerchandise from '../pages/AddMerchandise';
import DeleteMerchandise from '../pages/DeleteMerchandise';
import MerchandiseDetail from '../pages/MerchandiseDetail';
import { RoutesComponentProps } from '../interfaces/RoutesComponentProps';

const RoutesComponent: React.FC<RoutesComponentProps> = ({ searchTerm, setSearchTerm }) => (
  <Routes>
    <Route path="/" element={<Navigate to="/merch-list" />} />
    <Route path="/edit-merchandise" element={<EditMerchandise searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
    <Route path="/merch-list" element={<MerchList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
    <Route path="/add-merchandise" element={<AddMerchandise />} />
    <Route path="/delete-merchandise" element={<DeleteMerchandise searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
    <Route path="/merch-list/:id" element={<MerchandiseDetail />} />
  </Routes>
);

export default RoutesComponent;