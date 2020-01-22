
window.onload=function(){

    datos_juegos={
        nivel:1,
        puntos:0
    };
    datos_topos={
        topos:[{nombre:"topo1",estado:false , nanimacion:0 },
                {nombre:"topo2",estado:false, nanimacion:0 },
                {nombre:"topo3",estado:false, nanimacion:0},
                {nombre:"topo4",estado:false, nanimacion:0},
                {nombre:"topo5",estado:false, nanimacion:0},
                {nombre:"topo6",estado:false, nanimacion:0},
                {nombre:"topo7",estado:false, nanimacion:0},
                {nombre:"topo8",estado:false, nanimacion:0},
                {nombre:"topo9",estado:false, nanimacion:0}]
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
            datos_topos.topos[numTopo].estado=true;
        },
        pasoSiguiente:function(){
            for(let i=0;i<datos_topos.topos.length;i++){
                
                if(datos_topos.topos[i].estado==true){
                    datos_topos.topos[i].nanimacion++;
                    if (datos_topos.topos[i].nanimacion==8){
                        datos_topos.topos[i].nanimacion=0;
                        datos_topos.topos[i].estado=false;
                    }

                }
            }

        },
        matar_topo:function(pos_topo){
            datos_topos.topos[pos_topo].estado=false;
            datos_topos.topos[pos_topo].nanimacion=0;
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
                camp_topo=document.getElementById(i);
                //console.log(camp_topo);
                
                if ( topos[i].nanimacion==0){                      
                    camp_topo.innerHTML="<img src=\"img/hole.png\">";
                } else{
                    camp_topo.innerHTML="<img src=\"img/topo"+topos[i].nanimacion+".png\">";
                }
            }

        },
        pinta_puntuacion:function(puntosActuales){
            let puntos=document.getElementById("puntuacion");
            puntos.innerHTML=puntosActuales;
        },
        evento_pegar_topo:function(){
            let img_topos=document.getElementsByClassName("topo");

            for(let i=0;i<img_topos.length;i++){
                img_topos[i].addEventListener("click",function(){
                    console.log("Topo numero: "+i+" muerto");
                    controlador.matar_topo(i);
                });
            }

        }

    }

    controlador.init();
}

