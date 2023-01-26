class Predator extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(128, 0, 32);

        this.body.type = AgentType.PREDATOR;

        this.body.updateTypeColor();

        if(!this.body.parentBody)
        {
            let simDefaultValues = SimulationParameters.Predators;
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
            
            // CHASSE
            if(target.getType() == AgentType.SUPERPREDATOR)
            {
                this.flee(targetPos);
            }

            // SURVIE
            if(target.getType() == AgentType.HERBIVOR && this.isHungry())
            {
                if(this.targetReached(target))
                    this.eat(target);
                this.seek(targetPos);
            }

            // SYMBIOSE
            if(target.getType() == AgentType.PREDATOR)
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