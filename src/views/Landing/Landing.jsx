import style from "./Landing.module.css"
import facebook from "../../assets/redes-sociaes_icons/facebook_transparentBackground.svg"
import instagram from "../../assets/redes-sociaes_icons/Instagram_transparent.svg";
import caseForja from "../../assets/landing_assets/image_forge-way.webp";
import bolsaTienda from "../../assets/landing_assets/bag_tex.png"
import { Link } from "react-router-dom";

const Landing = ()=>{
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
                <video autoplay="" muted="" loop="" >
                    <source src="https://res.cloudinary.com/dmv0gnlcu/video/upload/v1681928902/Videos/BANNERS_MAIN_3_ruze89.mp4" type="video/mp4" />
                    <source src="https://res.cloudinary.com/dmv0gnlcu/video/upload/v1681929558/Videos/BANNERS-MAIN_3__ndl2tu.webm" type="video/webm" />
                    <p>Tu navegador no soporta la etiqueta de video HTML5.</p>
                </video>
                <label id={style.linkContainer}>
                    <Link to='/tienda' className={style.LinkCreate}>
                        <span className={style.span1}></span>
                        <span className={style.span2}></span>
                        <span className={style.span3}></span>
                        <span className={style.span4}></span>
                        TIENDA
                    </Link>
                </label>
  
        </div>
    )
};

export default Landing;