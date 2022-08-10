const fs  = require('fs')
const http  = require('http')
const qs = require('qs')

let server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./templates/index.html', 'utf-8' , (err,data) => {
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            console.log(qs.parse(data))
            return res.end('Register Success')
        })
        req.on('error', () => {
            console.log('error')
        })
    }

})

server.listen('8080', () => {
    console.log(`Server is running in http://localhost:8080`)
})