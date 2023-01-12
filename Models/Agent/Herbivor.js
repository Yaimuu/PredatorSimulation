class Herbivor extends Agent {
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.body.defaultColor = color(0, 128, 0);

        this.body.type = AgentType.HERBIVOR;

        this.body.updateTypeColor();
    }


}