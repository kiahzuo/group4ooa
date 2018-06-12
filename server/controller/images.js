// Import modules
var fs = require('fs');
var mime = require('mime');
var gravatar = require('gravatar');

//set image file types
var IMAGE_TYPES = ['image/jpeg','image/jpg','image/png'];

var Images = require('../models/images');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

//show images gallery
exports.show = function(req,res){

    sequelize.query('select i.id, i.title, i.imageName, u.email AS [user_id] from Images i join Users u on i.user_id = u.id',{model: Images}).then((images) =>{
        res.render('images-gallery',{       //render the images-gallery.ejs file
            title: 'Images Gallery',
            images: images,
            gravatar:gravatar.url(images.user_id,{s:'80',r:'x',d:'retro'}, true)
        });
    }).catch((err) => {
        return res.status(400).send({
            message:err
        });
    });
};

//Image upload
exports.uploadImage = function(req,res){
    var src; 
    var dest;
    var targetPath;
    var targetName;
    var tempPath = req.file.path;
    console.log(req.file);

    //get the mime type of the file
    var type = mime.lookup(req.file.mimetype);

    //get file extension
    var extension = req.file.path.split(/[. ]+/).pop();

    // check support file types
    if(IMAGE_TYPES.indexOf(type) == -1)
    {
        return res.status(415).send('Supported image formats: jpeg, jpg, jpe, png.');
    }

    // set new path to images
    targetPath = './public/images/' + req.file.originalname;

    // using read stream API to read file
    src = fs.createReadStream(tempPath);    //where you want to read it from

    // using read stream API to write file
    dest = fs.createWriteStream(targetPath);        //where you want it to be saved at
    src.pipe(dest);

    //show error
    src.on('error', function(err){
        if(err) {
            return res.status(500).send({
                message: error
            });
        }
    });

    // save file process
    src.on('end', function(){       //only happens when it has been saved into the database
        //create new instance of the images model with request body
        var imageData = {
            title: req.body.title,
            imageName: req.file.originalname,
            user_id: req.user.id
        }

        //save to database
        Images.create(imageData).then((newImage, created) =>{
            if(!newImage)
            {
                return res.send(400, {
                    message: error
                });
            }
            res.redirect('images-gallery');
        })

        //remove from temp folder
        fs.unlink(tempPath,function(err){
            if(err){
                return res.status(500).send('Something bad happened here');
            }
            //redirect to gallery page
            res.redirect('images-gallery');
        });
    });
};

//images authorization middleware
exports.hasAuthorization = function(req,res,next)
{
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}