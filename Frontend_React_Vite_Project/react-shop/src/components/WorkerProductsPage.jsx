import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    available: true,
    brand: '',
    category: '',
    description: '',
    image: '',
    name: '',
    price: '',
    quantity: ''
  });
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newProduct)
        
      });

      if (response.ok) {
        fetchProducts();
        setNewProduct({
          available: true,
          brand: '',
          category: '',
          description: '',
          image: '',
          name: '',
          price: '',
          quantity: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id) => {
    setDeleteError('');
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: sessionStorage.getItem("username"),
        })
      });

      if (response.ok) {
        fetchProducts();
        alert("Successfully deleted product");
      } else {
        const errorData = await response.json();
        setDeleteError(errorData.message || 'Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setDeleteError('Failed to delete product. Please try again.');
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    setUpdateError('');
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        fetchProducts();
        alert("Successfully updated product");
      } else {
        const errorData = await response.json();
        setUpdateError(errorData.message || 'Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setUpdateError('Failed to update product. Please try again.');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  };

  const formRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const labelStyle = {
    width: '150px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white'
  };

  const inputStyle = {
    flex: '1',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const errorStyle = {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '14px'
  };

  const productsListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  };

  const productCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px'
  };

  const productImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Product</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleAddProduct} style={formStyle}>
        <div style={formRowStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Brand:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Category:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Description:</label>
          <textarea
            style={inputStyle}
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Image URL:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Price:</label>
          <input
            style={inputStyle}
            type="number"
            step="0.01"
            min="0"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                e.preventDefault();
              }
            }}
            required
          />
        </div>
        <div style={formRowStyle}>
          <label style={labelStyle}>Quantity:</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === '.') {
                e.preventDefault();
              }
            }}
            required
          />
        </div>
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px'
        }}>Add Product</button>
      </form>

      <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>Products List</h2>
      {deleteError && <p style={errorStyle}>{deleteError}</p>}
      {updateError && <p style={errorStyle}>{updateError}</p>}
      <div style={productsListStyle}>
        {products.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <img src={product.image} alt={product.name} style={productImageStyle} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Available: {product.available ? 'Yes' : 'No'}</p>
            <button 
              onClick={() => handleDeleteProduct(product.id)}
              style={{
                marginRight: '10px',
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
            <button 
              onClick={() => handleUpdateProduct(product.id, {
                ...product,
                price: prompt('Enter new price:', product.price),
                quantity: prompt('Enter new quantity:', product.quantity)
              })}
              style={{
                padding: '5px 10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;