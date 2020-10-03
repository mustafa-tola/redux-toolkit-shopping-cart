import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import {addQuantity,removeFromCart,subtractQuantity} from "../../store/cartSlice";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 10,
    },
    paper: {
        textAlign: 'center',

    }
});

export const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector((state) => {
      return state.cart.products;  
    })
    const total = useSelector((state) => {
        return state.cart.total;
    })

    // const { data, total, removeFromCart, addQuantity, subtractQuantity } = useContext(GlobalContext);

    return (
        <div>
            <h1 style={{ "textAlign": "center" }}>Your Cart</h1>
            <ul style={{ "marginTop": "10px" }}>
                <Grid container spacing={4}>
                    {data.length ? (data.map((shoe) => {
                        return (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            // className={classes.media}
                                            image={shoe.img[0]}
                                            title={shoe.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {shoe.name}
                                            </Typography>

                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {shoe.desc}
                                            </Typography>

                                            <Typography variant="h5">
                                                Price: ${shoe.changedPrice}
                                            </Typography>
                                            <div style={{ "display": "flex", "textAlign": "center", "justifyContent": "center" }}>
                                                <Button color="primary" variant="contained" size="small" onClick={() => dispatch(addQuantity(shoe.id))}>
                                                    +
                                                </Button>
                                                <Typography variant="h5">
                                                    Quantity: {shoe.quantity}
                                                </Typography>
                                                <Button color="secondary" variant="contained" size="small" onClick={() => dispatch(subtractQuantity(shoe.id))}>
                                                    -
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => dispatch(removeFromCart(shoe.id))}>
                                            Remove From Cart
                                        </Button>
                                        <Link to={`/detail/${shoe.id}`} style={{ "textDecoration": "none" }}>
                                            <Button size="small">
                                                Details
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card >
                            </Grid>
                        )
                    })) : <p style={{ "textAlign": "center" }}>There are no products in cart</p>}
                </Grid>
            </ul>

            <p style={{ "textAlign": "center" }}><b>Total Amount:</b> {total ? total : 0}$</p>
        </div>
    )
}