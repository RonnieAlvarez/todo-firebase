import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseconfig/Firebase";

export const Create = () => {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  //const [comprado, setComprado] = useState(false);
  const navigate = useNavigate();
  const productscollection = collection(db, "products");

/**
 * It's a function that takes an event as an argument, prevents the default action of the event, and
 * then adds a document to the products collection with the description and stock values.
 * @param e - the event object
 */
  const store = async (e) => {
    e.preventDefault();
    await addDoc(productscollection, {
      description: description,
      stock: stock,
      comprado:false
    });
    navigate("/");
  };

/* It's a function that takes an event as an argument, prevents the default action of the event, and
then adds a document to the products collection with the description and stock values.
@param e - the event object */
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Añadir Productot</h1>
          <form onSubmit={store}>
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
            <button className="btn btn-primary btn-sm" type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
