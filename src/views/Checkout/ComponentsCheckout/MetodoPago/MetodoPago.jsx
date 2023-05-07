import style from "./MetodoPago.module.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { cleanShoppingCart } from "../../../../redux/actions/actions";
// import PaymentForm from "../../pago_components/paymentForm";



const MetodoPago = ({userId})=>{
    const history = useHistory()
    const dispatch = useDispatch()


    const yapeRef = useRef(null)
    const plinRef = useRef(null)
    const bcpRef = useRef(null)
    const interbankRef = useRef(null)

    const purchaseOrder = useSelector(e=>e.purchaseOrder)
    const carritoCompras = useSelector(e=>e.shoppingCart)


    const [boxActive, setBoxActive] = useState(null)
    const [totalPrice, setTotalPrice] = useState([])
    const [totalPriceNumber, setTotalPriceNumber] = useState([])
    const [sessionToken, setSessionToken] = useState('');


    useEffect(()=>{
        // if(!carritoCompras.length || !purchaseOrder.deliveryData){
        //     history.push("/finalizar")
        // }
        // const getAccesToken = async()=>{
        //     try {
                
           
        //     const { data } = await axios.post("/payment/getAccesToken");
        //     const accesToken = data
          

        //    const resp = await axios.post("/payment/getSessionToken",{token:accesToken});
        //    const sessionToken = resp.data.sessionKey;
        //    setSessionToken(sessionToken)


     
        // } catch (error) {
                
        // }
        // };
        // getAccesToken()

    },[])
    




    const confirmarHandler=()=>{
        console.log(typeof(totalPriceNumber))
        if (!boxActive) {
            alert("selecciona un metodo de pago")
        }else if((boxActive === "PLIN" || boxActive === "YAPE") && totalPriceNumber>500){
            alert("Su compra excede los s/.500 permitidos para pagar con Yape o Plin.")
        }
        else{
            try {
                const sendOrder = async() =>{
                    const orderToSend={
                        user:userId,
                        fullName: purchaseOrder.deliveryData.name,
                        DNI: purchaseOrder.deliveryData.dni,
                        phone: purchaseOrder.deliveryData.phone,
                        email: purchaseOrder.deliveryData.email,
                        department: purchaseOrder.deliveryData.departamento,
                        city: purchaseOrder.deliveryData.ciudad,
                        address: purchaseOrder.deliveryData.address,
                        date: Date.now(),
                        paymentMethod:boxActive,
                        totalPrice: totalPriceNumber,
                        products: carritoCompras,
                        instructions: purchaseOrder.deliveryData.instructions,
                    }
        
                    const result = await axios.post("/shopping/create",orderToSend)
                    if(result.status ===201){
                        history.push(`/pedidos/${result.data.nOrden}/${result.data._id}`)
                        dispatch(cleanShoppingCart())
                    }else{
                        alert("Hubo un problema al generar su orden, contactate a nuestro Whatsapp: +51 944 949 084")
                    }
                    }
                    sendOrder()
            } catch (error) {
                    alert("Hubo un problema al generar su orden, contactate a nuestro Whatsapp: +51 944 949 084")
            }
        }
        
    }


    useEffect(()=>{
        let totalPriceCart= 0;

        carritoCompras.forEach(e=>{
            totalPriceCart = totalPriceCart + (e.price * e.quantity)
        })
        setTotalPriceNumber(Number(totalPriceCart.toFixed(1) + "0"))

        const formatter = new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2
        });
    
        const parts = formatter.formatToParts(totalPriceCart);
        const integerParts = parts.slice(0, parts.findIndex(part => part.type === 'decimal'))
        .map(part => part.value)
        .join('');  
    
        const fractionPart = parts.find(part => part.type === 'fraction').value;
        setTotalPrice([`${integerParts}.`,fractionPart])

    },[])

    return(
                   <div>
                    {/* <PaymentForm/> */}
                    <div>
                        <label id={style.title}>
                            <h1>Metodo de pago</h1>
                        </label>
                        <div id={style.montoSection}>
                            <label>Monto total:&nbsp;&nbsp;</label>
                            <label><span>{totalPrice[0]}</span><span style={{fontSize:"15px",marginLeft:"1px"}}>{totalPrice[1]}</span></label>
                        </div>
                        <div id={style.squarePayment}>
                            <div style={totalPriceNumber>500?{opacity:"0.6"}:undefined} >
                                <div className={style.boxes} onClick={()=>setBoxActive("YAPE")} id={boxActive === "YAPE"?style.boxSelected:undefined} >
                                    <img src="https://res.cloudinary.com/dmv0gnlcu/image/upload/v1680737075/600x600PX/LOGOS%20PAGOS/YAPE_add3pr.png" alt="" />
                                    YAPE (Solo para compras max. s/500)
                                </div>
                                <div   style={{height:boxActive === "YAPE"? yapeRef?.current?.scrollHeight:"0px" ,}} ref={yapeRef} className={boxActive === "YAPE"? style.dinamicBoxes :style.dinamicBoxesInactive} >
                                    <p>
                                        Si cuentas con YAPE y su pedido tiene un valor inferior a S/500 esta es la opción más rápida de efectuar tu pago                                
                                    </p>
                                </div>
                            </div>
                            <div style={totalPriceNumber>500?{opacity:"0.6"}:undefined}>
                                <div className={style.boxes} onClick={()=>setBoxActive("PLIN")} id={boxActive === "PLIN"?style.boxSelected:undefined}>
                                    <img src="https://res.cloudinary.com/dmv0gnlcu/image/upload/v1680734118/600x600PX/LOGOS%20PAGOS/PLIN_dovgkb.png" alt="" />
                                    PLIN (Solo para compras max. s/500)
                                </div>
                                <div ref={plinRef} style={{height:boxActive === "PLIN"? yapeRef?.current?.scrollHeight:"0px" ,}}  className={boxActive === "PLIN"? style.dinamicBoxes :style.dinamicBoxesInactive} >
                                    <p>
                                        Si cuentas con PLIN y su pedido tiene un valor inferior a S/500 esta es la opción más rápida de efectuar tu pago.
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