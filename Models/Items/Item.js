class Item extends Entity{
    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);

        this.color = color(0, 255, 0);
    }

    show()
	{
        noStroke();
        // Body
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.mass * 2);
	}
}