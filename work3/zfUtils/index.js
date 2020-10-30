const fs=require('fs')
const https=require('https')
const cheerio=require('cheerio')
const querystring=require('querystring')
const iconv=require('iconv-lite')
const { cookie } = require('server/reply')

const baseurl='https://jwc.gdmec.edu.cn'
const vcodeurl='https://jwc.gdmec.edu.cn/CheckCode.aspx'

function getViewstate(cb){
    https.get(baseurl,(res)=>{
        let chunks=[]
        res.on('data',(chunk)=>{
            chunks.push(chunk)
        })
        res.on('end',()=>{
            let $=cheerio.load(chunks.toString())
            cb($('input[name="__VIEWSTATE').val())
        })
    })
}
function getVcode(cb){
    https.get(vcodeurl,(res)=>{
        res.setEncoding('binary')
        cookie=res.headers['set-cookie']
        let imgData=''
        res.on('data',(chunk)=>{
            imgData+=chunk
        })
        res.on('end',()=>{
            cb(cookie,imgData)
        })
    })
}
function login({user,password,vcode,viewstate,cookie,RadioButtonList1},cb){

    let postData=querystring.encode({
        __VIEWSTATE:viewstate,
        TextBox1:user,
        TextBox2:password,
        TextBox3:vcode,
        Button1:'',
        RadioButtonList1:''
    })

    postData+='%D1%A7%C9%FA'
    console.log(postData)

    let opt={
        host:'jwc.gdmec.edu.cn',
        port:443,
        path:'/default2.aspx',
        method:'post',
        headers:{
            'content-type':'application/x-www-form-urlencoded',
            'content-length':Buffer.byteLength(postData),
            'Cookie':cookie
        }
    }

    let req=https.request(opt,(res)=>{
        let chunks=[]
        res.on('data',(chunk)=>{
            chunks.push(chunk)
        })
        res.on('end',()=>{
            console.log(chunks.toString())
            geturl()
        })
    })

    req.write(postData)
    req.end()
}

function geturl(){
    let refer=`https://jwc.gdmec.edu.cn/js_main.aspx?xh=${user}`
    let opt={
        headers:{
            'Referer':refer,
            'Cookie':cookie,
        }
    }
    https.get(someurl,opt,(res)=>{
        let chunks=[]
        res.on('data',(chunk)=>{
            chunks.push(chunk)
        })
        res.on('end',()=>{
            let buffer=Buffer.concat(chunks)
            let str=iconv.decode(buffer,'gbk')
            let $=cheerio.load(str)
            $('#kcmcgrid>tbody>tr>td:nth-child(2)').map(function(el){
                console.log($(this).text())
            })
        })
    })

}