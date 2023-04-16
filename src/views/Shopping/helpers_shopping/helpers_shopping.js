const validators = (target,value) =>{
    let result = false;

    switch (target) {
        case "name":
            value.length<45?result=true:result=false;
            var regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
            if(regex.test(value))result = true
            else result = false
            if(value.length===0)result = true
            break;
        case "dni":
                if (!isNaN(value) && value.length<=8) result=true;
                else result =false
                if (value.length===0)result=true

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
        case "instructions":
            value.length<150?result=true:result=false;
            break;            
                     
        case "address":
            value.length<25?result=true:result=false;
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
                if(currentForm[prop].length>45 || currentForm[prop]==="")errors[prop]=true
                const regex = /^\S+(?:[\s]+\S+)+$/;
                if (!regex.test(currentForm[prop])) errors[prop]=true;
                break;
            case "dni":
                    if (isNaN(currentForm[prop]) || currentForm[prop].length!==8) errors[prop]=true;
                    break;     
            case "phone":
                    if (isNaN(currentForm[prop]) || currentForm[prop].length!==9) errors[prop]=true;
                    if (currentForm[prop].charAt(0)!=="9") errors[prop]=true;
                break;      
            case "email":
                const expresionRegular = /\S+@\S+\.\S+/;
                if (!expresionRegular.test(currentForm[prop])) errors[prop]=true;
                break;          
            case "instructions":
                if(currentForm[prop].length>150)errors[prop]=true;
                break;            
                         
            case "address":
                if(currentForm.ciudad.toLowerCase()==="trujillo"){
                    if (currentForm[prop]==="")errors[prop]=true
                };
                break;
            case "departamento":
                if (currentForm[prop].toLowerCase() ==="selecciona tu departamento" || currentForm[prop]==="")errors[prop]=true       
                 break;
            case "ciudad":
            if (currentForm[prop].toLowerCase() ==="selecciona tu ciudad" || currentForm[prop]==="")errors[prop]=true       
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