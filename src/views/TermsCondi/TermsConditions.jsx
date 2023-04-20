import style from "./TermsConditions.module.css"
import texLogo from "../../assets/logos/TEX LOGO.svg"
import backArrow from "../../assets/icons/black_arrow.svg"
import { useHistory } from "react-router-dom";


const TermsConditions = ()=>{

    const history = useHistory()

    return(
        <div id={style.Privacidad}>
            <div>
                <header id={style.header}>
                    <label id={style.backArrow}><span><img onClick={()=>history.goBack()} src={backArrow} alt="Flecha atrá" /></span></label>
                    <label><img  onClick={()=>history.push("/tienda")} src={texLogo} alt="TEX" /></label>
                </header>
                <div id={style.body}>
                    <h2>Terminos y condiciones.</h2>
                    <br />
                    <p>Productos y precios: Los productos y precios ofrecidos en nuestra página web están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o descontinuar cualquier producto en cualquier momento sin responsabilidad</p>
                    <br />
                    <p>Productos y precios: Los productos y precios ofrecidos en nuestra página web están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o descontinuar cualquier producto en cualquier momento sin responsabilidad</p>
                    <br />
                    <p>Envío y entrega: Nos esforzamos por procesar y enviar los pedidos lo más rápido posible, pero no garantizamos plazos de entrega específicos. La responsabilidad del envío recae en el comprador una vez que el producto ha sido entregado a la empresa de transporte. Los gastos de envío y cualquier otro cargo adicional son responsabilidad del comprador, a menos que se indique lo contrario.</p>
                    <br />
                    <p>Devoluciones y garantías: Se aceptarán devoluciones de productos defectuosos o dañados dentro de los 7 días hábiles posteriores a la recepción, siempre y cuando se notifique por escrito dentro de dicho plazo. La garantía de los productos estará sujeta a las políticas de garantía del fabricante. No se aceptarán devoluciones ni se ofrecerán reembolsos por productos que hayan sido dañados por un mal uso, negligencia o modificación por parte del comprador.</p>
                    <br />
                    <p>Privacidad y seguridad: Nos comprometemos a proteger la privacidad de los datos personales del cliente y a mantener la seguridad de la información. Los datos proporcionados por el cliente serán utilizados únicamente para procesar y cumplir con los pedidos, así como para mejorar nuestros servicios. No compartiremos la información del cliente con terceros, excepto cuando sea necesario para cumplir con los pedidos o por requerimientos legales.</p>
                    <br />
                    <p>Propiedad intelectual: Todos los contenidos de nuestra página web, incluyendo imágenes, logotipos, textos, videos y otros elementos, son propiedad exclusiva de nuestra empresa o de terceros con los que tengamos acuerdos. No está permitido copiar, reproducir, distribuir o utilizar de cualquier manera dichos contenidos sin nuestra autorización previa por escrito.</p>
                    <br />
                    <p>Responsabilidad del cliente: El cliente se compromete a proporcionar información precisa y actualizada al realizar un pedido en nuestra página web. El cliente es responsable de revisar y cumplir con estos términos y condiciones, así como con cualquier ley o regulación aplicable. La empresa no será responsable por errores, omisiones o incumplimientos del cliente.</p>
                    <br />
                    <p>Modificación de los términos y condiciones: Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento sin previo aviso. Los cambios entrarán en vigencia al ser publicados en nuestra página web. Se recomienda al cliente revisar periódicamente estos términos y condiciones para estar al tanto de cualquier actualización.</p>
                </div>
            </div>
        </div>
    )
};

export default TermsConditions;