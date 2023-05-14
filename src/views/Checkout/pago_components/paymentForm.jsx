import React ,{ useState } from 'react';
import { getTokenVisa, getTokenSessionVisa, sendTransaction, sendTransactionRecurrent } from './config/config'
import "./config/estilos.css"
import style from "./Pasarela.module.css";
import { useEffect } from 'react';
import axios from 'axios';
import niubizLogo from "../../../assets/pasarela/niubiz.png"
import { validators, validatorsLevel2 } from './config/validators';
import { isEmptyObject } from '../../../utils';
import ErrorAlert from "../../../components/alerts/error/error"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



var elementStyles = {
  base: {
      color: '#111111',
      fontWeight: 400,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '15px',
      fontSmoothing: 'antialiased',
      placeholder: {
          color: '#999999dc'
      },
      autofill: {
          color: '#e39f48'
      }
  },
  invalid: {
      color: '#E25950',
      '::placeholder': {
          color: '#FFCCA5'
      }
  }
};



const PaymentForm = ({setPaymentWay, setLoadingButton, purchaseOrder, totalPriceNumber, userId, carritoCompras, dispatch, cleanShoppingCart}) => {

  const history = useHistory()


  const [tokenSecurity, setTokenSecurity] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  // const [ip, setIp] = useState();
  
  ///////////////////// PASARELA CONFIG ////////////////////
  const [errorAlert, setErrorAlert] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activePayment, setActivePayment] = useState(false)
  const [errorsForm, setErrorsForm] = useState({})
  const [userData, setUserData] = useState({
    name:"",
    surname:"",
    email:"",
  })


  const AMOUNT = totalPriceNumber;
  const PUCHASE_NUMBER = 900;
  const MERCHANT_ID = "522591303";



  const handlerChange = (e)=>{
    const value = e.target.value;
    const target = e.target.name
    setErrorsForm({...errorsForm,[target]:null})
    if(validators(target,value)){
      setUserData({...userData, [target]:value})
    }
  };


  useEffect(()=>{
    const getAccesToken = async()=>{
      try {
          const {data:ipData}=  await axios.get('https://api.ipify.org?format=json');
          // setIp(ipData.ip)
          const { data } = await axios.post("/payment/getAccesToken");
          const tokenSecurity = data
          if(data)setTokenSecurity(tokenSecurity)
          else throw new Error("")
          const resp = await axios.post("/payment/getSessionToken",{token:tokenSecurity, totalPriceNumber, ip:ipData.ip});
          const sessionToken = resp.data.sessionKey;
          if(data)setSessionToken(sessionToken);
          if(data)setActivePayment(true)

      } catch (error) {
          setErrorAlert(error);
          setTimeout(() => {
              setErrorAlert(false);
            }, 6000);
            setLoading(false)
        }
    };
  getAccesToken()

  return () => {
    const script = document.querySelector('script[src="https://pocpaymentserve.s3.amazonaws.com/payform.min.js"]');
    if (script) {
      document.head.removeChild(script);
    }
    window.payform = null;
  };
  },[])


  useEffect(() => {
    if (activePayment) {
        importFiles()
    }
}, [activePayment])



  const createForm = () => {
      window.cardNumber = window.payform.createElement('card-number', {
          style: elementStyles,
          placeholder: 'Número de Tarjeta',
      }, 'txtNumeroTarjeta');
      window.cardExpiry = window.payform.createElement('card-expiry', {
          style: elementStyles,
          placeholder: 'MM/AA'
      }, 'txtFechaVencimiento');
      window.cardCvv = window.payform.createElement('card-cvc', {
          style: elementStyles,
          placeholder: 'CVV'
      }, 'txtCvv');
      Promise.all([window.cardNumber, window.cardExpiry, window.cardCvv])
      .then(() => {
          setShowForm(true);
          setLoadingButton(false)
      });
  }

 

  const setConfigurationScriptLoaded = () => {

      var configuration = {
          sessionkey: sessionToken,
          channel: "web",
          merchantid: MERCHANT_ID,
          purchasenumber: `${PUCHASE_NUMBER}`,
          amount: AMOUNT,
          language: "es", 
          merchantConfiguration: {
            recurrencyEnabled: false,
            tokenizationEnabled: false,
          },
          font: "https://fonts.googleapis.com/css?family=Montserrat:400&display=swap"
      };
      window.configuration = configuration
      window.payform.setConfiguration(configuration)
      createForm()
  }

  const addCustomPayScript = () => {
      return new Promise((resolve) => {
              const script = document.createElement('script')
              script.src = 'https://pocpaymentserve.s3.amazonaws.com/payform.min.js'
              script.async = true
              script.onload = () => setConfigurationScriptLoaded()
              document.head.appendChild(script)
              resolve()
      })
  }


  const importFiles = async () => {
      try {
          await addCustomPayScript()
      } catch (error) {
        setErrorAlert(error);
        setTimeout(() => {
            setErrorAlert(false);
          }, 6000);
           setLoading(false)
      }
  }


  
  const resetPayment = () => {
      setPaymentWay(null)
      setTokenSecurity('')
      setSessionToken('')
      setActivePayment(false)
      setShowForm(false)
  }

 
  const doTransaction = async (MERCHANT_ID, token, obj) => {
      try {
        const respuesta = await sendTransaction(MERCHANT_ID, token, obj)
        if (respuesta.error) {
          throw new Error("No se pudo procesar su pago, verifique sus datos.")
        }else{
          const {ACTION_CODE, STATUS} = respuesta.res.dataMap
          if (ACTION_CODE === "000" || STATUS === "Authorized") {
              try {
                const sendOrder = async() =>{
                    const orderToSend={
                        user:userId,
                        fullName: purchaseOrder.deliveryData.name,
                        DNI: purchaseOrder.deliveryData.dni,
                        phone: purchaseOrder.deliveryData.phone,
                        email: purchaseOrder.deliveryData.email,
                        department: purchaseOrder.deliveryData.departamento,
                        city: purchaseOrder.deliveryData.ciudad,
                        address: purchaseOrder.deliveryData.address,
                        date: Date.now(),
                        paymentMethod: "Pago con línea",
                        totalPrice: totalPriceNumber,
                        products: carritoCompras,
                        instructions: purchaseOrder.deliveryData.instructions,
                        status:true,
                    }
        
                    const result = await axios.post("/shopping/create",orderToSend)
                    if(result.status ===201){
                        history.push(`/pedidos/${result.data.nOrden}/${result.data._id}`)
                        dispatch(cleanShoppingCart())
                    }else{
                      throw new Error("Hubo un problema al generar su orden, contactate a nuestro Whatsapp: +51 944 949 084")
                    }
                    }
                    sendOrder()
            } catch (error) {
               throw new Error("Hubo un problema al generar su orden, contactate a nuestro Whatsapp: +51 944 949 084")
            }
          }else{
            throw new Error("No se pudo procesar su pago, verifique sus datos o intene más tarde.")
          }
          // setShowForm(false)
        }
        setLoading(false)

      } catch (error) {
        setErrorAlert(error);
        setTimeout(() => {
            setErrorAlert(false);
          }, 6000);
           setLoading(false)
      }
    }

    

  const payVisa = () => {
    const errors = validatorsLevel2(setErrorsForm,userData)
    if (isEmptyObject(errors)) {
      setLoading(true)
      var data = {
        name: userData.name ,
        lastName: userData.surname ,
        email: userData.email  ,
        // phoneNumber: "987654321",
        currencyConversion: false,
        recurrence: false,
        alias: 'mialias'
      }
       window.payform.createToken(
        [window.cardNumber,window.cardExpiry,window.cardCvv],
        data
       )
       .then(function(res){
        const obj = {
          "antifraud":null,
          "captureType":"manual",
          "cardHolder":{
            "documentNumber": "77232373",
            "documentType": "0"
          },
          "channel":"web",
          "countable": true,
          "order":{
          "amount": AMOUNT,
          "currency": "PEN",
          "productId": "321",
          "purchaseNumber": `${PUCHASE_NUMBER}`,
          "tokenId": res.transactionToken,
          "originalAmount": AMOUNT
          },
         "sponsored":null
        }
          doTransaction(MERCHANT_ID, tokenSecurity, obj)
       })
       .catch((error) => {
        setErrorAlert(error);
        setTimeout(() => {
            setErrorAlert(false);
          }, 6000);
           setLoading(false)
       });
    }


    }
  ////////////////////////////////////////////////////////

  return (
    <div id={style.Pasarela}>
            {errorAlert?(<ErrorAlert message={errorAlert}></ErrorAlert>):undefined}
      <div style={{ display: showForm ? 'block' : 'none' }}>
            <div className='w3-modal show-modal-beneficiaries'>
                <div className='w3-modal-content contentWidth'>
                    <div className='w3-header'>
                    </div>
                    <div className='formPayment--niubiz'>
                                <img src={niubizLogo} alt='' />
                    </div>
                    <div className='w3-container'>
                        <div className='formPayment' >
                            <div className='formPayment__row bordered-input inputsContainers'>
                                  <div id="txtNumeroTarjeta" className="form-control"></div>
                            </div>
                            <div className='formPayment__row' >
                                <div className='formPayment__col formPayment__col--left bordered-input inputsContainers' >
                                  <div id="txtFechaVencimiento" className="form-control"></div>
                                </div>
                                <div className='formPayment__col formPayment__col--right bordered-input inputsContainers' >
                                  <div id="txtCvv" className="form-control"></div>
                                </div>
                            </div>
                            <div id={style.fullName}>
                                <div className='inputsContainers extra' style={errorsForm.name?{border:"1px solid #ff0000", boxShadow: "0 0 2px #ff0000"}:undefined} >
                                    <label>
                                        <input type="text" placeholder='Nombres' value={userData.name} onChange={(e)=>handlerChange(e)} name='name' />
                                    </label>
                                </div>    
                                <div className='inputsContainers extra' style={errorsForm.surname?{border:"1px solid #ff0000", boxShadow: "0 0 2px #ff0000", marginLeft:"10px" }:{marginLeft:"10px"}}>
                                    <label>
                                        <input type="text" placeholder='Apellidos' value={userData.surname} onChange={(e)=>handlerChange(e)} name='surname' />
                                    </label>
                                </div>
                            </div>
                            <div className='inputsContainers extra' style={errorsForm.email?{border:"1px solid #ff0000", boxShadow: "0 0 2px #ff0000"}:undefined}>
                              <label>
                                <input type="text" placeholder='Email' value={userData.email} onChange={(e)=>handlerChange(e)} name='email' />
                              </label>
                            </div>
                            <div id={style.paymentButtonContainer}>
                                {loading ? (
                                  <button className='formPayment--btn'>
                                      <span class={style.loading_dot}></span>
                                      <span class={style.loading_dot}></span>
                                      <span class={style.loading_dot}></span>
                                  </button>
                                ) : (
                                  <button className='formPayment--btn' onClick={()=>payVisa()}>Pagar {AMOUNT}</button>
                                )}
                            </div>
                           
                        </div>
                        <div className='w3areabtn'>
                            <button className='btn-pago-cancel' onClick={()=>resetPayment()}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PaymentForm;