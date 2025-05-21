function adjective(){
    let a ="Crazy"
    let b ="Amazing"
    let c ="Fire"

    let ran_adj = Math.floor(Math.random()*3)

    {
        switch (ran_adj) {
            case 0:
                return a
                break
            case 1:
                return b
                break
            case 2:
                return c
                break
            default:
                break
        }
    }


}
function shopname(){
    let a="Engine";
    let b="Foods";
    let c="Garments";

    let ran_noun = Math.floor(Math.random()*3)

    {
        switch (ran_noun) {
            case 0:
                return a
                break
            case 1:
                return b
                break
            case 2:
                return c
                break
            default:
                break
        }
    }
}

function other_word(){
    let a="Bros";
    let b="Limited";
    let c="hub";

    let ran_other = Math.floor(Math.random()*3)

    {
        switch (ran_other) {
            case 0:
                return a
                break
            case 1:
                return b
                break
            case 2:
                return c
                break
            default:
                break
        }
    }
}

console.log( ` The new business name is :${adjective()} ${shopname()} ${other_word()}`)





