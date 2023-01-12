class Decomposor extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.mass = 5

        this.body.defaultColor = color(255, 255, 0);
        
        this.type = AgentType.DECOMPOSOR;

        this.body.updateTypeColor();
    }

    filtrePerception() {
        this.perception.forEach(target => {
            if(target.getStatus() == Status.DEAD)
            {
                if(this.targetReached(target))
                    this.body.eat(target);
                    
                this.seek(target.getPos());
            }

            if(this.fleeingRange > this.getPos().dist(target.getPos()))
            {
                this.flee(target.getPos());
            }
        });
    }
}