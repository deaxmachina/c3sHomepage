import _ from 'lodash';
import { voronoiTreemap } from 'd3-voronoi-treemap';
import * as d3 from 'd3';
// import { voronoiMap } from 'd3-voronoi-map';

const types = ['A', 'B', 'C', 'D', 'E', 'F'];

const fibonacci = [
	0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946,
	17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578,
	5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296,
	433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049, 12586269025,
	20365011074, 32951280099, 53316291173, 86267571272, 139583862445, 225851433717, 365435296162,
	591286729879, 956722026041, 1548008755920, 2504730781961, 4052739537881, 6557470319842,
	10610209857723, 17167680177565, 27777890035288, 44945570212853, 72723460248141, 117669030460994,
	190392490709135, 308061521170129, 498454011879264, 806515533049393, 1304969544928657,
	2111485077978050, 3416454622906707, 5527939700884757, 8944394323791464, 14472334024676221,
	23416728348467685, 37889062373143906, 61305790721611591, 99194853094755497, 160500643816367088,
	259695496911122585, 420196140727489673, 679891637638612258, 1100087778366101931,
	1779979416004714189, 2880067194370816120, 4660046610375530309, 7540113804746346429,
	12200160415121876738, 19740274219868223167, 31940434634990099905, 51680708854858323072,
	83621143489848422977, 135301852344706746049, 218922995834555169026, 354224848179261915075,
	573147844013817084101, 927372692193078999176, 1500520536206896083277, 2427893228399975082453,
	3928413764606871165730, 6356306993006846248183, 10284720757613717413913, 16641027750620563662096,
	26925748508234281076009, 43566776258854844738105, 70492524767089125814114,
	114059301025943970552219, 184551825793033096366333, 298611126818977066918552,
	483162952612010163284885, 781774079430987230203437, 1264937032042997393488322,
	2046711111473984623691759, 3311648143516982017180081, 5358359254990966640871840,
	8670007398507948658051921, 14028366653498915298923761, 22698374052006863956975682,
	36726740705505779255899443, 59425114757512643212875125, 96151855463018422468774568,
	155576970220531065681649693, 251728825683549488150424261, 407305795904080553832073954,
	659034621587630041982498215, 1066340417491710595814572169, 1725375039079340637797070384,
	2791715456571051233611642553, 4517090495650391871408712937, 7308805952221443105020355490,
	11825896447871834976429068427, 19134702400093278081449423917, 30960598847965113057878492344,
	50095301248058391139327916261, 81055900096023504197206408605, 131151201344081895336534324866,
	212207101440105399533740733471, 343358302784187294870275058337, 555565404224292694404015791808,
	898923707008479989274290850145, 1454489111232772683678306641953, 2353412818241252672952597492098,
	3807901929474025356630904134051, 6161314747715278029583501626149, 9969216677189303386214405760200,
	16130531424904581415797907386349, 26099748102093884802012313146549,
	42230279526998466217810220532898, 68330027629092351019822533679447,
	110560307156090817237632754212345, 178890334785183168257455287891792,
	289450641941273985495088042104137, 468340976726457153752543329995929,
	757791618667731139247631372100066, 1226132595394188293000174702095995,
	1983924214061919432247806074196061, 3210056809456107725247980776292056,
	5193981023518027157495786850488117, 8404037832974134882743767626780173,
	13598018856492162040239554477268290, 22002056689466296922983322104048463,
	35600075545958458963222876581316753, 57602132235424755886206198685365216,
	93202207781383214849429075266681969, 150804340016807970735635273952047185,
	244006547798191185585064349218729154, 394810887814999156320699623170776339,
	638817435613190341905763972389505493, 1033628323428189498226463595560281832,
	1672445759041389840132227567949787325, 2706074082469579338358691163510069157,
	4378519841510969178490918731459856482, 7084593923980548516849609894969925639,
	11463113765491517695340528626429782121, 18547707689472066212190138521399707760,
	30010821454963583907530667147829489881, 48558529144435650119720805669229197641,
	78569350599399234027251472817058687522, 127127879743834884146972278486287885163,
	205697230343234118174223751303346572685, 332825110087069002321196029789634457848,
	538522340430303120495419781092981030533, 871347450517372122816615810882615488381,
	1409869790947675243312035591975596518914
];

