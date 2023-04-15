import style from "./Tienda.module.css"
import axios from "axios";
import { useEffect } from "react";
import Header from "./Tienda_components/Header_tienda/Header_tienda"
import SearchBar from "./Tienda_components/SearchBar/SearchBar";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { cleanPathname } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilterCategory, filterByName, orderByPrice } from "../../redux/actions/actions";
import SideBar from "../../components/SideBar/SideBar.jsx";
import Card from "./Tienda_components/TiendaCard/TiendaCard"
import DetailProduct from "./Tienda_components/DetailProduct/DetailProduct";
import LoadingCardContainer from "./Tienda_components/LoadingCardContainer/LoadingCardContainer";
import PopoutFinalizar from "./Tienda_components/Popout_finalizar/Popout_finalizar";



function compararProductos(a, b) {
    if (a.stock === 0 && b.stock > 0) {
    return 1; // Mueve "a" al final
    } else if (a.stock > 0 && b.stock === 0) {
    return -1; // Mueve "b" al final
    } else {
    return 0; // No hay cambios en el orden
    }
}


const Tienda = ({picture}) =>{

    const {pathname} =useLocation()
    const history = useHistory()

    const categoryFilter = useSelector(e=>e.categoryFilter)
    const searchBarStatus = useSelector(e=>e.searchBarStatus)
    const orderPrice = useSelector(e=>e.orderPrice)


    const [products, setProducts] = useState([])
    const [productsFilteredBySearchBar, setProductsFilteredBySearchBar] = useState([])
    const [loadingStatus,setLoadingStatus]=useState(true)
    const [showLoading,setShowLoading]=useState(true)
    const [productOnfocus, setProductOnFocus]=useState()
    const [popoutFinalizar, setPopoutFinalizar] = useState()

    

    const dispatch = useDispatch()

    useEffect(()=>{
        setLoadingStatus(true)
        setProducts([])
        dispatch(filterByName(""))
        if(!categoryFilter.label){
            const getData =async()=>{
                const {data} =await axios.get(`/`)
                let arrayUnido = [];
                for (let atributo in data) {
                arrayUnido = arrayUnido.concat(data[atributo]);
                }

                if(orderPrice==="3")arrayUnido.sort((a, b) => a.price - b.price);
                if(orderPrice==="1")arrayUnido.sort((a, b) => b.price - a.price);
                arrayUnido.sort(compararProductos);
                setProducts(arrayUnido)
                setLoadingStatus(false)
            }
            
            getData()
        }else{
            const getData =async()=>{
                const {data} =await axios.get(`/category/${categoryFilter.categoryPick}`)
                if(!categoryFilter.specificity){
                    if(orderPrice==="3")data.sort((a, b) => a.price - b.price);
                    if(orderPrice==="1")data.sort((a, b) => b.price - a.price);
                    data.sort(compararProductos);
                    setProducts(data)
                    setLoadingStatus(false)
                }else{
                    if (categoryFilter.categoryPick === "Motherboards") {
                        const filtrado = data.reduce((acumulador, product) => {
                            if (product.chipset.toLowerCase().includes(categoryFilter.specificity.toLowerCase())) {
                            acumulador.push(product);
                            }
                            return acumulador;
                        }, []);                        
                        if(orderPrice==="3")filtrado.sort((a, b) => a.price - b.price);
                        if(orderPrice==="1")filtrado.sort((a, b) => b.price - a.price);
                        filtrado.sort(compararProductos);
                        setProducts(filtrado)
                        setLoadingStatus(false)
                    }
                    else if(typeof categoryFilter.specificity === "string"){
                        const filtrado = data.reduce((acumulador, product) => {
                            if (product.name.toLowerCase().includes(categoryFilter.specificity.toLowerCase())) {
                            acumulador.push(product);
                            }
                            return acumulador;
                        }, []);
                        
                        if(orderPrice==="3")filtrado.sort((a, b) => a.price - b.price);
                        if(orderPrice==="1")filtrado.sort((a, b) => b.price - a.price);
                        filtrado.sort(compararProductos);
                        setProducts(filtrado)
                        setLoadingStatus(false)

                    }else if(Array.isArray(categoryFilter.specificity)){
                        const filtrado = data.filter(product =>
                            categoryFilter.specificity.some(word =>
                              product.name.toLowerCase().includes(word.toLowerCase())
                            )
                          );   
                        if(orderPrice==="3")filtrado.sort((a, b) => a.price - b.price);
                        if(orderPrice==="1")filtrado.sort((a, b) => b.price - a.price);
                        filtrado.sort(compararProductos);
                        setProducts(filtrado)
                        setLoadingStatus(false)
                    }
                }
            }

            getData()
        }

    },[categoryFilter,orderPrice])


    useEffect(()=>{
      if(searchBarStatus) { 
        const filtrado = products.reduce((acumulador, product) => {
            if (product.name.toLowerCase().trim().includes(searchBarStatus.toLowerCase().trim())) {
              acumulador.push(product);
            }
            return acumulador;
          }, []);
          if(orderPrice==="3")filtrado.sort((a, b) => a.price - b.price);
          if(orderPrice==="1")filtrado.sort((a, b) => b.price - a.price);
          filtrado.sort(compararProductos)
          setProductsFilteredBySearchBar(filtrado)
        }
    },[searchBarStatus])

    useEffect(()=>{
        const getProductById =async()=>{

            const cleanPathName = cleanPathname(pathname)
            const urlArr = cleanPathName.split("/")
            const idProduct = urlArr[urlArr.length-1];
            const {data}= await axios.get(`/id/${idProduct}`)
            .catch(e=>history.push(`/tienda`));
            if(data)setProductOnFocus(data)
            else history.push(`/tienda`)
            console.log(data);
        }

        if (cleanPathname(pathname)!=="/tienda")getProductById()
        else setProductOnFocus(null)

    },[pathname])



    const seeDetails=(id)=>{
        history.push(`/tienda/${id}`)
    }


    useEffect(() => {
        if (loadingStatus) {
          setShowLoading(true);
        } else {
          setShowLoading(false);
        }
      }, [loadingStatus]);

    return(
        <div id={style.Tienda}>
                <Header setPopoutFinalizar={setPopoutFinalizar} picture={picture} />
            <div id={style.body}>
                <div id={style.sideBar}>
                <SideBar/>
                {/* <Filtros/> */}
                </div>
                <div id={style.mainContent}>
                        <div id={style.searchBarContainer}>
                            <label style={{display:categoryFilter.label?"block":"none"}} id={style.categoryPick}>
                                <span>{categoryFilter.label}</span>
                                <span onClick={()=>dispatch(deleteFilterCategory())} id={style.xIcon}>X</span>
                            </label>
                            <SearchBar/>
                            <label id={style.switchContainer}>
                               <div id={style.priceFilter}>
                                    <label></label>
                                    <div> 
                                        <span id={style.priceLess} style={orderPrice==="1"?{color:"#ffbf00",transform:"scale(1.1)"}:undefined} onClick={()=>dispatch(orderByPrice("1"))} >&#9650;</span>  
                                        <input id={style.switchInput} type="range"  onChange={(e)=>dispatch(orderByPrice(e.target.value))} min='1' max='3' value={orderPrice} style={orderPrice!=="2"?{backgroundColor:"rgba(209, 30, 209, 0.655)"}:undefined}/> 
                                        <span id={style.priceMore} style={orderPrice==="3"?{color:"#ffbf00",transform:"scale(1.15)"}:undefined} onClick={()=>dispatch(orderByPrice("3"))}  >&#9660;</span>  
                                    </div>
                                </div>
                            </label>
                        </div>
                        {showLoading && <LoadingCardContainer />}
                                        
                        {!loadingStatus && ( <div id={style.cardContainer}>
                                               {!searchBarStatus?.length?   
                                                    products.length?  products.map(e=>(
                                                            <Card  id={e._id} key={e._id} name={e.name} img={e.img} price={e.price} stock={e.stock} seeDetails={seeDetails}/>
                                                        ))
                                                        :(<p id={style.noHayProductos}>No hay Productos en esa categoría :c</p>)

                                                    : productsFilteredBySearchBar.length?productsFilteredBySearchBar.map(e=>(
                                                            <Card  id={e._id} key={e._id} name={e.name} img={e.img} price={e.price} stock={e.stock} seeDetails={seeDetails}/> 
                                                        ))
                                                        :(<p id={style.noHayProductos}>No hay Productos con ese nombre :c</p>)
                                                }
                                        </div>)
                        }
                </div>
            </div>
            {productOnfocus? <DetailProduct product={productOnfocus}/>:undefined}
            <div style={{display:popoutFinalizar?"block":"none"}}>
                 <PopoutFinalizar setPopoutFinalizar={setPopoutFinalizar}/>
            </div>
        </div>
    )
};

export default Tienda;