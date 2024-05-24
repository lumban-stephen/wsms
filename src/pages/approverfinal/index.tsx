import React, { useState } from 'react';
import AssignWS from '../../components/assignws';

const ApproverFinal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <AssignWS open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ApproverFinal;