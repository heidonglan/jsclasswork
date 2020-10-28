// const http=require('http')
// const app=http.createServer((request,Response){
//     Response.writeHead(200,{'content-type':'text/html'})
//     Response.write('hello from nodejs http server')
//     Response.end()
// })
// const port=8080
// app.listen(post,()=>console.log(`http server `))
const express=require('express')
// const { response } = require('express')
const app=express()
const port=8080
const path=require('path')
app.set('views',path.join(__dirname,'views'))
app.set('views engine','pug')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extend:false}))
const session=require('cookie-session')
app.use(session({
    name:'express session',
    keys:['id']
}))
const multer=require('multer')
const uploadPath=`upload`
const storage=multer.diskStorage({
    
})
app.get('/',(request,response)=>{
    response.end('hello from express.')
})
app.get('/world',(req))
app.listen(port,()=>console.log(`express server running on port:${port}`))