import { Cell } from "./Cell"


export class AilumetteGrid {
 
    constructor(line,column){
        this.line = line 
        this.column = column
        this.grid = []
        for(const x of [...Array(line).keys()]) {
            this.grid[x] = []
            for(const y  of [...Array(column).keys()]){
                let cell = new Cell()
                this.grid[x].push(cell.content)
            }
        }
    }

    updateCells(x,matches){
       let deleted = 0
       let j = 0
       while  ( deleted!=matches && j < this.column ){
        if (this.grid[x-1][j] == Cell.choices[1]){
            this.grid[x-1][j] = Cell.choices[0]
            deleted++   
           // console.log('apres ',this.grid[x-1][j], 'j = ',j , 'x =',x-1 , 'deleted ',deleted,' matches',matches,typeof matches, deleted == matches)     
        }
        j++
       }
    }


    isEmpty(){
        // on reduit la liste en 1D
        const flatGrid = [].concat.apply([], this.grid);
        //On cherche une valeur == "|"
        const found = flatGrid.indexOf(Cell.choices[1]);
        return found ==-1
    }

    countMatchesOnLine(line){
        let count = 0 
        this.grid[line-1].forEach(element => {
            if ( element == Cell.choices[1] ) {
                count++
            }
        })  

        return count
    }
    countMatchesAvailable(){
        let count = 0
        for (let  line=0 ; line < this.line ; line++) {
            this.grid[line].forEach(element => {
                if ( element == Cell.choices[1] ) {
                    count++
                }
            }) 
        }
        return count
    }




}