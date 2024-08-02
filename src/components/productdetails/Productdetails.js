import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';
import { PacmanLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cardSlice';
import toast, { Toaster } from 'react-hot-toast';





const Productdetails = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        title: '...',
        price: '...',
        category: '...',
        description: '...',
        image: '...'
    })
    // using useeffect for loading
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [])
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/")
            .then((res) => {
                setState(res.data)
            })
        window.scrollTo(0, 0)
    }, [])

    const addToCartData = ((product) => {
        // alert(product);
        dispatch(addToCart(product));
        toast.success("Product added to cart", {
            duration: 3000,
            position: "top-center"
        })
    })
    return (

        <>
            <Toaster />
            {
                loading ?
                    <div style={{ marginLeft: "48%", marginTop: "20%", marginBottom: "30%" }}><PacmanLoader color={"#36d7b7"} loading={loading} size={20} /></div> :


                    <div className="container" >
                        <div className="row">
                            <div className="card mb-3 mt-4" style={{ width: "100%", border: "none" }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <div style={{ width: "500px" }}> <ReactImageMagnify {...{
                                            smallImage: {
                                                src: state.image,
                                                alt: 'Wristwatch by Ted Baker London',
                                                // isFluidWidth: true,
                                                width: 350,
                                                height: 400

                                            },
                                            largeImage: {
                                                src: state.image,
                                                width: 1200,
                                                height: 1800
                                            }
                                        }} /></div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p className="card-text">
                                                {state.category}
                                            </p>
                                            <h5 className="card-title">{state.title}</h5>
                                            <p className="card-text">
                                                {state.description}
                                            </p>
                                            <h4 className="card-title mb-3">Rs.{state.price}/-</h4>
                                            <input type="submit" value="Add to cart" onClick={() => { addToCartData(state) }} className='btn btn-danger' /> &nbsp;&nbsp;
                                            <span>
                                                <input type="submit" value="Buy Now" className='btn btn-success' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            }


        </>
    )
}

export default Productdetails
