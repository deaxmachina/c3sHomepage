export class Flower {
	constructor(aIncrement, xoffIncrement, p5) {
		this.aIncrement = aIncrement;
		this.xoffIncrement = xoffIncrement;
		this.p5 = p5;
	}

	drawVertex(cx, cy, xoff, yoff, fillC, strokeC, rMin, rMax, a) {
		if (fillC) {
			this.p5.fill(fillC);
		} else {
			this.p5.noFill();
		}
		if (strokeC) {
			this.p5.stroke(strokeC);
		} else {
			this.p5.noStroke();
		}
		const n = this.p5.noise(xoff, yoff);
		const r = this.p5.sin(2 * a) * this.p5.map(n, 0, 1, rMin, rMax);
		const x = r * this.p5.cos(a);
		const y = r * this.p5.sin(a);
		this.p5.vertex(x + cx, y + cy);
	}

	drawWings(cx, cy, xoff, yoff, fillC, strokeC, rMin, rMax, rotation = 0) {
		this.p5.push();
		this.p5.translate(cx, cy);
		this.p5.rotate(rotation);
		this.p5.beginShape();

		this.p5.blendMode(this.p5.SCREEN);
		//BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN, ADD, REMOVE or SUBTRACT

		// Right wing
		for (let a = 0; a < this.p5.PI; a += this.aIncrement) {
			this.drawVertex(0, 0, xoff, yoff, fillC, strokeC, rMin, rMax, a);
			xoff += this.xoffIncrement;
		}
		// Left wing
		for (let a = this.p5.PI; a <= this.p5.PI * 2; a += this.aIncrement) {
			this.drawVertex(0, 0, xoff, yoff, fillC, strokeC, rMin, rMax, a);
			xoff -= this.xoffIncrement;
		}
		this.p5.endShape();
		this.p5.pop();
	}

	drawEnclosingCircles(cx, cy, r) {
		this.p5.stroke(255, 255, 255, 50);
		this.p5.strokeWeight(0.5);
		this.p5.noFill();
		this.p5.circle(cx, cy, r * 2);
	}

	isInside(cx, cy, mouseCx, mouseCy, r) {
		return this.p5.dist(cx, cy, mouseCx, mouseCy) < r;
	}
}
