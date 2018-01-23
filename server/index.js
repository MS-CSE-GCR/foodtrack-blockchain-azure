function server(config, port) {
    const express = require('express')
    // const mongoose = require("./mongoose.js")
    var mongoose = require('mongoose');
    mongoose.connect(config.databaseURI, { useMongoClient: true });
    mongoose.Promise = global.Promise;

    const model2api = require('./model2api.js')
    const app = express()
    const router = express.Router()
    var bodyParser = require('body-parser')
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/public', express.static('./server/web'))
    app.use('/node_modules', express.static('./node_modules'))


    

    let auth = null;

    if(config.auth) {
        const authfunc = require("./auth/auth.js")
        auth = authfunc({secret:config.secret, dayForTokenExpiration:config.dayForTokenExpiration})

        const usermodel = require("./auth/user.model.js")
        const rolemodel = require("./auth/role.model.js")
        model2api(usermodel, router, mongoose, auth)
        model2api(rolemodel, router, mongoose, auth)
        
        router.post('/login', auth.login);
        router.post('/register', auth.register);
    }

    
    const models = [];
    for(let modelpath of config.models) {
        const model = require(modelpath)
        model2api(model, router, mongoose, auth)
        models.push(model);
    }

    app.get('/modelmeta', function(req, res) {
        res.status(200).send(`const models = ${JSON.stringify(models, null, 4)}`);
    });

    app.use('/api', router);
    app.listen(port || 3000, () => console.log('app listening on port 3000!'))
}

server({
    'databaseURI':'mongodb://localhost:27017/test',
    'secret': 'thisIsTopSecret',
    'dayForTokenExpiration' : 7,
    'auth':false,
    'models':[
        '../model/a.model.js',
        '../model/b.model.js',
        '../model/c.model.js'
    ]
})