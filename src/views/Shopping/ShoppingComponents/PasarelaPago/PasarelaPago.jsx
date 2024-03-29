import React, { useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// import {  PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanShoppingCart } from "../../../../redux/actions/actions";
import style from "./Pasarela.module.css"
import urlBack from "../../../../utils/deploy_back";


const Paypalboton= (props)=>{
    const { user, isAuthenticated } = useAuth0()
    
    const dispatch = useDispatch()
 
    const pagoCarrito= useSelector(e=>e.shoppingCart)


    const [purchaseStatus, setPurchaseStatus ] = useState(false);
    const [purchaseError, setPurchaseError ] = useState(null);


    const price = useMemo(()=>{
        return pagoCarrito.reduce((total,currrent)=>total+(currrent.price*currrent.quantity),0)
    },[pagoCarrito])

    const send = async() => {
        const sendData = {
            fromMail: "compushoppf@gmail.com",
            toMail: user.email,
            name: user.name
        }
        const mailer = await fetch(`${urlBack}/mailer`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        console.log(mailer)
    }

    if (purchaseError) alert(purchaseError)
    else if (purchaseStatus){ 
        setPurchaseStatus(false)
    }
    


    if (!isAuthenticated) {
        return(
            <label>
                <h1>loading...</h1>
                <p>Si no estás logueado, inicia sesión</p>
            </label>
        )
    }
    else if(!props.userId){
        return(
            <label>
                <h1>loading...</h1>
            </label>
        )
    }else if(!price){
        return(
            <h1>Tu carrito está vacío</h1>
        )
    }
    else{
    
        const manejadorSucces = async(order) =>{
    
            const cleanCart = pagoCarrito.map((e)=>{
                return{
                    _id:e._id,
                    name:e.name,
                    price:e.price,
                    description:e.desdescription,
                    description_2:e.desdescription_2,
                    description_3:e.desdescription_3,
                    description_4:e.desdescription_4,
                    quantity:e.quantity,
                    img:e.img
                }
            })

            const directionDlivery = {
                    city:props.statusForm.current.city,
                    direction:props.statusForm.current.direction,
                    references:props.statusForm.current.references,
                    place:props.statusForm.current.options,
                }

            const {status} = await axios.put(`${urlBack}/users/update/${props.userId}`,{name:props.statusForm.current.name,orders:{fecha:Date.now(),totalPrice:price,directionDlivery,contactPhone:props.statusForm.current.phone, productos:cleanCart,}, })
            .catch((err)=>alert("El pago fue realizado, pero no pudimos completar tu compra. Contactanos para poder ayudare -> compushoppf@gmail.com"))

            if (status===200) {
                async function procesarStock(pagoCarrito) {
                    const peticiones = [];
                  
                    pagoCarrito.forEach((e) => {
                        peticiones.push(axios.put(`${urlBack}/components/${e._id}`,{quantityStock:e.quantity*-1}))
                    });
                  
                    Promise.all(peticiones)
                    .then((respuestas) => {
                      props.cerrarPasarela(2)
                      setPurchaseStatus(true)
                      dispatch(cleanShoppingCart())
                    })
                    .catch((error) => {
                      props.cerrarPasarela(0)
                      alert('Ocurrió un error al actualizar el stock');
                      console.log(error);
                    });
                  }

                  procesarStock(pagoCarrito)

            }else{
                props.cerrarPasarela(0)
                alert("Pago realizado, pero no pudimos completar tu compra. Contactanos para poder ayudare -> compushoppf@gmail.com")
            }
            
        }
    
    
        const createOrder = (data, actions) => {
            return actions.order.create({
                purchase_units:[
                    {
                        description:"Compra en CompuShop",
                        amount: {
                            value: price,
                        }
    
                }
    
                ]
            });
             };
    
    
        const onApprove = async(data, actions) => {
            send()
            const order = await actions.order.capture();
            manejadorSucces(order)
        };
    
    
        return (
            <div id={style.buttonPaypalContainer}>
                {/* <PayPalButtons style={{ layout: "horizontal" }} 
                onClick={(data,action)=>{
                    console.log("Estás apunto de efectuar la compra")

                    if (price) {
                        return action.resolve();
                    }else{
                        return action.reject();
                    }
                }}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) =>onApprove(data, actions)}
                onError={(err)=>setPurchaseError(err)}
                /> */}
            </div>
        )
    }

}

export default Paypalboton