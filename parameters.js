var SimulationParameters = {
    Decomposors: [
        {label: "velocity", min:1, max: 5},
        {label: "acceleration", min:1, max: 5},
        {label: "hunger", min:400, max: 500},
        {label: "tired", min:100, max: 200},
        {label: "life span", min:1000, max: 1500},
        {label: "reproduction", min:50, max: 100},
    ],
    Herbivores: [
        {label: "velocity", min:1, max: 5},
        {label: "acceleration", min:1, max: 5},
        {label: "hunger", min:400, max: 500},
        {label: "tired", min:100, max: 200},
        {label: "life span", min:1000, max: 1500},
        {label: "reproduction", min:50, max: 100},
    ],
    Predators: [
        {label: "velocity", min:1, max: 5},
        {label: "acceleration", min:1, max: 5},
        {label: "hunger", min:400, max: 500},
        {label: "tired", min:100, max: 200},
        {label: "life span", min:1000, max: 1500},
        {label: "reproduction", min:50, max: 100},
    ],
    Superpredators: [
        {label: "velocity", min:1, max: 5},
        {label: "acceleration", min:1, max: 5},
        {label: "hunger", min:400, max: 500},
        {label: "tired", min:100, max: 200},
        {label: "life span", min:1000, max: 1500},
        {label: "reproduction", min:50, max: 100},
    ],
};

function toggleExpand(title) {
    title.parentNode.classList.toggle("expanded");
}