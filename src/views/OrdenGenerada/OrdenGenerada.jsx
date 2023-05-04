import style from "./OrdenGenerada.module.css";
import PedidoGenerado from "./ComponetsOdenGenerada/PedidoGenerado/PedidoGenerado";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import GeneralLoading from "../General_Loading/GeneralLoading";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const Checkout = ()=>{

    const history = useHistory()
    const { norden,id } = useParams();


    const [loading,setLoading] = useState(true)
    const [pedido, setPedido] = useState()


    useEffect(()=>{
        const getOrder = async()=>{
            try {
                const {data} = await axios.get(`/shopping/pedidos/${norden}/${id}`)
                if(data)setPedido(data)
                setLoading(false)
            } catch (error) {
              history.push("/tienda")
            }

        }
        getOrder()
    },[])



    if (loading && !pedido) {
        return(
            <GeneralLoading/>
        )
    }else{
        return(
        <div id={style.PedidoGenerado}>
            <PedidoGenerado pedido={pedido}/>
        </div>
        )
    }
};

export default Checkout;