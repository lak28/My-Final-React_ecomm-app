import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const[showDiv,setShowDiv] =useState(false);
  const[Title,setTitle] =useState("");
  const[Price,setPrice] =useState("");
  const[P,setP] =useState(true);
  const[T,setT] =useState(true);

 

  const dispatch = useDispatch();
  const addProduct = (product) => {
    debugger
    dispatch(addCart(product));
    alert("Product Added to cart");
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setPrice(product.price);
      setTitle(product.title);
      setLoading(false);
    };
    debugger
   if(product.length<1){
    getProduct();
   }

   
  }, []);






function EditBox(product){
    if(showDiv===false){
   
    setShowDiv(true);
  
    }else{
        setShowDiv(false);
    }
}


function updateContact(event) {
  debugger
  event.preventDefault();
  console.log(product);
  setP(false);
  setT(false);

  product.title=event.target.idofTitle.value;
  product.price=event.target.idofPrice.value;
  setProduct(product);
  console.log(product);

  fetch(`https://fakestoreapi.com/products/${product.id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) =>{ console.log(json)
    setProduct(product);
    setPrice(product.price);
    setTitle(product.title);
 });
 event.preventDefault();
 alert("Product Updated");
 setPrice(product.price);
 setTitle(product.title);
 setProduct(product);
 setShowDiv(false);
}




  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        {showDiv ? (
          <div>
          <form className="form-inline" onSubmit={(event)=>updateContact(event)}>
        
          <div className="form-group row">
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofProduct" value={product.id} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofTitle" placeholder="Enter new Title" ></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofPrice" placeholder="Enter new Price" ></input>
            </div>
 
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary"><i className="bi bi-sliders"></i> Update</button>
            </div>
          </div>
        </form> 
      </div>
        ) : (
          ""
        )}
        <div className="col-md-6">
        <button style={{marginLeft:"10px", marginTop:"30px", backgroundColor:"white" ,color:"red", border:"none",fontWeight:"bolder" }} onClick={()=>EditBox(product)} ><i class="fa-solid fa-pencil"></i>Edit product</button>
          <br></br>
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          ></img>
        </div>
                   
        <div className="col-md-6">
          <p className="lead text-black-50">{product.category}</p>
          <p className="lead my-1">
            {product.rating && product.rating.rate}{" "}
            <i className="fa fa-star"></i>
          </p>
          <h1 className="display-5">{T?product.title : Title}</h1>
          <h3 className="display-4 my-4">$ {P?product.price : Price}</h3>
          <br></br>
          <h5>PRODUCT DESCRIPTION</h5>
          <p className="lead">{product.description}</p>
          <br></br>
          <div className="d-grid gap-2">
            <button className="btn btn-dark" onClick={()=>addProduct(product)}>
              ADD TO CART
            </button>
            <NavLink to="/cart" className="btn btn-dark fw-bold" type="button">
              View Cart
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}
