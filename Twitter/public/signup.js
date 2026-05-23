const username = document.getElementById("name")

const password = document.getElementById("pass")

const gmail = document.getElementById("mail")

const submitBtn = document.getElementById("submitBtn")

const profile = document.getElementById("profile")



submitBtn.addEventListener("click",(e)=>{

    e.preventDefault()
if(

    !username.value ||

    !password.value ||

    !gmail.value

){

    alert("Please enter all fields")

    return

}





const file = profile.files[0]


    const formData = new FormData()
    

    formData.append("username", username.value)
    
    formData.append("password", password.value)
    
    formData.append("gmail", gmail.value)
    
    formData.append("profile", file)
    


    
    fetch("/signup",{

        method:"POST",

        body:formData

    })

    .then((res)=>res.json())

    .then((data)=>{

        console.log(data)

        
        if(data.success){
            alert("Signup Successful ,Please Login")
            window.location.href = "/login"

        }

        else{

            alert("Signup Failed")

        }

    })

})