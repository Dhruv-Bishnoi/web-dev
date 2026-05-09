use("curdop")

db.createCollection("courses")
db.courses.insertOne({
    name:"dhruv",
    rollno:43,
    class:"BCA",
    SEM:4,
})

 let a = db.courses.find({rollno:43})

 db.courses.updateOne({rollno:43},{$set: {rollno:29}} )