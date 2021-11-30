//Clase para crear a los dos jugadores con el private (incluye metodos get y set)
class Jugador {

    #nombre
    #caraDado1
    #caraDado2

    constructor(nombre) {
        this.#nombre = nombre
        this.#caraDado1 = 0
        this.#caraDado2 = 0

    }

    setNombre(nombre) {
        this.#nombre = nombre
    }
    getNombre() {
        return this.#nombre
    }
    setcaraDado1(cara1) {
        this.#caraDado1 = cara1
    }
    getcaraDado1() {
        return this.#caraDado1
    }

    setcaraDado2(cara2) {
        this.#caraDado2 = cara2
    }
    getcaraDado2() {
        return this.#caraDado2
    }

}

// contador de los juegos,inicio de cada juego y ganador del torneo
class JuegoDados {

    numeroJuego
    juegoJugador1
    juegoJugador2
    ganadorRonda = ""
    constructor(numerojuego, player1, player2) {
        this.numeroJuego = numerojuego
        this.juegoJugador1 = player1
        this.juegoJugador2 = player2

    }

    tirarDados() {

        this.juegoJugador1.setcaraDado1(Math.round((Math.random() * 5) + 1))  
        this.juegoJugador1.setcaraDado2(Math.round((Math.random() * 5) + 1)) 
        this.juegoJugador2.setcaraDado1(Math.round((Math.random() * 5) + 1))  
        this.juegoJugador2.setcaraDado2(Math.round((Math.random() * 5) + 1))  

    }
    determinaGanador() {

        if (((this.juegoJugador1.getcaraDado1() + this.juegoJugador1.getcaraDado2()) == 7)
            && ((this.juegoJugador2.getcaraDado1() + this.juegoJugador2.getcaraDado2()) != 7))
            return this.juegoJugador1.getNombre()
        else if (((this.juegoJugador2.getcaraDado1() + this.juegoJugador2.getcaraDado2()) == 7)
            && ((this.juegoJugador1.getcaraDado1() + this.juegoJugador2.getcaraDado2()) != 7))
            return this.juegoJugador2.getNombre()
        else return null;


    }

}
//Metodos crear, jugadar y resultado
class TorneoDados {

    jugadas = new Array() 
    #juegosGanadosJugador1
    #juegosGanadosJugador2

    setJuegosGanadosJugador1(ganadasJ1) {
        this.#juegosGanadosJugador1 = ganadasJ1
    }
    getJuegosGanadosJugador1() {
        return this.#juegosGanadosJugador1
    }
    setJuegosGanadosJugador2(ganadasJ2) {
        this.#juegosGanadosJugador2 = ganadasJ2
    }
    getJuegosGanadosJugador2() {
        return this.#juegosGanadosJugador2
    }



    crear(p1, p2) {
        console.log("THE TOURNAMET STARTED: " + p1.getNombre() + " AND " + p2.getNombre())

        this.#juegosGanadosJugador1 = 0
        this.#juegosGanadosJugador2 = 0

    }
    jugar() {
        //Inicia 
        let limiteWin = 3
        let i = 1;
        let victoria = false
       
        
        let messageGanadorRonda =""

        do {
            //se tira los dados y se ponen los nombres
            let partida = new JuegoDados(i, p1, p2)
            partida.tirarDados()
            //Inicia
            let ganador = partida.determinaGanador()
            
            //se determina al ganador por ronda

            if(ganador === p1.getNombre()){

                this.#juegosGanadosJugador1++
                messageGanadorRonda = p1.getNombre()
            }
            if(ganador === p2.getNombre()){

                this.#juegosGanadosJugador2++
                messageGanadorRonda = p2.getNombre()
            }
            if(ganador === null){

                messageGanadorRonda="Empate"
            }
        
            partida.ganadorRonda = messageGanadorRonda


            
            //ganador de la ronda o si empata, se va al arreglo
            this.jugadas.push(partida)

            //si ha llegado al limite de ganadas para ganar el torneo
            if(this.#juegosGanadosJugador1 ===limiteWin || this.#juegosGanadosJugador2===limiteWin){
                victoria = true
            }

            i++



            //se repite hasta que uno llegue a las 3 ganadas
        } while (victoria === false)



    }


    resultado() {
        //como se gana
        if(this.#juegosGanadosJugador1===3){

            return p1.getNombre()
        }else{

            return p2.getNombre()

        }


    }




}

//jugadores
let p1 = new Jugador("pedro")
let p2 = new Jugador("antonio")

let tournament = new TorneoDados()
tournament.crear(p1, p2)
tournament.jugar()
let messageGanadorTorneo = tournament.jugadas

//jugador por ronda
for(let i =0; i<messageGanadorTorneo.length; i++ ){

    console.log("WINNER OF THER MATCH: " + (i+1) + " IS: " + messageGanadorTorneo[i].ganadorRonda)
}

//ganador del juego

console.log("EL GANADOR DEL TORNEO ES: " + tournament.resultado())