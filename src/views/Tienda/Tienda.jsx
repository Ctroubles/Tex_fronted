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
import { deleteFilterCategory, filterByName } from "../../redux/actions/actions";
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


const Tienda = () =>{

    const {pathname} =useLocation()
    const history = useHistory()

    const categoryFilter = useSelector(e=>e.categoryFilter)
    const searchBarStatus = useSelector(e=>e.searchBarStatus)

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
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                const {data} =await axios.get(`/`)
                let arrayUnido = [];
                for (let atributo in data) {
                arrayUnido = arrayUnido.concat(data[atributo]);
                }
                arrayUnido.sort(compararProductos);
                setProducts(arrayUnido)
                setLoadingStatus(false)
            }
            
            getData()
        }else{
            const getData =async()=>{
                const {data} =await axios.get(`/category/${categoryFilter.categoryPick}`)
                console.log(data);
                if(!categoryFilter.specificity){
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
                        filtrado.sort(compararProductos);
                        console.log(categoryFilter.specificity);
                        console.log(filtrado);
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
                        

                        filtrado.sort(compararProductos);
                        setProducts(filtrado)
                        setLoadingStatus(false)

                    }else if(Array.isArray(categoryFilter.specificity)){
                        const filtrado = data.filter(product =>
                            categoryFilter.specificity.some(word =>
                              product.name.toLowerCase().includes(word.toLowerCase())
                            )
                          );   
                        filtrado.sort(compararProductos);
                        setProducts(filtrado)
                        setLoadingStatus(false)
                    }
                }
            }

            getData()
        }

    },[categoryFilter])


    useEffect(()=>{
      if(searchBarStatus) { 
        const filtrado = products.reduce((acumulador, product) => {
            if (product.name.toLowerCase().trim().includes(searchBarStatus.toLowerCase().trim())) {
              acumulador.push(product);
            }
            return acumulador;
          }, []);
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
                <Header setPopoutFinalizar={setPopoutFinalizar}/>
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