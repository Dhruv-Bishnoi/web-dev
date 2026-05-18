const username = document.getElementById("name")

const password = document.getElementById("pass")

const gmail = document.getElementById("mail")

const submitBtn = document.getElementById("submitBtn")



submitBtn.addEventListener("click",(e)=>{

    e.preventDefault()


    
   fetch("/signup",{

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

        console.log(data)

    })

})