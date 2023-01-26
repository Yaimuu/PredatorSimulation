class Decomposor extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.mass = 5

        this.body.defaultColor = color(255, 255, 0);
        
        this.type = AgentType.DECOMPOSOR;

        this.body.updateTypeColor();

        if(!this.body.parentBody)
        {
            let simDefaultValues = SimulationParameters.Decomposors;
            this.maxVelo = random(simDefaultValues[0].min, simDefaultValues[0].max);
            this.maxAcc = random(simDefaultValues[1].min, simDefaultValues[1].max);

            this.hunger = {value: 0, max: random(simDefaultValues[2].min, simDefaultValues[2].max), eatThreshold: random(50, 150)};
            this.tired = {value: 0, max: random(simDefaultValues[3].min, simDefaultValues[3].max), activeThreshold: random(10, 50)};
            this.reproduction = {value: 0, max: random(simDefaultValues[5].min, simDefaultValues[5].max)};
            this.life = {birth: 0, lifespan: random(simDefaultValues[4].min, simDefaultValues[4].max), age: 0};
        }
    }

    filtrePerception() {
        this.perception.forEach(target => {
            if(target.getStatus() == Status.DEAD && this.isHungry())
            {
                this.seek(target.getPos());
                if(this.targetReached(target))
                    this.eat(target);
                    
                
            }

            // if(this.fleeingRange > this.getPos().dist(target.getPos()))
            // {
            //     this.flee(target.getPos());
            // }
        });
    }
}