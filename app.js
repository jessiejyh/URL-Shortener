const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const URL = require('./models/url')
const generateUrl = require('./generate_url')
const app = express()

mongoose.connect(process.env.MONGODB_URI_exam, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})
// 產生新網址畫面
app.post('/url', (req, res) => {
  const url = req.body.url
  const urlHeader = req.headers.host
  const randomNum = generateUrl(url)

  if (!url) return res.redirect("/") //網址為空倒回首頁

  URL.findOne({ url: url })
    .then(data =>  //若網址不存在則製造短網址並存入資料庫
      data ? data : URL.create({ url, newUrl: randomNum })
    )
    .then(data => //若網址存在則載入原本短網址
      data ? res.render('show', { newUrl: data.newUrl, url, urlHeader }) : res.render('show', { newUrl: randomNum, url, urlHeader })
    )
    .catch(error => console.error(error))
})

app.get('/:randomNum', (req, res) => {
  const randomNum = req.params.randomNum

  URL.findOne({ newUrl: randomNum })
    .then(data => {
      res.redirect(data.url)
    })
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})