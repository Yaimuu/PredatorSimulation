class Decomposor extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(255, 255, 0);
        
        this.type = AgentType.DECOMPOSOR;

        this.body.updateTypeColor();
    }


}