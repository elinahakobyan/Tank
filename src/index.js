
import * as PIXI from 'pixi.js';

export class Game extends PIXI.Application {
	constructor() {
		super({
			width: window.innerWidth,
			height: window.innerWidth,
			backgroundColor: 0x1099bb,
		})
		this.width = window.screen.width;
		this.height = window.screen.heigth;
		document.body.appendChild(this.view)
		this.loadAssets()

	}

	loadAssets() {
		this.loader.load(() => {
			this.createGraphics();
			this.rectangleMove();
			this.moveContainer();
			this.fire();

		})

	}

	createGraphics() {

		this.container = new PIXI.Container
		this.container.position.set(350, 350)

		this.roundBox = new PIXI.Graphics()
		this.roundBox.lineStyle(4, 0xffff00, 1)
		this.roundBox.beginFill(0xffff00)
		this.roundBox.drawRoundedRect(-40, -70, 80, 140, 10);

		this.circle = new PIXI.Graphics()
		this.circle.beginFill(0xff3300)
		this.circle.drawCircle(0, 0, 15)

		this.rectangle = new PIXI.Graphics()
		this.rectangle.beginFill(0xff3300);
		this.rectangle.drawRect(-5, -80, 10, 90);

		this.container.addChild(this.roundBox)
		this.container.addChild(this.circle)
		this.container.addChild(this.rectangle)
		this.stage.addChild(this.container)

	}
	toShoot() {
		this.ticker.add((deltaTime) => {
			const mousX = this.a;
			const mousY = this.b;

			const direction = this.direction
			this.fire.position.x += direction * Math.sin(Math.atan(this.k))
			this.fire.position.y += direction * Math.cos(Math.atan(this.k))
			// this.stage.removeChild(this.fire)
			if (this.fire.position.x === mousX && this.fire.position.y === mousY) {
				console.warn('stop');
			}
		});

	}


	fire() {
		this.view.addEventListener("pointerdown", () => {
			this.fire = new PIXI.Graphics()
			this.fire.beginFill(0xff3300);
			this.fire.drawRect(0, 0, 10, 10);
			this.fire.y = -this.rectangle.height

			this.rectangle.addChild(this.fire)
			const point = this.fire.parent.toGlobal(new PIXI.Point(this.fire.x, this.fire.y))
			this.stage.addChild(this.fire)
			this.fire.position.set(point.x, point.y)


			this.toShoot()

		})




	}

	rectangleMove() {

		this.view.addEventListener('mousemove', e => {
			let mix = (this.stv === 2 || this.stv === 4) ? 1 : 0;
			this.a = e.clientX;
			this.b = e.clientY;

			const y = this.rectangle.parent.x;
			const x = this.rectangle.parent.y;
			this.k = (y - this.a) / (x - this.b);

			if (this.b >= this.rectangle.parent.y) {
				this.direction = 1
				this.rectangle.rotation =
					Math.PI - Math.atan(this.k) + this.rectangle.parent.rotation + mix * Math.PI
			} else {
				this.direction = -1
				this.rectangle.rotation = - Math.atan(this.k) + this.rectangle.parent.rotation + mix * Math.PI
			}
		})

	}

	moveContainer() {
		let stv = 1;
		window.addEventListener('keydown', key => {
			let keypress = key.code;
			if ((key.code == 'KeyW') || (keypress == 'ArrowUp')) {
				if (stv == 3) {
					this.container.rotation += Math.PI
					stv = 1
				} else if (stv == 2) {
					stv = 1
					this.container.rotation -= Math.PI / 2
				} else if (stv == 4) {
					stv = 1
					this.container.rotation += Math.PI / 2
				}
				this.container.y -= 5
			}
			if ((keypress == 'KeyS') || (keypress == 'ArrowDown')) {
				this.container.y += 5
				if (stv == 1) {
					this.container.rotation += Math.PI
					stv = 3
				} else if (stv == 2) {
					this.container.rotation += Math.PI / 2
					stv = 3
				} else if (stv == 4) {
					this.container.rotation -= Math.PI / 2
					stv = 3
				}
			}
			if ((keypress == 'KeyA') || (keypress == 'ArrowLeft')) {
				if (stv == 1) {
					this.container.rotation -= Math.PI / 2
					stv = 4
				} else if (stv == 2) {
					this.container.rotation += Math.PI
					stv = 4
				} else if (stv == 3) {
					this.container.rotation += Math.PI / 2
					stv = 4
				}
				this.container.x -= 5
			}
			if ((keypress == 'KeyD') || (keypress == 'ArrowRight')) {
				if (stv == 3) {
					this.container.rotation -= Math.PI / 2
					stv = 2
				} else if (stv == 1) {
					this.container.rotation += Math.PI / 2
					stv = 2
				} else if (stv == 4) {
					this.container.rotation -= Math.PI
					stv = 2
				}
				this.container.x += 10
			}
			this.stv = stv
		})
	}
}
new Game();