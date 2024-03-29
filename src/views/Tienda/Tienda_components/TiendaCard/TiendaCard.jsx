import style from "./TiendaCard.module.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import img_not_available from '../../../../assets/icons/img_not_available.png';


const TiendaCard = ({id, name, price, img, stock})=>{
    const distpatch = useDispatch()
    const history = useHistory()

    const [priceFormated, setPriceFormated] = useState('')

    const [overStock, setOverStock]=useState(false)
    const [cuurrentStatusProduct, setCurrentStatusProduct] =useState({})


    const carrito = useSelector(e=>e.shoppingCart)



    const seeDetails=(id)=>{
        history.push(`/tienda/${id}`)
    }

  
    const handleLanzar = (event) => {
        const button = event.target;
        const card = button.closest(`#${style.Card}`);
        const imagen = card.querySelector(`#${style.imgToThrow}`);
        const imgContainer = card.querySelector(`#${style.relativeCotainer}`);
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
        imgContainer.appendChild(imgClone);
        imgClone.style.setProperty('--destino-x', styles.destinoX['--destino-x']);
        imgClone.style.setProperty('--destino-y', styles.destinoY['--destino-y']);
        setTimeout(() => {
          imgClone.remove();
        }, 750);
      };


    useEffect(()=>{
    const updateStock = async()=>{
        const itemInCart = carrito.find(producto => producto._id === id);
        if(itemInCart?.quantity>=cuurrentStatusProduct.stock)setOverStock(true)
        else setOverStock(false)
    }
    updateStock()
    
    },[carrito])


    
useEffect(() => {
    const formatter = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2
    });

    const parts = formatter.formatToParts(price);
    const integerParts = parts.slice(0, parts.findIndex(part => part.type === 'decimal'))
    .map(part => part.value)
    .join('');  

    //const decimalPart = parts.find(part => part.type === 'decimal').value;
    const fractionPart = parts.find(part => part.type === 'fraction').value;

    setPriceFormated(
        <span>
        <span>{integerParts}.</span>
        <span style={{fontSize:"12px", marginLeft:"2px"}}>{fractionPart}</span>
        </span>
    );
    },[])


    const addToCartHandler = (e)=>{
        const getProductById = async(e) =>{
            handleLanzar(e)
            const {data}= await axios.get(`/id/${id}`);
            setCurrentStatusProduct(data)
            distpatch(addToCart(data))            
        };
        getProductById(e)
    };

    return(
        <div id={style.Card} style={stock<=0?{opacity:0.5}:undefined}>
            <div>
                <div id={style.imageContainer} onClick={()=>seeDetails(id)}>
                    <div id={style.relativeCotainer}>
                        <img src={img} alt={name} id={style.imgToThrow} onError={(event) =>(event.target.src = img_not_available)} />   
                    </div>
                </div>
                <div id={style.title}>
                    <label>
                        <h1 style={{cursor:"pointer"}} onClick={()=>seeDetails(id)}>
                            {name}
                        </h1>
                    </label>
                </div>            
                <div id={style.price}>
                    <label id={style.discount}>
                        {priceFormated}
                    </label>
                </div>
                {/* <div id={style.seeDetails}>
                    <button onClick={()=>seeDetails(id)}>Ver detalles</button> 
                </div>    */}
                <div id={style.buy}>
                    <button  onClick={stock<=0?undefined:overStock?()=>alert("limite de stock"):(e)=>{addToCartHandler(e)}} className="buttonSumarCart" style={{cursor:stock<=0?"not-allowed":undefined}} >Comprar</button>  {/*este es el botón que se clickea */}
                </div>
            </div>          
        </div>
    )
};

export default TiendaCard;