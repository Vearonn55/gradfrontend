import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import './PriceManagementPage.css';

interface Product {
    ProductID: number;
    Name: string;
    CategoryID: number;
    Price: number;
}

const PriceManagementPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [priceUpdates, setPriceUpdates] = useState<{ [key: number]: number }>({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('/api/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handlePriceChange = (productId: number, newPrice: number) => {
        setPriceUpdates(prev => ({ ...prev, [productId]: newPrice }));
    };

    const handleUpdatePrice = (productId: number) => {
        const updatedPrice = priceUpdates[productId];
        if (updatedPrice == null || isNaN(updatedPrice)) return;

        axios.put(`/api/products/${productId}/price`, { Price: updatedPrice }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })
            .then(() => {
                setProducts(prev =>
                    prev.map(product =>
                        product.ProductID === productId
                            ? { ...product, Price: updatedPrice }
                            : product
                    )
                );
                setPriceUpdates(prev => {
                    const updated = { ...prev };
                    delete updated[productId];
                    return updated;
                });
            })
            .catch(error => {
                console.error('Error updating price:', error);
            });
    };

    return (
        <div className="price-management-container">
            <h2>Price Management</h2>
            <TextField
                label="Search by ID or Name"
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: '1rem' }}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category ID</TableCell>
                            <TableCell>Current Price</TableCell>
                            <TableCell>New Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.filter(product => {
                            const query = searchQuery.toLowerCase();
                            return (
                                product.ProductID.toString().includes(query) ||
                                product.Name.toLowerCase().includes(query)
                            );
                        }).map(product => (
                            <TableRow key={product.ProductID}>
                                <TableCell>{product.ProductID}</TableCell>
                                <TableCell>{product.Name}</TableCell>
                                <TableCell>{product.CategoryID}</TableCell>
                                <TableCell>{Number(product.Price).toFixed(2)}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={priceUpdates[product.ProductID] ?? ''}
                                        onChange={(e) => handlePriceChange(product.ProductID, parseFloat(e.target.value))}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdatePrice(product.ProductID)}
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
