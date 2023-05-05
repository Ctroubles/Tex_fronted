import style from "./SideBar.module.css"
import items from "./sidebar.json"
import { useState } from "react"
import arrow from "../../assets/category_filtros/orange_arrow.svg";
import {useDispatch} from 'react-redux';
import { filterByCategory } from "../../redux/actions/actions";
import { useSelector } from "react-redux";

export default function Sidebar({setSidebarPosition}){
    const dispatch = useDispatch()
    const [open, setOpen] = useState()

    const categoryFilter = useSelector(s=>s.categoryFilter)


    return (
        <div id= {style.SidebarContainer}>
            <div id={style.title}>
                <h1>CATEGORÍAS</h1>
            </div>
            <div id={style.Contenido} >
                  
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Laptops"? setOpen("Laptops"): setOpen(!"Laptops")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                             Laptops    
                        </div> 
                        <img className={style.arrows} id={open === "Laptops"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Laptops" ? style.categoryActiveThreeElement : style.categoryDesactive}>
                        <span id={categoryFilter.label=== "Todas las Laptops" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Laptops',"","Todas las Laptops"));setSidebarPosition(0)}}>
                              Todas
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Laptops Intel" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Laptops',"INTEL","Laptops Intel"));setSidebarPosition(0)}}>
                             Laptops Intel
                            </p>
                         </span>      
                         <span id={categoryFilter.label=== "Laptops AMD" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Laptops',"AMD","Laptops AMD"));setSidebarPosition(0)}}>
                              Laptops AMD
                            </p>
                         </span>                                
                                
                    </div>
                </div>   
                                
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Impresoras"? setOpen("Impresoras"): setOpen(!"Impresoras")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Impresoras    
                        </div> 
                        <img className={style.arrows} id={open === "Impresoras"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Impresoras" ? style.categoryActive : style.categoryDesactive}>
                        <span id={categoryFilter.label=== "Impresoras" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('impresoras',"","Impresoras"));setSidebarPosition(0)}}>
                            Impresoras
                            </p>
                         </span>      
                         <span id={categoryFilter.label=== "Suministros de impresora" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Impresorasuministor',"","Suministros de impresora"));setSidebarPosition(0)}}>
                                Suministros
                            </p>
                         </span> 
                    </div>
                </div>     
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Procesadores"? setOpen("Procesadores"): setOpen(!"Procesadores")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Procesadores    
                        </div> 
                        <img className={style.arrows} id={open === "Procesadores"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Procesadores" ? style.categoryActiveThreeElement : style.categoryDesactive}>
                        <span id={categoryFilter.label=== "Todos los procesadores" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Procesadores',"","Todos los procesadores"));setSidebarPosition(0)}}>
                            Todos
                            </p>
                         </span>      
                         <span id={categoryFilter.label=== "Procesadores INTEL" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Procesadores',"INTEL","Procesadores INTEL"));setSidebarPosition(0)}}>
                            Procesadores INTEL
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Procesadores AMD" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory("Procesadores","AMD","Procesadores AMD"));setSidebarPosition(0)}}>
                            Procesadores AMD
                            </p>
                         </span> 
                                
                    </div>
                </div>  

                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Motherboards"? setOpen("Motherboards"): setOpen(!"Motherboards")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Motherboards    
                        </div> 
                        <img className={style.arrows} id={open === "Motherboards" ?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Motherboards" ? style.categoryActiveThreeElement : style.categoryDesactive}>
                        <span id={categoryFilter.label=== "Todas las Motherboards" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory("Motherboards","","Todas las Motherboards"));setSidebarPosition(0)}}>
                            Todas
                            </p>
                         </span>         
                         <span id={categoryFilter.label=== "Motherboards INTEL" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory("Motherboards","INTEL","Motherboards INTEL"));setSidebarPosition(0)}}>
                            Motherboards INTEL
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Motherboards AMD" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory("Motherboards","AMD","Motherboards AMD"));setSidebarPosition(0)}}>
                            Motherboards AMD
                            </p>
                         </span> 
                                
                    </div>
                </div>                                  
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Tarjetas de Video"? setOpen("Tarjetas de Video"): setOpen(!"Tarjetas de Video")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Tarjetas de Video   
                        </div> 
                        <img className={style.arrows} id={open=== "Tarjetas de Video"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open=== "Tarjetas de Video" ? style.categoryActiveThreeElement : undefined}>
                        <span id={categoryFilter.label=== "Todas las Gráficas" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Graficas',"","Todas las Gráficas"));setSidebarPosition(0)}}>
                            Todas
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Tarjetas de Video GeForce" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Graficas',"GeForce","Tarjetas de Video NVIDIA"));setSidebarPosition(0)}}>
                            Tarjetas de Video NVIDIA
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Tarjetas de Video Radeon AMD" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory("Graficas","Radeon","Tarjetas de Video AMD"));setSidebarPosition(0)}}>
                            Tarjetas de Video AMD
                            </p>
                         </span> 
                                
                    </div>
                </div>                                  
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Memorias RAM"? setOpen("Memorias RAM"): setOpen(!"Memorias RAM")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Memorias RAM  
                        </div> 
                        <img className={style.arrows} id={open === "Memorias RAM" ?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Memorias RAM" ? style.categoryActiveOneElement : undefined}>
                        <span id={categoryFilter.label=== "Memorias RAM" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('RAM',"","Memorias RAM"));setSidebarPosition(0)}}>
                                Memorias RAM
                            </p>
                         </span>  
                         {/* <span> 
                            -&nbsp;
                            <p onClick={()=>dispatch(filterByCategory("RAM"))}>
                            Memorias Notebook
                            </p>
                         </span>  */}
                                
                    </div>
                </div>                                  
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Almacenamiento"? setOpen("Almacenamiento"): setOpen(!"Almacenamiento")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Almacenamiento    
                        </div> 
                        <img className={style.arrows} id={open==="Almacenamiento"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open==="Almacenamiento" ? style.categoryActive : style.categoryDesactive}>
                        <span id={categoryFilter.label=== "Discos Duros" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Almacenamiento',"HDD","Discos Duros"));setSidebarPosition(0)}}>
                            Discos Duros
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Discos Solidos SDD" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory("Almacenamiento",["SSD","NVMe"],"Discos Solidos SDD"));setSidebarPosition(0)}}>
                            Discos Solidos  
                            </p>
                         </span> 
                                
                    </div>
                </div>                                  
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Fuentes"? setOpen("Fuentes"): setOpen(!"Fuentes")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Fuentes de Alimentación 
                        </div> 
                        <img className={style.arrows} id={open === "Fuentes"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Fuentes"? style.categoryActiveOneElement : undefined}>
                        <span id={categoryFilter.label=== "Fuentes de Alimentación" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Fuentes',"","Fuentes de Alimentación"));setSidebarPosition(0)}}>
                            Fuentes de Alimentación
                            </p>
                         </span>  

                    </div>
                </div>                                  
                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Gabinetes"? setOpen("Gabinetes"): setOpen(!"Gabinetes")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Gabinetes   
                        </div> 
                        <img className={style.arrows} id={open==="Gabinetes"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open==="Gabinetes" ? style.categoryActiveOneElement : undefined}>
                        <span id={categoryFilter.label=== "Gabinetes" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Gabinetes',"","Gabinetes"));setSidebarPosition(0)}}>
                            Gabinetes
                            </p>
                         </span>  
                              
                    </div>
                </div>  

                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Monitores"? setOpen("Monitores"): setOpen(!"Monitores")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Monitores 
                        </div> 
                        <img className={style.arrows} id={open === "Monitores"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Monitores"? style.categoryActiveOneElement : undefined}>
                        <span id={categoryFilter.label=== "Monitores" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Monitores',"","Monitores"));setSidebarPosition(0)}}>
                            Monitores
                            </p>
                         </span>  
                              
                    </div>
                </div>   

                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Auriculares"? setOpen("Auriculares"): setOpen(!"Auriculares")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Periféricos 
                        </div> 
                        <img className={style.arrows} id={open === "Auriculares"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Auriculares"? style.categoryActive : undefined}>
                        {/* <span id={categoryFilter.label=== "Audifonos" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>dispatch(filterByCategory('Audifonos',"","Audifonos"))}>
                             Audifonos
                            </p>
                         </span>   */}
                         <span id={categoryFilter.label=== "Mouses" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Mouses',"","Mouses"));setSidebarPosition(0)}}>
                                Mouses
                            </p>
                         </span>  
                         <span id={categoryFilter.label=== "Teclados" ? style.categoryPick : undefined}> 
                            -&nbsp;
                            <p onClick={()=>{dispatch(filterByCategory('Teclados',"","Teclados"));setSidebarPosition(0)}}>
                            Teclados
                            </p>
                         </span> 
                    </div>
                </div>   

                <div  id={style.categoryContainer} >
                    <div id={style.categoryTitle} onClick={() => open !== "Mouses"? setOpen("Mouses"): setOpen(!"Mouses")}>
                        <div>
                            { items.icon && <i id={style.categoryIcon} className={items.icon}></i> }
                            Multimedia 
                        </div> 
                        <img className={style.arrows} id={open === "Mouses"?style.arrowActive:undefined} src={arrow} alt="Arrow"  ></img>
                    </div>
                    <div id={style.childsContaier} className={open === "Mouses"? style.categoryActiveThreeElement : undefined}>
                        <span id={categoryFilter.label=== "Audifonos" ? style.categoryPick : undefined}> 
                                -&nbsp;
                                <p onClick={()=>{dispatch(filterByCategory('Audifonos',"","Audifonos"));setSidebarPosition(0)}}>
                                Audifonos
                                </p>
                        </span>  
                        <span id={categoryFilter.label=== "Microfonos" ? style.categoryPick : undefined}> 
                                -&nbsp;
                                <p onClick={()=>{dispatch(filterByCategory('Microfonos',"","Microfonos"));setSidebarPosition(0)}}>
                                    Microfonos
                                </p>
                        </span> 
                              
                    </div>
                </div>     

                                                                                       
                     
            </div>
        </div>
    )
}