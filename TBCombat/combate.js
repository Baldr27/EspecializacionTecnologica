const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let combatant1 = {nombre: "PJ1", vidaMax: 100, vidaAct: 100, Dano: 10};
  let combatant2 = {nombre: "PJ2", vidaMax: 100, vidaAct: 100, Dano: 10};
  let enCombate = true;
  
readline.question('Quien empieza primero?: ', first => {
    console.log(`El primero es: ${first}!`);
    combate(first);
    readline.close();
  });


function combate(primero){
    console.log("Empieza el combate!");

do{
    if(primero==2){
        dosAuno(combatant1, combatant2);
        if(combatant1.vidaAct<=0){
            console.log("Ganó "+combatant2.nombre);
            break;
        }else if(combatant2.vidaAct<=0){
            console.log("Ganó "+combatant1.nombre);
            break;
        }
        unoAdos(combatant1, combatant2);
        if(combatant1.vidaAct<=0){
            console.log("Ganó "+combatant2.nombre);
            break;
        }else if(combatant2.vidaAct<=0){
            console.log("Ganó "+combatant1.nombre);
            break;
        }
    }else if(primero==1){
        unoAdos(combatant1, combatant2);
        if(combatant1.vidaAct<=0){
            console.log("Ganó "+combatant2.nombre);
            break;
        }else if(combatant2.vidaAct<=0){
            console.log("Ganó "+combatant1.nombre);
            break;
        }
        dosAuno(combatant1, combatant2);
        if(combatant1.vidaAct<=0){
            console.log("Ganó "+combatant2.nombre);
            break;
        }else if(combatant2.vidaAct<=0){
            console.log("Ganó "+combatant1.nombre);
            break;
        }
    }
}while(enCombate);
}

function unoAdos(c1, c2){
    combatant2.vidaAct = combatant2.vidaAct - combatant1.Dano;
    console.log(combatant1.nombre+" Hace "+combatant1.Dano+" a "+combatant2.nombre);
    console.log(combatant2.nombre+" - HP "+combatant2.vidaAct+"/"+combatant2.vidaMax);
}

function dosAuno(c1, c2){
    combatant1.vidaAct = combatant1.vidaAct - combatant2.Dano;
    console.log(combatant2.nombre+" Hace "+combatant2.Dano+" a "+combatant1.nombre);
    console.log(combatant1.nombre+" - HP "+combatant1.vidaAct+"/"+combatant1.vidaMax);
}