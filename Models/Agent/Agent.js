class Agent {
    constructor(widthLimit=800, heigthLimit=600, parent=undefined) {

        this.limits = {
            width: widthLimit,
            heigth: heigthLimit
        }
        this.parent = parent;
        this.children = [];
        this.body = new Body(this.limits.width, this.limits.heigth, parent ? parent.body : undefined);
        this.target = undefined;

        // Offset vector to generate a perlin noise related to the wandering velocity
        this.wanderNoiseOff = createVector(random(-Math.PI, Math.PI), random(-Math.PI, Math.PI));
        // Vector used to randomize the body's velocity
        this.wanderVelocity = createVector(0, 0);

        if(this.parent)
        {
            this.range = this.parent.range + random(-1, 1);
            this.fleeingRange = this.parent.fleeingRange + random(-1, 1);
        }
        else
        {
            this.range = 100 + this.getMass();
            this.fleeingRange = 30 + this.getMass();
        }
        
        this.fustrum = new Fustrum();
        // this.perception = [];
        // this.followList = [];
    }

    findNewTarget()
    {
        let minTarget = this.perception[0];
        this.perception.forEach(target => {
            if(this.getPos().dist(minTarget.getPos()) >= this.getPos().dist(target.getPos()))
            {
                minTarget = target;
            }
        });
        
        if(this.perception.length != 0)
            this.target = minTarget;
    }

    borderCollisions() {
        if(this.getPos().x - this.getMass() > this.limits.width)
        {
            this.body.pos.x = -this.getMass();
        }
        else if(this.getPos().x + this.getMass() < 0)
        {
            this.body.pos.x = this.limits.width + this.getMass();
        }
        if(this.getPos().y - this.getMass() > this.limits.heigth)
        {
            this.body.pos.y = -this.getMass();
        }
        else if(this.getPos().y + this.getMass() < 0)
        {
            this.body.pos.y = this.limits.heigth + this.getMass();
        }
    }

    // changeTarget(x, y)
	// {
	// 	this.target = createVector(x, y);
	// }

	targetReached(target=undefined, threshold = 10)
	{
        if(target == undefined)
            return false;
        return dist(this.getPos().x, this.getPos().y, target.getPos().x, target.getPos().y) < this.getMass() + target.getMass();
		// return p5.Vector.sub(this.target.getPos(), this.getPos()).mag() <= threshold ? true : false;
	}

    showTargets()
    {
        this.perception.forEach(target => {
            strokeWeight(1);
            stroke(color(0, 0, 255));
            line(
                this.getPos().x, 
                this.getPos().y, 
                target.getPos().x,
                target.getPos().y);
        });
        if(this.target)
        {
            strokeWeight(2);
            stroke(color(255, 0, 0));
            line(
                this.getPos().x, 
                this.getPos().y, 
                this.target.getPos().x,
                this.target.getPos().y);
        }
        
    }

    eat(target)
    {
        if(target.getType() == AgentType.DECOMPOSOR)
            return;
        target.setStatus(Status.EATEN);
        this.body.reproduction.value += target.getMass();
        this.body.updateHunger(target.getMass());
        if(this.body.reproduction.value >= this.body.reproduction.max)
        {
            let newChild = new Agent(this.limits.width, this.limits.heigth, this);
            newChild.setStatus(Status.NEWBORN);
            newChild.body.type = this.getType();
            newChild.body.defaultColor = this.body.defaultColor;
            this.children.push(newChild);
            this.body.reproduction.value = 0;
            // console.log(newChild);
        }
    }

    seek(target=undefined)
	{
        if(target != undefined)
        {
            this.body.acc.add(p5.Vector.sub(target, this.getPos()));
            this.body.acc.mult(this.body.force);
            this.body.velocity.mult(this.body.acc);
        }
        
	}

	flee(target, radius = 50)
	{
        this.body.acc.add(p5.Vector.sub(this.getPos(), target));
        this.body.force = (1 / this.getPos().dist(target)) % this.body.maxForce;
        this.body.acc.mult(this.body.force);
        // this.body.velocity.mult(this.body.acc);
        //this.force = radius - this.pos.dist(target);
        //debugDiv.innerHTML = "x : " + x + " / y : " + y;
	}

    follow() {
        let meanDir = createVector(0,0);
        this.perception.forEach(target => {
            meanDir.add(target.body.velocity.normalize());
        });
        if(this.perception != 0)
        {
            meanDir.div(this.perception.length);
            this.body.velocity.add(meanDir);
        }
        // this.body.force = 1 / this.getPos().dist(target);
    }

    followTarget(target) {
        if(target != undefined) {
            this.body.velocity.add(target.getVelocity());
        }
    }

    filtrePerception() {
        // this.fustrum.getPerception().forEach(target => {
        // });
    }

    reproduce() {
        if(this.getReproduction().value >= this.getReproduction().max)
        {
            this.getReproduction().value = 0;
            return true;
        }
        else
            return false;
    }

    move() {
        this.wander();
        // this.follow();
        this.filtrePerception();
    }

    /**
     * Agent is wandering on the map, following a perlin noised direction
     */
    wander() {
        // debugger;
        this.wanderNoiseOff.add((random(1)-1) * 0.01, (random(1)-1) * 0.01);
        this.wanderVelocity = createVector(
            Math.cos( (noise(this.wanderNoiseOff.x) / (Math.PI * 15)) * 360),
            Math.sin( (noise(this.wanderNoiseOff.y) / (Math.PI * 15)) * 360)
            );
        this.body.velocity.add(this.wanderVelocity);
        
    }

    update() {
        if(this.body.isMoving())
        {
            this.move();
            this.borderCollisions();
        }
        
        this.body.update();

        // this.showRange();
        // this.showTargets();
    }

    showRange() {
        noFill();
        strokeWeight(1);
        stroke(0);
        ellipse(this.getPos().x, this.getPos().y, this.range * 2);
        stroke(255, 0, 0);
        ellipse(this.getPos().x, this.getPos().y, this.fleeingRange * 2);
        stroke(255, 255, 0);
        ellipse(this.getPos().x, this.getPos().y, this.infectedRange * 2);
    }

    getPos()
    {
        return this.body.getPos();
    }

    getMass() {
        return this.body.getMass();
    }

    getStatus() {
        return this.body.getStatus();
    }

    setStatus(newStatus) {
        return this.body.setStatus(newStatus);
    }

    getType() {
        return this.body.getType();
    }

    getReproduction() {
        return this.body.reproduction;
    }

    addToPerception(target)
    {
        this.fustrum.perception.push(target);
    }

    isHungry()
    {
        return this.body.isHungry();
    }

    toggleGauges()
    {
        this.body.toggleGauges();
    }
}