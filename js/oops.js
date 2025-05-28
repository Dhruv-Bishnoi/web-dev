class animal {
    constructor(name){
        console.log("this is animal")
        this.name = name

    }
    eats(){
        console.log("khata hai")
    }
    run(){
        console.log("bhag raha hai")
    }

}

class loin extends animal {
    constructor(){
        console.log("this is loin")
    }
}

let a = animal("bunny")

let b = loin("sher")