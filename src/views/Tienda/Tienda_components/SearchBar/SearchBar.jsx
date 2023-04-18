import style from "./Searchbar.module.css"
import logoLupa from "../../../../assets/icons/lupa.png";
import { useDispatch, useSelector } from "react-redux";
import { filterByName } from "../../../../redux/actions/actions";


const SearchBar = ()=>{
    const dispatch= useDispatch();

    const searchBarStatus = useSelector(e=>e.searchBarStatus)

    const handlerChange = (e)=>{
        dispatch(filterByName(e.target.value))
    }

    return(
        <div id={style.SearchBar}>
                <div id={style.SearchBarContainer}>
                    <div className={style.divSearchBar}>
                        <input onChange={(e)=>handlerChange(e)} type="text" placeholder="Busca..." name="name" autoComplete='off' value={searchBarStatus} />
                    </div>
                    <button id={style.button}  type="submit"><img src={logoLupa} alt="Lupa logo" /></button>
                </div>
        </div>  
    )
};

export default SearchBar;