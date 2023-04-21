import style from "./PedidoGenerado.module.css"
import { Link } from "react-router-dom";
import texLogo from "../../../../assets/logos/logo_tex_modern.png"
import checkGreen from "../../../../assets/icons/check-green.svg"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartOrden from "../CartOrden/CartOrden";
import { useHistory } from "react-router-dom";
import xOver from "../../../../assets/icons/x_octagon_red.svg"
import GeneralLoading from "../../../General_Loading/GeneralLoading";



const PedidoGenerado = () =>{

    const history = useHistory()

    const { norden,id } = useParams();

    const [pedido, setPedido] = useState({})
    const [timeLeft, setTimeLeft] = useState(); 
    const [loading,setLoading] = useState(true)




    useEffect(()=>{
        const getOrder = async()=>{
            try {
                const {data} = await axios.get(`/shopping/pedidos/${norden}/${id}`)
                const dosHorasEnMilisegundos = 7200000;
                const ahora = new Date();
                if(data)setPedido(data)
                console.log(data);
                const tiempoRestanteEnMilisegundos = dosHorasEnMilisegundos - (ahora - new Date(data.date));
                if(tiempoRestanteEnMilisegundos)setTimeLeft(tiempoRestanteEnMilisegundos)
                setLoading(false)
            } catch (error) {
              history.push("/tienda")
            }

        }
        getOrder()

    },[])

    useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1000);
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
      const getFormattedTime = () => {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60)).toString()
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60).toString().padStart(2, "0");
        const seconds = Math.floor((timeLeft / 1000) % 60).toString().padStart(2, "0");
    
        return `${hours}:${minutes}:${seconds}`;
      };
    
      
if (loading) {
    return(
        <GeneralLoading/>
    )
}else{
    return(
        <div id={style.PedidoGenerado}>
            <div id={style.main}>
                <header id={style.header}>
                    <div>
                        <label>
                            <Link to={"/tienda"}>
                                <img src={texLogo} alt="" />
                            </Link>
                        </label>
                    </div>
                </header>
            <div id={style.containerBox}> 
                <div id={style.top}>
                    <img src={timeLeft>0?checkGreen:xOver} alt="" />
                    <div>
                        <label>
                            {timeLeft>0?(<h2>¡Felicitaciones tu orden ha sido generada!</h2>)
                            :(<h2>Se acabó el tiempo para validar tu compra</h2>)}
                            <p>Orden N° {pedido.nOrden}</p>
                        </label>
                    </div>
                </div>
                <div>
                    <div id={style.statusAndTime}>
                        <label id={style.status}>Estado: {timeLeft>0?(<span>{pedido.status?"Pagado":"Sin pagar"}</span>):(<span style={{color:"red"}}>Cancelada</span>)}</label>
                        <label>{timeLeft>0?(<p style={{color:timeLeft<1800000?"#ff4040":timeLeft>3600000 ?"#31d13b":"yellow"}}>{getFormattedTime()}</p>)
                            :(<p style={{color:"red"}}>00:00:00</p>)}
                        </label>
                    </div>
                </div>
                <div id={style.dataClient} style={{marginTop:"15px"}}>
                    <div className={style.titileBox}>
                        <h2>
                            Información del destinatario:
                        </h2>
                    </div>
                    <div>
                        <div className={style.rowBox}>
                            <span className={style.property}>
                                Nombre:
                            </span>
                            <span className={style.value}>
                                {pedido.fullName}
                            </span>
                        </div>
                        <div className={style.rowBox}>
                            <span className={style.property}>
                                DNI:
                            </span>
                            <span className={style.value}>{pedido.DNI}</span>
                            
                        </div>                        
                        <div className={style.rowBox}>
                            <span className={style.property}>
                                Telefono:
                            </span>
                            <span className={style.value}>{pedido.phone}</span>
                            
                        </div>
                        <div className={style.rowBox}>
                            <span className={style.property}>Email:</span>
                            <span className={style.value}>{pedido.email}</span>
                        </div>
                        <div className={style.rowBox}>
                            <span className={style.property}>Instrucciones especiales:</span>
                            <span className={style.value}>{pedido.instructions}</span>
                        </div>
                    </div>
                </div>

                <div id={style.dataOrder}>
                    <div className={style.titileBox}>
                        <h2>
                            Información del pedido:
                        </h2>
                    </div>
                    <div>
                        <div className={style.rowBox}>
                            <span className={style.property}>Lugar de Entrega:</span>
                            <span className={style.value}>{pedido.department} - {pedido.city}</span>
                        </div>
                        <div className={style.rowBox}>
                            <span className={style.property}>Metodo de pago:</span>
                            <span className={style.value}>{pedido.paymentMethod}</span>
                        </div>
                        <div className={style.rowBox}>
                            <span className={style.property}>Monto total:</span>
                            <span className={style.value}>S/ {pedido.totalPrice}</span>
                        </div>    
                        <div className={style.rowBox}>
                            <span className={style.property}>Total de productos:</span>
                            <span className={style.value}>{pedido.products?.length}</span>
                        </div>
                        <div>
                            <div id={style.listProducts}>
                                {pedido.products?.map(e=>(
                                    <label key={e.name}>{e.name}</label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div id={style.dataClient}>

                    <div className={style.titileBox}>
                        <h2>
                            Valida tu orden en 2 pasos:
                        </h2>
                    </div>
                    <div>
                        <div id={style.metodoPago}>
                            <div>
                                <label>
                                    <span className={style.validationStatements}>
                                        -Metodo de pago:
                                    </span>
                                </label>
                            </div>
                            <div>
                                <div >
                                    {pedido.paymentMethod==="YAPE"||pedido.paymentMethod==="PLIN"?(
                                    <span>
                                        {pedido.paymentMethod}: 902038984
                                    </span>)
                                    :pedido.paymentMethod==="Interbank"?(
                                    <span id={style.accounts}>
                                        <span >{pedido.paymentMethod}:</span>
                                            <p>Simple soles: 8983231287495</p> 
                                            <p style={{paddingBottom:"3px"}} > CCI: 00389801323128749542</p> 
                                    </span>
                                    )
                                    :pedido.paymentMethod==="BCP"?(
                                    <span id={style.accounts}>
                                        <span>{pedido.paymentMethod}:</span>
                                            <p> Simple soles:  8983231287495</p> 
                                            <p style={{paddingBottom:"3px"}} > CCI: 00389801323128749542</p> 
                                    </span>
                                    ):undefined}
                                </div>
                                <div>
                            
                                    <span>Titular: César Alfredo LLajaruna González</span>
                                </div>
                            </div>
                        </div>
                        <div id={style.stepsValidation}>
                            <ol>
                                <li className={style.validationStatements}>
                                Realizar la transacción por el medio de pago seleccionado.
                                </li>
                                <li className={style.validationStatements}>
                                Enviár foto o captura del comprobante de pago junto con su N° de orden a nuestro Whatsapp 944 949 084.
                                </li>
                            </ol>
                    
                        </div>
                    </div>
                </div>

                 </div>
            </div>
            <div id={style.shoppingCart}>
                {
                    pedido.products?.map(e=>(
                            <CartOrden key={e.name} name={e.name} price={e.price} img={e.img} quantity={e.quantity} />
                            )
                        )
                }
                <div id={style.totolPrice}>
                    <label>
                        <span>Total:  &nbsp;&nbsp;s/. </span>
                        <span>{pedido.totalPrice}</span>
                    </label>
                </div>
            </div>
        </div>
      )
    }
};

export default PedidoGenerado;