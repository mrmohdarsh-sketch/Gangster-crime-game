let money = 100;
let reputation = 0;
let loyalty = 50;
let wanted = 0;

const story = document.getElementById("story");
const choices = document.getElementById("choices");

function updateStats() {
    document.getElementById("money").innerText = money;
    document.getElementById("rep").innerText = reputation;
    document.getElementById("loyalty").innerText = loyalty;
    document.getElementById("wanted").innerText = wanted;

    localStorage.setItem("gameData", JSON.stringify({
        money, reputation, loyalty, wanted
    }));
}

function typeWriter(text, i = 0) {
    if (i < text.length) {
        story.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 20);
    }
}

function startGame() {
    story.innerHTML = "";
    typeWriter("You enter the dark streets of Gangster City. A local thug offers you your first job.");
    
    choices.innerHTML = `
        <button onclick="acceptJob()">Accept the Job</button>
        <button onclick="declineJob()">Stay Clean</button>
    `;
}

function acceptJob() {
    story.innerHTML = "";
    money += 200;
    reputation += 20;
    wanted += 10;
    updateStats();
    typeWriter("You completed the job successfully. But police are watching you.");
    
    choices.innerHTML = `
        <button onclick="fightPolice()">Fight</button>
        <button onclick="runAway()">Run Away</button>
    `;
}

function declineJob() {
    story.innerHTML = "";
    reputation -= 5;
    typeWriter("You chose a peaceful path. Life is calm but boring.");
    
    choices.innerHTML = `
        <button onclick="peaceEnding()">Continue Peacefully</button>
    `;
}

function fightPolice() {
    story.innerHTML = "";
    reputation += 30;
    wanted += 30;
    loyalty -= 20;
    updateStats();

    if (wanted > 50) {
        gameOver("🚔 You were arrested!");
    } else {
        typeWriter("You escaped and gained massive respect!");
        choices.innerHTML = `<button onclick="donEnding()">Rule the City</button>`;
    }
}

function runAway() {
    story.innerHTML = "";
    loyalty += 10;
    wanted += 5;
    updateStats();
    typeWriter("You escaped smartly and built your network quietly.");
    
    choices.innerHTML = `<button onclick="donEnding()">Take Over the City</button>`;
}

function donEnding() {
    gameOver("👑 You became the Don of Gangster City!");
}

function peaceEnding() {
    gameOver("🕊 You lived a peaceful normal life.");
}

function gameOver(message) {
    story.innerHTML = "";
    typeWriter(message);
    choices.innerHTML = "";
}

function restartGame() {
    money = 100;
    reputation = 0;
    loyalty = 50;
    wanted = 0;
    updateStats();
    startGame();
}

window.onload = function() {
    let savedData = localStorage.getItem("gameData");
    if (savedData) {
        let data = JSON.parse(savedData);
        money = data.money;
        reputation = data.reputation;
        loyalty = data.loyalty;
        wanted = data.wanted;
    }
    updateStats();
    startGame();
};
