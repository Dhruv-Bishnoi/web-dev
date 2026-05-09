import fsn from "fs/promises"
import fs from "fs"
import path from "path"
let dirpath = "C:\\Users\\bishn\\Desktop\\codes\\sigma FSD\\ex1"
let files = await fsn.readdir(dirpath)
for (const item of files) {

    let ext = item.split(".")[item.split(".").length - 1]

    let folderPath = path.join(dirpath, ext)
    let oldpath = path.join(dirpath, item)
    let newpath = path.join(folderPath, item)

    if (ext != "js" && ext != "json" && item.split(".").length > 1) {

        if (!fs.existsSync(folderPath)) {
            await fsn.mkdir(folderPath)
        }
        await fsn.rename(oldpath, newpath)



    }



}