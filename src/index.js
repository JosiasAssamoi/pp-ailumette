import  {Game} from "./Game"
import  {AilumetteGrid} from "./AilumetteGrid"
import readline  from "readline"
import { log } from "console";
import { RSA_X931_PADDING } from "constants";

// C'est parti  ¯\_(ツ)_/¯ //
const main = () =>{
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let lineSetting = null
let columnSetting= null
const lineStars = '***********************************************************************'

rl.question(lineStars+"\n\n(●'◡'●)\tBienvenue dans le jeu de l'allumette ca va chauffer\t(●'◡'●)\n\n"+lineStars+"\n\nCombien de lignes voulez vous ? ", function(line) {
    rl.question("combien de colonnes ", function(column) {

      lineSetting = parseInt(line)
      columnSetting = parseInt(column)

      if (Number.isNaN(lineSetting) || Number.isNaN(columnSetting)){
        log('Vous avez tapé des valeurs non numériques veuillez relancer svp ')
        rl.close()
       
      }
      let grid = new AilumetteGrid(lineSetting,columnSetting)
      new Game(grid).play(rl)
    });
});


}

main()