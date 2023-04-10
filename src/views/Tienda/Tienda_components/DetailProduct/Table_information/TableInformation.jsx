import style from "./TableInformation.module.css"
import { caracteristicasEnToEs } from "../../../../../translate/translate";

const TableInformation = ({description})=>{

    return(
        <div id={style.TableInformation}>
           {description?.map(e=>(
                <div className={style.row}><label><span>{caracteristicasEnToEs[e[0]]}:</span>{e[1]===true?"Sí incluye":e[1]===false?"No incluye":e[1]}</label></div>
           ))} 
        </div>
    )
};

export default TableInformation;