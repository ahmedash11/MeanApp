var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcryptjs');

var projectSchema = mongoose.Schema({
    username: {
        type:String,
        unique:true},
    portName:String,
    Link:[String],
    Images:[String]
});

var Project = mongoose.model("project", projectSchema);
module.exports = Project;

module.exports.createProj = function(newProj, callback){
	newProj.save(callback);
	
}

// module.exports.insertlink = function(link, callback){
//      Portfolio.update({username:user}, {$push: {"URL":link}}, function(err, numAffected, rawResponse) {
//       if (err) return res.send("contact addMsg error: " + err);
// )}

 module.exports.getAllPortfolios=function(req, res){
        
        Project.find(function(err, projects){
            
            if(err){
                res.send(err.message);
            
            console.log("error");
            }
            else
                res.render('uploads', {'projects':projects});
        });
    }
    
 module.exports.getAllProjects=function(req, res){
        
        Project.find(function(err, projects){
            
            if(err){
                res.send(err.message);
            
            console.log("error");
            }
            else
                res.render('index', {'projects':projects});
        });
    }

 module.exports.getAll=function(req, res){
        
        Project.find({},function(err, projects){
            
            if(err){
                res.send(err.message);
            
            console.log("error");
            }
            else
                res.render('summary', {'projects':projects});
        });
    } 

module.exports.getProfile = function(req, res, next){
    var user = ""
    if(req.params.user){
        user = req.params.user;    
    } else {
        user = req.user.username;
    }
    Project.findOne({username:user}, function(err, project){
        if(err) console.log(err);

        console.log(req);

        res.render('upload.ejs', {'project':project});
    });

}
   


module.exports.addLink = function(req, res){
console.log('henaa');
Project.findById(req.user.id, function(err, info) {
	console.log(req.user);
    if (err) return 
    	res.send("error" + err);

    Project.update({username:req.user.username}, {$push: {"URL":req.body.url}}, function(err, numAffected, rawResponse) {
      if (err) return res.send("contact addMsg error: " + err);
 
    })
  });

}


module.exports.addImage = function(req, res, next){

	var image_path = '/uploads/' + req.file.filename;
    // add the message to the contacts messages
    Project.update({username: req.user.username}, {$push: {"Images":image_path}}, function(err, numAffected, rawResponse) {
      if (err) return res.send("contact addMsg error: " + err);

res.redirect('/upload');

    });
}




