class Predator extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(128, 0, 32);

        this.body.type = AgentType.PREDATOR;

        this.body.updateTypeColor();
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