class Dragonfly {
	constructor(
		colours,
		ctx,
		x,
		y,
		scale = 1,
		rotate = 0,
		rotateWing = Math.PI * 0.25,
		numPoints = 600,
		strokeFill = colours[0],
		outerStrokeWidth = 5,
		backgroundFill = 'black',
		opacity = 0.8,
		widthVoronoi = 550,
		heightVoronoi = 260,
		clippingPathD = 'M7.49, 18 C1155 -28, 284, 512, 21, 61, 21, 61, 18, 62, 7.5, 18Z'
	) {
		this.colours = colours;
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.opacity = opacity;
		this.scale = scale;
		this.rotate = rotate;
		this.rotateWing = rotateWing;
		this.widthVoronoi = widthVoronoi;
		this.heightVoronoi = heightVoronoi;
		this.numPoints = numPoints;
		this.voronoiClipShape = [
			[0, 0],
			[0, this.heightVoronoi],
			[this.widthVoronoi, this.heightVoronoi],
			[this.widthVoronoi, 0]
		];

		this.strokeFill = strokeFill;
		this.outerStrokeWidth = outerStrokeWidth;
		this.backgroundFill = backgroundFill;
		this.bodyFill = _.sample(this.colours);
		this.bodyFillCache = _.sample(this.colours);
		this.clippingPathD = clippingPathD;
		this.voronoiTreeMap = this.getVoronoiTreeMap();
		this.voronoiPaths = this.getVoronoiPaths();
		this.outsideFill = null;
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	setColours(colours) {
		this.colours = colours;
		this.bodyFill = _.sample(this.colours);
		this.bodyFillCache = _.sample(this.colours);
		this.voronoiPaths = this.getVoronoiPaths();
	}

	setScale(scale) {
		this.scale = scale;
	}

	setOutsideFill(fill) {
		this.outsideFill = fill;
	}

	setBodyFill(fill) {
		if (fill !== null) {
			this.bodyFill = fill;
		} else {
			this.bodyFill = this.bodyFillCache;
		}
	}

	setOpacity(opacity) {
		this.opacity = opacity;
	}

	// Helper function to generate some fake data
	getDummyData() {
		const data = _.range(this.numPoints).map((i) => {
			// const value = i === 0 ? 700 : i > this.numPoints * 0.5 ? random(5, 20) : i > this.numPoints * 0.75 ? random(20, 40) : random(30, 120)
			// const value = [...fibonacci.slice(0, 100), ...fibonacci.slice(0, 100)][i]
			const fibonacciModified = [
				...fibonacci.slice(0, 100),
				...fibonacci.slice(0, 100),
				...fibonacci.slice(100, 200),
				...fibonacci.slice(100, 200)
			]; //.map((d) => Math.sqrt(d));
			const value = fibonacciModified[i];
			return {
				i,
				type: _.sample(types),
				value: value
			};
		});
		return data;
	}

	// Get the d3 voronoiMap given a clipping shape
	getVoronoiTreeMap() {
		const voronoiTreeMap = voronoiTreemap().clip(this.voronoiClipShape).convergenceRatio(0.01);
		return voronoiTreeMap;
	}

	// Using the voronoiTreeMap, get an array of the
	// voroni-generated paths for the given data,
	// as well as their style properties like fill, stroke, stroke width
	getVoronoiPaths(data = this.getDummyData()) {
		const group = d3.group(data, (d) => d['type']);
		const hierarchy = d3.hierarchy(group).sum((d) => d['value']);
		this.voronoiTreeMap(hierarchy);
		const voronoiPaths = hierarchy
			.descendants()
			.sort((a, b) => b.depth - a.depth)
			.map((d, i) => Object.assign({}, d, { id: i }));
		// Add the complete path string for the nodes
		voronoiPaths.forEach((path) => (path.d = 'M' + path.polygon.join('L') + 'Z'));
		// Compute the paths corresponding to the path strings
		voronoiPaths.forEach((path) => (path.path = new Path2D(path.d)));
		// Add the stroke width and col for each of the paths
		voronoiPaths.forEach(
			(path) => (path.strokeWidth = _.sample([0.1, 0.2, 0.3, 0.4, 0.5, 1, 1.5, 2, 2.5]))
		);
		voronoiPaths.forEach((path) => (path.fill = _.sample(this.colours)));
		return voronoiPaths;
	}

	// Create a clipping path based on the clipping d-string
	// provided and clip to it using the canvas api
	drawWingClippingPath() {
		const clippingPath = new Path2D(this.clippingPathD);
		this.ctx.beginPath();
		this.ctx.clip(clippingPath);
	}

	// Just a stroke outline in the shape of the clipping path
	// if we want to have a stroke around the whole shape; since
	// there is no way to 'stroke' a clipping path
	drawWingOutline() {
		const outlinePath = new Path2D(this.clippingPathD);
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.strokeFill;
		this.ctx.globalAlpha = this.opacity;
		this.ctx.lineWidth = this.outerStrokeWidth;
		this.ctx.stroke(outlinePath);
		this.ctx.restore();
	}

	// Draw the voronoi paths for a single wing - filled or just stroked
	// Note that will draw all the voronoi paths according to the
	// supplied clipping path for the voronoi; and not the clipping
	// path that generates the wings
	drawVoronoiTree(filled = true) {
		this.voronoiPaths.forEach((path, i) => {
			this.ctx.save();
			this.ctx.globalAlpha = this.opacity;
			if (filled) {
				if (this.outsideFill) {
					this.ctx.fillStyle = this.outsideFill;
				} else {
					this.ctx.fillStyle = path.fill;
				}
			} else {
				this.ctx.fillStyle = 'rgba(0,0,0,0)';
			}
			this.ctx.strokeStyle = this.strokeFill;
			this.ctx.lineWidth = path.strokeWidth;
			this.ctx.beginPath();
			if (path.depth === 2) this.ctx.fill(path.path);
			this.ctx.stroke(path.path);
			this.ctx.closePath();
			this.ctx.restore();
		});
	}

	// Draw a single complete wing (voronoi + clipping mask)
	drawWing(rotate, wing = 'right', filled = true) {
		// This affects everything - both mask and following wing
		this.ctx.save();
		// Translate to the supplied x and y position
		this.ctx.translate(0, 30);

		// Rotate by the supplied rotation amount
		if (wing === 'left') this.ctx.rotate(rotate);
		if (wing === 'right') this.ctx.rotate(-rotate);

		// Use the scale to reflect the left wing
		if (wing === 'left') this.ctx.scale(-1, 1);

		this.drawWingClippingPath();
		this.drawVoronoiTree(filled);
		this.drawWingOutline();

		this.ctx.restore();
	}

	// Draw both left and right wing, up and down
	drawWings() {
		// Unfilled bottom right and left wings
		this.drawWing(0.2 * this.rotateWing, 'right', false);
		this.drawWing(0.2 * this.rotateWing, 'left', false);
		// Filled top right and left wings
		this.drawWing(this.rotateWing, 'right', true);
		this.drawWing(this.rotateWing, 'left', true);
	}

	// Draw the body
	drawBody(numSegments = 24, gap = 2) {
		const fill = this.bodyFill;
		this.ctx.save();
		_.range(numSegments).forEach((i) => {
			this.ctx.beginPath();
			this.ctx.arc(0, (numSegments + gap) * i - 30, Math.max(5, numSegments - i), 0, Math.PI * 2);
			this.ctx.fillStyle = fill;
			this.ctx.globalAlpha = this.opacity; // HERE
			this.ctx.strokeStyle = this.strokeFill;
			this.ctx.fill();
			this.ctx.stroke();
		});
		this.ctx.restore();
	}

	// Draw everything
	drawDragonfly() {
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.scale(this.scale, this.scale);
		this.ctx.rotate(this.rotate, this.rotate);
		this.drawWings();
		this.drawBody();
		this.ctx.restore();

		// ctx.fillStyle = 'lightblue'
		// ctx.beginPath()
		// ctx.arc(this.x, this.y, this.scale*500, 0, Math.PI*2)
		// ctx.fill()
		// ctx.closePath()
	}

	// Change the rotation - this is useful for animation
	setRotate(rotate) {
		this.rotateWing = rotate;
	}

	// Check if the whole dragonfly is 'hovered'
	// TODO: This can be refactored to use the is point in path api
	clicked(x, y, dist, distance = 700) {
		const d = dist(x, y, this.x, this.y);
		return d < this.scale * distance;
	}
}

export default Dragonfly;
