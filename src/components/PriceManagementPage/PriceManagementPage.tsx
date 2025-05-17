import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useProducts } from "../context/ProductContext";
import "./PriceManagementPage.css";

const PriceManagementPage: React.FC = () => {
    const { products, updateProduct } = useProducts();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        setFilteredProducts(products.filter(product =>
            product.id.toString().includes(query) ||
            product.categoryId.toString().includes(query) ||
            product.name.toLowerCase().includes(query)
        ));
    }, [searchQuery, products]);

    const handlePriceChange = (id: number, price: number) => {
        updateProduct(id, { price });
    };

    const handleUpdate = (id: number) => {
        alert('Price updated successfully!');
    };

    return (
        <div className="page-container">
            <h1>Update Price</h1>

            <TextField
                label="Search by Product ID, Category ID, or Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Category ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Current Price ($)</TableCell>
                            <TableCell>New Price ($)</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.categoryId}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        placeholder={product.price.toFixed(2)}
                                        onBlur={e => handlePriceChange(product.id, parseFloat(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleUpdate(product.id)}
                                        className="action-btn primary-btn"
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PriceManagementPage;
