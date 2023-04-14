import style from "./DetailProduct.module.css";
import check from "../../../../assets/detalles_componente/green_check.svg";
import truck from "../../../../assets/detalles_componente/delivery_truck.svg";
import shield from "../../../../assets/detalles_componente/shield.svg";
import { useHistory } from "react-router-dom";
import TableInformation from "./Table_information/TableInformation";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/actions/actions";
import axios from "axios";
import { capitalize } from "../../../../utils";
import { useEffect, useState } from "react";


const DetailProduct = ({product})=>{
    const [precioFormatedo, setPrecioFormateado] = useState('');
    const [ofertaFormated, setOfertaFormated] = useState('');


    const dispatch = useDispatch()
 const history = useHistory()

 const addToCartHandler = ()=>{
    const getProductById = async() =>{
        const {data}= await axios.get(`/id/${product._id}`);
        dispatch(addToCart(data))
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

    //const decimalPart = parts.find(part => part.type === 'decimal').value;
    const fractionPart = parts.find(part => part.type === 'fraction').value;

    setPrecioFormateado(
        <span>
        <span>{integerParts}.</span>
        <span id={style.small_decimals}>{fractionPart}</span>
        </span>
    );

/////////////////////////Oferta

    const partsOffer = formatter.formatToParts((Math.ceil(product.price+375)));
    const integerPartsOffer = partsOffer.slice(0, parts.findIndex(part => part.type === 'decimal'))
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


    const {id,_id,__v,img,name,price,category,warranty,...description} = product;
    const descriptionArray = Object.entries(description);


    const functionToClose = (e)=>{
        if (e.target === e.currentTarget) {
            history.push("/tienda")
          }
    }

    return(
        <div id={style.Detail} className="cover" onClick={(e)=>functionToClose(e)}>
            <div id={style.pupoutDetail}>
                <div id={style.titleProduct}><h1>{product.name}</h1></div>
                <main id={style.ContainerDetailsProduct}>
                     <div id={style.top}>
                        <div id={style.imageContainer}>
                            <img src={product.img} alt="" />
                        </div>
                     <div id={style.mainInfo}>
                     <div>
                        
                    </div>
                    <span id={style.category}>  {'> '} {category?.replace(/^\w/, (letra) => letra.toUpperCase())}</span>

                    <div id={style.pricesZone}>
                        <div>
                            <p>PRECIO OFERTA</p>
                            {/* <h2>{(Math.floor(price)+0.99).toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</h2> */}
                            <h2>{precioFormatedo}</h2>
                        </div>
                        <div>
                            <p style={{color:"#a74c9a"}}>PRECIO NORMAL</p>
                            <h2 id={style.discountPrice}> {ofertaFormated}</h2>
                        </div>
                    </div>
                            <div>
                                <ul>
                                    <li><div><img src={shield} alt="Shield Protection" /></div> Garantía - {capitalize(product.warranty)}</li>
                                    <li><div><img src={check} alt="Green Check" id={style.check} /></div> Stock disponible</li>
                                    <li><div><img src={truck} alt="Delivery truck" id={style.truck} /></div> Envíos a todo el Perú</li>
                                </ul>
                            </div>
                            <button className={2 <= 0 ? style.noStock : undefined} onClick={()=>addToCartHandler()}>SUMAR AL CARRITO</button>
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

