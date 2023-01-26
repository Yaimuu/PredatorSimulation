class Environment {

    constructor(width, heigth) {
        this.width = width;
        this.heigth = heigth;
        this.agentList = [];
        this.itemList = [];

        this.duration = 0;
        this.maxDuration = 3500;

        this.infos = {decomposors: 0, herbivors: 0, predators: 0, superpredators: 0};
    
        this.setControls();
    }

    generateMap(nbAgents=100, nbItems=50) {
        
        for (let i = 0; i < nbAgents; i++) {
            let type = random([AgentType.DECOMPOSOR,AgentType.HERBIVOR,AgentType.PREDATOR,AgentType.SUPERPREDATOR]);
            switch(type) {
                case AgentType.DECOMPOSOR:
                    this.agentList.push(new Decomposor(this.width, this.heigth));
                    this.infos.decomposors++;
                    break;
                
                case AgentType.HERBIVOR:
                    this.agentList.push(new Herbivor(this.width, this.heigth));
                    this.infos.herbivors++;
                    break;

                case AgentType.PREDATOR:
                    this.agentList.push(new Predator(this.width, this.heigth));
                    this.infos.predators++;
                    break;
                
                case AgentType.SUPERPREDATOR:
                    this.agentList.push(new Superpredator(this.width, this.heigth));
                    this.infos.superpredators++;
                    break;
            }
            
        }
        for (let i = 0; i < nbItems; i++) {
            this.itemList.push(new Item(this.width, this.heigth));
        }
    }

    restart()
    {
        this.agentList = [];
        this.itemList = [];
        this.duration = 0;
        this.infos = {decomposors: 0, herbivors: 0, predators: 0, superpredators: 0};

        this.generateMap();
    }

    show() {
        
        this.itemList.forEach(item => {
            item.show();
        });

        textSize(32);
        text('Duration : ' + this.duration, this.width/2, 50);

        this.showInfos();
    }

    update()
    {
        this.updateEaten();

        this.agentList.forEach(agent => {
            agent.update();
        });

        this.show();
    }

    updateEaten() {
        this.agentList.forEach(agent => {
            agent.children.forEach(child => {
                if(child)
                {
                    if(child.getStatus() == Status.NEWBORN)
                    {
                        child.setStatus(Status.ACTIVE);
                        this.agentList.push(child);
                    }
                }
            });
            
            
            if(agent.getStatus() == Status.EATEN)
            {
                this.agentList.splice(this.agentList.indexOf(agent), 1);
                switch(agent.getType()) {
                    case AgentType.DECOMPOSOR:
                        this.infos.decomposors--;
                        break;
                    case AgentType.HERBIVOR:
                        this.infos.herbivors--;
                        break;
                    case AgentType.PREDATOR:
                        this.infos.predators--;
                        break;
                    case AgentType.SUPERPREDATOR:
                        this.infos.superpredators--;
                        break;
                }
            }
            
        });

        this.itemList.forEach(item => {
            if(item.getStatus() == Status.EATEN)
            {
                this.itemList.splice(this.itemList.indexOf(item), 1);
                this.itemList.push(new Item(this.width, this.heigth));
            }
        });
    }

    run() {

        if(this.duration < this.maxDuration)
        {
            this.agentList.forEach(agent1 => {
                agent1.perception = [];
                this.itemList.forEach(item => {
                    if(dist(agent1.getPos().x, agent1.getPos().y, item.getPos().x, item.getPos().y) < agent1.range)
                    {
                        agent1.perception.push(item);
                    }
                });
                this.agentList.forEach(agent2 => {
                    if(dist(agent1.getPos().x, agent1.getPos().y, agent2.getPos().x, agent2.getPos().y) < agent1.range && agent1 != agent2)
                    {
                        agent1.perception.push(agent2);
                    }
                });
            });

            this.update();

            this.duration++;
        }
        else
        {
            this.agentList.forEach(agent => {
                agent.show();
            });
            this.show();
        }
    }

    setControls() {
        document.querySelector("#restart").addEventListener("click", () => {
            this.restart();
        });
        document.querySelector("#duration-max").value = this.maxDuration;
        document.querySelector("#duration-max").addEventListener("change", (e) => {
            console.log(e.target);
            this.maxDuration = e.target.value;
        });

        let controlsContent = document.querySelector("#controls-content");

        for (const [key, value] of Object.entries(SimulationParameters)) {
            console.log(`${key}: ${value}`);

            controlsContent.innerHTML += this.createCategory(key);
            let spaceLessKey = key.replace(/\s/g, '');
            let subControls = document.querySelector(`#${spaceLessKey}-content`);

            value.forEach(parameter => {
                console.log(parameter);
                let spaceLessLabel = parameter.label.replace(/\s/g, '');

                subControls.innerHTML += this.createCategory(parameter.label, `${spaceLessKey}-${spaceLessLabel}-content`);
                
                let subParameterControls = document.querySelector(`#${spaceLessKey}-${spaceLessLabel}-content`);

                this.createInput(
                    subParameterControls,
                    `min-${spaceLessKey}-${spaceLessLabel}`,
                    "min",
                    "number",
                    parameter.min );
                
                this.createInput(
                    subParameterControls,
                    `max-${spaceLessKey}-${spaceLessLabel}`,
                    "max",
                    "number",
                    parameter.max );
                
            });
          }
    }

    createCategory(title, id=`${title.replace(/\s/g, '')}-content`)
    {
        let category = `<div class="sub-panel">
            <div class="title" onclick="toggleExpand(this)">
            <i class='fas fa-angle-right arrow'></i>
            <span>${title}</span>
            </div>
    
            <div id="${id}" class="content">
                
            </div>
        </div>`;

        return category;
    }

    createInput(parent, id, labelText, type, defaultValue) {
        let label = document.createElement("label");
        label.setAttribute("for", id);
        label.innerHTML = labelText;
        let input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("id", id);
        input.setAttribute("value", defaultValue);
        parent.appendChild(label);
        parent.appendChild(input);
    }

    showInfos()
    {
        document.querySelector("#nb-agents").innerHTML = this.agentList.length;

        document.querySelector("#nb-decomposors").innerHTML = this.infos.decomposors;
        document.querySelector("#percent-decomposors").style.width = (this.infos.decomposors/this.agentList.length * 100) + "%";

        document.querySelector("#nb-herbivors").innerHTML = this.infos.herbivors;
        document.querySelector("#percent-herbivors").style.width = (this.infos.herbivors/this.agentList.length * 100) + "%";

        document.querySelector("#nb-predators").innerHTML = this.infos.predators;
        document.querySelector("#percent-predators").style.width = (this.infos.predators/this.agentList.length * 100) + "%";

        document.querySelector("#nb-superpredators").innerHTML = this.infos.superpredators;
        document.querySelector("#percent-superpredators").style.width = (this.infos.superpredators/this.agentList.length * 100) + "%";
    }

    showGauges(x, y)
    {
        let mousePos = createVector(x,y);
        let closerAgent = this.agentList[0];
        this.agentList.forEach(agent => {
            if(mousePos.dist(closerAgent.getPos()) > mousePos.dist(agent.getPos()))
            {
                closerAgent = agent;
            }
        });
        closerAgent.toggleGauges();
    }

    glowAgent(x, y)
    {

    }
}