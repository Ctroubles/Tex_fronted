import style from "./Privacidad.module.css"
import texLogo from "../../assets/logos/TEX LOGO.svg"
import backArrow from "../../assets/icons/black_arrow.svg"
import { useHistory } from "react-router-dom";


const PrivacidadView = ()=>{

    const history = useHistory()

    return(
        <div id={style.Privacidad}>
            <div>
                <header id={style.header}>
                    <label id={style.backArrow}><span><img onClick={()=>history.goBack()} src={backArrow} alt="Flecha atrá" /></span></label>
                    <label><img  onClick={()=>history.push("/tienda")} src={texLogo} alt="TEX" /></label>
                </header>
                <div id={style.body}>
                    <h2>PRIVACIDAD Y CONFIDENCIALIDAD</h2>
                    <br />
                    <p>Gracias por acceder a la página web tex-fronted.vercel.app, sociedad Responsable del Tratamiento de sus Datos Personales</p>
                    <br />
                    <p>En TEX te damos la cordial bienvenida y gracias por preferir nuestra tienda online. Para nosotros es muy importante proteger tu información personal así como respetar tu privacidad y confidencialidad, es por esto que en nuestra web solo utilizaremos y tendremos por un tiempo determinado según ley, los datos relevantes a fin de brindarle una experiencia de compra segura, ágil y eficiente. A continuación te brindamos nuestra política de privacidad y confidencialidad.</p>
                    <br />
                    <p>Los datos que utilizaremos, almacenaremos y procesaremos a fin de brindarle una experiencia segura y placentera, durante la compra y cualquier reclamo o consulta posterior a esta es su información personal que incluye pero no es limitado a: Nombre y apellidos, DNI, fecha de nacimiento, email, dirección de envío, números telefónicos, datos de pago, dirección de facturación, datos relevantes de la tarjeta de debito o crédito con la que se hizo la operación, entre otros.</p>
                    <br />
                    <h3>INFORMACIÓN A UTILIZAR</h3>
                    <p>Usaremos la información que proporciona para que podamos procesar sus pedidos y para ofrecerle los servicios e información ofrecidos a través de nuestra página web que solicite. Además, usaremos la información que proporcione para administrar su cuenta con nosotros, verificar y llevar a cabo transacciones financieras en relación con los pagos que realice en línea, la auditoría de la descarga de datos desde nuestro sitio web, mejorar el diseño y / o contenido de las páginas de nuestro sitio web y personalizar a los usuarios, identificar a los visitantes en nuestro sitio web, llevar a cabo investigaciones sobre la demografía de nuestros usuarios; le enviaremos la información que pensamos que puede serle útil o que nos ha solicitado, incluida información sobre nuestros productos y servicios, a menos que nos haya comunicado que se ha opuesto a ser contactado para estos fines. Sujeto a la obtención de su consentimiento podemos comunicarnos por correo electrónico con los detalles de otros productos y servicios. Si prefiere no recibir comunicaciones de marketing, puede comunicarlo en cualquier momento y dejará de recibir dichas comunicaciones.</p>
                    <br />
                    <h3>OTROS USOS DE SU INFORMACIÓN PERSONAL</h3>
                    <p>Podemos utilizar su información personal para estudios de mercado. Sus datos son anónimos y sólo se utilizarán con fines estadísticos. Usted puede optar por no participar de esto en cualquier momento. Revelar su dirección de correo electrónico sólo es necesario si usted desea participar en los concursos.</p>
                    <br />
                    <p>También podemos enviarle otra información acerca de nosotros, TEX, nuestros otros sitios web, nuestros productos, promociones de ventas, nuestros boletines de noticias, todo lo relacionado con otras empresas de nuestro grupo o de nuestros socios. Si prefiere no recibir este tipo de información adicional, como se detalla en este apartado (o cualquier parte de ella), por favor haga clic en el 'unsubscribe' en el enlace de cualquier correo electrónico que le enviamos. Dentro de 7 días hábiles después de recibir su instrucción se dejará de enviar la información solicitada. Si su instrucción no es clara nos comunicaremos con Ud. para aclararla.</p>
                    <br />
                    <p>Podemos además, utilizar de manera anónima los datos sobre los usuarios de TEX en general, y utilizarla para diversos fines, incluyendo la determinación de la ubicación general de los usuarios y el uso de ciertos aspectos de TEX o un enlace contenido en un correo electrónico a los registrados para recibirlos, y el suministro de que los datos anónimos a terceros, tales como editores. Sin embargo, los datos anónimos podrán identificarlo personalmente.</p>
                    <br />
                    <h3>SOBRE PAGOS</h3>
                    <p>Los pagos que se realicen a través de TEX serán procesados por nuestro agente de pagos en línea. Sólo debe proporcionar su información en nuestro sitio. Dicha información debe ser precisa y veraz y debe mantenerse al día. Si ocurre algún cambio en sus datos, debe informarnos para poder actualizarlos en nuestra base de datos, con el fin de evitar inconvenientes en los pagos o la entrega de sus productos.</p>
                    <br />
                    <p>Sus detalles de la orden real pueden ser almacenados por nosotros, pero por razones de seguridad no pueden ser directamente recuperados por nosotros. Sin embargo, puede acceder a esta información ingresando a su cuenta en tex-fronted.vercel.app. Ahí podrá ver los detalles de sus pedidos que han sido completados, los que están abiertos y los que están en proceso de ser enviados y administrar los datos de la dirección, datos financieros y cualquier boletín de noticias al que se haya suscrito. Usted se compromete a tratar sus datos personales de acceso confidencial y no ponerla a disposición de terceros no autorizados. No podemos asumir ninguna responsabilidad por el mal uso de contraseñas que haya divulgado</p>
                    <br />
                    <h3>CONCURSOS Y COMPETENCIAS</h3>
                    <p>Para cualquier concurso o competencia que utilice los datos para notificar a los ganadores y anunciar nuestras ofertas. Ud. puede encontrar más detalles en su caso, en nuestras condiciones de participación para el concurso respectivo.</p>
                    <br />
                    <h3>TERCEROS Y ENLACES</h3>
                    <p>Podemos transmitir sus datos a otras empresas de nuestro grupo. También podemos proporcionar su información a nuestros agentes y subcontratistas para que nos ayuden con cualquiera de nuestros usos de sus datos que figuran en nuestra Política de Privacidad. Por ejemplo, podemos utilizar a terceros para que nos ayuden con la entrega de productos, que nos ayude a recaudar sus pagos, a analizar los datos que nos proporcione y con la comercialización o asistencia de servicio al cliente. Podemos intercambiar información con terceros a efectos de protección contra el fraude y la reducción de riesgo de crédito. Podemos transferir nuestras bases de datos que contienen su información personal si vendemos nuestro negocio o parte de este. Al margen de lo establecido en la presente Política de Privacidad, no podremos vender o divulgar sus datos personales a terceros sin obtener su consentimiento previo, a menos que sea necesario para los fines establecidos en esta Política de Privacidad a menos que estemos obligados a hacerlo por ley. TEX puede contener publicidad de terceros y enlaces a otros sitios o marcos de otros sitios. Tenga en cuenta que no somos responsables de las prácticas de privacidad o contenido de dichos terceros u otros sitios, ni por cualquier tercero a quien ustedes le transfiera sus datos personales.</p>
                    <br />
                    <h3>COOKIES</h3>
                    <p>La aceptación de las cookies no es un requisito para visitar TEX. Sin embargo, nos gustaría señalar que el uso de la funcionalidad "carrito de compra" en tex-fronted.ve y la de aceptar una orden sólo es posible con la activación de las cookies. Las cookies son pequeños archivos de texto que identifican a su computadora a nuestro servidor como un usuario único, cuando visitas ciertas páginas en tex-fronted.ve y que son almacenados por su navegador de Internet en el disco duro de su ordenador. Las cookies se pueden utilizar para reconocer su dirección de protocolo de Internet, que le ahorra tiempo mientras se encuentra en TEX o quiere entrar a él. Sólo utilizamos cookies para su comodidad en el uso de TEX (por ejemplo, para recordar quién es cuando se desea modificar su cesta de la compra sin tener que volver a introducir su dirección de correo electrónico) y no para obtener o usar cualquier otra información sobre usted (por ejemplo de publicidad segmentada). Su navegador puede ser configurado para no aceptar cookies, pero esto sería restringir su uso de TEX. Por favor, acepte nuestra garantía de que el uso de cookies no contiene datos de carácter personal o privado, y están libres de virus. Si desea obtener más información acerca de las cookies, vaya a http://www.allaboutcookies.org o para obtener información sobre la eliminación de ellos desde el navegador, ir a http://www.allaboutcookies.org/manage-cookies/index.html.</p>
                    <br />
                    <h3>SEGURIDAD</h3>
                    <p>En TEX, estamos comprometidos con la seguridad de su información y utilizamos medidas técnicas y de seguridad para protegerla contra el acceso no autorizado o ilegal, así como contra su pérdida, destrucción o daño accidental. Cuando recopilamos datos, lo hacemos en un servidor seguro y utilizamos programas de protección en nuestros servidores. Además, mantenemos salvaguardias físicas, electrónicas y de procedimiento para proteger su información durante su recopilación, almacenamiento y divulgación. Nuestros procedimientos de seguridad pueden incluir la solicitud de una prueba de identidad antes de revelar información personal, y le recordamos que usted es responsable de proteger su contraseña y su computadora contra el acceso no autorizado. En resumen, en TEX nos tomamos muy en serio la seguridad de su información y trabajamos constantemente para mantener los más altos estándares de seguridad en nuestras operaciones.</p>
                    <br />
                    <h3>SUS DERECHOS</h3>
                    <p>Si está preocupado acerca de sus datos, tiene el derecho de solicitar el acceso a ellos y obligarnos a corregir cualquier inexactitud de forma gratuita.</p>
                    <br />
                    <p>Productos y precios: Los productos y precios ofrecidos en nuestra página web están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o descontinuar cualquier producto en cualquier momento sin responsabilidad.</p>
                    <br />
                    <p>Envío y entrega: Nos esforzamos por procesar y enviar los pedidos lo más rápido posible, pero no garantizamos plazos de entrega específicos. La responsabilidad del envío recae en el comprador una vez que el producto ha sido entregado a la empresa de transporte. Los gastos de envío y cualquier otro cargo adicional son responsabilidad del comprador, a menos que se indique lo contrario.</p>
                    <br />
                    <p>Devoluciones y garantías: Se aceptarán devoluciones de productos defectuosos o dañados dentro de los 7 días hábiles posteriores a la recepción, siempre y cuando se notifique por escrito dentro de dicho plazo. La garantía de los productos estará sujeta a las políticas de garantía del fabricante. No se aceptarán devoluciones ni se ofrecerán reembolsos por productos que hayan sido dañados por un mal uso, negligencia o modificación por parte del comprador.</p>
                    <br />
                    <p>Privacidad y seguridad: Nos comprometemos a proteger la privacidad de los datos personales del cliente y a mantener la seguridad de la información. Los datos proporcionados por el cliente serán utilizados únicamente para procesar y cumplir con los pedidos, así como para mejorar nuestros servicios. No compartiremos la información del cliente con terceros, excepto cuando sea necesario para cumplir con los pedidos o por requerimientos legales.</p>
                    <br />
                    <p>Propiedad intelectual: Todos los contenidos de nuestra página web, incluyendo imágenes, logotipos, textos, videos y otros elementos, son propiedad exclusiva de nuestra empresa o de terceros con los que tengamos acuerdos. No está permitido copiar, reproducir, distribuir o utilizar de cualquier manera dichos contenidos sin nuestra autorización previa por escrito.</p>

                </div>
            </div>
        </div>
    )
};

export default PrivacidadView;