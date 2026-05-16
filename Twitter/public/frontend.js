
const uploadBtn = document.getElementById("uploadBtn")

const imageInputimg = document.getElementById("imageInput")

const preview = document.getElementById("preview")

const submitBtn = document.getElementById("submitBtn")

const textarea = document.getElementById("comment")

const con = document.querySelector(".postsArea")

textarea.addEventListener("input", ()=>{

    textarea.style.height = "auto"

    textarea.style.height = textarea.scrollHeight + "px"

})


// OPEN FILE PICKER
uploadBtn.addEventListener("click", () => {

    textarea.style.height = "100px"

    
    imageInputimg.click()

})




// IMAGE PREVIEW
imageInputimg.addEventListener("change", () => {
    
    let file = imageInputimg.files[0]
    console.log(file)
    
    if (file) {
        
        preview.src = URL.createObjectURL(file)
        
    }
    
})






// CREATE POST FUNCTION
function createPost(postData) {
    
    const post = document.createElement("div")
    
    
    post.className = `
    border-b border-[#2f3336]
    text-[#rgb(231, 233, 234);]
    
    p-4
    `
    
    
    post.innerHTML = `

    <div class="flex gap-3">
    
    <img
    src="https://pbs.twimg.com/profile_images/2020848627246313472/WJxfmupz_400x400.jpg"
    class="w-12 h-12 rounded-full object-cover"
    >
    
    <div class="w-full">
    
    <div class="font-bold">
    Beniwal
    </div>
    
    <div class="mt-2 text-[17px] whitespace-pre-wrap break-words">${postData.caption}</div>
    
    ${
        postData.image
        ?
        `
        <img
        src="${postData.image}"
        class="mt-4 rounded-2xl w-full max-h-[500px] object-cover"
        >
        `
        :
        ""
    }
    
    </div>
    
    </div>
    
    `
    
    
    con.prepend(post)
    
}





async function loadPosts() {

    const response = await fetch("/posts")

    const posts = await response.json()

    posts.forEach(post => {

        createPost(post)

    })

}


submitBtn.addEventListener("click", (e) => {
    
    e.preventDefault()
    
    const formData = new FormData()
const caption = textarea.value.trimStart()
    const file = imageInputimg.files[0]

    formData.append("image", file)
    formData.append("caption", caption)
    



    if (caption === "" && !file) {
        return
    }


    fetch("/create-post", {

            method: "POST",
            body: formData

        })
        .then((res) => res.text())

        .then((data) => {
            loadPosts()

            
      
            // CLEAR INPUTS
            textarea.value = ""

            preview.src = ""

            imageInputimg.value = ""


        })


  




})

loadPosts()