import React from 'react';
import './Modal.scss';

const Modal = ({ showModal, setShowModal, editingId, form, handleChange, saveProduct }) => {
    return (
        showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <button
                        className="close-btn"
                        onClick={() => setShowModal(false)}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                    <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
                    <form onSubmit={saveProduct} className="form-container">
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="form-input"
                            required
                        />
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            className="form-input"
                            required
                        />
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="form-input"
                            required
                        />
                        {!editingId && <>
                            <input
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="Brand"
                                className="form-input"
                                required
                            />
                            <input
                                name="color"
                                value={form.color}
                                onChange={handleChange}
                                placeholder="color"
                                className="form-input"
                                required
                            />
                            <input
                                name="model"
                                value={form.model}
                                onChange={handleChange}
                                placeholder="Model"
                                className="form-input"
                                required
                            />
                            <input
                                name="discount"
                                value={form.discount}
                                onChange={handleChange}
                                placeholder="discount"
                                className="form-input"
                                type="number"
                                step="0.01"
                                required
                            />
                        </>}
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="form-textarea"
                            required
                        />
                        <div className="modal-actions">
                            <button type="submit" className="btn-submit">{editingId ? "Edit" : "Save"}</button>
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default Modal;