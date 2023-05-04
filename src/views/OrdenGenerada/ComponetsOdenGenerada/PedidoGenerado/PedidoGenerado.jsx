import style from "./PedidoGenerado.module.css"
import { Link } from "react-router-dom";
import texLogo from "../../../../assets/logos/logo_tex_modern.png"
import checkGreen from "../../../../assets/icons/check-green.svg"
import { useEffect, useState } from "react";
import CartOrden from "../CartOrden/CartOrden";
import xOver from "../../../../assets/icons/x_octagon_red.svg"



const twoHours = 7200000;
const thirtyMinutes = 30 * 60 * 1000;

const ahora = new Date().getTime();


const PedidoGenerado = ({pedido}) =>{



    const [timeLeft, setTimeLeft] = useState(ahora - pedido.date); 

    useEffect(() => {
        handleTimer();
      }, []);


      const handleTimer = () => {
        const timer = setInterval(() => {
          if (timeLeft < twoHours) {
            setTimeLeft((prevTime) => prevTime + 1000);
          } else {
            clearInterval(timer);
          }
        }, 1000);
        return () => clearInterval(timer);
      };

    
      const getFormattedTime = () => {
            const hours = Math.floor( (twoHours-timeLeft) / (1000 * 60 * 60)).toString()
            const minutes = Math.floor(( (twoHours-timeLeft) / (1000 * 60)) % 60).toString().padStart(2, "0");
            const seconds = Math.floor(( (twoHours-timeLeft) / 1000) % 60).toString().padStart(2, "0");
        
            return `${hours}:${minutes}:${seconds}`;
            
      };
    

      
    const over2hours = (ahora - pedido.date) > twoHours;
    const over30minuts = (ahora - pedido.date) > thirtyMinutes;


    let status = 1;


    if (over2hours && !pedido.status) {
        status = 0
   }else if (!over2hours && !pedido.status) {
        status = 1
   }else if(pedido.status && !pedido.delivered && !over30minuts){
        status = 2;
   }else if(pedido.status && !pedido.delivered && over30minuts){
        status = 3;
   }else if(pedido.status && pedido.delivered){
        status = 4;
   }

console.log(timeLeft);
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
            
                {!pedido.status?(<div id={style.top}>
                    <img src={timeLeft < twoHours?checkGreen:xOver} alt="" />
                    <div>
                        <label>
                            {timeLeft < twoHours?(<h2>¡Felicitaciones tu pedido ha sido generado!</h2>)
                            :(<h2>Se acabó el tiempo para validar tu compra</h2>)}
                            <p>Orden N° {pedido.nOrden}</p>
                        </label>
                    </div>
                </div>):
                    (<div id={style.top}>
                        <img src={checkGreen} alt="check Green" />
                        <div>
                            <label>
                                <h2>¡Felicitaciones tu pedido ha sido validado!</h2>
                                <p>Pedido N° {pedido.nOrden}</p>
                            </label>
                        </div>
                    </div>)
                }

                <div>
                    <div id={style.statusAndTime}>

                        <label id={style.status}>
                            {status ===0? (<label  style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/CANCELADO_pmqlme.png"} alt="" /><span style={{color:"#ff0000"}} >Anulado</span></label>)
                                : status === 1? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/PENDIENTE_ai7cl5.png"} alt="" /><span style={{color:"#FFFF00"}}>Pago pendiente</span></label>)
                                : status === 2? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/VALIDADO_svc1do.png"} alt="" /><span style={{color:"##0fa80f"}}>Pago validado</span></label>)
                                : status === 3? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/EN_CAMINO_eziw1f.png"} alt="" /><span style={{color:"#2c9dc9"}}>En proceso de entrega</span></label>)
                                : status === 4? (<label style={{justifyContent:"start"}} ><img src={"https://res.cloudinary.com/dmv0gnlcu/image/upload/v1681933425/Tex_logos/ENTREGADO_eapqos.png"} alt="" /><span style={{color:"#0fa80f"}}>Entregado</span></label>):
                                <label>Contace a soporta para consultar el estado de su orden</label>
                            } 
                             {!pedido.status?(<label id={style.cronometro} >{timeLeft < twoHours?(<p style={{color:timeLeft<1800000?"#ff4040":timeLeft>3600000 ?"#31d13b":"#FFFF00"}} >{getFormattedTime()}</p>)
                                             :(<span style={{color:"#ff4040"}}>00:00:00</span>)}
                                        </label>)
                                : undefined}
                        
                        </label>
                          
                        <div id={style.anuncio}>
                                    {
                                        status === 0 ?(
                                        <label style={{color:"#ff0000"}}  >
                                            <p>Tu orden ha sido cancelada</p>
                                        </label>
                                        )
                                        :status === 1 ?(
                                        <label style={{color:"#FFFF00"}}  >
                                            <p>Valida tu compra para proceder con tu pedido.</p>
                                        </label>
                                        )
                                        :status === 2 ?(
                                        <label style={{color:"#0fa80f"}} >
                                            <p>¡Tu pago se ha validado exitosamenete!, se está preparando ael envío.</p>
                                        </label>
                                        )
                                        :status === 3 ?(
                                        <label style={{color:"#2c9dc9"}} >
                                            <p>Tu pedido está en camino!</p>
                                        </label>
                                        )
                                        :status === 4 ?(
                                        <label style={{color:"#0fa80f"}} >
                                            <p>Tu pedido ha sido entregado.</p>
                                        </label>
                                        )
                                        :undefined
                                    }
                              </div>
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

                {!pedido.status?(<div id={style.dataClient}>

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
                </div>):undefined}

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
    
};

export default PedidoGenerado;