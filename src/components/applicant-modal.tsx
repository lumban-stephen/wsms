// Modal.jsx
import React from 'react';
import styles from '../assets/styles.module.css';
import { Applicant } from '../utils/interfaces';

interface ApplicantModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: Applicant;
}

const ApplicantModal: React.FC<ApplicantModalProps> = ({ isOpen, onClose, applicant }) => {
  if (!isOpen) return null;

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
          <div className={styles.formField}>
            <label>Address</label>
            <input type="text" placeholder="Enter address" value={applicant.address || ''} />
          </div>
          <div className={styles.formField}>
            <label>Last School Attended</label>
            <input type="text" placeholder="Enter last school attended" value={applicant.school_name || ''}/>
          </div>
          <div className={styles.formField}>
            <label>Facebook Account</label>
            <input type="text" placeholder="Enter Facebook account" value={applicant.school_name || ''}/>
          </div>
          <div className={styles.formField}>
            <label>Contact Number</label>
            <input type="text" placeholder="Enter contact number" value={applicant.contact || ''} />
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.modalButton}>Approve</button>
          <button className={styles.modalButton} onClick={onClose}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantModal;