var express = require('express')
var router = express.Router();
const credential = {
    email: "gokul@gmail.com",
    password: "gokul123"
}
var logout = false
 ////Home Route
router.get('/',(req,res)=>{
    if(!req.session.loggedIn)
    {
        res.setHeader('cache-control','private,no-cache,no-store,must-revalidate')
        if(logout) {
            res.render('base',{logout: "logout"})
            logout = false
            return
        }
        if(req.session.invalid) {
            res.render('base',{user: "Invalid details"})
            return
        }
        res.render('base')

    }
    else{
        res.redirect('/route/dashboard')
    }
})

//Login User
router.post('/route/login',(req,res)=>{
    
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.loggedIn=true
        req.session.user=req.body.email;
       res.redirect('/route/dashboard')
    } else {
        req.session.invalid = true
        res.redirect('/')

    }
})

//Route for dashboard
router.get('/route/dashboard',(req,res)=>{
    res.setHeader('cache-control','private,no-cache,no-store,must-revalidate')
    if(req.session.loggedIn){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.redirect('/')
    }
})

//Route for logout

router.get('/route/logout',(req,res,next)=>{

    req.session.destroy()
    logout = true
    res.redirect('/')


})

module.exports = router