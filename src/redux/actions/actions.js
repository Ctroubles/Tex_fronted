import { SET_STATE_VIEW_CARD, SET_STEP_BUILD_PC, ORDER_PRICE, GET_DETAIL_COMPONENT, FILTER_BY_CATEGORY, DELETE_FILTER_CATEGORY, PICK_ARMA_TU_PC, CLEAN_ARMA_TU_PC, EDIT_USER, ADD_TO_CART, INCREMENT_CART, DECREMENT_CART, REMOVE_ITEM_CART, CLEAN_SHOPPING_CART, FINALIZAR_ARMA_TU_PC, FILTER_BY_NAME, ADD_DELIVERY_INFORMATION, ADD_PAYMENT_METHOD,} from "./actions.types"
import axios from 'axios'
import { filterCategoryParams } from "../../helpers/Filter.helpers";
import url from "../../utils/deploy_back";


const orderByPrice = (payload) => {
    return{
        type: ORDER_PRICE,
        payload,
    }
};


const setStateViewCard = () => {
        return { type: SET_STATE_VIEW_CARD }
    
};

const getDetailComponent = (component) => {
    return {
        type: GET_DETAIL_COMPONENT,
        payload: component
    }
};


function filterByName(payload) {
    return {
            type: FILTER_BY_NAME,
            payload
        }    
};

const setStepBuildPc = (step) =>{
    return{
        type: SET_STEP_BUILD_PC,
        payload: step,
    }
}



const filterByCategory = (category, specificity,label)=>{
    return {type: FILTER_BY_CATEGORY, payload:{category,specificity,label}}
    
};

const deleteFilterCategory= ()=> {
    return {type:DELETE_FILTER_CATEGORY}
}


const pickArmaTuPc = (payload) =>{
    return {type:PICK_ARMA_TU_PC, payload}
}

const cleanArmaTuPc = () =>{
    return {type: CLEAN_ARMA_TU_PC}
}

const editUser = (email, props) =>{
    return async function(dispatch) {
        console.log(email);
        console.log(props);
        try {
            const res = await axios.put(`${url}/user?email=${email}`, props);
            return dispatch({
                type:"EDIT_USER",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//Shopping cart
const addToCart = (payload) => {
    return{
        type: ADD_TO_CART,
        payload
    }
}
const incrementCart = (payload) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get(`/id/${payload}`);
            const { shoppingCart } = getState();
            const indexItem = shoppingCart.findIndex((item) => item._id === payload);

            if (shoppingCart[indexItem]?.quantity < data.stock) {
                const newob = {
                    ...data,
                    quantity: shoppingCart[indexItem].quantity + 1,
                };

                const newCart = [...shoppingCart];
                newCart.splice(indexItem, 1, newob);
                window.localStorage.setItem('carrito', JSON.stringify(newCart));
                console.log(newCart);
                dispatch({
                    type: INCREMENT_CART,
                    payload: newCart,
                });
            } else {
                dispatch({
                    type: INCREMENT_CART,
                    payload: shoppingCart,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}
const decrementCart = (payload) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get(`/id/${payload}`);
            const { shoppingCart } = getState();
            const indexItem = shoppingCart.findIndex((item) => item._id === payload);

            if (shoppingCart[indexItem]?.quantity > 1) {
                const newob = {
                    ...data,
                    quantity: shoppingCart[indexItem].quantity - 1,
                };

                const newCart = [...shoppingCart];
                newCart.splice(indexItem, 1, newob);
                window.localStorage.setItem('carrito', JSON.stringify(newCart));
                dispatch({
                    type: DECREMENT_CART,
                    payload: newCart,
                });
            } else if(shoppingCart[indexItem]?.quantity <= 1) {
                console.log(shoppingCart);
                dispatch({
                    type: REMOVE_ITEM_CART,
                    payload: payload,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
}
const removeItemCart = (payload) => {
    return{
        type: REMOVE_ITEM_CART,
        payload
    }
}

const cleanShoppingCart= ()=>{
    return{
        type:CLEAN_SHOPPING_CART,
    }
};

const finalizarArmaTuPc= ()=>{
    return{
        type:FINALIZAR_ARMA_TU_PC,
    }
};

const addDeliveryInformation = (form) =>{
    return{
        type: ADD_DELIVERY_INFORMATION,
        payload: form,
    }
};




export {
     setStateViewCard,
     setStepBuildPc,
     filterByName,
     orderByPrice,
     getDetailComponent,
     filterByCategory,
     deleteFilterCategory,
     pickArmaTuPc,
     cleanArmaTuPc,
     editUser,
     addToCart,
     incrementCart,
     decrementCart,
     removeItemCart,
     cleanShoppingCart,
     finalizarArmaTuPc,
     addDeliveryInformation,
};