import React from 'react';
import { ModalProps } from '../interfaces/ModalProps'; 

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-xl w-full">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
