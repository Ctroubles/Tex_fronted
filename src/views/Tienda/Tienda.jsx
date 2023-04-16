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
    const dispatch = useDispatch()
    const {pathname} =useLocation()
    const history = useHistory()

    const categoryFilter = useSelector(e=>e.categoryFilter)
    const searchBarStatus = useSelector(e=>e.searchBarStatus)


    const [products, setProducts] = useState([])
    const [indexProducts, setIndexProducts] = useState([])
    const [productsFilteredBySearchBar, setProductsFilteredBySearchBar] = useState([])
    const [loadingStatus,setLoadingStatus]=useState(true)
    const [showLoading,setShowLoading]=useState(true)
    const [productOnfocus, setProductOnFocus]=useState()
    const [popoutFinalizar, setPopoutFinalizar] = useState()
    const [focusProductStatus, setProductStatus] = useState(false)
    const [orderPrice, setOrderPrice] = useState("2")
    


///////////////////////FUNCIONESSS////////////////
    const getData =async()=>{
    const {data} =await axios.get(`/`)
    let arrayUnido = [];
    for (let atributo in data) {
    arrayUnido = arrayUnido.concat(data[atributo]);
    }
    const indices = arrayUnido.map((_, indice) => indice);
    indices.sort((a, b) => {
        if (orderPrice === "3") {
          return arrayUnido[a].price - arrayUnido[b].price;
        } else if (orderPrice === "1") {
          return arrayUnido[b].price - arrayUnido[a].price;
        } else {
          return a - b;
        }
      });
    indices.sort((a, b) => compararProductos(arrayUnido[a], arrayUnido[b]));
    setIndexProducts(indices)
    setProducts(arrayUnido)
    setLoadingStatus(false)
}


const getData2 =async()=>{
    const {data} =await axios.get(`/category/${categoryFilter.categoryPick}`)
    if(!categoryFilter.specificity){
        const indices = data.map((_, indice) => indice);
        indices.sort((a, b) => {
            if (orderPrice === "3") {
              return data[a].price - data[b].price;
            } else if (orderPrice === "1") {
              return data[b].price - data[a].price;
            } else {
              return a - b;
            }
          });
        indices.sort((a, b) => compararProductos(data[a], data[b]));
        setIndexProducts(indices)
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
            const indices = filtrado.map((_, indice) => indice);
            indices.sort((a, b) => {
                if (orderPrice === "3") {
                  return filtrado[a].price - filtrado[b].price;
                } else if (orderPrice === "1") {
                  return filtrado[b].price - filtrado[a].price;
                } else {
                  return a - b;
                }
              });
            indices.sort((a, b) => compararProductos(filtrado[a], filtrado[b]));
            setIndexProducts(indices)
            setProducts(filtrado)
            setLoadingStatus(false)
        }
        else if(categoryFilter.categoryPick === "Laptops"){
            const filtrado = data.reduce((acumulador, product) => {
                if (product.procesador.toLowerCase().includes(categoryFilter.specificity.toLowerCase())) {
                acumulador.push(product);
                }
                return acumulador;
            }, []);                        
            const indices = filtrado.map((_, indice) => indice);
            indices.sort((a, b) => {
                if (orderPrice === "3") {
                  return filtrado[a].price - filtrado[b].price;
                } else if (orderPrice === "1") {
                  return filtrado[b].price - filtrado[a].price;
                } else {
                  return a - b;
                }
              });
            indices.sort((a, b) => compararProductos(filtrado[a], filtrado[b]));
            setIndexProducts(indices)
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
            
            const indices = filtrado.map((_, indice) => indice);
            indices.sort((a, b) => {
                if (orderPrice === "3") {
                  return filtrado[a].price - filtrado[b].price;
                } else if (orderPrice === "1") {
                  return filtrado[b].price - filtrado[a].price;
                } else {
                  return a - b;
                }
              });
            indices.sort((a, b) => compararProductos(filtrado[a], filtrado[b]));
            setIndexProducts(indices)
            setProducts(filtrado)
            setLoadingStatus(false)

        }else if(Array.isArray(categoryFilter.specificity)){
            const filtrado = data.filter(product =>
                categoryFilter.specificity.some(word =>
                  product.name.toLowerCase().includes(word.toLowerCase())
                )
              );   
              const indices = filtrado.map((_, indice) => indice);
              indices.sort((a, b) => {
                  if (orderPrice === "3") {
                    return filtrado[a].price - filtrado[b].price;
                  } else if (orderPrice === "1") {
                    return filtrado[b].price - filtrado[a].price;
                  } else {
                    return a - b;
                  }
                });
              indices.sort((a, b) => compararProductos(filtrado[a], filtrado[b]));
              setIndexProducts(indices)
              setProducts(filtrado)
              setLoadingStatus(false)
        }
    }
}

