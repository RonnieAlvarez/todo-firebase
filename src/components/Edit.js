import React, {useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import {getDoc,updateDoc,doc} from 'firebase/firestore'
import { db } from "../firebaseconfig/Firebase";
import { useEffect } from 'react';

export const Edit = () => {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();
  
  const update = async (e) => {
    e.preventDefault();
    const product =doc(db,"products",id)
    const data = {description:description,stock:stock}
      await updateDoc(product,data)
      navigate('/')
  }
  const getProductsById = async (id) => {
    const product = await getDoc( doc(db,"products",id))
    if(product.exists()) {
      setDescription(product.data().description)
      setStock(product.data().stock)
  } else {
    console.log("Product not found")
  }
}
useEffect(()=>{
  getProductsById(id)
   // eslint-disable-next-line
},[])
  return (
    <div className="container">
    <div className="row">
      <div className="col">
        <h1> Editar Linea</h1>
        <form onSubmit={update}>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary btn-sm" type="submit">Actualiza</button>
        </form>
      </div>
    </div>
  </div>

  )
}

export default Edit