class Item extends Entity{
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.color = color(0, 255, 0);
        this.type = AgentType.VEGETAL;
        this.mass = 10;
    }

    
}