
window.onload=function(){

    datos_juegos={
        nivel:1,
        puntos:0
    };
    datos_topos={
        topos:[{nombre:"topo1",estado:0 , nanimacion:0 },
                {nombre:"topo2",estado:0, nanimacion:0 },
                {nombre:"topo3",estado:0, nanimacion:0},
                {nombre:"topo4",estado:0, nanimacion:0},
                {nombre:"topo5",estado:0, nanimacion:0},
                {nombre:"topo6",estado:0, nanimacion:0},
                {nombre:"topo7",estado:0, nanimacion:0},
                {nombre:"topo8",estado:0, nanimacion:0},
                {nombre:"topo9",estado:0, nanimacion:0}]
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
        activa_topo:function(numTopo){           
            datos_topos.topos[numTopo].estado=1;
        },
        pasoSiguiente:function(){
            for(let i=0;i<datos_topos.topos.length;i++){
                
                if(datos_topos.topos[i].estado==1){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==8){
                        datos_topos.topos[i].nanimacion=0;
                        datos_topos.topos[i].estado=0;
                    }

                }
                if(datos_topos.topos[i].estado==-1){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==4){
                        datos_topos.topos[i].nanimacion=0;
                        datos_topos.topos[i].estado=0;
                    }
                }
            }

        },
        matar_topo:function(pos_topo){
            if(datos_topos.topos[pos_topo].estado==1){
                datos_topos.topos[pos_topo].estado=-1;
                datos_topos.topos[pos_topo].nanimacion=0;
                datos_juegos.puntos++;
            }
            
        }


    }

    var controlador={
        init:function(){
            vista.init();
            window.setInterval(controlador.pasoSiguiente, 150);
            window.setInterval(controlador.activa_topo_aleatorio, 1300);
            
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
            modelo.activa_topo(topo_random);
        },
        matar_topo:function(pos_topo){
            modelo.matar_topo(pos_topo);
            
        }



    }

    var vista={
        init:function(){
            vista.evento_pegar_topo();
            
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
                
                if ( topos[i].estado==0){                      
                    camp_topo[i].src="img/hole.png";
                } else if(topos[i].estado==1){
                    camp_topo[i].src="img/topo"+topos[i].nanimacion+".png";
                }else{
                    camp_topo[i].src="img/golpe"+topos[i].nanimacion+".png";
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

        }

    }

    controlador.init();
}

