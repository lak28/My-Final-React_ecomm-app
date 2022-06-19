import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { delCart } from '../redux/action';

import { addCart } from '../redux/action/index';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const state = useSelector((state)=> state.handleCart)
    const dispatch = useDispatch()

    const delProduct = (product) =>{
        dispatch(delCart(product))
    }

    const addProduct = (product) => {
        dispatch(addCart(product))
    }


    const product = (product) =>{
        return(

            <div className="px-4 my-5 bg-white rounded-3" key={product.id}>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={product.image} alt={product.title} height="60%" width="60%"/>
                        </div>
                        <div className="col-md-6">
                            <h6 className='display-6'>{product.title}</h6>
                            <p className="lead"> 
                            {product.qty} x ${product.price} = ${product.qty * product.price}</p>
                            <button className="btn btn-outline-dark me-4" onClick={()=> delProduct(product)}><i className="fa fa-minus"></i></button>
                            <button className="btn btn-outline-dark me-4" onClick={()=> addProduct(product)}><i className="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            
        )
    }

    const emptyCart = ()=> {
        return(
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <h3 className="text-center">Your Cart is Empty</h3>
                    </div>
                </div> 
            </div>
        )
    }

    const button = () =>{
        return(
            <div className="container">
                <div className="row">
                    <NavLink to="/checkout" className="btn btn-dark mb-5 w-25 mx-auto">Proceed To Checkout</NavLink>
                </div>
            </div>
        )
    }

    return (
        <>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(product)}
            {state.length !== 0 && button()}
        </>
    );
};

export default Cart;