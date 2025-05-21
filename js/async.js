async function getdata() {
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve(450)
        
      }, 3500);
})
}


async function main() {
    console.log("hello world")
    console.log("how are you")

    let data = await getdata()
    console.log(data)

    console.log("data loding")


}



main()
