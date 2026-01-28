import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

import {
  columnWidths,
  tableHeaderCellSx,
  tableRowSx,
  tableCellSx,
  containerSx,
  tableContainerSx,
  tableSx,
  headerRowSx,
} from "./ProductTableStyles";

import { useProductTable } from "./ProductTableController";

const ProductTable = ({ products, onProductsChange }) => {
  const {
    sortedProducts,
    sortBy,
    sortOrder,
    handleHeaderClick,
    renderCell,
    startEditing,
    isEditable,
    selectedRowId,
    handleRowClick,
    clearSelection,
  } = useProductTable(products, onProductsChange);

  const headers = [
    { id: "name", label: "Наименование", align: "left" },
    { id: "vendor", label: "Вендор", align: "left" },
    { id: "sku", label: "Артикул", align: "left", backgroundColor: "#eef2f6" },
    {
      id: "price",
      label: "Цена ₽",
      align: "right",
      backgroundColor: "#eef2f6",
    },
    { id: "price_with_delivery", label: "Цена\nс доставкой ₽", align: "right" },
    { id: "availability", label: "Наличие", align: "center" },
    { id: "multiplicity", label: "Кратность", align: "left" },
    { id: "order", label: "В заказ", align: "right" },
    { id: "actions", label: "", align: "center" },
  ];

  return (
    <Box sx={containerSx} onClick={clearSelection}>
      <TableContainer component={Paper} elevation={0} sx={tableContainerSx}>
        <Table sx={tableSx} aria-label="products table">
          <TableHead>
            <TableRow sx={headerRowSx}>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={tableHeaderCellSx(header, columnWidths)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHeaderClick(header.id);
                  }}
                >
                  {header.label}
                  {sortBy === header.id && (
                    <Box
                      component="span"
                      sx={{
                        ml: 0.5,
                        fontSize: "10px",
                        verticalAlign: "top",
                        color: "rgba(153, 153, 153, 1)",
                      }}
                    >
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  ...tableRowSx,
                  backgroundColor:
                    selectedRowId === product.id
                      ? "#e3f2fd"
                      : tableRowSx.backgroundColor,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      selectedRowId === product.id
                        ? "#e3f2fd"
                        : tableRowSx["&:hover"].backgroundColor,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(product.id);
                }}
              >
                {headers.map((header) => (
                  <TableCell
                    key={`${product.id}-${header.id}`}
                    sx={tableCellSx(columnWidths[header.id], header.align)}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      startEditing(product.id, header.id, product[header.id]);
                    }}
                    style={{
                      cursor: isEditable(header.id) ? "pointer" : "default",
                    }}
                  >
                    {renderCell(product, header.id)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
