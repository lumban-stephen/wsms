import React, { useState } from 'react';
import styles from '../assets/styles.module.css';
import { Applicant } from '../utils/interfaces';
import ApproveApplicantBox from '../components/approve-applicant'; // Import ApproveApplicantBox component

interface ApplicantModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: Applicant;
  onApplicantUpdate: (updatedApplicant: Applicant) => void; // Callback for applicant update
}

const ApplicantModal: React.FC<ApplicantModalProps> = ({
  isOpen,
  onClose,
  applicant,
  onApplicantUpdate,
}) => {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const handleApproveClick = () => {
    setIsApproveModalOpen(true);
  };

  const handleApprove = async () => {
    try {
      const response = await fetch('http://localhost:3000/applicants/maintain-applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant_id: applicant.applicant_id,
          full_name: applicant.full_name, // Assuming you want to update full_name as well
          address: applicant.address,
          school_name: applicant.school_name,
          contact: applicant.contact,
          // ... other fields to update
          status: 'accepted', // Add status update for approval
        }),
      });

      if (response.ok) {
        const updatedApplicant = { ...applicant, status: 'accepted' }; // Update applicant object with new status
        onApplicantUpdate(updatedApplicant); // Call callback to update applicant state in parent component
        onClose(); // Close ApplicantModal
      } else {
        console.error('Error updating applicant:', await response.text());
        // Handle potential errors (e.g., display error message)
      }
    } catch (error) {
      console.error('Error adding applicant:', error);
      // Handle errors (e.g., display error message)
    } finally {
      setIsApproveModalOpen(false); // Close ApproveApplicantBox modal regardless of success or failure
    }
  };

  if (!isOpen) return null;

  // Logic to conditionally hide approve button (assuming button has a className)
  const isApproveButtonHidden = applicant.status === 'accepted';

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar} />
          <h3>{applicant.full_name}</h3>
          <p>{applicant.age}</p>
        </div>
        <div className={styles.formFields}>
          {/* ... other form fields */}
        </div>
        <div className={styles.modalActions}>
          {/* Conditionally hide approve button */}
          <button
            className={styles.modalButton}
            onClick={handleApproveClick}
            disabled={isApproveButtonHidden} // Disable button if applicant is already accepted
          >
            Approve
          </button>
          <button className={styles.modalButton} onClick={onClose}>
            Reject
          </button>
        </div>
      </div>
      {isApproveModalOpen && (
        <ApproveApplicantBox
          onApprove={handleApprove} // Pass handleApprove function for Approve action
          onReject={() => setIsApproveModalOpen(false)} // Close ApproveApplicantBox on reject
        />
      )}
    </div>
  );
};

export default ApplicantModal;
