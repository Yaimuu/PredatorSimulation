var SimulationParameters = {
    "mass": {value: 100, type:"range", min:0, max: 200},
    
};

function createInputs() {
    let paramContainer = document.querySelector("#parameters-container");

    for (const [key, value] of Object.entries(SimulationParameters)) {
        console.log(`${key}: ${value}`);
        let inputDiv = document.createElement("div");

        let label = document.createElement("label");
        label.innerHTML = key;
        inputDiv.appendChild(label);


        paramContainer.appendChild(inputDiv);
      }
}

// createInputs();