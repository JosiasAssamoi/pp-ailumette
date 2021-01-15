import readline  from "readline"
import { IA_NAME, PLAYER_NAME } from "./constant/players";
export class Game {

    constructor(grid){
        this.grid = grid
        this.looser = null
    }

    play(rl){

        this.drawGrid()
       

        const ia = ()=>{
    
            let randomLine = Math.floor(Math.random() * this.grid.line) + 1 
            //Si il n'y a pas de match sur la ligne trouvé on en cherche une autre 
            if (this.grid.countMatchesOnLine(randomLine)==0){
                ia()
            }
            console.log(IA_NAME+' turn');
            let randomMatch = Math.floor(Math.random()*this.grid.countMatchesOnLine(randomLine)) + 1
            //Un tout petit peu intelligente quand meme l'ia x)
            if (this.grid.countMatchesAvailable() == 2 ) {
                randomMatch = 1
            }
            this.grid.updateCells(randomLine,randomMatch)
           
            console.log('IA removed ',randomMatch.toString()+" matches from line "+randomLine.toString());
            this.drawGrid()
            if (this.grid.isEmpty()){
                this.looser = IA_NAME
                rl.close()
            }
            else{
                askQuestion()
            }
         }
        
        const askQuestion = () =>{
            rl.question("༼ つ ◕_◕ ༽つ "+PLAYER_NAME+" turn  \nLine : ", (line) => {
                rl.question("Match : ", (match) => {
                    match = parseInt(match)
                    line = parseInt(line)
                    const msg = this.validateInput(line,match)
                    if (msg !=''){
                        console.log(msg)
                        askQuestion(); 
                    }
                    else{
                        this.grid.updateCells(line,match)
                        console.log('Player removed ',+String(match)+" matches from line "+String(line));
                        this.drawGrid()
                        if (this.grid.isEmpty()){
                            this.looser = PLAYER_NAME
                            rl.close()
                        }
                        else{
                            ia()
                        } 
                    }
                     
            });
            }
            );
        }

        rl.on("close", () => {
            const msg =( this.looser == PLAYER_NAME ) ? 'You lost, too bad..' : this.looser == IA_NAME ? ' I lost.. snif.. but I’ll get you next time!!' : "Bye Bye Zzzz"
            console.log("\n"+msg+"\n");
            process.exit(0);
        });
 
        //lance l'interaction jusqua grille vide
        askQuestion()
  
  
    }

    drawHeaderOrFooter(column) {
        for (let i = 0 ; i < column*2; i++) {
            process.stdout.write('*')
        }
        process.stdout.write('\n')
    }

    drawGrid(){
       this.drawHeaderOrFooter(this.grid.column)
        for(const x of [...Array(this.grid.line).keys()])  {
        
            for(const y of [...Array(this.grid.column).keys()]){
                if (y==0 || y == this.grid.column){
                    process.stdout.write('*')
                }
                process.stdout.write(this.grid.grid[x][y])
                if ( y == this.grid.column-1){
                    process.stdout.write('  *')
                }
               
            }
            process.stdout.write('\n')
        }
        this.drawHeaderOrFooter(this.grid.column)
    }

    validateInput(line,matches){
        
        if (line == 0 || line > this.grid.line){
            return 'Error: this line is out of range'
        }
        else if ( Number.isNaN(line) || Number.isNaN(matches) || (line < 0) || (matches < 0) || (typeof line != "number") || (typeof matches != "number") ){
            return 'Error: invalid input (positive number expected)'
        }
        else if ( matches ==0 ){
            return 'Error: you have to remove at least one match'
        }
        else if (this.grid.countMatchesOnLine(line) < matches){
            return 'not enough matches on this line'
        }
        return ''
    }
}