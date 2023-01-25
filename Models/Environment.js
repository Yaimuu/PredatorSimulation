class Environment {

    constructor(width, heigth) {
        this.width = width;
        this.heigth = heigth;
        this.agentList = [];
        this.itemList = [];

        this.duration = 0;
        this.maxDuration = 3500;
    }

    generateMap(nbAgents=100, nbItems=50) {
        
        for (let i = 0; i < nbAgents; i++) {
            let type = random([AgentType.DECOMPOSOR,AgentType.HERBIVOR,AgentType.PREDATOR,AgentType.SUPERPREDATOR]);
            switch(type) {
                case AgentType.DECOMPOSOR:
                    this.agentList.push(new Decomposor(this.width, this.heigth));
                    break;
                
                case AgentType.HERBIVOR:
                    this.agentList.push(new Herbivor(this.width, this.heigth));
                    break;

                case AgentType.PREDATOR:
                    this.agentList.push(new Predator(this.width, this.heigth));
                    break;
                
                case AgentType.SUPERPREDATOR:
                    this.agentList.push(new Superpredator(this.width, this.heigth));
                    break;
            }
            
        }
        for (let i = 0; i < nbItems; i++) {
            this.itemList.push(new Item(this.width, this.heigth));
        }
    }

    show() {
        
        this.itemList.forEach(item => {
            item.show();
        });

        textSize(32);
        text('Duration : ' + this.duration, this.width/2, 50);
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

    exportToJson() {

        var scenario = {};
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