import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Banner from './Banner';
import CateSlider from './CateSlider';
import { PacmanLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cardSlice';
import toast, { Toaster } from 'react-hot-toast';









export const Dashboard = () => {
  const [state, setState] = useState([])
  const [latest, setLatest] = useState([]);
  const [cate, setCate] = useState([])
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('cate_name');
  const _useNavigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // console.log(query);

  // using useeffect for loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, []);
  const getAllCategoery = () => {
    axios.get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        // console.log(res);
        setCate(res.data)
      })

  }
  const getAllProducts = () => {
    axios.get("https://fakestoreapi.com/products?limit=4").then((res) => { setState(res.data) })
  }
  const latestProduct = () => {
    axios.get("https://fakestoreapi.com/products?sort=desc").then((res) => { setLatest(res.data.slice(0, 4)) })
  }

  useEffect(() => {
    latestProduct();
  }, [])

  const showCategoery = (cate_name) => {
    // alert(cate_name)
    axios.get("https://fakestoreapi.com/products/category/" + cate_name)
      .then((res) => {
        setState(res.data.slice(0, 4))
      })
  }
  useEffect(() => {

    getAllProducts()
    getAllCategoery()
    console.log(query);
    if (query != null) {
      showCategoery(query)
    }

  }, [query])

  const goToNext = (id) => {
    // alert(id)
    _useNavigate(`product-details/${id}`)

  }
  const addToCartData = (product) => {
    dispatch(addToCart(product));
    toast.success("product Added Succesfully");
  }
  return (
    <>
      <Toaster />
      {
        loading ?
          <div style={{ marginLeft: "48%", marginTop: "20%", marginBottom: "30%" }}><PacmanLoader color={"#36d7b7"} loading={loading} size={20} /></div> :
          <div className="container-fluid">
            <div className="row">
              <CateSlider />
            </div>
            <div className="row">
              <Banner />
            </div>




            <div className="row">
              <div className="col-md-2">
                <ul class="list-group" style={{ marginTop: "15px" }}>
                  <li class="list-group-item active" aria-current="true">All Categoerey</li>
                  {
                    cate.map((cate_data, index) =>
                      <li class="list-group-item" style={{ textTransform: "capitalize" }}>
                        <Link to="#" style={{ textDecoration: "none" }} onClick={() => { showCategoery(cate_data) }}>{cate_data}</Link>
                      </li>
                    )
                  }


                </ul>
              </div>
              <div className="col-md-10">
                <div className="container-fluid">
                  <div className="row">
                    {
                      state.map((item, index) =>
                        <div className="col-md-3" style={{ marginTop: "15px" }}>
                          <Card
                            raised
                            sx={{
                              maxWidth: 300,
                              margin: "0 auto",
                              padding: "0.1em",
                            }}
                          >
                            <CardMedia
                              component="img"
                              alt="green iguana"
                              height="140"
                              image={item.image}
                              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div" >
                                <span style={{ fontSize: "18px" }}> {item.title.substring(0, 20)}</span>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.description.substring(0, 50)}
                              </Typography>
                            </CardContent>
                            <CardActions>

                              <input type="submit" value="Add To Cart" onClick={() => { addToCartData(item) }} className='btn btn-success' />
                              <span style={{ marginLeft: "22%" }}>
                                <Button variant="contained" size="medium" style={{ fontSize: "11px" }} onClick={() => { goToNext(item.id) }}>View</Button>
                              </span>
                            </CardActions>
                          </Card>
                        </div>
                      )
                    }


                  </div>
                </div>
              </div>
            </div>



            <div className="row mt-3">
              <div className='text-left fs-3 fw-bold'>
                Latest Product
              </div>

            </div>
            <div className="row">
              {
                latest.map((item, index) =>
                  <div className="col-md-3" style={{ marginTop: "15px" }}>
                    <Card
                      raised
                      sx={{
                        maxWidth: 300,
                        margin: "0 auto",
                        padding: "0.1em",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={item.image}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                          <span style={{ fontSize: "18px" }}> {item.title.substring(0, 25)}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description.substring(0, 60)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <input type="submit" value="Add To Cart" onClick={() => { addToCartData(item) }} className='btn btn-success' />
                        <span style={{ marginLeft: "22%" }}>
                          <Button variant="contained" size="medium" style={{ fontSize: "11px" }} onClick={() => { goToNext(item.id) }}>View</Button>
                        </span>
                      </CardActions>
                    </Card>
                  </div>
                )
              }


            </div>
          </div>
      }
    </>
  )
}
