const path=require('path')
const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const exphbs=require('express-handlebars')
const methodOverride=require('method-override')
const passport=require('passport')
const session=require('express-session')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const MongoStore=require('connect-mongo')(session)

const app=express()

//Load config
dotenv.config({path:'./config/config.env'})

//Passport config
require('./config/passport')(passport)
connectDB()

//Handle bar engines
app.engine('.hbs',exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set('view engine','.hbs')

//Logging
if(process.env.NODE_ENV=="development"){
    app.use(morgan('dev'))
}
//Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection})
  }))

    //Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Middleware router

app.use(express.static(path.join(__dirname,'public')))
app.use('/auth',require('./routes/auth'))

app.use('/',require('./routes/index'))


const PORT=process.env.PORT||5000


app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
