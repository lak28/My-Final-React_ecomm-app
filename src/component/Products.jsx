import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './product.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addCart} from '../redux/action';
import axios from 'axios';


export default function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const[sortBtn,setSortBtn] =useState("Sort by Price");
    const[showDiv,setShowDiv] =useState(false);

  
   
    let componentMounted = true;
    const getProducts = async () => {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if(componentMounted){
            setData(await response.clone().json());
            setFilter(await response.json());
            setLoading(false);
            console.log(filter);
        }

        return () => {
            componentMounted = false;
        }
    }

    useEffect(() => {
     debugger
      if(filter.length<1){
        getProducts();
      }else{
     
        setFilter(data);
      }
    }, []);

    //Function to handle product add to cart page
    const dispatch = useDispatch();
    const addProduct = (product) => {
      dispatch(addCart(product));
      alert("Product Added to Cart");
    }

    const Loading = () => {
        return(
            <>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
    }

//function to show div to add details of new product to be added

function newProduct(){
if(showDiv==false){
    setShowDiv(true);
}else{
    setShowDiv(false);
}
}

//Function to add a new product 
function updateContact(event) {
    debugger
    event.preventDefault();
    var product = {
        id: parseInt(event.target.idofProduct.value),
        title:event.target.idofTitle.value,
        price: event.target.idofPrice.value,
        description: event.target.idofDes.value,
        image: event.target.idofImage.value
      };
      data.push(product);
      setFilter(data);
  
   setShowDiv(false);
   alert("Product Added")
  }

//Function to delete a product
async function DeleteUser(id) {
    await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
    alert('Delete successful');
    const updateList = data.filter((x)=>x.id !== id);
    setFilter(updateList);
}
 


//functions to filter products according to categories in navbar 

    const filterProduct = (cat) => {
        const updateList = data.filter((x)=>x.category === cat);
        setFilter(updateList);
    }


    const filterPrice=(data)=>{
        var priceList=data;
        if(sortBtn==="Sort by Price"){
         priceList=data.sort((a,b)=>{
            
            setSortBtn("Remove Sort");
              return a.price-b.price;
          });
          return setFilter(priceList);
        }else{
          setSortBtn("Sort by Price");
          return getProducts();
        }
    
      }
    
    //Html return function
    const ShowProducts = () => {
        return (
            <>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn  btn-outline-dark" onClick={()=>setFilter(data)}>Shop All</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("electronics")}>Electronic</button>
                    <button className="btn  btn-primary" style={{color:"white"}} onClick={()=>filterPrice(data)}>{sortBtn}</button>
                    <button className="btn  btn-success" style={{color:"white"}} onClick={(event)=>newProduct()}>Add Product</button>
                </div>
                {showDiv ? (
          <div>
          <form className="form-inline" onSubmit={(event)=>updateContact(event)}>
        
          <div className="form-group row">
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofProduct" placeholder='Enter ID' />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofTitle" placeholder="Enter Title" ></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofPrice" placeholder="Enter Price" ></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofDes" placeholder="Enter Description" ></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofImage" placeholder="Enter Image url" ></input>
            </div>
 
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary"><i className="bi bi-sliders"></i> Add</button>
            </div>
          </div>
        </form> 
      </div>
        ) : (
          ""
        )}
             






                {filter.map((product) => {
                    return (
                        <>

                    
                            <div className="col-md-3 mb-4" id="p">
                                <div class="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-0">{product.title.substring(0,20)}...</h5>
                                        <p class="card-text lead fw-bold">${product.price}</p>

                                        <button class="btn btn-primary" onClick={()=>addProduct(product)}>ADD TO CART</button>
                                        <Link to={`/products/${product.id}`} class="btn btn-dark" style={{marginLeft:"20px"}}>Details</Link>
                                        <button style={{marginLeft:"10px", backgroundColor:"white" , border:"none" ,color:"red"}}  onClick={()=>DeleteUser(product.id)}><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                            </div>
                       
                        </>
                    )
                })}
            </>
        )

    }

  return (
    <div className='home'>
        <div>
                <div className="row">
                    <div>
                       
                    </div>
                </div>
                <div className="row">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
    </div>
  )
}
