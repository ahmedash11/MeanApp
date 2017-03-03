let Project = require("../models/Project");

let projectController = {


addLink: function(req, res, next){
console.log('henaa');


    Project.update({username:req.user.username}, {$push: {"Link":req.body.link}}, function(err, numAffected, rawResponse) {
      if (err) return res.send("contact addMsg error: " + err);

      res.redirect('/upload');
 
    });

}


	
}
module.exports = projectController;