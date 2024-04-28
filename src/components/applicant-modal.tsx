// Modal.jsx
import React, { useState } from 'react';
import styles from '../assets/styles.module.css'

const [isOpen, setIsOpen] = useState();

const ApplicantModal: React.FC<any> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar} />
          <h3>{user.name}</h3>
          <p>{user.age}</p>
        </div>
        <div className={styles.formFields}>
          <div className={styles.formField}>
            <label>Address</label>
            <input type="text" placeholder="Enter address" />
          </div>
          <div className={styles.formField}>
            <label>Last School Attended</label>
            <input type="text" placeholder="Enter last school attended" />
          </div>
          <div className={styles.formField}>
            <label>Facebook Account</label>
            <input type="text" placeholder="Enter Facebook account" />
          </div>
          <div className={styles.formField}>
            <label>Contact Number</label>
            <input type="text" placeholder="Enter contact number" />
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