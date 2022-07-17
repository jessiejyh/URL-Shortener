const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  url: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
    unique: true  //避免重複
  },
  newUrl: {
    type: String,
    reruired: true 
  }
})
module.exports = mongoose.model('URL', urlSchema)