

export class Cell {
    
    static  choices= [' ','|']
    constructor(choiceNumber=Math.floor(Math.random()*Cell.choices.length)){
        this.content = Cell.choices[choiceNumber]

    }


}