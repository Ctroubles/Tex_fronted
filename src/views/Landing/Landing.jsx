import style from "./Landing.module.css"
import facebook from "../../assets/redes-sociaes_icons/facebook_transparentBackground.svg"
import instagram from "../../assets/redes-sociaes_icons/Instagram_transparent.svg";
import caseForja from "../../assets/landing_assets/image_forge-way.webp";
import bolsaTienda from "../../assets/landing_assets/bag_tex.png"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from '@material-ui/core';
import { useEffect ,useCallback ,useState} from "react";



const Landing = ()=>{
    const history = useHistory();

    const [isMobile, setIsMobile] = useState(false);

    const checkMediaQuery = useCallback(() => {
      setIsMobile(window.matchMedia("(max-width: 680px)").matches);
    }, []);
  
    useEffect(() => {
      checkMediaQuery();
      window.addEventListener("resize", checkMediaQuery);
      return () => window.removeEventListener("resize", checkMediaQuery);
    }, [checkMediaQuery]);


    return(
        <div id={style.LandingContainer}>
            {/* <Link to={"/tienda"} className={style.ways}>
                <div id={style.img_ways}>
                    <img src={bolsaTienda} alt="" />
                </div>
                <h1>
                Tienda
                </h1>
            </Link>
            <Link to={"/forja"} className={style.ways}>
                <div id={style.img_ways}>
                    <img src={caseForja} alt="" />
                </div>
                <h1>
                Forja
                </h1>
            </Link>
            <div id={style.logoTex}>
                <h1>TEX</h1>
            </div> */}

            {/* <div id={style.social}>
                <img src={facebook} alt="" />
                <img src={instagram} alt="" />
                <img src={facebook} alt="" />
            </div> */}
                {isMobile?(<video autoPlay ="autoPlay " muted="muted" loop="loop">
                    <source src="https://res.cloudinary.com/dmv0gnlcu/video/upload/v1682690747/Videos/V_PAGE_LOOP_h6lggy.mp4" type="video/mp4" />
                    <p>Tu navegador no este video.</p>
                     </video>)
                    :(<video autoPlay ="autoPlay " muted="muted" loop="loop">
                        <source src="https://res.cloudinary.com/dmv0gnlcu/video/upload/v1682690748/Videos/H_PAGE_LOOP_a6c9iu.mp4" type="video/mp4" />
                <p>Tu navegador no este video.</p>
            </video>)
                }
                <label id={style.linkContainer}>
                    <Link to='/tienda' className={style.LinkCreate}>
                        <span className={style.span1}></span>
                        <span className={style.span2}></span>
                        <span className={style.span3}></span>
                        <span className={style.span4}></span>
                        TIENDA
                    </Link>
                </label>
                <label id={style.privTerms}>
                    <span onClick={()=>history.push("/terminos&condiciones")} >Terminos y condiciones</span>
                    <span onClick={()=>history.push("/politica-de-privacidad")}>Política privacidad</span>
                </label>
  
        </div>
    )
};

export default Landing;