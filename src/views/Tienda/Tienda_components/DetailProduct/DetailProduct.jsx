import style from "./DetailProduct.module.css";
import check from "../../../../assets/detalles_componente/green_check.svg";
import truck from "../../../../assets/detalles_componente/delivery_truck.svg";
import shield from "../../../../assets/detalles_componente/shield.svg";
import { useHistory } from "react-router-dom";
import TableInformation from "./Table_information/TableInformation";
import { useDispatch, useSelector } from "react-redux";
import { addCountCartCustom, addToCart } from "../../../../redux/actions/actions";
import axios from "axios";
import { capitalize } from "../../../../utils";
import { useEffect, useRef, useState } from "react";
import redX from "../../../../assets/icons/red-x.svg"



const DetailProduct = ({product})=>{

    const [precioFormatedo, setPrecioFormateado] = useState('');
    const [ofertaFormated, setOfertaFormated] = useState('');
    const [count, setCount] = useState(0);
    const [inputStatus, setInputStatus] = useState(1);
    const [overStock, setOverStock]=useState(false)


    const spanCountRef = useRef(null)

    const carrito = useSelector(e=>e.shoppingCart)



    const dispatch = useDispatch()
    const history = useHistory()


    
    const animationAdd = ()=> {
        const spanElement = document.createElement('span');
        spanElement.setAttribute('id', style.addingProduct);
        spanElement.innerText=`+${inputStatus}`
        spanCountRef.current?.appendChild(spanElement);
        setTimeout(() => {
            spanElement.remove();
        }, 1000);
      }


    const addToCartHandler = ()=>{
        animationAdd()
        const getProductById = async() =>{
            if(!isNaN(inputStatus.toString().replace(/[^0-9]/g, ''))){
                const {data}= await axios.get(`/id/${product._id}`);
                dispatch(addCountCartCustom({product:data,cantidad:Number(inputStatus)}))
                setInputStatus(1)
            }
        };
        getProductById()
    };


    useEffect(() => {
        const formatter = new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2
        });
        const parts = formatter.formatToParts(product.price);
        const integerParts = parts.slice(0, parts.findIndex(part => part.type === 'decimal'))
        .map(part => part.value)
        .join('');  
        const fractionPart = parts.find(part => part.type === 'fraction').value;
        setPrecioFormateado(
            <span>
            <span>{integerParts}.</span>
            <span id={style.small_decimals}>{fractionPart}</span>
            </span>
        );
        /////////////////////////Oferta
        const partsOffer = formatter.formatToParts((Math.ceil(product.price+375)));
        const integerPartsOffer = partsOffer.slice(0, partsOffer.findIndex(part => part.type === 'decimal'))
        .map(part => part.value)
        .join('');  
        const fractionPartOffert = partsOffer.find(part => part.type === 'fraction').value;
        setOfertaFormated(
            <span>
            <span>{integerPartsOffer}.</span>
            <span style={{fontSize:"11px"}}>{fractionPartOffert}</span>
            </span>
        );
    }, [product]);



    useEffect(()=>{
        const updateStock = async()=>{
            const itemInCart = carrito.find(producto => producto._id === id);
            if(itemInCart?.quantity)setCount(itemInCart?.quantity);
            if(itemInCart?.quantity>=product.stock){
                setOverStock(true)
            }
            else setOverStock(false)
        }
        updateStock()
        
        },[carrito])


    const {id,_id,__v,img,name,price,category,warranty,stock,audifonosType,...description} = product;
    const descriptionArray = Object.entries(description);


 
    const handlerChange =(e)=>{
        const value = e.target.value.replace(/[^0-9]/g, ''); 
        if (value === "0"  || value ==="-"  || value ==="e" || value > product.stock-count || (isNaN(value) && value !== "")) {
           return
        }
        setInputStatus(value)
    }

    const addInputValue = ()=>{
        if (inputStatus < product.stock-count) {
            setInputStatus(Number(inputStatus) + 1)
        }
    }

    const restInputValue = ()=>{
        if (inputStatus > 1) {
            setInputStatus(Number(inputStatus) - 1)
        }
    }

    

    return(
        <div id={style.Detail} className="cover">
            <div id={style.pupoutDetail} >
                <div id={style.titleProduct}><h1>{product.name}</h1></div>
                <main id={style.ContainerDetailsProduct}>
                     <div id={style.top}>
                        <div id={style.imageContainer} ref={spanCountRef} >
                            <img src={product.img} alt={product.name} />
                        </div>
                     <div id={style.mainInfo}>
                     <div>
                        
                    </div>
                    <span id={style.category} style={{
                            color: '#fefefeac',
                            }}> 
                        <span
                            style={{
                            display: 'inline-block',
                            width: '7.5px',
                            height: '7.5px',
                            borderRadius: '50%',
                            backgroundColor: '#fefefe8d',
                            textAlign: 'center',
                            lineHeight: '20px',
                            }}
                        >
                        </span>{' '} 
                        {category?.replace(/^\w/, (letra) => letra.toUpperCase())}</span>

                    <div id={style.pricesZone}>
                        <div>
                            <p id={style.priceLabel}>PRECIO</p>
                            <h2>{precioFormatedo}</h2>
                        </div>
                        {/* <div>
                            <p id={style.discountPrice}>PRECIO NORMAL</p>
                            <h2 id={style.discountPrice}> {ofertaFormated}</h2>
                        </div> */}
                    </div>
                            <div>
                                <ul>
                                    <li><div><img src={shield} alt="Shield Protection" /></div> Garantía - {capitalize(product.warranty)}</li>
                                    <li><div><img src={truck} alt="Delivery truck" id={style.truck} /></div> Envíos a todo el Perú</li>
                                    {product.stock?<li><div><img src={check} alt="Green Check" id={style.check} /></div>Stock disponible - {product.stock} unidades</li>
                                    :<li style={{color:"#e51818"}}><div><img src={redX} alt="X error" id={style.check} /></div>Sin stock</li>}
                                </ul>
                            </div>
                            <div id={style.addersZone}>
                                <div id={style.adderInput}>
                                    <span onClick={()=>restInputValue()} >-</span>
                                    <input value={inputStatus} type="text" onChange={(e)=>handlerChange(e)} min={1}  max={product.stock}/>
                                    <span onClick={()=>addInputValue()} >+</span>
                                </div>
                                <button className={product.stock <= 0 ? style.noStock : undefined} onClick={product.stock<=0?undefined:overStock?()=>alert("limite de stock"):()=>addToCartHandler()}>SUMAR AL CARRITO</button>
                            </div>
                        </div>
                        <div id={style.xIcon} onClick={()=>history.push("/tienda")}>X</div>
                     </div>
                </main>
                <div id={style.tableContainer}>
                    <TableInformation description={descriptionArray}/>
                </div>
            </div>
        </div>
    )
};

export default DetailProduct;

