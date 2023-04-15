import style from "./DetailsCardMisCompras.module.css"
import succes  from "../../assets_mis_compras/success-svgrepo-com.svg"
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import pending from "../../../../../../assets/icons/yellow_clock.png";
import { useHistory } from "react-router-dom";


const DetailsCardMisCompras = ({setOrderFocus,orderFocus})=>{
    const history = useHistory()


    const msPDay = 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    const date = format(new Date(orderFocus.date), "EEEE d 'de' MMMM 'de' y, HH:mm : ss", {locale: esLocale});
    
    
    return(
        <div id={style.DetallesContainer}>
            <div id={style.topDetallesContainer}>
                <div id={style.aNombreDeContainer}>
                    <label id={style.aNombreDe}>
                        <span style={{marginRight:"10px"}}>A nombre de:</span>
                        <span className={style.values}>{orderFocus.fullName}</span>
                    </label>
                </div>
                <label id={style.compraStatus}>
                        {(now-orderFocus.date)/msPDay>=1?(<label id={style.entregado} ><img src={succes} alt="succes" /><span>Entregado</span></label>):
                            (<label id={style.pendiente} ><img src={pending} alt="succes" /><span>Pendiente</span></label>)
                        }                                                
                    </label>
                <p onClick={()=>setOrderFocus({})} id={style.xToClose}>x</p>
            </div>
            <div id={style.mainDetallesCompras}>
                <div>
                <div id={style.mainTop}>
                <div>
                    <div id={style.fechaHoraContainer}>
                        <label>
                            <span className={style.atributtes}>Fecha de la compra:</span>
                            <span className={style.values}>{date}</span>
                        </label>
                    </div>
                </div>               
                <div>
                    <div id={style.montoTotal}>
                        <label>
                            <span className={style.atributtes}>Numero de Contacto:</span>
                            <span className={style.values}>+51&nbsp;{orderFocus.phone}</span>
                        </label>
                    </div>
                </div>  
                <div>
                    <div id={style.montoTotal}>
                        <label>
                            <span className={style.atributtes}>Email de contacto:</span>
                            <span className={style.values}>{orderFocus.email}</span>
                        </label>
                    </div>
                </div>
                <div id={style.directionPropiedadesContainer}>
                    <label className={style.directionPropiedades} style={{marginTop:"15px"}}><span>Departamento: </span><span className={style.values} >{orderFocus?.department}</span></label>
                    <label className={style.directionPropiedades}><span>Ciudad: </span><span className={style.values}>{orderFocus?.city}</span></label>
                    {orderFocus?.address?<label className={style.directionPropiedades}><span>Dirección: </span><span className={style.values}>{orderFocus?.address}</span></label>:undefined}
                </div>
                <div id={style.productosContainer}>
                    <div>
                        <label className={style.atributtes}>
                            <span>Productos: </span>
                        </label>
                        <label>
                            <span className={style.atributtes}>Montol total:</span>
                            <span className={style.values}>${orderFocus.totalPrice}</span>
                        </label>
                    </div>
                </div>
                    
                    </div>
                        <div id={style.cardsProductosOnDetailsContainer}>
                            {
                                orderFocus.products.map(e=>(<div key={e._id} id={style.cardsProductosOnDetails}>
                                                    <div>
                                                        <label id={style.CardContainer}>
                                                            <div id={style.firstDiv} className={style.contenedores}>
                                                                <div className={style.imgContainer}><img className={style.img} src={e.img} alt="" /></div>
                                                                <div className={style.titleContainer}><span id={style.titleCard}>{e.name}</span></div>
                                                            </div>
                                                            <div id={style.secondDiv} className={style.contenedores} style={{alignItems:"end"}}>
                                                                <div className={style.divTwo}>
                                                                    <label>
                                                                        <span>Cantidad: </span>
                                                                        <span>{e.quantity}</span>
                                                                    </label>
                                                                    <label>
                                                                        <span>Precio unitario:</span>
                                                                        <span>s/&nbsp;{e.price}</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div id={style.thirdDiv} className={style.contenedores} style={{alignItems:"end"}}>  
                                                                    <label>
                                                                        <span>Precio Total: </span>
                                                                        <span>&nbsp;s/&nbsp;{e.price*e.quantity}</span>
                                                                    </label>
                                                            </div>                
                                                        </label>
                                                    </div>
                                                      </div>))
                            }
                                    <div id={style.footer}>
                                        <label id={style.thanks}><span>Gracias por su compra.</span></label>
                                        <label><span id={style.buttonIr} onClick={()=> history.push(`/pedidos/${orderFocus.nOrden}/${orderFocus._id}`)}>Ir</span></label>
                                    </div>
                        </div>
                    </div>
            </div>
        </div>
    )
};
export default DetailsCardMisCompras;