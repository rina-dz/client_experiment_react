import { useState, useMemo, useEffect } from 'react';
import sale_icon from "../../images/sale.svg";
import hot_sale_icon from "../../images/hot_sale.svg";
import add_icon from "../../images/add.svg";
import { availabilityIcons } from "../../data/availabilityIcons";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
} from "@mui/material";

const sortableFields = [
    'name', 'vendor', 'sku', 'price', 'price_with_delivery', 'availability', 'multiplicity'
];

const editableFields = [
    'name', 'vendor', 'sku', 'price', 'price_with_delivery', 'multiplicity', 'availability'
];

const FormatPrice = ({ value }) => {
    const [integerPart, decimalPart] = Number(value).toFixed(2).split(".");
    return (
        <Typography component="span" sx={{ fontFamily: '"Roboto Mono", monospace', fontWeight: 400, fontSize: "16px", lineHeight: "110%", color: "rgba(34, 34, 34, 1)" }}>
            {integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            <Typography component="span" sx={{ fontFamily: '"Roboto Mono", monospace', color: "rgba(179, 179, 179, 1)", fontSize: "14px" }}>
                ,{decimalPart}
            </Typography>
        </Typography>
    );
};

export const useProductTable = (products, onProductsChange) => {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingCell, setEditingCell] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleHeaderClick = (field) => {
        if (!sortableFields.includes(field)) return;
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const startEditing = (productId, field, value) => {
        if (!editableFields.includes(field)) return;
        setEditingCell({ productId, field });
        setEditValue(String(value));
    };

    const saveEditing = () => {
        if (!editingCell) return;
        const { productId, field } = editingCell;
        let newValue = editValue;

        if (['price', 'price_with_delivery', 'multiplicity'].includes(field)) {
            const numValue = Number(newValue.replace(/\s/g, ''));
            if (isNaN(numValue) || numValue < 0) {
                setEditingCell(null);
                return;
            }
            newValue = numValue;
        }

        if (field === 'availability') {
            const numValue = Number(newValue);
            if (![1, 2, 3].includes(numValue)) {
                setEditingCell(null);
                return;
            }
            newValue = numValue;
        }

        const updatedProducts = products.map(p =>
            p.id === productId ? { ...p, [field]: newValue } : p
        );
        onProductsChange(updatedProducts);
        setEditingCell(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') saveEditing();
        else if (e.key === 'Escape') setEditingCell(null);
    };

    const handleRowClick = (productId) => {
        setSelectedRowId(productId);
    };

    const clearSelection = () => {
        setSelectedRowId(null);
    };

    const handleAddToOrder = (sku) => {
        const message = `Товар с артикулом ${sku} добавлен в заказ!`;
        setSnackbar({ open: true, message });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        const handleClickOutside = () => {
            clearSelection();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const renderCell = (product, field) => {
        const isEditing = editingCell?.productId === product.id && editingCell?.field === field;

        if (isEditing) {
            if (field === 'availability') {
                return (
                    <TextField
                        select
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEditing}
                        onKeyDown={handleKeyDown}
                        SelectProps={{
                            renderValue: (value) => {
                                const icon = availabilityIcons.find(i => i.value === Number(value))?.icon;
                                return icon ? <Box component="img" src={icon} sx={{ width: 20, height: 20 }} /> : null;
                            }
                        }}
                        sx={{
                            width: '100%',
                            height: '100%',
                            '& .MuiInputBase-root': {
                                height: '100%',
                                padding: '14px 16px',
                            },
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 !important',
                            }
                        }}
                    >
                        {availabilityIcons.map(icon => (
                            <MenuItem key={icon.value} value={icon.value}>
                                <Box component="img" src={icon.icon} sx={{ width: 20, height: 20 }} />
                            </MenuItem>
                        ))}
                    </TextField>
                );
            }

            return (
                <TextField
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={saveEditing}
                    onKeyDown={handleKeyDown}
                    size="small"
                    sx={{
                        width: '100%',
                        height: '100%',
                        '& .MuiInputBase-root': {
                            height: '100%',
                            padding: '14px 16px',
                        },
                        '& .MuiInputBase-input': {
                            padding: '0',
                            fontSize: '16px',
                            fontFamily: field.includes('price') ? '"Roboto Mono", monospace' : 'Inter',
                        }
                    }}
                    InputProps={{
                        endAdornment: field.includes('price') ? (
                            <InputAdornment position="end" sx={{
                                color: 'rgba(179, 179, 179, 1)',
                                fontSize: '14px',
                                fontFamily: '"Roboto Mono", monospace'
                            }}>
                                ₽
                            </InputAdornment>
                        ) : null,
                    }}
                />
            );
        }

        switch (field) {
            case 'name':
                return (
                    <Box sx={{ padding: '14px 16px', display: "flex", alignItems: "center", gap: 1 }}>
                        {product.sale && <Box component="img" src={sale_icon} sx={{ width: 24, height: 24 }} />}
                        {product.hot_sale && <Box component="img" src={hot_sale_icon} sx={{ width: 24, height: 24 }} />}
                        <Typography sx={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", lineHeight: "110%", color: "rgba(34, 34, 34, 1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {product.name}
                        </Typography>
                    </Box>
                );

            case 'vendor':
                return (
                    <Box sx={{ padding: '14px 16px' }}>
                        <Typography sx={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", lineHeight: "110%", color: "rgba(34, 34, 34, 1)" }}>{product.vendor}</Typography>
                    </Box>
                );

            case 'sku':
                return (
                    <Box sx={{ padding: '14px 16px' }}>
                        <Typography sx={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", lineHeight: "110%", color: "rgba(179, 179, 179, 1)" }}>{product.sku}</Typography>
                    </Box>
                );

            case 'price':
            case 'price_with_delivery':
                return (
                    <Box sx={{ padding: '14px 16px', textAlign: 'right' }}>
                        <FormatPrice value={product[field]} />
                    </Box>
                );

            case 'multiplicity':
                return (
                    <Box sx={{ padding: '14px 16px' }}>
                        <Typography sx={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", lineHeight: "110%", color: "rgba(34, 34, 34, 1)" }}>{product.multiplicity}</Typography>
                    </Box>
                );

            case 'availability':
                return (
                    <Box sx={{ padding: '14px 16px', display: 'flex', justifyContent: 'center' }}>
                        <Box component="img" src={availabilityIcons.find(i => i.value === product.availability)?.icon} sx={{ width: 20, height: 20 }} />
                    </Box>
                );

            case 'order':
                return (
                    <Box
                        sx={{
                            padding: '14px 16px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToOrder(product.sku);
                        }}
                    >
                        <Box component="img" src={add_icon} sx={{ width: 32, height: 32, transition: "opacity 0.2s", "&:hover": { opacity: 0.6 } }} />
                    </Box>
                );

            case 'actions':
                return (
                    <Box sx={{ padding: '14px 16px', display: 'flex', justifyContent: 'center' }}>
                        <MoreVertIcon sx={{ color: "rgba(153, 153, 153, 1)", fontSize: 20, cursor: "pointer", transition: "opacity 0.2s", "&:hover": { opacity: 0.8 } }} />
                    </Box>
                );

            default:
                return null;
        }
    };

    const sortedProducts = useMemo(() => {
        if (!sortBy) return products;
        return [...products].sort((a, b) => {
            let currentProductValue = a[sortBy];
            let nextProductValue = b[sortBy];

            if (typeof currentProductValue === 'string') {
                currentProductValue = currentProductValue.toLowerCase();
                nextProductValue = nextProductValue.toLowerCase();
            }

            if (currentProductValue < nextProductValue) return sortOrder === 'asc' ? -1 : 1;
            if (currentProductValue > nextProductValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [products, sortBy, sortOrder]);

    return {
        sortedProducts,
        sortBy,
        sortOrder,
        handleHeaderClick,
        renderCell,
        startEditing,
        editValue,
        setEditValue,
        handleKeyDown,
        isEditable: (field) => editableFields.includes(field),
        selectedRowId,
        handleRowClick,
        clearSelection,
        snackbar,
        handleAddToOrder,
        handleCloseSnackbar,
    };
};