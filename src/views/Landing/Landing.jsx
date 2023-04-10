import style from "./Landing.module.css"
import facebook from "../../assets/redes-sociaes_icons/facebook_transparentBackground.svg"
import instagram from "../../assets/redes-sociaes_icons/Instagram_transparent.svg";
import caseForja from "../../assets/landing_assets/image_forge-way.webp";
import bolsaTienda from "../../assets/landing_assets/bag_tex.png"
import { Link } from "react-router-dom";

const Landing = ()=>{
    return(
        <div id={style.LandingContainer}>
            <Link to={"/tienda"} className={style.ways}>
                <div   div id={style.img_ways}>
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
                {/* <img src={text_logo} alt="" /> */}
                <h1>TEX</h1>
            </div>

            <div id={style.social}>
                <img src={facebook} alt="" />
                <img src={instagram} alt="" />
                <img src={facebook} alt="" />
            </div>

        </div>
    )
};

export default Landing;