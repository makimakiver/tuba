const router = require("express").Router();
const Team = require("../models/Team")
const AdminUser = require("../models/adminUser")
const User = require("../models/User")

router.post("/assemble", async (req, res) => {
// HTTP post request is used 
    try{
        if(!req.body.userId){
            return res.status(400).json("put Your id.")
        }else{
            const newTeam = await new Team({
                teamname: req.body.teamname,
            });
            // console.log("1");
            // adding team data to team database and User can put any information when they create a team. 
            // However, User must put their UserId and team name in order to create the team. 
            const team = await newTeam.save();
            // console.log("2");
            const newAdminUser = new AdminUser({
                users: req.body.userId,
                teamId: newTeam.id,
            });
            // console.log("3");
            // userId will be used to mark user as an admin User.
            // little note on mistakes; i have spent nearly 30 minutes on debugging
            // and it is about a change in the name of variables.

            const adminiser = await newAdminUser.save();
            // save the user in the AdminUser database, so they can manipulate their team whenever they want.
            // console.log("4");
            return res.status(200).json(team)
    }
    } catch(err) {
        return res.status(500).json(err)
    }    
});



router.delete("/:id", async (req, res) => {
    // HTTP post request
    if (req.body.teamId === req.params.id ) {
        try{
            // console.log("1")
            const theTeam = await AdminUser.findOne({teamId: req.body.teamId})
            // console.log("2")
            if (theTeam.users.includes(req.body.userId)){
                // if user is within the list of Admin Users List, then the user is allowed to delete the team
                // console.log("3")
                const team = await Team.findByIdAndDelete(req.body.teamId);
                // find the team from team database. it will use teamId in the body.
                const admiser = await AdminUser.findOneAndDelete({teamId: req.body.teamId});
                // console.log("4")
                return res.status(200).json("team has been deleted.") 
            } else if (!theTeam.users.includes(req.body.userId)){
                // console.log("5")
                return res.status(500).json("You are not permitted")
            }
            // } else if (!req.body.userId){
            //     console.log("6")
            //     return res.status(500).json("no id")
            // when they are deleted, keys will also be deleted.          
        } catch(err) {
            return res.status(500).json(err)
        }
    // }else if (!req.params.id){
    //     return res.status(404).json(err)
    } else {
        return res.status(403).json("cannot delete others team")
    }
});

router.put("/:id", async (req, res) => {
    // HTTP post request
    const team = await Team.findById(req.params.id);
    if (!team) {
        return res.status(404).json("could not find it")
    }else{
        // only if userID is same as theie userID.
        try{
            const user = await User.findById(req.body.userId);
            const adminUser = await AdminUser.findOne({ teamId: req.params.id });
            if(!user){
                return res.status(404).json("could not find it")
            }else{
                if (adminUser.users.includes(user.id)){
                    await team.updateOne({
                        $set: req.body,
                        // set command allows user to change any values in their database
                    })
                    return res.status(200).json("your team is updated. enjoy!") 
                } else {
                    return res.status(500).json("you cannot change the team unless you are a hacker.")
                }  
            }           
                  
        } catch(err) {
            return res.status(500).json(err)
        }
    } 
});

router.get("/:id", async (req, res) => {
    // HTTP post request
        try{
            const team = await Team.findById(req.params.id);
            if (!team){
                return res.status(404).json("no posts found");
            }else{
                return res.status(200).json({team: team});
                // separating post and commeny
            }  
        } catch(err) {
            return res.status(500).json(err)
        }
});


module.exports =  router;
