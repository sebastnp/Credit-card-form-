//CARD HOLDER
const nameText = document.getElementById('cardHolder-name')
const nameInput = document.getElementById('cardHolder')
const nameError = document.getElementById('cardholder-error')

//CARD NUMBER
const numberText = document.getElementById('card-number')
const numberInput = document.getElementById('cardNumber')
const numberError =document.getElementById('cardnumber-error')

//EXP. DATE
//MM
const mmText = document.getElementById('card-mm')
const mmInput = document.getElementById('input-cardMonth')
const mmError = document.getElementById('error-mm')
//YY
const yyText = document.getElementById('card-yy')
const yyInput= document.getElementById('input-cardYear')
const yyError = document.getElementById('error-yy')

//CVC
const cvcText = document.getElementById('card-cvc')
const cvcInput= document.getElementById('input-cvc')
const cvcError = document.getElementById('error-cvc')

//FORM
const formBt = document.getElementById('form-input')
const form = document.getElementById('cardForm')

//COMPLETED
const completed = document.getElementById('completed')

nameInput.addEventListener('input', (e)=>{
    //valido que si no hay nada en el input se ponga el placeHolder
    if(nameInput.value == '') nameText.innerText = 'JANE APPLESEED'
    else nameText.innerText = nameInput.value
})

numberInput.addEventListener('input', (e)=>{
    
    //usamos e.target.value por que vamos a ir modificando lo que escribimos
    const inputValue = e.target.value
    //validando que se rellene la card 
    if(numberInput.value == '') numberText.innerText = '0000 0000 0000 0000'
    else numberText.innerText = numberInput.value
    //abajo esta el comentario 
    numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim()
    //se usa la funcion para validar 
    validate(numberInput, numberError)

    /*
     //una expesion regular en JS es un objeto y tiene sus metodos
    const regExp = /[A-z]/g
    if(regExp.test(numberInput.value)) showError(numberInput, numberError, 'Wrong Format', true)
    else{
        //usamos replace para cambiar lo que tipeamos y guardamos dentro del valor sin que se pueda dar espacios
        //el segundo replace es para dar el espacio automatico cada 4 num, trim es un metodo para eliminar el espacio final
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim()
    }
     */
})

mmInput.addEventListener('input', ()=>{
    if(mmInput.value=='') mmText.innerText='00'
    else mmText.innerText = mmInput.value
    validate(mmInput, mmError)
})

yyInput.addEventListener('input', ()=>{
    if(yyInput.value=='')yyText.innerText='00'
    else yyText.innerText = yyInput.value
    validate(yyInput, yyError)
})

cvcInput.addEventListener('input', ()=>{
    if(cvcInput.value =='') cvcText.innerText = '000'
    else cvcText.innerText = cvcInput.value
    validate(cvcInput, cvcError)
})

    let nameValidate = false;
    let numberConf = false;
    let mmConf = false;
    let yyConf = false;
    let cvcConf = false;

formBt.addEventListener('click', (e)=>{
    e.preventDefault()

    //CREO VARIABLES PARA QUE EL FORMULARIO SE ENVIE SI ESTAN TODAS TRUE 

    //CARHOLDER
    if(isFilled(nameInput, nameError) == true){
        nameValidate = true;
    }else{
        nameValidate = false;
    }

    //CARD NUMBER
    //una vez que verifica que es true (que el campo si esta lleno)
    if(isFilled(numberInput, numberError) == true){
        if(numberInput.value.length == 19){
            showError(numberInput, numberError, '', false)
            numberConf = true;
        }else{
            showError(numberInput, numberError, 'Complete the field', true)
            numberConf = false;
        }   
    }
    //MM
    if(isFilled(mmInput, mmError) == true){
        if(parseInt(mmInput.value) > 0 && parseInt(mmInput.value) <= 12){
            showError(mmInput, mmError, '', false)
            mmConf = true
        }else{
            showError(mmInput, mmError, 'Wrong month', true)
            mmConf = false
        }
    }
    //YY
    if(isFilled(yyInput, yyError)==true){
        if(parseInt(yyInput.value) >= 22 && parseInt(yyInput.value) <= 27){
            showError(yyInput, yyError, '', false)
            yyConf = true
        }else{
            showError(yyInput, yyError, 'Wrong year', true)
            yyConf = false
        }
    }
    //CVC
    if(isFilled(cvcInput, cvcError) == true){
        if(cvcInput.value.length == 3){
            showError(cvcInput, cvcError, '', false)
            cvcConf = true
        }else{
            showError(cvcInput, cvcError, 'Complete the field', true)
            cvcConf = false
        }
    }

    if(nameValidate == true && numberConf == true && mmConf == true && yyConf == true && cvcConf == true){
        form.style.display = 'none'
        completed.style.display = 'block'
    }
    
})

//FUNCIONES 

//para mostrar un error
const showError = (inputDiv, errorDiv, msg, show)=>{
    if(show){
        errorDiv.innerText = msg
        inputDiv.style.borderColor = '#FF0000'
    }else{
        errorDiv.innerText = ''
        inputDiv.style.borderColor = 'hsl(270, 3%, 87%)'
    }
}

//para indicar si hay una letra entre los numeros
const validate = (inputDiv, errorDiv) =>{
    const regExp = /[A-z]/g
    if(regExp.test(inputDiv.value)){
        showError(inputDiv, errorDiv, 'Only Numbers', true)
    }else{
        showError(inputDiv, errorDiv, '', false)
    }
}

//para validar si el campo esta vacio
//retorna un true o false segun eso indica si el campo esta lleno o vacio 
const isFilled = (inputDiv, errorDiv) =>{
    if(inputDiv.value.length >0){
        showError(inputDiv, errorDiv , '', false)
        return true
    } else{
        showError(inputDiv, errorDiv, "can't be empty", true)
        return false
    } 
}
