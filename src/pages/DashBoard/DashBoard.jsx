import React, { useEffect, useState } from 'react'
import "./Dashboard.scss"
import axios, { all } from 'axios'
import Modal from '../../components/Modal/Modal'
import { toast } from 'react-toastify'
import DeleteModal from '../../components/DeleteModal/Deletemodal'
import Loader from '../../components/Loader/Loader'

const DashBoard = () => {
    const [search, setSearch] = useState("")
    const [isLoadingProduct, setIsLoadingProduct] = useState(false)
    const [isSaveEditProduct, setIsSaveEditProduct] = useState(false)
    const [isDeleteProduct, setIsDeleteProduct] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: "", price: "", category: "", description: "" });
    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

    const filteredProducts = allProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const getAllProducts = async () => {
        try {
            setIsLoadingProduct(true)
            const res = await axios.get(import.meta.env.VITE_API_URL)
            if (res.status === 200) {
                setAllProducts(res.data)
            } else {
                toast.error("Something went wrong!")
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoadingProduct(false)
        }
    }

    const handleAdd = () => {
        setSearch("")
        setEditingId(null);
        setForm({ title: "", price: "", category: "", description: "" });
        setShowModal(true);
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm(product);
        setShowModal(true);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveUpdateProduct = async (e) => {
        e.preventDefault();
        if (form?.title.trim() && form?.category.trim() && Number(form.price) > 0 && (!editingId ? (form?.brand.trim() && form.model.trim() && form.color.trim() && Number(form.discount) > 0 && Number(form.discount) <= 100) : true) && form.description.trim()) {
            try {
                setIsSaveEditProduct(true)
                if (editingId) {
                    const res = await axios.put(`${import.meta.env.VITE_API_URL}/${editingId}`, form);
                    if (res.status === 200) {
                        setAllProducts(allProducts.map((p) => (p.id === editingId ? res.data : p)));
                    } else {
                        setAllProducts(allProducts)
                    }
                } else {
                    const res = await axios.post(import.meta.env.VITE_API_URL, form);
                    if (res.status === 201) {
                        setAllProducts([res.data, ...allProducts]);
                    } else {
                        setAllProducts(allProducts)
                    }
                }
                setForm({ title: "", price: "", category: "", description: "" });
                setEditingId(null);
                setShowModal(false);
            } catch (err) {
                toast.error("Failed to save product");
            } finally {
                setIsSaveEditProduct(false)
            }
        } else {
            if (!form?.title.trim()) {
                toast.error("Product title is required!")
            } else if (Number(form?.price) < 0) {
                toast.error("Product price should be greater than 0!")
            } else if (!form?.category.trim()) {
                toast.error("Product category is required!")
            } else if (!form?.brand.trim()) {
                toast.error("Product brand is required!")
            } else if (!form?.color.trim()) {
                toast.error("Product color is required!")
            } else if (!form?.model.trim()) {
                toast.error("Product model is required!")
            } else if (Number(form.discount) < 0 || Number(form.discount) > 100) {
                toast.error("Product discount should be between 0 and 100!")
            } else if (!form?.description.trim()) {
                toast.error("Product description is required!")
            }
        }
    };

    const handleDelete = (id) => {
        setConfirmDelete({ show: true, id });
    };

    const DeleteProduct = async () => {
        try {
            setIsDeleteProduct(true)
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/${confirmDelete.id}`);
            if (res.status === 200) {
                setAllProducts(allProducts.filter((p) => p.id !== confirmDelete.id));
                setConfirmDelete({ show: false, id: null });
            } else {
                console.error(res)
            }
        } catch (err) {
            toast.error("Failed to delete product");
        } finally {
            setIsDeleteProduct(false)
        }
    };

    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <>
            {(isLoadingProduct || isSaveEditProduct || isDeleteProduct) && <Loader />}
            <main className='dashboard-main'>
                {/* Search bar and Add Product */}
                <div className='search-bar-and-add-button'>
                    <input
                        type='text'
                        placeholder="Search by title or category"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />

                    <button type='button' className='btn-primary' onClick={handleAdd}>
                        Add Product
                    </button>
                </div>

                {/* Product details */}
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="col-id">Id</th>
                                <th className="col-name">Name</th>
                                <th className="col-price">Price</th>
                                <th className="col-category">Category</th>
                                <th className="col-description">Description</th>
                                <th className="col-action __action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts && filteredProducts?.length > 0 ? filteredProducts?.map((product, index) => (
                                <tr key={product?.id}>
                                    <td data-label="Id" className="col-id" title={product?.id}>{index + 1}</td>
                                    <td data-label="Name" className="col-name" title={product?.title}>{product?.title}</td>
                                    <td data-label="Price" className="col-price" title={product?.price}>${product?.price}</td>
                                    <td data-label="Category" className="col-category" title={product?.category}>{product?.category}</td>
                                    <td data-label="Description" className="col-description" title={product?.description}>{product?.description}</td>
                                    <td data-label="Action" className='col-action __action'>
                                        <button className="action-btn btn-edit" title='Edit' onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="action-btn btn-delete" title='Delete' onClick={() => handleDelete(product?.id)}>Delete</button>
                                    </td>
                                </tr>
                            )) :
                                <tr><td colSpan={5} style={{ textAlign: "center" }}>{isLoadingProduct ? "Data is Loading..." : "No Data Found"}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </main>

            <Modal
                form={form}
                editingId={editingId}
                showModal={showModal}
                saveProduct={saveUpdateProduct}
                handleChange={handleChange}
                setShowModal={setShowModal}
            />

            <DeleteModal
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                deleteProduct={DeleteProduct}
            />
        </>
    )
}

export default DashBoard