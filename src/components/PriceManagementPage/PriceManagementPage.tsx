import React, { useState, useEffect } from 'react';
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
import { useProducts } from "../context/ProductContext";
import "./PriceManagementPage.css";

const PriceManagementPage: React.FC = () => {
    const { products, updateProduct } = useProducts();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [priceUpdates, setPriceUpdates] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const query = searchQuery.toLowerCase();

        const filtered = products.filter(product =>
            product.stockQuantity > 0 && // ❗️Stokta olmayanlar gösterilmeyecek
            (
                product.id.toString().includes(query) ||
                product.name.toLowerCase().includes(query) ||
                product.categoryId?.toString().includes(query)
            )
        );

        // ID bazlı tekilleştirme
        const uniqueById = Array.from(new Map(filtered.map(p => [p.id, p])).values());

        setFilteredProducts(uniqueById);
    }, [searchQuery, products]);

    const handlePriceInput = (id: number, price: string) => {
        const parsed = parseFloat(price);
        if (!isNaN(parsed)) {
            setPriceUpdates(prev => ({ ...prev, [id]: parsed }));
        }
    };

    const handleUpdate = (id: number) => {
        if (priceUpdates[id] != null) {
            updateProduct(id, { price: priceUpdates[id] });
            alert(`Price updated for product #${id}`);
        }
    };

    return (
        <div className="page-container">
            <h1>Update Price</h1>

            <TextField
                label="Search by Product ID, Name, or Category ID"
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
                                <TableCell>{product.categoryId ?? '—'}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                    {typeof product.price === "number" && !isNaN(product.price)
                                        ? `$${product.price.toFixed(2)}`
                                        : "—"}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        placeholder={typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
                                        onChange={e => handlePriceInput(product.id, e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdate(product.id)}
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
