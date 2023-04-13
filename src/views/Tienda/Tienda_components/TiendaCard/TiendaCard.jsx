import style from "./TiendaCard.module.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/actions/actions";
import { useState } from "react";



const TiendaCard = ({id, name, price, img, stock, seeDetails})=>{

    const [overStock, setOverStock]=useState(false)
    const carrito = useSelector(e=>e.shoppingCart)


  
    const handleLanzar = (event) => {
        const button = event.target;
        const card = button.closest(`#${style.Card}`);
        const imagen = card.querySelector(`#${style.imgToThrow}`);
        const imgClone = imagen.cloneNode(true);
        const rect = card.getBoundingClientRect();
        const distanciaX = window.innerWidth - rect.right;
        const distanciaY = rect.top + window.scrollY;
        const styles = {
        destinoX: {
            '--destino-x': `${distanciaX}px`,
        },
        destinoY: {
            '--destino-y': `${-(distanciaY+150)}px`,
        },
        };
        imgClone.classList.add(style.lanzar);
        card.children[0].appendChild(imgClone);
        imgClone.style.setProperty('--destino-x', styles.destinoX['--destino-x']);
        imgClone.style.setProperty('--destino-y', styles.destinoY['--destino-y']);


        setTimeout(() => {
          imgClone.remove();
        }, 750);
      };


    const distpatch = useDispatch()


    const addToCartHandler = (e)=>{
        const getProductById = async(e) =>{
            handleLanzar(e)
            const {data}= await axios.get(`/id/${id}`);
            const itemInCart = carrito.find(producto => producto._id === data._id);
            if (itemInCart) {
                if(itemInCart.quantity<data.stock){
                    distpatch(addToCart(data))
                }else setOverStock(true)
            }else{
                distpatch(addToCart(data))
            }
        };
        getProductById(e)
    };

    return(
        <div id={style.Card} style={stock<=0?{opacity:0.5}:undefined}>
            <div id={style.imageContainer}>
                 <img src={img} alt={name} id={style.imgToThrow} />  {/*esta es la imagén que se lanza cuando el botón se clickea */}
            </div>
            <div id={style.title}>
                <label>
                    <h1>
                        {name}
                    </h1>
                </label>
            </div>            
            <div id={style.price}>
                {/* <label id={style.original}>
                    <span>s/ </span>
                    <span> {Math.ceil(price+50)}</span>
                </label>  */}
                <label id={style.discount}>
                    <span>s/. &nbsp;</span>
                    <span> {Math.floor(price)}</span> <span style={{fontSize:"11px", marginLeft:"2px"}}>.99</span>
                </label>
            </div>
            <div id={style.seeDetails}>
                <button onClick={()=>seeDetails(id)}>Ver detalles</button>
            </div>   
            <div id={style.buy}>
                <button onClick={stock>0?overStock?()=>alert("limite de stock"):(e)=>{addToCartHandler(e)}:undefined} className="buttonSumarCart" >Comprar</button>  {/*este es el botón que se clickea */}
            </div>
        </div>
    )
};

export default TiendaCard;