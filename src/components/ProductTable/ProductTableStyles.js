export const columnWidths = {
  name: "37.87%",
  vendor: "9.47%",
  sku: "9.47%",
  price: "9.47%",
  price_with_delivery: "9.47%",
  availability: "5.70%",
  multiplicity: "6.44%",
  order: "7.92%",
  actions: "4.21%",
};

export const tableHeaderCellSx = (header, columnWidths) => ({
  height: "64px",
  padding: "16px",
  borderBottom: 0,
  color: "rgba(153, 153, 153, 1)",
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "110%",
  textAlign: header.align,
  width: columnWidths[header.id],
  whiteSpace: "pre-line",
  backgroundColor: header.backgroundColor || "inherit",
  cursor: !["order", "actions"].includes(header.id) ? "pointer" : "default",
  "&:hover": !["order", "actions"].includes(header.id) ? { opacity: 0.9 } : {},
  boxSizing: "border-box",
});

export const tableRowSx = {
  backgroundColor: "#f8f8f8",
  height: "46px",
  "&:hover": { backgroundColor: "#F5F7FA" },
};

export const tableCellSx = (width, textAlign = "left") => ({
  height: "46px",
  padding: 0,
  textAlign,
  width,
  boxSizing: "border-box",
});

export const containerSx = {
  maxWidth: "1616px",
  width: "100%",
  margin: "10px 10px 0 auto",
};

export const tableContainerSx = {
  borderRadius: "8px",
};

export const tableSx = {
  minWidth: "800px",
  width: "100%",
  tableLayout: "fixed",
};

export const headerRowSx = {
  backgroundColor: "#f2f6fa",
  height: "64px",
};