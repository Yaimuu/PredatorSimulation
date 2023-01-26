class Herbivor extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(0, 128, 0);

        this.body.type = AgentType.HERBIVOR;

        this.body.updateTypeColor();

        if(!this.body.parentBody)
        {
            let simDefaultValues = SimulationParameters.Herbivores;
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
            let targetPos = target.getPos();
            
            // SURVIE
            if(target.getType() == AgentType.PREDATOR)
            {
                this.flee(targetPos);
            }

            // CHASSE
            if(target.getType() == AgentType.VEGETAL && this.isHungry())
            {
                if(this.targetReached(target))
                    this.eat(target);
                this.seek(targetPos);
            }

            // SYMBIOSE
            if(target.getType() == AgentType.SUPERPREDATOR)
            {
                this.followTarget(target);
            }

            // if(this.fleeingRange > this.getPos().dist(targetPos))
            // {
            //     this.flee(targetPos);
            // }
        });
    }
}