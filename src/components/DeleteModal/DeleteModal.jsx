import React from 'react';
import './DeleteModal.scss';

const DeleteModal = ({ confirmDelete, setConfirmDelete, deleteProduct }) => {
    return (
        confirmDelete.show && (
            <div className="modal-overlay">
                <div className="modal">
                    <button
                        className="close-btn"
                        onClick={() => setConfirmDelete({ show: false, id: null })}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                    <h2>Are you sure you want to delete this product?</h2>
                    <div className="modal-actions">
                        <button className="btn-delete" onClick={deleteProduct}>
                            Yes, Delete
                        </button>
                        <button
                            className="btn-cancel"
                            onClick={() => setConfirmDelete({ show: false, id: null })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteModal;