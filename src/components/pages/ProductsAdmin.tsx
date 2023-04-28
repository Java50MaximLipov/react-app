import { Typography, Box, Avatar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProductType } from "../../model/ProductType";
import { useSelector } from "react-redux";

export const ProductsAdmin: React.FC = () => {
  const products: ProductType[] = useSelector<any, ProductType[]>(
    (state) => state.productsState.products
  );

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "",
      flex: 0.3,
      renderCell: (params) => (
        <Avatar
          src={`images/${params.value}`}
          sx={{ width: "90%", height: "80px" }}
        />
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    { field: "category", headerName: "Category", flex: 0.5 },
    { field: "unit", headerName: "Unit", flex: 0.4 },
    { field: "cost", headerName: "Cost (ILS)", flex: 0.3 },
  ];
  
  return (
    <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "80vw", height: "80vh" }}>
        <DataGrid
          columns={columns}
          rows={products}
          getRowHeight={() => "auto"}
        />
      </Box>
    </Box>
  );
};
