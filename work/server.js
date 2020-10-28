const express=require('express')
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
const {static}=require('express')
const uploadPath=`upload`
const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,uploadPath)
    },
    filename(req,file,cb){
        let ext=file.originalname.split(".").slice(-1)
        let filename=`${file.fieldname}-${Date.now()}.${ext}`
        console.log(filename)
        cb(null,filename)
    }
})
const upload=multer({storage})
app.post('/upload',upload.single('file'),(req,res)=>{
    res.send(req.file)
})
app.get('/upload',(request,response)=>{
    response.render('upload',{title:'文件上传'})
})
app.get('/login',(req,res)=>{
    res.render('login',{title:'登录'})
})
app.post('/login',(req,res)=>{
    if(req.body.user=='cuiyu'&&req.body.pwd=='york'){
        res.session.id=req.body.user
        req.session.user=req.body.user
        req.session.pwd=req.body.pwd
        res.send('登录成功')
    }else{
        res.send('密码错')
    }
})
app.get('/islogin',(req,res)=>{
    if(req.session.id!=underfind){
        res.send(req.session)
    }else{
        res.send('未登录')
    }
})
app.get('/querysample',(req,res)=>{
    res.send(req.query)
})
app.listen(port,()=>console.log(`express server running on port:${port}`))