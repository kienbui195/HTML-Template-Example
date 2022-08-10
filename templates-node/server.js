const fs  = require('fs')
const http  = require('http')

let server = http.createServer((req, res) => {
    fs.readFile('./templates/index.html', 'utf-8' ,(err, data) => {
        if (err) {
            res.writeHead(404, {'Content-type': 'text/html'})
            res.end(`404 Not Found`)
        }

        let username = 'Admin'
        data = data.replace('{username}', username)
        res.writeHead(200,{'Content-type': 'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen('8080', () => {
    console.log(`Server is running in http://localhost:8080`)
})