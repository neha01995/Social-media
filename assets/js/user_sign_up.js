// fetch elements by id
var form = document.getElementById("form");
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");

//show error messages
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className= "form-control error";
    const small =formControl.querySelector('small');
    small.innerText= message;

}
// show success outline
function showSucess(input){
    const formControl =input.parentElement;
    formControl.className= "form-control success";

}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSucess(input);

    }
    else{
        showError(input, "Email is not valid");
    }

}
// check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
      if(input.value.trim() ===""){
        showError(input,`${getFieldName(input)} is required`);  
      }
      else{
            showSucess(username);
        }

    });
}
// match password
function matchPassword(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,"Password do not match");
    }
    else{
        showSucess(input2);
    }
}

// do first letter uppercase
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check input length
function checkLength(input,min,max){
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} should be atleast ${min} characters`); 
    }
    else if(input.value.length>max){
        showError(input,`${getFieldName(input)} should be less than ${max} characters`); 
    }
    else{
        showSucess(input);
    }

}

// Add event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username,email,password,password2]);
    checkLength(username, 3,20);
    checkLength(password,4,20);
    checkEmail(email);
    matchPassword(password,password2);
    
    // // if username field is empty
    // if(username.value==""){
    //     showError(username,"username is required");
    // }else{
    //     showSucess(username);
    // }
    
    // // if email field is empty
    // if(email.value==""){
    //     showError(email,"email is required to fill");
    // }else if(!isValidEmail(email.value)){
    //         showError(email,"email is not valid");
    //  }
    // else{
    // showSucess(email);
    // }

    
   
    // // if password field is empty
    // if(password.value==""){
    //     showError(password,"password is required to fill");
    // }else{
    //     showSucess(password);
    // }
    
    // // if password2 field is empty
    // if(password2.value==""){
    //     showError(password2,"password2 is required to fill");
    // }else{
    //     showSucess(password2);
    // }


})