var SimulationParameters = {
    "duréeSimu": 600,
    bodies: [
        {label: "mass", value: 100, type:"range", min:0, max: 200},
    ],
    
    
};

function createInputs() {
    let paramContainer = document.querySelector("#controls");

    for (const [key, value] of Object.entries(SimulationParameters)) {
        console.log(`${key}: ${value}`);
        let inputDiv = document.createElement("div");

        let label = document.createElement("label");
        label.innerHTML = key;
        inputDiv.appendChild(label);


        paramContainer.appendChild(inputDiv);
      }
}

function toggleExpand(title) {
    title.parentNode.classList.toggle("expanded");
}

// createInputs();