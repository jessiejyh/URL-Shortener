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
// 與資料庫互動
app.post('/url', (req, res) => {
  const url = req.body.url
  const newUrl = generateUrl(url)
  res.render('show', { newUrl, url })

  URL.create({ url, newUrl }) //存入資料庫
    .then(() => res.redirect('/'))//導回首頁
    .catch(error => console.log(error))
})


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})