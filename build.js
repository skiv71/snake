var cheerio = require('cheerio')
var fs = require('fs')
var pretty = require('pretty')

var file = {
    _html: `src/index.html`,
    _js: `src/index.js`,
    path(f) {
        return `${__dirname}/${f}`
    },
    get html() {
        return this.path(this._html)
    },
    get js() {
        return this.path(this._js)
    }
}



function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err)
                return reject(err)
            resolve(data)
        })
    })
}

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err)
                return reject(err)
            resolve()
        })
    })
}

async function main() {
    try {
        var html = await readFile(file.html)
        var js = await readFile(file.js)
        var $ = cheerio.load(html)
        $('head').append(`<script defer>${js}</script>`)
        await writeFile(file.path('dist/index.html'), pretty($.html()))
    } catch(e) {
        console.log(e)
    }
}

main()