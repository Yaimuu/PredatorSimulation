class Body extends Entity {

    constructor(widthLimit=800, heigthLimit=600, parentBody=undefined) {
        super(widthLimit, heigthLimit);

        this.parentBody = parentBody;
        
        this.defaultColor = color(150);
        this.statusColor = this.defaultColor;

        this.velocity = createVector(random(5), random(5));
        this.acc = createVector(0, 0);
        
        this.force = 0.001;
		this.maxForce = 0.01;

        this.showGauges = false;

        if(this.parentBody)
        {
            this.pos = createVector(this.parentBody.pos.x, this.parentBody.pos.y);
            this.defaultColor = this.parentBody.defaultColor;
            // console.log(this.parentBody);
            this.maxVelo = this.parentBody.maxVelo + random(-0.05, 0.05);
            this.maxAcc = this.parentBody.maxAcc + random(-0.05, 0.05);

            this.hunger = {value: 0, max: this.parentBody.hunger.max + random(-5, 5), eatThreshold: this.parentBody.hunger.eatThreshold + random(-1, 1)};
            this.tired = {value: 0, max: this.parentBody.tired.max + random(-5, 5), activeThreshold: this.parentBody.tired.activeThreshold + random(-1, 1)};
            this.reproduction = {value: 0, max: this.parentBody.reproduction.max + random(-5, 5)};
            this.life = {birth: 0, lifespan: this.parentBody.life.lifespan + random(-5, 5), age: 0};
            this.updateTypeColor();
        }
        else 
        {
            this.maxVelo = random(1,5);
            this.maxAcc = random(1,5);

            this.hunger = {value: 0, max: random(400, 500), eatThreshold: random(50, 150)};
            this.tired = {value: 0, max: random(100, 200), activeThreshold: random(10, 50)};
            this.reproduction = {value: 0, max: 100};
            this.life = {birth: 0, lifespan: random(1000, 1500), age: 0};
        }

        
    }

    move(target=undefined)
	{
        this.acc.limit(this.maxAcc);
		this.velocity.add(this.acc);
        this.velocity.limit(this.maxVelo);
		// this.velocity.div(this.mass/(this.mass/2));

		this.pos.add(this.velocity);
        if(target)
		    this.force = this.pos.dist(target) % this.maxForce;
        else
            this.force = 0.01;
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
                this.statusColor = color(0);
                break;
        }
    }

    updateTypeColor() {
        this.color = this.defaultColor;
    }

    update() {
        this.updateStatus();

        if(this.isMoving())
        {
            this.move();
        }

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

        if(this.showGauges)
        {
            this.showGauge(this.hunger.value, this.hunger.max, this.hunger.eatThreshold, color(255,255,0), 1);
            this.showGauge(this.life.age, this.life.lifespan, undefined, color(255), 2);
            this.showGauge(this.tired.value, this.tired.max, this.tired.activeThreshold, color(0, 0, 255), 3);
            this.showGauge(this.reproduction.value, this.reproduction.max, undefined, color(128, 20, 0), 4);
        }
        
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

    showGauge(value, max, threshold, color, order) {
        let gaugeSize = createVector(50, 10);
        let gaugePos = createVector(
            this.getPos().x - gaugeSize.x / 2,
            this.getPos().y - this.getMass() - order * gaugeSize.y
            );

        stroke(0);
        strokeWeight(1);
        noFill();

        rect(gaugePos.x, gaugePos.y, gaugeSize.x, gaugeSize.y);

        fill(color);
        noStroke();
        rect(gaugePos.x, gaugePos.y, gaugeSize.x * (value/max), gaugeSize.y);
    }

    isMoving() {
        return this.status == Status.ACTIVE; 
    }

    isDead()
    {
        return this.status == Status.DEAD; 
    }

    isHungry()
    {
        return this.hunger.value >= this.hunger.eatThreshold;
    }

    updateHunger(massEaten) {
        if(this.hunger.value - massEaten >= 0)
        {
            this.hunger.value -= massEaten;
        }
    }

    toggleGauges()
    {
        this.showGauges = !this.showGauges;
    }
}