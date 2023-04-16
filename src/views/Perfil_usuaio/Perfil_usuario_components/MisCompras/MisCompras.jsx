import { useEffect, useState } from "react";
import style from "./MisCompras.module.css"
import CardMisCompras from "./Componentes_mis_compras/Card_misCompras/CardMisCompras"
import DetailsCardMisCompras from "./Componentes_mis_compras/DetailsCardMisCompras/DetailsCardMisCompras";




const MisCompras = ({ordenes}) =>{
    const [orderFocus, setOrderFocus] = useState({visible:false})


    return(
        <div id={style.MisComprasContaier}>
            <div>
                <div id={style.titleMisCompras}>
                    <h1>Mis compras</h1>
                </div>
            <div id={style.comprasCardContainer}>
                {
                   ordenes?.length? ordenes.map(e=> <CardMisCompras key={e._id} onClickk={setOrderFocus} orden={e}/>)
                   :<p id={style.sinCompras}>Aún no tienes compras realizadas.</p>
                }
            </div>
            {/* <div id={style.verMasButton}>
                <label>
                    <span >
                        Ver más
                    </span>
                </label>
            </div> */}
            </div>
            {orderFocus.visible?(<div id={style.compraDetallesContainerRelative}>
                    <div id={style.comprasContainerAbsolute}>
                            <DetailsCardMisCompras setOrderFocus={(value)=>setOrderFocus(value)} orderFocus={orderFocus}/>
                    </div>
            </div>):undefined}
        </div>
    )
};

export default MisCompras;