import React from 'react';
import './ConfirmationModal.css';


const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="confirmation-dialog">
        <div className="confirmation-dialog-content">
          <p className="confirmation-message">{message}</p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={onConfirm}>Confirm</button>
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  

export default ConfirmationModal;
