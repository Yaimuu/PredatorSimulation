class Superpredator extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(255, 0, 0);

        this.body.type = AgentType.SUPERPREDATOR;

        this.body.updateTypeColor();
    }

    filtrePerception() {
        this.perception.forEach(target => {
            let targetPos = target.getPos();
            
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