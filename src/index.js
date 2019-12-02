class Canvas {

    constructor(width = 640, height = 480, background = `#000000`)  {
        this.width = width
        this.height = height
        this.background = background
        this._init()
    }

    _init() {
        this.sprites = []
        var { _keydown, width, height } = this
        this._canvas = document.getElementsByTagName('canvas')
            .item(0)
        this._canvas.width = width
        this._canvas.height = height
        this._context = this._canvas.getContext('2d')
        document.addEventListener('keydown', _keydown.bind(this))
        this._loop()
    }

    _keydown({ key }) {
        switch(key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                var sprite = this.sprites
                    .find(s => s.color == 'limegreen')
                sprite
                    .move(key, this)
                break
        }
    }

    _loop() {
        var { _context: c, _loop, sprites, background, width, height } = this
        c.fillStyle = background
        c.fillRect(0, 0, width, height)
        for (var sprite of sprites) {
            c.fillStyle = sprite.color
            c.fillRect(sprite.x, sprite.y, sprite.width, sprite.height)
        }
        requestAnimationFrame(_loop.bind(this))
    }

    add(sprite) {
        console.log('add', sprite)
        this.sprites.push(sprite)
        return this
    }

}

var canvas = new Canvas()

class Sprite {

    constructor(x, y, width, height, color, dx = 1, dy = 1) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.dx = dx
        this.dy = dy
    }

    move(key, c) {
        var { dx, dy } = this
        var type = key.toLowerCase().substr(5)
        switch(type) {
            case 'up':
                if (this.y - dy >= 0)
                    this.y -= dy
                break
            case 'down':
                if (this.y + this.height + this.dy <= c.height)
                    this.y += dy
                break
            case 'left':
                if (this.x - dx >= 0)
                    this.x -= dx
                break
            case 'right':
                if (this.x + this.width + dx <= c.width)
                    this.x += dx
                break
        }
    }

}

class Snake extends Sprite {

    constructor(...args) {
        super(...args)
    }

}

class Food extends Sprite {

    constructor(...args) {
        super(...args)
    }

}

var random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

canvas.add(new Snake(100, 100, 24, 24, 'limegreen', 4, 4))

var n = 1
while(canvas.sprites.filter(s => s.color == 'red').length < 10) {
    canvas.add(new Food(random(10, canvas.width - 10), random(10, canvas.height), 24, 24, 'red'))
    n++
    if (n > 20)
        throw 'oops'
}