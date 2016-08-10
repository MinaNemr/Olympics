var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var Boy = mongoose.model('Boy');

router.route('/teams/top_teams')

	//to get all teams with full data
	.get(function(req, res){

		Team.find().exec(function (err,teams){
			if(err){
				return res.send(500,err);
			}
            console.log(teams);
			return res.send(teams);
            
                
		});
})

router.route('/teams/:id/:addition')

	//create
   .put(function(req,res){
     	Team.findById(req.params.id, function(err, team){
            if(err)
                res.send(err);
            team.score = team.score + Number(req.params.addition);
            team.save(function(err, team){
                if(err){
                    res.send(err);
                }
                res.json(team);
            });
        });
    })

    //gets specified post
    .get(function(req, res){
        Team.findById(req.params.id, function(err, team){
            if(err)
                res.send(err);
            res.json(team);
        });
    }) 

    .delete(function(req,res){
        return res.send({message:'TODO delete an existing team score with id : ' + req.params.id})
    });

router.route('/boys/:id/:addition')

    //create
   .put(function(req,res){
        Boy.findById(req.params.id, function(err, boy){
            if(err)
                res.send(err);
            boy.score = boy.score + Number(req.params.addition);
            Team.findById(boy.team, function(err, team){
                team.score = team.score + Number(req.params.addition);
                team.save(function(err, team){
                    if(err){
                        res.send(err);
                    }
                });
            });   
            boy.save(function(err, team){
                if(err){
                    res.send(err);
                }
                res.json(boy);
            });
        });
    });

router.route('/boys/:id/attendance')

    //create
   .post(function(req,res){
        Boy.findById(req.params.id, function(err, boy){
            if(err)
                res.send(err);
            boy.attended = boy.attended + 1;
            boy.score = boy.score + 50;
            Team.findById(boy.team, function(err, team){
                team.score = team.score + 10;
                team.save(function(err, team){
                    if(err){
                        res.send(err);
                    }
                });
            });   
            boy.save(function(err, team){
                if(err){
                    res.send(err);
                }
                res.json(boy);
            });
        });
    });

module.exports = router;
