// let t1=document.querySelector(".text_dis2")
// console.log(t1)
// let t2=document.querySelector(".text_dis3")
// console.log(t1)
// let t3=document.querySelector(".text_dis4")
// console.log(t1)



// async function text2() {
    
//     setTimeout(() => {
//         t1.innerHTML = `readling your file...`
//     }, random1);  
// }
// async function text3() {
    
//     setTimeout(() => {
//         t2.innerHTML = `passward dectecting ...`
//     }, random2);  
// }
// async function text4() {
    
//     setTimeout(() => {
//         t3.innerHTML = `sending you data to server ...`
//     }, random3);  
// }
// async function main() {
//     await text2()
//     await text3()
//     await text4()
// }


// let random1 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
// console.log(random1)
// let random2 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
// console.log(random2)
// let random3 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
// console.log(random3)
    
    
// main()
async function main() {
    
    setInterval(() => {
    let last = document.body.lastElementChild
    if(last.innerHTML.endsWith("...")){
            last.innerHTML = last.innerHTML.slice(0,last.innerHTML.length-3)
    }

    else{
        last.innerHTML = last.innerHTML + "."
    }
        
    }, 700);

    let text = ["Initialized Hacking now reading your data",
                    "Reading your Files",
                    "Password files Detected",
                    "Sending all passwords and personal files to server",
                    "Cleaning up"]

                for (const item of text) {
                    await additem(item)
                }

            }
        


async function additem(item) {
    await randomdely()
    let div = document.createElement("div")
    div.innerHTML = item
    document.body.append(div)
}

async function randomdely() {
    return new Promise((resolve, reject) => {
        timeout = 1+6* Math.random()
        setTimeout(() => {
            resolve()
        }, timeout*1000);    })
    
}


main()