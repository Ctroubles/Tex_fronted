import style from "./MetodoPago.module.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { cleanShoppingCart } from "../../../../redux/actions/actions";



const MetodoPago = ()=>{
    const history = useHistory()
    const dispatch = useDispatch()


    const yapeRef = useRef(null)
    const plinRef = useRef(null)
    const bcpRef = useRef(null)
    const interbankRef = useRef(null)

    const purchaseOrder = useSelector(e=>e.purchaseOrder)
    const carritoCompras = useSelector(e=>e.shoppingCart)


    const [boxActive, setBoxActive] = useState(null)

    useEffect(()=>{
        if(!carritoCompras.length || !purchaseOrder.deliveryData){
            history.push("/finalizar")
        }
        // else if (!purchaseOrder.deliveryData ) {
        //     history.push("/finalizar")
        // }
    },[])

    const confirmarHandler=()=>{

        if (!boxActive) {
            alert("selecciona un metodo de pago")
        }else{
                let totalPriceCart= 0;


                carritoCompras.forEach(e=>{
                    totalPriceCart = totalPriceCart + (e.price * e.quantity)
                })

                const sendOrder = async() =>{
                const orderToSend={
                    fullName: purchaseOrder.deliveryData.name,
                    DNI: purchaseOrder.deliveryData.dni,
                    phone: purchaseOrder.deliveryData.phone,
                    email: purchaseOrder.deliveryData.email,
                    department: purchaseOrder.deliveryData.departamento,
                    city: purchaseOrder.deliveryData.ciudad,
                    address: purchaseOrder.deliveryData.address,
                    date: Date.now(),
                    paymentMethod:boxActive,
                    totalPrice: totalPriceCart.toFixed(2),
                    products: carritoCompras,
                    instructions: purchaseOrder.deliveryData.instructions,
                }

                const result = await axios.post("http://localhost:3001/shopping/create",orderToSend)
                if(result.status ===201){
                    history.push(`/pedidos/${result.data.nOrden}/${result.data._id}`)
                    dispatch(cleanShoppingCart())
                }else{
                    alert("Hubo un problema al generar su orden, contactate a nustro Whatsapp")
                }
            }
            sendOrder()
        }
        
    }

    return(
                   <div>
                <div>
                    <label id={style.title}>
                        <h1>Metodo de pago</h1>
                    </label>
                    <div id={style.squarePayment}>
                        <div>
                            <div className={style.boxes} onClick={()=>setBoxActive("YAPE")} id={boxActive === "YAPE"?style.boxSelected:undefined} >
                                <img src="https://res.cloudinary.com/dmv0gnlcu/image/upload/v1680737075/600x600PX/LOGOS%20PAGOS/YAPE_add3pr.png" alt="" />
                                YAPE (Solo para compras max. s/500)
                            </div>
                            <div style={{height:boxActive === "YAPE"? yapeRef?.current?.scrollHeight:"0px" ,}} ref={yapeRef} className={boxActive === "YAPE"? style.dinamicBoxes :style.dinamicBoxesInactive} >
                                <p>
                                    Si cuentas con YAPE y tu pedido tiene un valor inferior a S/500 esta es la opción más rápida de efectuar tu pago                                
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.boxes} onClick={()=>setBoxActive("PLIN")} id={boxActive === "PLIN"?style.boxSelected:undefined}>
                                <img src="https://res.cloudinary.com/dmv0gnlcu/image/upload/v1680734118/600x600PX/LOGOS%20PAGOS/PLIN_dovgkb.png" alt="" />
                                PLIN (Solo para compras max. s/500)
                            </div>
                            <div ref={plinRef} style={{height:boxActive === "PLIN"? yapeRef?.current?.scrollHeight:"0px" ,}}  className={boxActive === "PLIN"? style.dinamicBoxes :style.dinamicBoxesInactive} >
                                <p>
                                    Si cuentas con PLIN y tu pedido tiene un valor inferior a S/500 esta es la opción más rápida de efectuar tu pago.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.boxes} onClick={()=>setBoxActive("BCP")} id={boxActive === "BCP"?style.boxSelected:undefined}>
                                <img src="https://res.cloudinary.com/dmv0gnlcu/image/upload/v1680734118/600x600PX/LOGOS%20PAGOS/BCP_hfqhrd.png" alt="" />
                                Transferencia o depósito bancario (BCP)
                            </div>
                            <div ref={bcpRef} style={{height:boxActive === "BCP"? yapeRef?.current?.scrollHeight:"0px" ,}}  className={boxActive === "BCP"? style.dinamicBoxes :style.dinamicBoxesInactive} >
                                <p>
                                Realiza Depósito o Transferencia Bancaria a nuestras cuentas:
                                (Añade como referencia tu número de DNI y código de pedido)
                                </p>
                            </div>
                        </div>    
                        <div>
                            <div className={style.boxes} onClick={()=>setBoxActive("Interbank")} id={boxActive === "Interbank"?style.boxSelected:undefined}>
                                <img src="https://res.cloudinary.com/dmv0gnlcu/image/upload/v1680734118/600x600PX/LOGOS%20PAGOS/INTERBANK_t0mswe.png" alt="" />
                                Transferencia o depósito bancario (Interbank)
                            </div>
                            <div ref={interbankRef} style={{height:boxActive === "Interbank"? yapeRef?.current?.scrollHeight:"0px" ,}} className={boxActive === "Interbank"? style.dinamicBoxes :style.dinamicBoxesInactive} >
                                <p>
                                    Realiza Depósito o Transferencia Bancaria a nuestras cuentas:
                                    (Añade como referencia tu número de DNI y código de pedido)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={style.confirmarButton}>
                    <label onClick={()=>confirmarHandler()}>
                        <span>Confirmar</span>
                    </label>
                </div>
            </div> 
    )
};



export default MetodoPago;