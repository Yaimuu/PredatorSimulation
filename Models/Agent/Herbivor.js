class Herbivor extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(0, 128, 0);

        this.body.type = AgentType.HERBIVOR;

        this.body.updateTypeColor();
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