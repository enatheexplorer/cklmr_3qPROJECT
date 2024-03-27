function healthStatus(damage1, damage2){
    var playerHealth = document.getElementById("playHealth").innerHTML;
    var opponentHealth = document.getElementById("oppHealth").innerHTML;
    playerHealth -= damage1;
    opponentHealth -= damage2;
    checkHealth(playerHealth, opponentHealth);
    return false;
}

function checkHealth(playerHealth, opponentHealth){
    if((playerHealth<=0)||(opponentHealth<=0)){
        if (playerHealth<=0){
            document.getElementById("playHealth").innerHTML = "0";
            document.getElementById("showStat").innerHTML = "Opponent Wins!<br>Better Luck next time.";
            document.getElementById("healthStat1").style.color = "red";
        }
        else if (opponentHealth<=0){
            document.getElementById("oppHealth").innerHTML = "0";
            document.getElementById("showStat").innerHTML = "Player Wins! Congrats!";
            document.getElementById("healthStat2").style.color = "red";
        }
        document.getElementById("showStat").style.fontStyle = "italic";
    }
    else{
        document.getElementById("playHealth").innerHTML = playerHealth;
        document.getElementById("oppHealth").innerHTML = opponentHealth;
    }
    return false;
}

function resetGame(){
    document.getElementById("playHealth").innerHTML = 100;
    document.getElementById("oppHealth").innerHTML = 100;
    document.getElementById("showStat").innerHTML = "Loading...";
    disableAD();
    resetButton1.style.color = "#657423";
    resetButton2.style.color = "#657423";
    coinButton.disabled = false;
    coinButton.style.color = "white";
    coinButton.style.background = "#04AA6D";
    document.getElementById("coinOutput").innerHTML = ""; 
    document.getElementById("healthStat1").style.color = "black";
    document.getElementById("healthStat2").style.color = "black";
    return false;
}


function disableAD(){
    attackbtn.disabled = true;
    defendbtn.disabled = true;
    attackbtn.style.color = "#666666";
    attackbtn.style.background = "#A9A9A9";
    defendbtn.style.color = "#666666";
    defendbtn.style.background = "#A9A9A9";
    return false;
}

function enableAD(){
    attackbtn.disabled = false;
    defendbtn.disabled = false;
    attackbtn.style.color = "#D6FF20";
    attackbtn.style.background = "#bd0f16";
    defendbtn.style.color = "#D6FF20";
    defendbtn.style.background = "#bd0f16";
    return false;
}

function playerAttack(){
    document.getElementById("showStat").innerHTML = "You will attack.<br>";
    var playerDamage = calculateDamage();
    var opponentDamage = opponentValue();
    if (opponentDamage>0){
        if (opponentDamage>playerDamage){
            damage = opponentDamage-playerDamage;
            document.getElementById("showStat").innerHTML += "Opponent inflict " + damage + " damage.";
            healthStatus(damage,0);
        }
        else if (opponentDamage==playerDamage){
            document.getElementById("showStat").innerHTML += "The opponent completely blocked the attack!";
        }
        else{
            damage = playerDamage-opponentDamage;
            document.getElementById("showStat").innerHTML += "You inflict " + damage + " damage.";
            healthStatus(0,damage);
        }
    }
    else{
        var opponentBlock = Math.floor(Math.random()*3)+1;
        var opponentMiss = playerDamage - opponentBlock;
        if (opponentMiss<=0){
            document.getElementById("showStat").innerHTML += "The opponent completely blocked the attack!";
        }
        else {
            document.getElementById("showStat").innerHTML += "You inflict " + opponentMiss + " damage.";
            healthStatus(0,opponentMiss);
        }
    }

    enableAD();

    return false;
}

function playerDefend(){
    document.getElementById("showStat").innerHTML = "You will defend.<br>";
    var playerBlock = Math.floor(Math.random()*3)+1;
    var opponentDamage = opponentValue();
    if (opponentDamage>0){
        var playerMiss = opponentDamage - playerBlock;
        if(playerMiss<0){
            playerMiss=0;
        }

        if (playerMiss==0){
            document.getElementById("showStat").innerHTML += "You completely blocked the opponent!";
        }
        else{
            document.getElementById("showStat").innerHTML += "Opponent inflict " + playerMiss + " damage.";
            healthStatus(playerMiss,0);
        }
    }
    else{
        document.getElementById("showStat").innerHTML += "The opponent defended too.";
    }

    return false;
}


function opponentValue(){
    var opponentAttack;
    var opponentDecide = opponentAction();
    if (opponentDecide==1){
        opponentAttack = calculateDamage();
    } 
    else{
        opponentAttack = 0;
    }
    return opponentAttack;
}

function calculateDamage(){
    var damageCalculated = Math.floor(Math.random()*5)+1;
    return damageCalculated;
}

function opponentAction(){
    var opponentAct = Math.floor(Math.random()*2);
    return opponentAct;
}

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
    resetDisable();
    disableAD();
    return false;
}

function closePopup(){
    document.getElementById("popup-1").classList.remove("active");
    resetEnable();
    coinButton.disabled = true;
    coinButton.style.color = "#666666";
    coinButton.style.background = "#A9A9A9";
    return false;
}


document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("coinToss");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        tossCoin();
    });
});

function tossCoin() {
    var toss = Math.floor(Math.random()*2);
    var tossResult;
    var userCoin = document.getElementById("tossCoin").value;
    var playerFirst;

    if(toss==1){
        tossResult="Tail";
    }
    else {
        tossResult="Head";
    }

    if (userCoin==tossResult){
        document.getElementById("coinOutput").innerHTML = "Coin is " + tossResult +". You chose "+ userCoin +". <br> ATTACK RESPONSIBLY!";
        document.getElementById("attackbtn").disabled = false;
        attackbtn.style.color = "#D6FF20";
        attackbtn.style.background = "#bd0f16";
        document.getElementById("defendbtn").disabled = true;
        defendbtn.style.color = "#666666";
        defendbtn.style.background = "#A9A9A9"; 
    }
    else if (userCoin!=tossResult){
        document.getElementById("coinOutput").innerHTML = "Coin is " + tossResult +". You chose "+ userCoin +". <br> ATTACK OR DEFEND RESPONSIBLY!";
        enableAD();
    }
    else{
        document.getElementById("coinOutput").innerHTML = "Game is malfunctioning!"; 
    }
    resetEnable();
    return false;
}

function resetDisable(){
    document.getElementById("resetButton1").disabled = true;
    document.getElementById("resetButton2").disabled = true;
    resetButton1.style.color = "#666666";
    resetButton1.style.background = "#A9A9A9";
    resetButton2.style.color = "#666666";
    resetButton2.style.background = "#A9A9A9";
    return false;
}

function resetEnable(){
    document.getElementById("resetButton1").disabled = false;
    document.getElementById("resetButton2").disabled = false;
    resetButton1.style.color = "black";
    resetButton1.style.background = "#DBFF3C";
    resetButton2.style.color = "black";
    resetButton2.style.background = "#DBFF3C";
    return false;
}
