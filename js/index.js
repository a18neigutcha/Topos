
const TOPO_INACTIVO=0;
const TOPO_ACTIVO=1;
const TOPO_GOLPEADO=-1;
const CONEJO_ACTIVO=2;
const CONEJO_GOLPEADO=-2;

window.onload=function(){

    datos_juegos={
        nivel:1,
        puntos:0,
        partida:[{timeRandom:0,timeSiguiente:0,timeDuracion:0}]
    };
    datos_topos={
        topos:[{nombre:"topo1",estado:TOPO_INACTIVO , nanimacion:0 },
                {nombre:"topo2",estado:TOPO_INACTIVO, nanimacion:0 },
                {nombre:"topo3",estado:TOPO_INACTIVO, nanimacion:0},
                {nombre:"topo4",estado:TOPO_INACTIVO, nanimacion:0},
                {nombre:"topo5",estado:TOPO_INACTIVO, nanimacion:0},
                {nombre:"topo6",estado:TOPO_INACTIVO, nanimacion:0},
                {nombre:"topo7",estado:TOPO_INACTIVO, nanimacion:0},
                {nombre:"topo8",estado:TOPO_INACTIVO, nanimacion:0},
                {nombre:"topo9",estado:TOPO_INACTIVO, nanimacion:0}]
    };

    var modelo={
        init:function(){

        },
        datos_nivel:function(){
            return datos_juegos.nivel;
        },
        dame_topos:function(){
            return datos_topos.topos;
        },
        dame_puntuacion:function(){
            return datos_juegos.puntos;
        },
        activa_topo:function(numTopo,estado_topo){           
            datos_topos.topos[numTopo].estado=estado_topo;
        },
        reiniciaAnimacion:function(pos_topo){
            datos_topos.topos[pos_topo].nanimacion=0;
            datos_topos.topos[pos_topo].estado=TOPO_INACTIVO;
            
        },
        pasoSiguiente:function(){
            for(let i=0;i<datos_topos.topos.length;i++){
                
                if(datos_topos.topos[i].estado==TOPO_ACTIVO){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==8){
                        modelo.reiniciaAnimacion(i);
                    }
                }
                if(datos_topos.topos[i].estado==TOPO_GOLPEADO){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==4){
                        modelo.reiniciaAnimacion(i);
                    }
                }
                if(datos_topos.topos[i].estado==CONEJO_ACTIVO){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==8){
                        modelo.reiniciaAnimacion(i);
                    }
                }
                if(datos_topos.topos[i].estado==CONEJO_GOLPEADO){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==4){
                        modelo.reiniciaAnimacion(i);
                    }
                }
            }

        },
        matar_topo:function(pos_topo){
            if(datos_topos.topos[pos_topo].estado==TOPO_ACTIVO){
                datos_topos.topos[pos_topo].estado=TOPO_GOLPEADO;
                datos_topos.topos[pos_topo].nanimacion=0;
                datos_juegos.puntos++;
            }else if(datos_topos.topos[pos_topo].estado==CONEJO_ACTIVO){
                datos_topos.topos[pos_topo].estado=CONEJO_GOLPEADO;
                datos_topos.topos[pos_topo].nanimacion=0;
                datos_juegos.puntos--;
            }
            
        },
        iniciaJuego:function(){
            
            datos_juegos.puntos=0;
            datos_juegos.timeDuracion=0;
            datos_juegos.terminarPartida=0;
            datos_juegos.timeRandom=0;
        },
        damePartida:function(){
            return datos_juegos.partida;
        },
        reiniciarPartida:function(){
            datos_juegos.puntos=0;
            datos_juegos.timeDuracion=0;
            datos_juegos.terminarPartida=0;
            datos_juegos.timeRandom=0;
        }


    }

    var controlador={
        init:function(){
            vista.init();
            //controlador.iniciarPartida();
            
        },
        pasoSiguiente: function(){
            //ESTO LO HAREMOS CADA 150ms. 

            modelo.pasoSiguiente();

            lista_topos=modelo.dame_topos();
            vista.pinta_topos(lista_topos);
            vista.pinta_puntuacion(modelo.dame_puntuacion());
        },
        activa_topo_aleatorio:function(){
            let topo_random=Math.floor(Math.random() * 9);
            let estado_random=Math.floor(Math.random() * CONEJO_ACTIVO)+TOPO_ACTIVO; 
            modelo.activa_topo(topo_random,estado_random);
        },
        matar_topo:function(pos_topo){
            modelo.matar_topo(pos_topo);
            
        },
        iniciarPartida:function(){
            modelo.iniciaJuego();
            controlador.terminarPartida();
            vista.reiniciarBarra();
            let partida=modelo.damePartida();
            partida.timeSiguiente = window.setInterval(controlador.pasoSiguiente, 150);
            partida.timeRandom = window.setInterval(controlador.activa_topo_aleatorio, 1300);
            partida.timeDuracion = window.setInterval(vista.actualizaBarra,300);

            setTimeout(controlador.terminarPartida, 30001);
        },
        terminarPartida:function(){
            let partida=modelo.damePartida();
            clearInterval(partida.timeSiguiente);
            clearInterval(partida.timeRandom);
            clearInterval(partida.timeDuracion);
        }



    }

    var vista={
        init:function(){
            vista.evento_pegar_topo();
            vista.eventBotInit();
            
        },
        //PINTA LOS TOPOS COMO ESTAN EN LOS DATOS
        pinta_topos:function(topos){
            let pantalla=document.getElementById("pantalla_juego");
            //console.log(topos);
            /**
             * Genera los topos
             */
            for(let i=0;i<topos.length;i++){
                camp_topo=document.getElementsByClassName("img_topo");
                
                if ( topos[i].estado==TOPO_INACTIVO){                      
                    camp_topo[i].src="img/hole.png";
                } else if(topos[i].estado==TOPO_ACTIVO){
                    camp_topo[i].src="img/topo"+topos[i].nanimacion+".png";
                }else if(topos[i].estado==TOPO_GOLPEADO){
                    camp_topo[i].src="img/golpe"+topos[i].nanimacion+".png";
                }else if(topos[i].estado==CONEJO_ACTIVO){
                    camp_topo[i].src="img/conejo"+topos[i].nanimacion+".png";
                }else{
                    camp_topo[i].src="img/conejoGolpe"+topos[i].nanimacion+".png";
                }
            }

        },
        pinta_puntuacion:function(puntosActuales){
            let puntos=document.getElementById("puntuacion");
            puntos.innerHTML=puntosActuales;
        },
        evento_pegar_topo:function(){
            let camp_topos=document.getElementsByClassName("topo");

            for(let i=0;i<camp_topos.length;i++){
                camp_topos[i].addEventListener("click",function(){
                    controlador.matar_topo(i);
                });
            }

        },
        actualizaBarra:function(){
            let elem = document.getElementById("myBar");
            let width=parseInt(elem.innerText);
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width;
            console.log("Time",width);

        },
        eventBotInit:function(){
            document.getElementById("botInit").addEventListener("click",controlador.iniciarPartida);
        },
        reiniciarBarra:function(){
            let elem = document.getElementById("myBar");
            elem.style.width = 0 + "%";
            elem.innerHTML=0;
        }


    }

    controlador.init();
}

