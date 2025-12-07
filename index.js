var InputName = document.getElementById("nameinput")
var InputMail = document.getElementById("maillogin")
var InputPass = document.getElementById("passlogin")
var SignUpbtn = document.getElementById("signup")
var CheckMail = document.getElementById("mailinput")
var CheckPass = document.getElementById("passinput")
if(localStorage.getItem("logininputs")==null){
    var loginArray = []
}
else{
    var loginArray = JSON.parse(localStorage.getItem("logininputs"))
}
function add_details(){
    var details = {
    name : InputName.value ,
    mail : InputMail.value ,
    pass : InputPass.value
}
loginArray.push(details)
}

SignUpbtn.addEventListener('click' , function(){
    var mailregex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    if(
    InputName.value == "" || InputMail.value == "" || InputPass.value == ""
){
  document.getElementById("wrong").classList.remove("d-none")  
}
    else if(mailregex.test(InputMail.value)){
        document.getElementById("success").classList.remove("d-none")
        document.getElementById("wrong").classList.add("d-none") 
        document.getElementById("incorrect").classList.add("d-none")
        document.getElementById("exists").classList.add("d-none")
        if(exist()==false){
            document.getElementById("exists").classList.remove("d-none")
            document.getElementById("success").classList.add("d-none")
        }
        else{
            add_details()
        localStorage.setItem("logininputs" , JSON.stringify(loginArray))
        }
    }
    else{
        document.getElementById("success").classList.add("d-none")
        document.getElementById("wrong").classList.add("d-none") 
        document.getElementById("incorrect").classList.remove("d-none")
        document.getElementById("exists").classList.add("d-none")
    }
})

function check(){
    for( var i =0 ; i<loginArray.length ; i++){
        if(CheckMail.value==loginArray[i].mail && CheckPass.value==loginArray[i].pass){
        localStorage.setItem("nameinput" , loginArray[i].name)
         location.href = "./Home.html"
        document.getElementById("incorrect").classList.add('d-none')
    }
    else if( CheckMail.value == "" || CheckPass.value == ""){
        document.getElementById("wrong").classList.remove("d-none")  
    }
    else{
        document.getElementById("incorrect").classList.remove('d-none')
        document.getElementById("wrong").classList.add("d-none")  
    }
    }
}


function exist(){
    for(var i=0 ; i<loginArray.length ; i++){
            if(InputMail.value==loginArray[i].mail){
                 return false ;
            }
        }
}


document.getElementById("username").innerHTML = InputName