import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseconfig/Firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// eslint-disable-next-line
const MySwal = withReactContent(Swal);

export const Show = () => {
   // eslint-disable-next-line
  const [id,setId]= useState('')
  const [comprado, setComprado] = useState(false);
  //1 - configuramos Los hooks
  const [products, setProducts] = useState([]);
  //2 - referenciamos a La db firestore
  const productscollection = collection(db, "products");
  //3 - Funcion para mostrar TODOS Los docs

  const getProducts = async () => {
    const data = await getDocs(productscollection);
    //console.log(data.docs);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

console.log(products);

  const marcaComprado = async (id) => {
    setId(id)
    console.log(id);

     
    const product = await getDoc(doc(db, "products", id));
    //const product =doc(db,"products",id)
    const aux = product.data().comprado ? false : true;
    console.log(product.data().comprado);
    console.log(aux);
//    if (product.exists()) {
    setComprado(aux);




    update(id);
    getProducts();
  };

  const update = async (id) => {
    const product = doc(db, "products", id);
    const data = { comprado: comprado };
    await updateDoc(product, data);
    //navigate('/')
  };

  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Borrar esta linea?",
      text: "No podra revertir esto borrado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Borrado!", "Su linea a sido borrada.", "success");
      }
    });
  };
  //6 - usamos useEffect
  useEffect(() => {
    getProducts();
    //update(id);
    //eslint-disable-next-line
  }, []);

  //7 - devolvemos vista de nuestro componente
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-info mt-2 mb-2">
                Crear
              </Link>
            </div>
            <table className="table table-dark table-hover bdr bg-red">
              <thead>
                <tr className="bg-red">
                  <th className={'ms-0 ps-0 w-50'}>Descripción</th>
                  <th className={'ms-0 ps-0 '}>Cant</th>
                  <th className={'ms-0 ps-0 w-50'}>Acción</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={product.comprado ? "riscado" : ""}
                  >
                    <td className={'ms-0 ps-0 w-50'}>{product.description}</td>
                    <td className={'ms-0 ps-0 '}>{product.stock}</td>
                    <td className={'ms-0 ps-0 w-50'}>
                      <button
                        onClick={() => {
                          marcaComprado(product.id);
                        }}
                        className={`btn me-1 btn-sm ${
                          product.comprado ? "btn-warning" : "btn-info"
                        }`}
                      >
                        {product.comprado ? "Listo" : "Hacer"}
                      </button>
                      <Link
                        to={`/edit/${product.id}`}
                        className="btn btn-warning me-1 btn-sm"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(product.id);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
