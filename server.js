const express = require('express')
const mongoose = require("./server/mongoose.js")
const app = express()
const router = express.Router()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('./'))


const model2api = require('./server/model2api.js')
const helloModel = require('./model/hello.model.js')
model2api(helloModel, router, mongoose)
const helloModel2 = require('./model/hello2.model.js')
model2api(helloModel2, router, mongoose)
const a = require('./model/a.model.js')
model2api(a, router, mongoose)
const b = require('./model/b.model.js')
model2api(b, router, mongoose)
const c = require('./model/c.model.js')
model2api(c, router, mongoose)


app.use('/api', router);
app.listen(3000, () => console.log('Example app listening on port 3000!'))