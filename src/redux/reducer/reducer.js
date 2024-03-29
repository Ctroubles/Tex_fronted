import { SET_STATE_VIEW_CARD, SET_STEP_BUILD_PC, ORDER_PRICE, GET_DETAIL_COMPONENT, FILTER_BY_CATEGORY, DELETE_FILTER_CATEGORY, PICK_ARMA_TU_PC, CLEAN_ARMA_TU_PC, ADD_TO_CART, INCREMENT_CART, DECREMENT_CART, REMOVE_ITEM_CART, CLEAN_SHOPPING_CART, FINALIZAR_ARMA_TU_PC, FILTER_BY_NAME, ADD_DELIVERY_INFORMATION, ADD_PAYMENT_METHOD, ADD_COUNT_CART_CUSTOM } from "../actions/actions.types";
import { getCurrentComponent } from "../../utils";
import { sortByPrice,fusionarProductos } from "../../helpers/reducer.helpers";
import axios from "axios";

const pc_build= JSON.parse(window.localStorage.getItem("pc_build"))

const initialState = {
    allComponents: [],
    getUsers: [],
    numPaginado: 0,
    connectionON : true,
    build_pc :pc_build?pc_build: {
        cpu: undefined,
        motherBoard: undefined,
        cooler: undefined,
        ram: undefined,
        gpu:undefined,
        storaged: undefined,
        psu: undefined,
        case: undefined,
        screen: undefined,
        peripherals:[],
    },
    step_build_pc:undefined,
    categoryFilter:{
        categoryPick: undefined,
        specificity:undefined,
        label:undefined,
    },
    searchBarStatus:"",
    orderPrice:"2",
    shoppingCart:window.localStorage.getItem("carrito")===null?[]:JSON.parse(window.localStorage.getItem("carrito")),
    shoppingForm:undefined,
    purchaseOrder:{}
}

const rootReducer = (state = initialState, { type, payload }) =>{

    

    let data = undefined;
    switch (type) {
        case SET_STATE_VIEW_CARD:
            return {
                ...state,
                stateViewCard: !state.stateViewCard,
            };

        case SET_STEP_BUILD_PC:
            return{
                ...state,
                step_build_pc:payload,
            };
        case FILTER_BY_NAME:
            return{
                ...state,
                searchBarStatus:payload
            }
        case GET_DETAIL_COMPONENT:
            return{
                ...state,
                detailComponent: payload,
            };

        case ORDER_PRICE:
            return{
                ...state,
                orderPrice:payload
            };

        case FILTER_BY_CATEGORY:
            return{
                ...state,
                categoryFilter:{
                    categoryPick: payload.category,
                    specificity:payload.specificity,
                    label:payload.label,
                },
            };

        case DELETE_FILTER_CATEGORY:
            return{
                ...state,
                categoryFilter: {},
            };
        
        case PICK_ARMA_TU_PC:

            let build_pc=JSON.parse(JSON.stringify(state.build_pc))

            if (!getCurrentComponent[state.step_build_pc].includes("peripherals")) {
                build_pc[getCurrentComponent[state.step_build_pc]]={...payload,quantity:1};
            }else if(getCurrentComponent[state.step_build_pc]=== "peripherals1"){

                build_pc.peripherals[0]={...payload,quantity:1}
            }
            else if(getCurrentComponent[state.step_build_pc]=== "peripherals2"){
                build_pc.peripherals[1]={...payload,quantity:1}
            
            }else if(getCurrentComponent[state.step_build_pc]=== "peripherals3"){
                build_pc.peripherals[2]={...payload,quantity:1}
            }


            const newState= {
                ...state,
                build_pc,
            };

            window.localStorage.setItem('pc_build', JSON.stringify(build_pc))

            return{
                ...newState
                };

        case CLEAN_ARMA_TU_PC:
            localStorage.removeItem('pc_build');
            return{
                ...state,
                build_pc:{
                    peripherals:[],
                }
            }

        case ADD_TO_CART:
            const cart = state.shoppingCart.map(e=>e);
            const itemInCart = cart.find((item ,) => item._id === payload._id);
            let index;
            if (itemInCart) {
                if(itemInCart.quantity<payload.stock){
                    cart.forEach((e,i)=>{
                        if (e._id === itemInCart._id) 
                        index = i
                    })
                    const newob={
                        ...payload,
                        quantity:itemInCart.quantity+1
                    }
                    cart.splice(index,1,newob)
                }
                
            } else {
                if(payload.stock>0){
                    cart.push({ ...payload, quantity: 1 });
                }
            }

            window.localStorage.setItem('carrito', JSON.stringify(cart))
            return {
                ...state,
                shoppingCart: cart,
              };
      
        case INCREMENT_CART:
            return{
                ...state,
                shoppingCart:payload,
            }
        case DECREMENT_CART:
            return{
                ...state,
                shoppingCart:payload,
            }
            
        case REMOVE_ITEM_CART:
            const cartttt= state.shoppingCart.map(e=>e)
            const arrFiltrado = cartttt.filter((item) => item._id !== payload);    
            window.localStorage.setItem('carrito', JSON.stringify(arrFiltrado))   
   
            return{
                ...state,
                shoppingCart: arrFiltrado,
            };

        case CLEAN_SHOPPING_CART:
            window.localStorage.setItem('carrito', JSON.stringify([]))   
            return{
                ...state,
                shoppingCart:[]
            }

        case FINALIZAR_ARMA_TU_PC:
            localStorage.removeItem('pc_build');
            const shoppingCartWithoutUndefined =Object.values(state.build_pc).filter(e=>e!==undefined)
            let newShoppingCart = [...state.shoppingCart];
            shoppingCartWithoutUndefined.forEach(e=>{
                if(!Array.isArray(e)){
                    newShoppingCart.push(e)
                }else{
                    e.forEach(el=>newShoppingCart.push(el))
                }
            })

            newShoppingCart = fusionarProductos(newShoppingCart)
              
            window.localStorage.setItem('carrito', JSON.stringify(newShoppingCart))

            return{
                ...state,
                shoppingCart:newShoppingCart,
                build_pc:{peripherals:[]},
            };

        case ADD_DELIVERY_INFORMATION:

            return{
                ...state,
                purchaseOrder:{
                    deliveryData:payload,
                }
            };
        
        case ADD_COUNT_CART_CUSTOM:
            const cart8 = state.shoppingCart.map(e=>e);
            const itemInCart8 = cart8.find((item ,) => item._id === payload.product._id);
            let index8;
            if (itemInCart8) {
                if(itemInCart8.quantity+payload.cantidad <= payload.product.stock){
                    cart8.forEach((e,i)=>{
                        if (e._id === itemInCart8._id) 
                        index8 = i
                    })
                    const newob={
                        ...payload.product,
                        quantity:itemInCart8.quantity+payload.cantidad
                    }
                    cart8.splice(index8,1,newob)
                }
                
            } else {
                if(payload.product.stock>0 && payload.cantidad <= payload.product.stock){
                    cart8.push({ ...payload.product, quantity: payload.cantidad });
                }
            }

            window.localStorage.setItem('carrito', JSON.stringify(cart8))
            return {
                ...state,
                shoppingCart: cart8,
              };

        default:
            return{
                ...state
            }
    }
};


export default rootReducer;