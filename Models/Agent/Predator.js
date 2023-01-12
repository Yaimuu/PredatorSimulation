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
            
            if(target.getType() == AgentType.SUPERPREDATOR)
            {
                this.flee(targetPos);
            }
            if(target.getType() != AgentType.DECOMPOSOR)
            {
                if(this.targetReached(target))
                    this.body.eat(target);
                this.seek(targetPos);
            }

            

            if(this.fleeingRange > this.getPos().dist(targetPos))
            {
                this.flee(targetPos);
            }
        });
    }
}