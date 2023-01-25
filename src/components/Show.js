import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebaseconfig/Firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// eslint-disable-next-line
const MySwal = withReactContent(Swal);

export const Show = () => {
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
  // console.log(products);
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Remove this Product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire("Deleted!", "Your Product has been deleted.", "success");
      }
    });
  };
  //6 - usamos useEffect
  useEffect(() => {
    getProducts();
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
                Create
              </Link>
            </div>
            <table className="table table-dark table-hover bdr bg-red">
              <thead>
                <tr className="bg-red">
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link
                        to={`/edit/${product.id}`}
                        className="btn btn-warning me-1"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(product.id)
                        }}
                        className="btn btn-danger"
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
