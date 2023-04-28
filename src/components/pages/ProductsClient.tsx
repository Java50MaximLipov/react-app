//  React
import { ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//  App Types, Interfaces, and Services
import { ProductType } from "../../model/ProductType";
import { ShoppingProductType } from "../../model/ShoppingProductType";
import { ordersService } from "../../config/orders-service-config";
//  Styles and Components
import { Button, CardActions, CardMedia, Grid } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export const ProductsClient: React.FC = () => {
  const navigate = useNavigate();
  const products: ProductType[] = useSelector<any, ProductType[]>(
    (state) => state.productsState.products
  );
  const authUser = useSelector<any, string>((state) => state.auth.authUser);
  const shopping = useSelector<any, ShoppingProductType[]>(
    (state) => state.shoppingState.shopping
  );
  const counts = useMemo(() => getCounts(), [products, shopping]);
  function getCounts(): number[] {
    return products.map((product) => getCountProduct(product));
  }
  function getCountProduct(product: ProductType): number {
    const shoppingProduct: ShoppingProductType | undefined = shopping.find(
      (shopp) => shopp.id == product.id
    );
    let count: number = 0;
    if (shoppingProduct) {
      count = shoppingProduct.count;
    }
    return count;
  }

  function getProductCards(): ReactNode {
    return products.map((prod, index) => (
      <Grid item xs={8} sm={6} md={4} lg={3} key={index}>
        <Card>
          <CardMedia
            sx={{ height: 220 }}
            image={`images/${prod.image}`}
            title={prod.title}
          />
          <CardContent>
            <Typography variant="h6">
              {" "}
              {prod.title
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Typography>
            <Typography variant="subtitle2">{prod.unit}</Typography>
            <Typography variant="subtitle1">{prod.cost} ₪</Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={async () => {
                    if (authUser == "") {
                      navigate("/login");
                    } else {
                      ordersService.addShoppingProductUnit(authUser, prod.id!);
                    }
                  }}
                >
                  <Add />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {counts[index]}
                </Typography>
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={async () =>
                    ordersService.removeShoppingProductUnit(authUser, prod.id!)
                  }
                  disabled={counts[index] == 0}
                >
                  <Remove></Remove>
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  return (
    <Grid container spacing={6} justifyContent="center">
      {getProductCards()}
    </Grid>
  );
};

//   return (
//     <Grid container spacing={2}>
//       {products.map((product) => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//           <Card>
//             <CardMedia
//               sx={{ height: 220 }}
//               image={`images/${product.image}`}
//               title={product.title}
//             />
//             <CardContent>
//               <Typography variant="h6">
//                 {" "}
//                 {product.title
//                   .split("-")
//                   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                   .join(" ")}
//               </Typography>
//               <Typography variant="subtitle2">{product.unit}</Typography>
//               <Typography variant="subtitle1">{product.cost} ₪</Typography>
//             </CardContent>
//             <CardActions>
//               <Button variant="outlined" size="small">
//                 -
//               </Button>
//               <Typography
//                 variant="subtitle2"
//                 sx={{ width: "30px", textAlign: "center" }}
//               >
//                 0
//               </Typography>
//               <Button variant="outlined" size="small">
//                 +
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };
