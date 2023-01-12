class Entity {
    constructor(widthLimit=800, heigthLimit=600) {
        this.mass = random(10, 25);
        this.maxMass = 150;

        this.color = color(150);

        this.pos = createVector(random(widthLimit - this.mass), random(heigthLimit - this.mass));

        this.type = AgentType.DECOMPOSOR;

        this.status = Status.ACTIVE;
    }

    show()
	{
        noStroke();
        // Body
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.mass * 2);
	}

    getStatus() {
        return this.status;
    }

    setStatus(newStatus) {
        this.status = newStatus;
    }

    getPos()
    {
        return this.pos;
    }

    getMass()
    {
        return this.mass;
    }

    getColor()
    {
        return this.mass;
    }

    getType()
    {
        return this.type;
    }
}