import { useState, useMemo } from 'react';

const sortableFields = [
  'name',
  'vendor',
  'sku',
  'price',
  'price_with_delivery',
  'availability',
  'multiplicity',
];

export const useProductTable = (products) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortProductsByClick = (field) => {
    if (!sortableFields.includes(field)) return;

    if (sortBy === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortBy(null);
        setSortOrder('asc');
      }
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedProducts = useMemo(() => {
    if (!sortBy) return products;

    return [...products].sort((a, b) => {
      let firstProductValue = a[sortBy];
      let secondProductValue = b[sortBy];

      if (typeof firstProductValue === 'string') {
        firstProductValue = firstProductValue.toLowerCase();
        secondProductValue = secondProductValue.toLowerCase();
      }

      if (firstProductValue < secondProductValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (firstProductValue > secondProductValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [products, sortBy, sortOrder]);

  return {
    sortedProducts,
    sortBy,
    sortOrder,
    sortProductsByClick,
    isSortable: (field) => sortableFields.includes(field),
  };
};