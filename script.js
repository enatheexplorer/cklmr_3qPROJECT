// Function to update health status after each attack
function healthStatus(damage1, damage2){
    var playerHealth = document.getElementById("playHealth").innerHTML; // Get player's current health
    var opponentHealth = document.getElementById("oppHealth").innerHTML; // Get opponent's current health
    playerHealth -= damage1; // Subtract player's damage from health
    opponentHealth -= damage2; // Subtract opponent's damage from health
    checkHealth(playerHealth, opponentHealth); // Check if anyone has lost
    return false; // Prevent default form submission
}

// Function to check if anyone has lost the game
function checkHealth(playerHealth, opponentHealth){
    if((playerHealth<=0)||(opponentHealth<=0)){ // If player or opponent health is zero or less
        if (playerHealth<=0){ // If player's health is zero or less
            document.getElementById("playHealth").innerHTML = "0"; // Set player's health to zero
            document.getElementById("showStat").innerHTML = "Opponent Wins!<br>Better Luck next time."; // Display opponent win message
            document.getElementById("healthStat1").style.color = "red"; // Change player health color to red
        }
        else if (opponentHealth<=0){ // If opponent's health is zero or less
            document.getElementById("oppHealth").innerHTML = "0"; // Set opponent's health to zero
            document.getElementById("showStat").innerHTML = "Player Wins! Congrats!"; // Display player win message
            document.getElementById("healthStat2").style.color = "red"; // Change opponent health color to red
        }
        document.getElementById("showStat").style.fontStyle = "italic"; // Make win message italic
    }
    else{ // If game is still ongoing
        document.getElementById("playHealth").innerHTML = playerHealth; // Update player's health
        document.getElementById("oppHealth").innerHTML = opponentHealth; // Update opponent's health
    }
    return false; // Prevent default form submission
}

// Function to reset the game
function resetBtn(){
    document.getElementById("playHealth").innerHTML = 100; // Reset player's health to 100
    document.getElementById("oppHealth").innerHTML = 100; // Reset opponent's health to 100
    document.getElementById("showStat").innerHTML = "Loading..."; // Display loading message
    disableAD(); // Disable attack and defend buttons
    coinButton.disabled = false; // Enable coin toss button
    coinButton.style.color = "white"; // Set coin toss button text color to white
    coinButton.style.background = "#04AA6D"; // Set coin toss button background color
    document.getElementById("coinOutput").innerHTML = "";  // Clear coin toss result
    document.getElementById("healthStat1").style.color = "black"; // Reset player health text color
    document.getElementById("healthStat2").style.color = "black"; // Reset opponent health text color
    return false; // Prevent default form submission
}

// Function to disable attack and defend buttons
function disableAD(){
    attackbtn.disabled = true; // Disable attack button
    defendbtn.disabled = true; // Disable defend button
    attackbtn.style.color = "#666666"; // Change attack button text color
    attackbtn.style.background = "#A9A9A9"; // Change attack button background color
    defendbtn.style.color = "#666666"; // Change defend button text color
    defendbtn.style.background = "#A9A9A9"; // Change defend button background color
    return false; // Prevent default form submission
}

// Enable attack and defend buttons
function enableAD(){
    attackbtn.disabled = false; // Enable attack button
    defendbtn.disabled = false; // Enable defend button
    attackbtn.style.color = "#D6FF20"; // Change attack button color
    attackbtn.style.background = "#bd0f16"; // Change attack button background
    defendbtn.style.color = "#D6FF20"; // Change defend button color
    defendbtn.style.background = "#bd0f16"; // Change defend button background
    return false;
}

// Function for player's attack action
function playerAttack(){
    document.getElementById("showStat").innerHTML = "You will attack.<br>"; // Display player's action
    var playerDamage = calculateDamage(); // Calculate player's damage
    var opponentDamage = opponentValue(); // Determine opponent's action and damage
    if (opponentDamage>0){ // If opponent attacks
        if (opponentDamage>playerDamage){ // If opponent's damage is greater than player's damage
            damage = opponentDamage-playerDamage; // Calculate damage inflicted by opponent
            document.getElementById("showStat").innerHTML += "Opponent inflict " + damage + " damage."; // Display opponent's damage
            healthStatus(damage,0); // Update health status
        }
        else if (opponentDamage==playerDamage){ // If opponent's damage equals player's damage
            document.getElementById("showStat").innerHTML += "The opponent completely blocked the attack!"; // Display blocked attack message
        }
        else{ // If player's damage is greater than opponent's damage
            damage = playerDamage-opponentDamage; // Calculate damage inflicted by player
            document.getElementById("showStat").innerHTML += "You inflict " + damage + " damage."; // Display player's damage
            healthStatus(0,damage); // Update health status
        }
    }
    else{ // If opponent defends
        var opponentBlock = Math.floor(Math.random()*3)+1; // Determine opponent's block value
        var opponentMiss = playerDamage - opponentBlock; // Calculate missed damage by opponent
        if (opponentMiss<=0){ // If opponent completely blocks
            document.getElementById("showStat").innerHTML += "The opponent completely blocked the attack!"; // Display blocked attack message
        }
        else { // If opponent partially blocks
            document.getElementById("showStat").innerHTML += "You inflict " + opponentMiss + " damage."; // Display player's damage
            healthStatus(0,opponentMiss); // Update health status
        }
    }

    enableAD(); // Enable attack and defend buttons
    return false;
}

