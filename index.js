import http from 'node:http'

const server = http.createServer((req, res) =>
{


})


server.listen(process.env.APP_PORT, process.env.APP_LOCALHOST, () =>
{
    console.log(`Server listening at http://${process.env.APP_LOCALHOST}:${process.env.APP_PORT}`)
})