class Predator extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(128, 0, 32);

        this.body.type = AgentType.PREDATOR;

        this.body.updateTypeColor();
    }


}