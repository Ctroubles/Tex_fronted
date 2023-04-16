import { isValid, parseISO } from 'date-fns'


const validators = (target,value) =>{
    let result = false;

    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
    const regexNoNumbers = /^[^0-9]+$/;



    switch (target) {
        case "name":
            value.length<20?result=true:result=false;
            if(regex.test(value))result = true
            else result = false
            if(value.length===0)result = true
            break;        
        case "surname":
            value.length<25?result=true:result=false;
            if(regex.test(value))result = true
            else result = false
            if(value.length===0)result = true
            break;
        case "DNI":
                if (!isNaN(value) && value.length<=8) result=true;
                else result =false
                if (value.length===0)result=true
                break;     
        case "phoneNumber":
                if (!isNaN(value) && value.length<=9) result=true;
                else result =false
                 if (value.length===0)result=true
            break;      
        case "address":
            value.length<25?result=true:result=false;
            break;
        case "city":
            value.length<15?result=true:result=false;
            if (!regexNoNumbers.test(value)) result = false
            if(value.length===0)result = true
            break;
        case "birthday":
            // const esFechaValida = isValid(parseISO(value))
            // if (esFechaValida) result=true
            result = true
            break;
        case "region":
            value.length<15?result=true:result=false;
            if (!regexNoNumbers.test(value)) result = false
            if(value.length===0)result = true
            break;
             

        default:
            break;
    }

    return result;
};



const validatorsLevel2 = (setErrorsForm, currentForm) =>{
    const errors= {};

    const regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;


    for(let prop in currentForm){
        switch (prop) {
            case "name":
                if(currentForm[prop].length>20 || currentForm[prop]==="")errors[prop]=true
                if (!regexName.test(currentForm[prop])) errors[prop]=true;
                break;
            case "surname":
                if(currentForm[prop].length>25 || currentForm[prop]==="")errors[prop]=true
                if (!regexName.test(currentForm[prop])) errors[prop]=true;
                break;
            case "DNI":
                if(currentForm[prop]){
                    if (isNaN(currentForm[prop]) || currentForm[prop].length!==8) errors[prop]=true;
                }
                    break;     
            case "phoneNumber":
                if(currentForm[prop]){
                    if (isNaN(currentForm[prop]) || currentForm[prop].length!==9) errors[prop]=true;
                    if (currentForm[prop].charAt(0)!=="9") errors[prop]=true;
                }
                break;      
            case "birthday":
                if(currentForm[prop]){
                    const minDate = new Date('1907-03-04');
                    const maxDate = new Date('2023-03-20');
                    
                    function validarFecha(date) {
                    const fecha = new Date(date);
                    return fecha >= minDate && fecha <= maxDate;
                    }
                    if (!validarFecha(currentForm[prop])) errors[prop]=true
                }
                 break;        
            case "address":
                if(currentForm[prop]){
                    if (currentForm[prop].length>25)errors[prop]=true
                };
                break;
            case "region":
                if(currentForm[prop]){
                    if (currentForm[prop].toLowerCase() ==="selecciona tu departamento" || currentForm[prop]==="")errors[prop]=true       
                }
                 break;
            case "ciudad":
                if(currentForm[prop]){
                    if (currentForm[prop].toLowerCase() ==="selecciona tu ciudad" || currentForm[prop]==="")errors[prop]=true       
                }
                break;
    
            default:
                break;
         }
    }
    setErrorsForm(errors)
    return errors;
};



export{
    validators,
    validatorsLevel2
}