const username = document.getElementById("name")

const password = document.getElementById("pass")

const gmail = document.getElementById("mail")

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click",(e)=>{

    e.preventDefault()


    fetch("/login",{

        

        method:"POST",
        

        headers:{
            "Content-Type":"application/json"
        },
        

        body:JSON.stringify({

            username:username.value,

            password:password.value,

            gmail:gmail.value

        })
        

    })

    .then((res)=>res.json())

    .then((data)=>{
        
        
        
        if(data.success){
            
           localStorage.setItem("user",JSON.stringify(data.user))
            window.location.href = "/"


            

        }

        else{

            alert("Invalid Credentials")

        }

    })

})