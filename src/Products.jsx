import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
    let [products,setproducts]=useState([])
    let [product,setproduct]=useState({
        title:"",
        image:"",
        price:"",

    })

    const handledata=(e)=>{
        let {name,value}=e.target
        setproduct({...product,[name]:value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        let res=await axios.post("http://localhost:8080/product",product)
    }
    const handledelete=async(id)=>{
        let res=await axios.delete(`http://localhost:8080/product/${id}`)
        // let data=res.filter((ele,i)=>i!=id)
        // console.log(data)
        // setproducts(data)

    }
    const getData=async()=>{
        let res=await axios.get("http://localhost:8080/product")
        setproducts(res.data)

    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
    <h2 className='text-center'>Product</h2>
    <form className='w-25 m-auto' onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control"  value={product.title} name='title' aria-describedby="emailHelp" onChange={handledata}/>
   
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Image</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={product.image} name='image' onChange={handledata}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Price</label>
    <input type="number" className="form-control" id="exampleInputPassword1" value={product.price} name='price' onChange={handledata}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
 
</form>
<div className='box'>
    {
        products.map((ele,index)=>(
            <div className='box1'>
            <img src={ele.image} alt="" />
            <p>{ele.title}</p>
            <p>{ele.price}</p>
            <button onClick={()=>handledelete(index)}>delete</button>
            </div>
            
        ))
    }
</div>
    </div>
  ) 
}

export default Products