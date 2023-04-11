import React, {useEffect,useState} from "react";
import "./addoperator.css";
// import { db } from './firebase-config'
// import { collection, addDoc, Timestamp } from 'firebase/firestore'

export default function Addoperator() {
    // const [operators, setOperators] = useState([]);
    // const [newItemName, setNewItemName] = useState("");
    // const [newItemDescription, setNewItemDescription] = useState("");
    // const [newItemPrice, setNewItemPrice] = useState("");
  
    // useEffect(() => {
    //   // Get all operators from Firestore on component mount
    //   firestore.collection("operators").onSnapshot((snapshot) => {
    //     const newItems = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setOperators(newItems);
    //   });
    // }, []);
  
    // const handleNewItemNameChange = (event) => {
    //   setNewItemName(event.target.value);
    // };
  
    // const handleNewItemDescriptionChange = (event) => {
    //   setNewItemDescription(event.target.value);
    // };
  
    // const handleNewItemPriceChange = (event) => {
    //   setNewItemPrice(event.target.value);
    // };
  
    // const handleNewItemSubmit = (event) => {
    //   event.preventDefault();
    //   firestore.collection("operators").add({
    //     name: newItemName,
    //     description: newItemDescription,
    //     price: parseFloat(newItemPrice),
    //   });
    //   setNewItemName("");
    //   setNewItemDescription("");
    //   setNewItemPrice("");
    // };
    return (
        <div className='ocontainer'>
            <div className='ocontainer1'>
                <div className='ocontainer2'>
                    <span className='text'>ADD OPERATOR</span>
                </div>
                <div className='ocontainer3'>
                    <div className='ocontainer4'>
                        <div className='ocontainer5'>
                            <span className='text1'>NAME    : </span>
                            <input
                                type="text"
                                placeholder="Operator's Name"
                                className='textinput'
                            />
                        </div>
                        <div className='ocontainer6'>
                            <span className='text2'>EMAIL   :    </span>
                            <input
                                type="text"
                                placeholder="Operator's Email"
                                className='textinput1'
                            />
                        </div>
                        <div className='ocontainer7'>
                            <span className='text3'>EPF NO: </span>
                            <input
                                type="text"
                                placeholder="Operator's EPF Number"
                                className='textinput2'
                            />
                        </div>
                        <button className='savebutton'>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}