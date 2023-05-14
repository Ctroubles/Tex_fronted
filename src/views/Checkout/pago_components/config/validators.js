var regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;


const validators = (target,value) =>{
    let result = false;


    switch (target) {
        case "name":
            value.length<22?result=true:result=false;
            if(regexName.test(value))result = true
            else result = false
            if(value.length===0)result = true
            break;
        case "surname":
                value.length<25?result=true:result=false;
                if(regexName.test(value))result = true
                else result = false
                if(value.length===0)result = true

                break;     
        case "phone":
                if (!isNaN(value) && value.length<=9) result=true;
                else result =false
                 if (value.length===0)result=true
            break;      
        case "email":
            if(value.length <= 64)result=true
            else result= false
            break;                   

        default:
            break;
    }

    return result;
};



const validatorsLevel2 = (setErrorsForm, currentForm) =>{
    const errors= {};

    for(let prop in currentForm){
        switch (prop) {
            case "name":
                if(currentForm[prop].length>22 || currentForm[prop]==="")errors[prop]=true
                if (!regexName.test(currentForm[prop])) errors[prop]=true;
                break;   
            case "phone":
                    if (isNaN(currentForm[prop]) || currentForm[prop].length!==9) errors[prop]=true;
                    if (currentForm[prop].charAt(0)!=="9") errors[prop]=true;
                break;      
            case "email":
                const expresionRegular = /\S+@\S+\.\S+/;
                if (!expresionRegular.test(currentForm[prop])) errors[prop]=true;
                break;          
            case "surname":
                if(currentForm[prop].length>25 || currentForm[prop]==="")errors[prop]=true
                if (!regexName.test(currentForm[prop])) errors[prop]=true;
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