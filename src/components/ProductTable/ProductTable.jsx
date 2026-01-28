import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

import sale_icon from "../../images/sale.svg";
import hot_sale_icon from "../../images/hot_sale.svg";
import add_icon from "../../images/add.svg";

import { availabilityIcons } from "../../data/availabilityIcons";

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

const FormatPrice = ({ value }) => {
  const [integerPart, decimalPart] = Number(value).toFixed(2).split(".");

  return (
    <Typography
      component="span"
      sx={{
        fontFamily: '"Roboto Mono", monospace',
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "110%",
        color: "rgba(34, 34, 34, 1)",
      }}
    >
      {integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
      <Typography
        component="span"
        sx={{
          fontFamily: '"Roboto Mono", monospace',
          color: "rgba(179, 179, 179, 1)",
          fontSize: "14px",
        }}
      >
        ,{decimalPart}
      </Typography>
    </Typography>
  );
};

const ProductTable = ({ products }) => {
  const { sortedProducts, sortBy, sortOrder, sortProductsByClick } =
    useProductTable(products);

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
    <Box sx={containerSx}>
      <TableContainer component={Paper} elevation={0} sx={tableContainerSx}>
        <Table sx={tableSx} aria-label="products table">
          <TableHead>
            <TableRow sx={headerRowSx}>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={tableHeaderCellSx(header, columnWidths)}
                  onClick={() => sortProductsByClick(header.id)}
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
            {sortedProducts.map((product, index) => (
              <TableRow key={index} sx={tableRowSx}>
                <TableCell sx={tableCellSx(columnWidths.name, "left")}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {product.sale && (
                      <Box
                        component="img"
                        src={sale_icon}
                        alt="Sale"
                        sx={{ width: 24, height: 24 }}
                      />
                    )}
                    {product.hot_sale && (
                      <Box
                        component="img"
                        src={hot_sale_icon}
                        alt="Hot Sale"
                        sx={{ width: 24, height: 24 }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "110%",
                        color: "rgba(34, 34, 34, 1)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={tableCellSx(columnWidths.vendor, "left")}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "110%",
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    {product.vendor}
                  </Typography>
                </TableCell>
                <TableCell sx={tableCellSx(columnWidths.sku, "left")}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "110%",
                      color: "rgba(179, 179, 179, 1)",
                    }}
                  >
                    {product.sku}
                  </Typography>
                </TableCell>
                <TableCell sx={tableCellSx(columnWidths.price, "right")}>
                  <FormatPrice value={product.price} />
                </TableCell>
                <TableCell
                  sx={tableCellSx(columnWidths.price_with_delivery, "right")}
                >
                  <FormatPrice value={product.price_with_delivery} />
                </TableCell>
                <TableCell
                  sx={tableCellSx(columnWidths.availability, "center")}
                >
                  <Box
                    component="img"
                    src={
                      availabilityIcons.find(
                        (item) => item.value === product.availability
                      )?.icon
                    }
                    sx={{ width: 20, height: 20 }}
                  />
                </TableCell>
                <TableCell sx={tableCellSx(columnWidths.multiplicity, "left")}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "110%",
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    {product.multiplicity}
                  </Typography>
                </TableCell>
                <TableCell sx={tableCellSx(columnWidths.order, "right")}>
                  <Box
                    component="img"
                    src={add_icon}
                    alt="Добавить в заказ"
                    sx={{
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover": { opacity: 0.6 },
                    }}
                  />
                </TableCell>
                <TableCell sx={tableCellSx(columnWidths.actions, "center")}>
                  <MoreVertIcon
                    sx={{
                      color: "rgba(153, 153, 153, 1)",
                      fontSize: 20,
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover": { opacity: 0.8 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
