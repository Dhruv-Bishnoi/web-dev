const formData = new FormData()


const uploadBtn = document.getElementById("uploadBtn")

const imageInputimg = document.getElementById("imageInput")

const preview = document.getElementById("preview")

const submitBtn = document.getElementById("submitBtn")

const textarea = document.getElementById("comment")

const con = document.querySelector(".postsArea")




// OPEN FILE PICKER
uploadBtn.addEventListener("click", () => {

    imageInputimg.click()

})




// IMAGE PREVIEW
imageInputimg.addEventListener("change", () => {

    let file = imageInputimg.files[0]

    if(file){

        preview.src = URL.createObjectURL(file)

    }

})






// CREATE POST FUNCTION
function createPost(postData){

    const post = document.createElement("div")
    
    
    post.className = `
    border-b border-[#2f3336]
    text-white
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
        
        <div class="mt-2 text-[17px]">
        ${postData.caption}
            </div>
            
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








// POST BUTTON
submitBtn.addEventListener("click", (e) => {
    
    e.preventDefault()
    
    const caption = textarea.value.trim()
    
    const image = preview.src
    
    
    if(caption === "" && image === ""){
        return
    }
    
    
    formData.append("caption" , caption)
    formData.append("image" , image)
    


 fetch("/upload" ,{
        method:"post",
        body:"fromData"
    })

    

    // SAVE IN ARRAY
    allPosts.push(postData)


    // SAVE IN LOCAL STORAGE
    localStorage.setItem("posts", JSON.stringify(allPosts))


    // SHOW POST
    createPost(postData)



    // RESET
    textarea.value = ""

    preview.src = ""

})