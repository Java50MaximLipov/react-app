import { useSelector } from "react-redux";
import { ProductType } from "../../model/ProductType";
import { Button, CardActions, CardMedia, Grid } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";

export const ProductsClient: React.FC = () => {
  const products: ProductType[] = useSelector<any, ProductType[]>(
    (state) => state.productsState.products
  );
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card>
            <CardMedia
              sx={{ height: 220 }}
              image={`images/${product.image}`}
              title={product.title}
            />
            <CardContent>
              <Typography variant="h6">
                {" "}
                {product.title
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>
              <Typography variant="subtitle2">{product.unit}</Typography>
              <Typography variant="subtitle1">{product.cost} ILS</Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="small">
                -
              </Button>
              <Typography
                variant="subtitle2"
                sx={{ width: "30px", textAlign: "center" }}
              >
                0
              </Typography>
              <Button variant="outlined" size="small">
                +
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
