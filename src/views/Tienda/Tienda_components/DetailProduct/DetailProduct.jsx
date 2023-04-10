import style from "./DetailProduct.module.css";
import check from "../../../../assets/detalles_componente/green_check.svg";
import truck from "../../../../assets/detalles_componente/delivery_truck.svg";
import shield from "../../../../assets/detalles_componente/shield.svg";
import { useHistory } from "react-router-dom";
import TableInformation from "./Table_information/TableInformation";


const DetailProduct = ({product})=>{

 const history = useHistory()

console.log(product);

const {id,_id,__v,img,name,price,category,cod,...description} = product;

const descriptionArray = Object.entries(description);

    return(
        <div id={style.Detail}>
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
                    <span>  {'> '} {category?.replace(/^\w/, (letra) => letra.toUpperCase())}</span>

                    <div>
                        <div>
                            <p>PRECIO ESPECIAL</p>
                            <h2>${Math.floor(price)+0.99}</h2>
                        </div>
                        <div>
                            <p>PRECIO LISTA</p>
                            <h2 id={style.discountPrice}>${Math.ceil(price+50)}</h2>
                        </div>
                    </div>
                            <div>
                                <ul>
                                    <li><div><img src={shield} alt="Shield Protection" /></div> Garantía - 12 meses</li>
                                    <li><div><img src={check} alt="Green Check" id={style.check} /></div> Stock disponible</li>
                                    <li><div><img src={truck} alt="Delivery truck" id={style.truck} /></div> Envíos a todo el país</li>
                                </ul>
                            </div>
                            <button className={2 <= 0 ? style.noStock : undefined} onClick={2<= 0 ? undefined : () => {}}>SUMAR AL CARRITO</button>
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

