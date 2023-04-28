const attacks = require("./attacks.json");
var fallos1 = 0;
var fallos2 = 0;

function getAttack(type){
    items = attacks.filter(item => item.type==type);
    return items[items.length*Math.random() | 0];
}

function getAttackType(clase){
    if(clase=="Magician" || clase=="Fairy"){
        return "MAGIC";
    }else if(clase=="Knight"||clase=="Warrior"){
        return "PHYSICAL";
    }
}

function randomClass(){
    var classes = ["Magician", "Knight", "Warrior", "Fairy"];

    return classes[classes.length*Math.random() | 0];
}

function getHealth(){
    return Math.floor(Math.random() * 101) + 100;
}

function getSpeed(){
    return Math.floor(Math.random() * 10) + 1;
}

function getAttributes(){
    let clase = randomClass();
    let attackType = getAttackType(clase);
    let attack1 = getAttack(attackType);
    let attack2 = getAttack(attackType);
    let health = getHealth();
    let speed = getSpeed();
    return {clase, attack1, attack2, health, speed};
}

function randomStart(){
    return Math.floor(Math.random() * 2) + 1;
}

function attack(attack){
    let rand = Math.floor(Math.random() * 101);

    if(rand>attack.accuracy){
        return false;
    }else{
        return true;
    }
}

function unoAdos(p1, p2){
    let att = randomStart();
    if(att==1){
        atk = p1.firstAttack;
    }else{
        atk = p1.secondAttack;
    }
    if(attack(atk)){
        p2.health -= atk.damage;
        log(p1.name+
            " ataca con "+
            atk.name+
            "... Da en el blanco!. La vida de "+
            p2.name+
            " queda en "+
            p2.health
            );
    }else{
        fallos1++;
        log(p1.name+
            " ataca con "+
            atk.name+
            "... Falla!. La vida de "+
            p2.name+
            " se mantiene en "+
            p2.health
            );
    }
}

function dosAuno(p1, p2){
    let att = randomStart();
    if(att==1){
        atk = p2.firstAttack;
    }else{
        atk = p2.secondAttack;
    }
    if(attack(atk)){
        p1.health -= atk.damage;
        log(p2.name+
            " ataca con "+
            atk.name+
            "... Da en el blanco!. La vida de "+
            p1.name+
            " queda en "+
            p1.health
            );
    }else{
        fallos2++;
        log(p2.name+
            " ataca con "+
            atk.name+
            "... Falla!. La vida de "+
            p1.name+
            " se mantiene en "+
            p1.health
            );
    }
}

function generateFileLog(logs, filename){
    const fs = require("fs");

    fs.writeFile(filename, logs, (err) => {
        if (err) throw err;
        });
}

function log(log){
    fightLogs = fightLogs+"\n"+log;
}

function resumen(){
    log(
        "\n"+
        "### RESUMEN ###"+
        "\n"
    );
}

attr1 = getAttributes();

let pj1 = {name: "Belfor",
class: attr1.clase,
firstAttack: attr1.attack1,
secondAttack: attr1.attack2,
health: attr1.health,
speed: attr1.speed
    };
attr2 = getAttributes();

let pj2 = {name: "Marco",
            class: attr2.clase,
            firstAttack: attr2.attack1,
            secondAttack: attr2.attack2,
            health: attr2.health,
            speed: attr2.speed
    };

var fightLogs = "—------------------------------------------------------------------------------------------------------------------"+
                "\n"+
                "### INICIO ###"+
                "\n\n"+
                pj1.name+" | "+pj1.class+" | "+pj1.health+" de vida vs "+pj2.name+" | "+pj2.class+" | "+ pj2.health+" de vida"+
                "\n\n"+
                "### BATALLA ###"
    ;

var turn = 1;
while(true){
    log("\nTurno: "+turn);
    if(pj1.speed>pj2.speed){
        unoAdos(pj1, pj2);
        if(pj1.health<=0){
            resumen();
            log(
                pj2.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }else if(pj2.health<=0){
            resumen();
            log(
                pj1.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }
        dosAuno(pj1, pj2);
        if(pj1.health<=0){
            resumen();
            log(
                pj2.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }else if(pj2.health<=0){
            resumen();
            log(
                pj1.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }
    }else if(pj2.speed>pj1.speed){
        dosAuno(pj1, pj2);
        if(pj1.health<=0){
            resumen();
            log(
                pj2.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }else if(pj2.health<=0){
            resumen();
            log(
                pj1.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }
        unoAdos(pj1, pj2);
        if(pj1.health<=0){
            resumen();
            log(
                pj2.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }else if(pj2.health<=0){
            resumen();
            log(
                pj1.name+
                " gana la batalla!"+
                "\n"+
                "El "+
                pj1.name+
                " falló "+
                fallos1+
                " veces su ataque"+
                "\n"+
                "El "+
                pj2.name+
                " falló "+
                fallos2+
                " veces su ataque"+
                "\n\n"+
                "—------------------------------------------------------------------------------------------------------------------------"
            );
            generateFileLog(fightLogs, "logs_batalla.txt");
            break;
        }
    }else if(pj1.speed==pj2.speed){
        let start = randomStart();
        if(start==1){
            unoAdos(pj1, pj2);
            if(pj1.health<=0){
                resumen();
                log(
                    pj2.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }else if(pj2.health<=0){
                resumen();
                log(
                    pj1.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }
            dosAuno(pj1, pj2);
            if(pj1.health<=0){
                resumen();
                log(
                    pj2.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }else if(pj2.health<=0){
                resumen();
                log(
                    pj1.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }
        }else{
            dosAuno(pj1, pj2);
            if(pj1.health<=0){
                resumen();
                log(
                    pj2.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }else if(pj2.health<=0){
                resumen();
                log(
                    pj1.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }
            unoAdos(pj1, pj2);
            if(pj1.health<=0){
                resumen();
                log(
                    pj2.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }else if(pj2.health<=0){
                resumen();
                log(
                    pj1.name+
                    " gana la batalla!"+
                    "\n"+
                    "El "+
                    pj1.name+
                    " falló "+
                    fallos1+
                    " veces su ataque"+
                    "\n"+
                    "El "+
                    pj2.name+
                    " falló "+
                    fallos2+
                    " veces su ataque"+
                    "\n\n"+
                    "—------------------------------------------------------------------------------------------------------------------------"
                );
                generateFileLog(fightLogs, "logs_batalla.txt");
                break;
            }
        }
    }
    turn++;
}