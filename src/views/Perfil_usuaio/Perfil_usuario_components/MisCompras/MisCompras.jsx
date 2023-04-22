import { useEffect, useState } from "react";
import style from "./MisCompras.module.css"
import CardMisCompras from "./Componentes_mis_compras/Card_misCompras/CardMisCompras"
import DetailsCardMisCompras from "./Componentes_mis_compras/DetailsCardMisCompras/DetailsCardMisCompras";
import { useRef } from "react";




const MisCompras = ({ordenes}) =>{
    const [orderFocus, setOrderFocus] = useState({visible:false})

    const popoutRef = useRef(null)

    const functionToClose = (e)=>{
        if (e.target === e.currentTarget) {
          const currentTarget = e.currentTarget
          if (!currentTarget) return;
          currentTarget.classList.add(style.fueraPopout);
          currentTarget.style.transition = 'opacity 0.4s'; 
          currentTarget.style.opacity = '0.1'; 
          setTimeout(() => {
            setOrderFocus({visible:false});
          }, 500); 
        }
      }

      useEffect(()=>{
        if(orderFocus.visible){
            popoutRef.current?.classList.add(style.dentroPopout)
        }
      },[orderFocus])

    return(
        <div id={style.MisComprasContaier}>
            <div>
                <div id={style.titleMisCompras}>
                    <h1>Mis compras:</h1>
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
            {orderFocus.visible?(<div id={style.compraDetallesContainerRelative} onClick={(e)=>functionToClose(e)}>
                    <div id={style.comprasContainerAbsolute} ref={popoutRef}>
                            <DetailsCardMisCompras setOrderFocus={(value)=>setOrderFocus(value)} orderFocus={orderFocus}/>
                    </div>
            </div>):undefined}
        </div>
    )
};

export default MisCompras;