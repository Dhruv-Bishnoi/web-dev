const uploadBtn = document.getElementById("uploadBtn")
console.log(uploadBtn)
const imageInput = document.getElementById("imageInput")
const previewImage = document.getElementById("previewImage")

const postBtn = document.getElementById("postBtn")
const postText = document.getElementById("postText")
const postsContainer = document.getElementById("postsContainer")

let uploadedImageUrl = ""


// OPEN FILE PICKER
uploadBtn.addEventListener("click", () => {

    imageInput.click()

})


// IMAGE SELECT
imageInput.addEventListener("change", async () => {

    const file = imageInput.files[0]

    if(!file) return

    // PREVIEW
    previewImage.src = URL.createObjectURL(file)

    previewImage.classList.remove("hidden")


    // SEND TO BACKEND
    const formData = new FormData()

    formData.append("image", file)


    const response = await fetch("/upload", {

        method: "POST",

        body: formData

    })

    const data = await response.json()

    uploadedImageUrl = data.imageUrl

})


// CREATE POST
postBtn.addEventListener("click", () => {

    const text = postText.value

    if(text.trim() === "" && uploadedImageUrl === ""){
        return
    }

    const post = document.createElement("div")

    post.className = `
    border border-[#2f3336]
    rounded-2xl
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

                <div class="mt-2 text-lg">
                    ${text}
                </div>

                ${
                    uploadedImageUrl
                    ?
                    `
                    <img
                    src="${uploadedImageUrl}"
                    class="mt-4 rounded-2xl w-full max-h-[500px] object-cover"
                    >
                    `
                    :
                    ""
                }

            </div>

        </div>

    `

    postsContainer.prepend(post)

    // RESET
    postText.value = ""

    previewImage.src = ""

    previewImage.classList.add("hidden")

    uploadedImageUrl = ""

    imageInput.value = ""

})