const express = require('express')
const app = express()
const port = process.env.PORT || 3000


app.get('/', (req, res) => {

    res.send("Luis Hernandez 201504497")
})

app.get('/jugar', (req, res) => {
    // obtiene los datos
  let turno = req.query.turno;
  let estado = req.query.estado;

  let tablero =crear_tablero(estado);

let movimiento = buscar_adelante_atras_derecha_izqueirda(tablero,turno);
 
  console.log(turno)
  console.log(movimiento)
  res.end(movimiento)
  
})

function buscar_adelante_atras_derecha_izqueirda(tablero,IA){
    let retador;
    if(IA==1){
        retador=0;
    }else{
        retador=1;
    }
    let posicion="";
    let contador=0;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if(tablero[x][y] ==IA){
            let tempX =x+1;
            let tempY  = y;
            // buscando hacia abajo
            if(tempX <8){  // esta dentro de los limites
                    while(tablero[tempX][tempY]==retador){
                        tempX++;
                        if(tempX >=8  || tablero[tempX][tempY]==IA){ // se salio de los limites o esoy en el camino
                            break;   
                        }
                        else if(tablero[tempX][tempY]==2) // encontre espacio libre para saltar
                        {
                            contador = tempX -x;
                            posicion = tempX +""+tempY;
                            break;
                            
                        }
                        
            
        
                    } 
            }

                // busacando hacia arriba
                tempX =x-1;
                tempY = y;
                if(tempX >=0){
                    while(tablero[tempX][tempY]==retador){
                        tempX--;
                        if(tempX <0  || tablero[tempX][tempY]==IA){ // se salio de los limites o estoy en el camino
                             break;   
                        }
                        else if(tablero[tempX][tempY]==2) // encontre espacio libre para saltar
                        {
                            if(contador < x-tempX){
                                contador = x-tempX;
                                posicion = tempX +""+tempY;
                                
                            }
                            break;
                            
                        }
        
                    } 

                }
                
                

             // buscando hacia la izquierda
                tempX =x;
                tempY = y-1;
                if(tempY >=0  ){ // se salio de los limites o esoy en el camino
                    while(tablero[tempX][tempY]==retador){
                        tempY--;
                        if(tempY <0  || tablero[tempX][tempY]==IA){ // se salio de los limites o esoy en el camino
                            break;   
                        }
                        else if(tablero[tempX][tempY]==2) // encontre espacio libre para saltar
                        {
                            if(contador < y-tempY){
                                contador = y-tempY;
                                posicion = tempX +""+tempY;
                                
                            }
                            break;
                            
                        }
    
                    }  
                }
                
                
                // buscando hacia la derecha
                tempX =x;
                tempY = y+1;
                if(tempY<8){

                    while(tablero[tempX][tempY]==retador){
                        tempY++;
                        if(tempY >8  || tablero[tempX][tempY]==IA){ // se salio de los limites o esoy en el camino
                            break;   
                        }
                        else if(tablero[tempX][tempY]==2) // encontre espacio libre para saltar
                        {
                            if(contador < tempY-y){
                                contador = tempY-y;
                                posicion = tempX +""+tempY;
                                
                            }
                            break;
                            
                        }
                        
            
    
                    } 

                }
                
           

            
            
          }                
            
            
        }
        
    }

    return posicion;
}

function crear_tablero(estado){

  // crea el tablero de 8*8
  let tablero = Array(8);
  for (let index = 0; index < 8; index++) {
      tablero[index]= new Array(8);     
  }
let contador =0;
  for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        tablero[x][y] = estado.charAt(contador);                
          contador++;
          
      }
      
  }
return tablero;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})