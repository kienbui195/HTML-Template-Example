const fs  = require('fs')
const http  = require('http')
const qs  = require('qs')

let users = []

let server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('register.html', 'utf-8' , (err, data) => {
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(data)
            res.end()
        })
    } else {
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            let input = qs.parse(data)
            fs.readFile('register.html', 'utf-8' , (err, data) => {
                if (err) {
                    console.log(err)
                }
                let userInfo = {
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    address: input.address
                }
                users.push(userInfo)
                console.log()
                console.log(`Danh sach Users`)
                console.log(users)
                res.writeHead(200, {'Content-type': 'text/html'})
                res.write(data)
                res.end()
            })
        })
    }
})

server.listen('8080', () => {
    console.log(`Server is running in http://localhost:8080`)
})