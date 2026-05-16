const username = document.getElementById("Username") 
const passward = document.getElementById("passward") 
const gmail = document.getElementById("gmail") 

const userdata = new FormData()

username.addEventListener("change",()=>{

    
const userN = username.value
console.log(userN)
userdata.append('username',userN)


})
passward.addEventListener("change",()=>{

const pass = passward.value
console.log(pass)
userdata.append('passward' ,pass)
})
gmail.addEventListener("change",()=>{

const valu = gmail.value

userdata.append('gmail',gmail)
})



fetch("/login", {
    method:"post",
    body:userdata

    
})
