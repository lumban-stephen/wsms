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
    // ... existing handleApprove logic ...
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
          <div className={styles.userDetails}>
            <h3>{applicant.full_name}</h3>
            <p>{applicant.age}</p>
          </div>
        </div>
        <div className={styles.applicantDetails}> {/* New container for additional details */}
          <p>Address: {applicant.address}</p>
          <p>Last School Attended: {applicant.school_name}</p>
          <p>Facebook Account: {applicant.fbAccount}</p>
          <p>Contact Number: {applicant.contact}</p>
          {/* Add additional detail elements here based on your Applicant interface */}
        </div>
        <div className={styles.formFields}>
          {/* ... other form fields */}
        </div>
        <div className={styles.modalActions}>
          {/* Conditionally hide approve button */}
          <button
            className={styles.modalButton}
            onClick={handleApproveClick}
            disabled={isApproveButtonHidden}
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

// Update styles for vertical layout if needed (refer to previous explanation)
