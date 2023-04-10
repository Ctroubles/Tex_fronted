import style from "./TiendaCard.module.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/actions/actions";

const TiendaCard = ({id, name, price, img, stock, seeDetails})=>{

    const distpatch = useDispatch()


    const addToCartHandler = ()=>{
        const getProductById = async() =>{
            const {data}= await axios.get(`http://localhost:3001/id/${id}`);

            distpatch(addToCart(data))
        };
        getProductById()

    };

    return(
        <div id={style.Card} style={stock<=0?{opacity:0.5}:undefined}>
            <div id={style.imageContainer}>
                <img src={img} alt={name} />
            </div>
            <div id={style.title}>
                <label>
                    <h1>
                        {name}
                    </h1>
                </label>
            </div>            
            <div id={style.price}>
                <label id={style.original}>
                    <span>s/</span>
                    <span> {Math.ceil(price+50)}</span>
                </label> 
                <label id={style.discount}>
                    <span>s/</span>
                    <span>{Math.floor(price)+0.99}</span>
                </label>
            </div>
            <div id={style.seeDetails}>
                <button onClick={()=>seeDetails(id)}>Ver detalles</button>
            </div>   
            <div id={style.buy}>
                <button onClick={()=>addToCartHandler()} className="buttonSumarCart" >Comprar</button>
            </div>
        </div>
    )
};

export default TiendaCard;