class Body extends Entity {

    constructor(widthLimit=800, heigthLimit=600) {
        super(widthLimit, heigthLimit);
        
        this.defaultColor = color(150);
        this.statusColor = this.defaultColor;

        this.velocity = createVector(random(5), random(5));
        this.acc = createVector(0, 0);
        this.maxVelo = 2.5;
        this.maxAcc = 5;
        
        this.force = 0.001;
		this.maxForce = 0.01;

        this.hunger = {value: 0, max: random(100, 200), eatThreshold: random(10, 50)};
        this.tired = {value: 0, max: random(100, 200), activeThreshold: random(10, 50)};
        this.reproduction = {value: 0, max: 100};
        this.life = {birth: 0, lifespan: random(200, 300), age: 0};
    }

    move(target=undefined)
	{
		this.velocity.add(this.acc);
        this.velocity.limit(this.maxVelo);
		// this.velocity.div(this.mass/(this.mass/2));

		this.pos.add(this.velocity);
        if(target)
		    this.force = this.pos.dist(target) % this.maxForce;
        else
            this.force = 0.01;
	}

    eat(target)
    {
        if(target.getType() == AgentType.DECOMPOSOR)
            return;
        target.setStatus(Status.EATEN);
        this.reproduction.value += target.getMass() / 2;
    }
	

    updateStatus() {
        switch(this.status)
        {
            case Status.ACTIVE:
                this.tired.value += 0.1;
                this.life.age += 0.1;
                this.hunger.value += 0.1;
                this.statusColor = this.defaultColor;

                if(this.tired.value >= this.tired.max)
                {
                    this.status = Status.SLEEPING;
                }
                if(this.hunger.value >= this.hunger.max || this.life.age >= this.life.lifespan)
                {
                    this.status = Status.DEAD;
                    this.statusColor = color(0);
                }
                break;
            case Status.SLEEPING:
                this.tired.value -= 0.1;
                this.life.age += 0.1;
                this.statusColor = color(255, 255, 0);

                if(this.tired.value <= this.tired.activeThreshold)
                {
                    this.status = Status.ACTIVE;
                }
                if(this.hunger.value >= this.hunger.max || this.life.age >= this.life.lifespan)
                {
                    this.status = Status.DEAD;
                }
                break;
            case Status.DEAD:
            case Status.EATEN:
                this.color = color(0);
                break;
        }
    }

    updateTypeColor() {
        this.color = this.defaultColor;
    }

    update() {
        this.updateStatus();

        if(this.isMoving())
            this.move();

        this.show();
    }

    show()
	{
        noStroke();
        // Body
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.mass * 2);
        //Status
        fill(this.statusColor);
        ellipse(this.pos.x, this.pos.y, this.mass);

        this.showVelocity();
	}

    showVelocity() {
        strokeWeight(3);
        stroke(0);
        let normVelo = this.velocity.copy().normalize();
        line(
            this.pos.x, 
            this.pos.y, 
            this.pos.x + normVelo.x * this.mass,
            this.pos.y + normVelo.y * this.mass );
    }

    isMoving() {
        return this.status == Status.ACTIVE; 
    }

    isDead()
    {
        return this.status == Status.DEAD; 
    }
}