///////////////////////////////////////////

    useEffect(() => {
        if (loadingStatus) {
        setShowLoading(true);
        } else {
        setShowLoading(false);
        }
    }, [loadingStatus]);



    useEffect(()=>{
        const updateOrder = async()=>{
            if(!categoryFilter.label){
               setLoadingStatus(true)
               await getData()
            }else{
                if (!searchBarStatus) {
                    const indices = products.map((_, indice) => indice);
                    indices.sort((a, b) => {
                        if (orderPrice === "3") {
                        return products[a].price - products[b].price;
                        } else if (orderPrice === "1") {
                        return products[b].price - products[a].price;
                        } else {
                        return a - b;
                        }
                    });
                    indices.sort((a, b) => compararProductos(products[a], products[b]));
                    setIndexProducts(indices)
                }else{
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
                    if(loadingStatus)setLoadingStatus(false)
                }
            }
        }
        updateOrder()
    },[orderPrice])



    useEffect(()=>{
        const getProducts = async()=>{
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
            }else setProductsFilteredBySearchBar([])
        }
        getProducts()
    },[searchBarStatus])



    useEffect(()=>{
        const getProductById =async()=>{
            setProductStatus(true)
            const cleanPathName = cleanPathname(pathname)
            const urlArr = cleanPathName.split("/")
            const idProduct = urlArr[urlArr.length-1];
            const {data}= await axios.get(`/id/${idProduct}`)
            .catch(e=>history.push(`/tienda`));
            if(data)setProductOnFocus(data)
            else {
                history.push(`/tienda`)
                setProductOnFocus(null)
            }
        }

        if (cleanPathname(pathname)!=="/tienda")getProductById()
        else {
            if(productOnfocus)setProductOnFocus(null)
            setProductStatus(null);
        }

    },[pathname])

////////////////////////////////////////////////////////OJOOOOOOO


      const functionToClose = (e)=>{
        if (e.target === e.currentTarget) {
            setProductOnFocus(null)
            history.push("/tienda")
          }
        }

    useEffect(()=>{
        setLoadingStatus(true)
        setProducts([])
        dispatch(filterByName(""))
        if(!categoryFilter.label){
            
            getData()
        }else{
            
            getData2()
        }

    },[categoryFilter])



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
                                        <span id={style.priceLess} style={orderPrice==="1"?{color:"#ffbf00",transform:"scale(1.1)"}:undefined} onClick={()=>setOrderPrice("1")} >&#9650;</span>  
                                        <input id={style.switchInput} type="range"  onChange={(e)=>setOrderPrice(e.target.value)} min='1' max='3' value={orderPrice} style={orderPrice!=="2"?{backgroundColor:"rgba(209, 30, 209, 0.655)"}:undefined}/> 
                                        <span id={style.priceMore} style={orderPrice==="3"?{color:"#ffbf00",transform:"scale(1.15)"}:undefined} onClick={()=>setOrderPrice("3")}  >&#9660;</span>  
                                    </div>
                                </div>
                            </label>
                        </div>
                        {showLoading && <LoadingCardContainer />}
                                        
                        {!loadingStatus && ( <div id={style.cardContainer}>
                                               {!searchBarStatus?.length?   
                                                    indexProducts.length && products.length?  indexProducts.map(indice=>(
                                                            <Card  id={products[indice]?._id} key={indice} name={products[indice].name} img={products[indice].img} price={products[indice].price} stock={products[indice].stock}/>
                                                        ))
                                                        :(<p id={style.noHayProductos}>No hay Productos en esa categoría :c</p>)

                                                    : productsFilteredBySearchBar.length?productsFilteredBySearchBar.map(e=>(
                                                            <Card  id={e._id} key={e._id} name={e.name} img={e.img} price={e.price} stock={e.stock} /> 
                                                        ))
                                                        :(<p id={style.noHayProductos}>No hay Productos con ese nombre :c</p>)
                                                }
                                        </div>)
                        }
                </div>
            </div>
            {focusProductStatus? <div id={style.detailProductContainer} onClick={(e)=>{functionToClose(e)}} >{productOnfocus?<DetailProduct product={productOnfocus}/>:null}</div>:undefined}
            <div style={{display:popoutFinalizar?"block":"none"}}>
                 <PopoutFinalizar setPopoutFinalizar={setPopoutFinalizar}/>
            </div>
        </div>
    )
};

export default Tienda;