const express = require('express');
const router = express();
const newUser = require('./models/addUser');
const nodemailer = require('nodemailer');
const addUser = require('./models/addUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

router.post('/api/newUser', (req, res) =>{

    let data = req.body;

    const regUser = new newUser({
        first: data.first,
        last: data.last,
        email: data.email,
        username: data.username,
        password: data.password
    }); 

    regUser.save()
    .then( async item => {

        res.json(item);

        const findUser = await addUser.findOne({
            username: req.body.username
        });

        let userIdLink = "https://flopshop.herokuapp.com//auth?id=" + findUser._id;
      
        // Send confirmation email has moved here to only run on successful add
        const mailerOutput = `
        <h1>Welcome ${data.username} to the website</h1>
        <p>Before you can login, please verify your account using the link below</p>
        <a href=${userIdLink}>Click to Verify</a>
    `;

    const transporter = nodemailer.createTransport({
        host: "mail.patterntry.com", 
        port: 465, 
        secure: true, 
        auth: {
            user: "mailer@patterntry.com", 
            pass: "4d%T0Q{9v$mR"
        }
    })

    const mailOptions = {
        from: '"Website Mailer Client" <mailer@patterntry.com>',
        to: data.email, 
        subject: 'New User Registration', 
        html: mailerOutput
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            return console.log(error)
        } 
        console.log("Message Sent:", info.messageId);
    });


    })
    .catch(err => {
       res.status(400).json({msg:"There is an error", err}); 
    });
});

router.post('/api/loginuser', async (req, res) => {

    const findUser = await addUser.findOne({
        username: req.body.username
    }); 

    if(findUser){
        if(await bcrypt.compare(req.body.password, findUser.password)){
            if(findUser.accountStatus){
                res.send("User and Password Correct & User Is Authenticated");
            }else{
                res.send("You have not authenticated your account!")
            }

        } else {
            res.send("The Username or Password is Incorrect");
        }
    } else {
        res.send("No User Found")
    }
});

router.patch('/api/validate/:id', async (req, res) => {
    let userId = req.params.id;

    const findUser = await addUser.findOne({
        _id: userId
    });

    if(findUser){
        try {
            
            const tokenDecrypt = jwt.verify(findUser.token, process.env.ACCESS_TOKEN_SECRET);

            const authUser = await addUser.findOne({
                _id: userId, 
                username: tokenDecrypt.username, 
                email: tokenDecrypt.email
            });

            if(authUser){
                const updateAccountStatus = await addUser.updateOne(
                    {_id: req.params.id},
                    {$set: {accountStatus: true}}
                );

                res.json({user: authUser.username, success:true, msg:"Profile Verified"}) 

            } else {
                res.json({success:false, msg:"Profile Not Verified"}) 
            }

        } catch (error) {
           res.json({success:false, msg:"Invalid Token"}) 
        }

    }else{
        res.json({success: false, msg: "Verification Failed: Contact System Admin"});
    }
});

router.post('/api/resetpass', async (req, res) => {

    req.json("User Reg Path")

    const findUser = await addUser.findOne({
        email: req.body.email
    });

    if(findUser){

        let userIdLink = "http://localhost:3000/updatepassword?id=" + findUser._id;
        
        const mailerOutput = `
            <h1>Hello ${findUser.username}, lets reset your password</h1>
            <p>Using the link below, you will be redirected to the password reset form</p>
            <a href=${userIdLink}>Click To Reset Your Password</a>
        `
        const transporter = nodemailer.createTransport({
            host: "mail.patterntry.com", 
            port: 465, 
            secure: true, 
            auth: {
                user: "mailer@patterntry.com",
                pass: "gV+2+uQOp#^b"
            }
        }); 

        const mailOptions = {
            from: '"Website Mailer Client" <mailer@patterntry.com>', 
            to: req.body.email, 
            subject: 'Account Password Reset', 
            html: mailerOutput
        }

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
               return console.log(error)
            } 

            console.log("Message Sent:", info.messageId);
        });

    }else{
        res.json({success:false, msg: "Could not locate user on Database"});
    }

});

router.patch('/api/updatepass/:id', async (req, res) =>{

    let userId = req.params.id; 

    const findUser = await addUser.findOne({
        _id: userId
    }); 

    if(findUser){
        try {

            const tokenDecrypt = jwt.verify(findUser.token, process.env.ACCESS_TOKEN_SECRET); 

            const authUser = await addUser.findOne({
                _id: userId, 
                username: tokenDecrypt.username,
                email: tokenDecrypt.email
            }); 

            const salt = await bcrypt.genSalt(12); 
            const hashPass = await bcrypt.hash(req.body.password, salt);

            if(authUser){
                const updatePassword = await addUser.updateOne(
                    {_id: req.params.id}, 
                    {$set: {password: hashPass}}
                );

                res.json({user:authUser.username, success:true, msg:"Password Updated"});

            } else {
                res.json({success: false, msg: "Invalid User on Database"}); 
            }

        } catch (error) {
          res.json({success: false, msg: "Invalid Token"});  
        }
    }else{
        res.json({success: false, msg: "Verification Failed, please contact system admin"});
    }
});

router.get('/api/tester', (req, res) =>{
    res.json("This hit the server");
});







module.exports = router;