// Function for player's defense action
function playerDefend(){
    document.getElementById("showStat").innerHTML = "You will defend.<br>"; // Display player's action
    var playerBlock = Math.floor(Math.random()*3)+1; // Determine player's block value
    var opponentDamage = opponentValue(); // Determine opponent's action and damage
    if (opponentDamage>0){ // If opponent attacks
        var playerMiss = opponentDamage - playerBlock; // Calculate missed damage by player
        if(playerMiss<0){ // If player completely blocks
            playerMiss=0; // Set missed damage to 0
        }

        if (playerMiss==0){ // If player completely blocks
            document.getElementById("showStat").innerHTML += "You completely blocked the opponent!"; // Display blocked message
        }
        else{ // If player partially blocks
            document.getElementById("showStat").innerHTML += "Opponent inflict " + playerMiss + " damage."; // Display opponent's damage
            healthStatus(playerMiss,0); // Update health status
        }
    }
    else{ // If opponent defends
        document.getElementById("showStat").innerHTML += "The opponent defended too."; // Display defense message
    }

    return false;
}

// Determine opponent's attack damage
function opponentValue(){
    var opponentAttack;
    var opponentDecide = opponentAction(); // Determine opponent's action
    if (opponentDecide==1){ // If opponent attacks
        opponentAttack = calculateDamage(); // Calculate opponent's damage
    } 
    else{ // If opponent defends
        opponentAttack = 0; // Set opponent's damage to 0
    }
    return opponentAttack; // Return opponent's damage
}

// Calculate damage for player or opponent
function calculateDamage(){
    var damageCalculated = Math.floor(Math.random()*5)+1; // Generate random damage value
    return damageCalculated; // Return calculated damage
}

// Determine opponent's action
function opponentAction(){
    var opponentAct = Math.floor(Math.random()*2); // Generate random action for opponent (attack or defend)
    return opponentAct; // Return opponent's action
}

// Toggle popup display
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active"); // Toggle visibility of popup
    resetDisable(); // Disable reset button
    disableAD(); // Disable attack and defend buttons
    return false;
}

// Close popup display
function closePopup(){
    document.getElementById("popup-1").classList.remove("active"); // Remove active class to hide popup
    resetEnable(); // Enable reset button
    coinButton.disabled = true; // Disable coin toss button
    coinButton.style.color = "#666666"; // Change coin toss button color
    coinButton.style.background = "#A9A9A9"; // Change coin toss button background
    return false;
}

// JavaScript code for a simple coin toss game with attack and defend options
document.addEventListener("DOMContentLoaded", function() {
    // Wait for the HTML content to load before executing JavaScript
    var form = document.getElementById("coinToss");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting
        tossCoin(); // Call the function to toss the coin
    });
});

// Function to simulate a coin toss and determine the outcome
function tossCoin() {
    var toss = Math.floor(Math.random()*2); // Randomly generate 0 or 1
    var tossResult; // Variable to store the result of the coin toss
    var userCoin = document.getElementById("tossCoin").value; // Get the user's choice
    var playerFirst; // Variable to determine who attacks first

    // Determine the result of the coin toss
    if(toss==1){
        tossResult="Tail"; // If toss is 1, result is "Tail"
    }
    else {
        tossResult="Head"; // If toss is 0, result is "Head"
    }

    // Compare user's choice with the result of the coin toss
    if (userCoin==tossResult){
        // If user's choice matches the coin toss result, enable attack and disable defend
        document.getElementById("coinOutput").innerHTML = "Coin is " + tossResult +". You chose "+ userCoin +". <br> ATTACK RESPONSIBLY!";
        document.getElementById("attackbtn").disabled = false;
        attackbtn.style.color = "#D6FF20";
        attackbtn.style.background = "#bd0f16";
        document.getElementById("defendbtn").disabled = true;
        defendbtn.style.color = "#666666";
        defendbtn.style.background = "#A9A9A9"; 
    }
    else if (userCoin!=tossResult){
        // If user's choice doesn't match the coin toss result, enable both attack and defend
        document.getElementById("coinOutput").innerHTML = "Coin is " + tossResult +". You chose "+ userCoin +". <br> ATTACK OR DEFEND RESPONSIBLY!";
        enableAD();
    }
    else{
        // If something went wrong, this displays an error message
        document.getElementById("coinOutput").innerHTML = "Game is malfunctioning!"; 
    }
    resetEnable(); // Enable the reset button
    return false;
}

// Function to disable the reset button
function resetDisable(){
    document.getElementById("resetButton1").disabled = true;
    document.getElementById("resetButton2").disabled = true;
    resetButton1.style.color = "#666666";
    resetButton1.style.background = "#A9A9A9";
    resetButton2.style.color = "#666666";
    resetButton2.style.background = "#A9A9A9";
    return false;
}

// Function to enable the reset button
function resetEnable(){
    document.getElementById("resetButton1").disabled = false;
    document.getElementById("resetButton2").disabled = false;
    resetButton1.style.color = "#657423";
    resetButton1.style.background = "#DBFF3C";
    resetButton2.style.color = "#657423";
    resetButton2.style.background = "#DBFF3C";
    return false;
}
