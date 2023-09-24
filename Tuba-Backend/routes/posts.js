const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const Comments = require("../models/Comments");
const Team = require("../models/Team");
const { OpenAIApi, Configuration, default: OpenAI,} = require("openai");


// router.get("/", (req, res) => {
//     res.send("post routerrrrr");
// });

router.post("/", async (req, res) => {
    try{              
        if (!(req.body.desc)){
            console.log("ggg")
            return res.status(500).json("write something!")
        } else {
            const openai = new OpenAI({
                apiKey: process.env.OpenAI,
              });
            console.log(openai)
            const embeddingResponse = await openai.embeddings.create({
                model: 'text-embedding-ada-002',
                input: req.body.desc
            })
            const one_post_vector_data = embeddingResponse.data[0].embedding;
            const newPost = await new Post({
                username: req.body.username,
                userId: req.body.userId,
                desc: req.body.desc,
                img: req.body.img,
                teamname: req.body.teamname,
                likes: req.body.likes, 
                tags: one_post_vector_data,
            });         
            const savedPost = await newPost.save();
            return res.status(200).json(savedPost)
        }
    } catch(err){
        return res.status(500).json(err)
    }
});
router.put("/:id", async (req, res) => {
    // HTTP post request
    try{
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json("could not find it")
        }else{
            if (post.userId == req.body.userId ) {
                await post.updateOne({
                    $set: req.body,
                    // set command allows user to change any values in their database
                })
                // only if userID is same as their userID.
                return res.status(200).json("you managed to change your posts")           
            }else{
                return res.send(403).json("cannot change others post date")
            }
        }
        // const savedPost = await post.save();
        } catch(err) {
            return res.status(403).json(err)
        }
});

router.delete("/:id", async (req, res) => {
    // HTTP post request
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId == req.body.userId ) {
            await post.deleteOne();
            // only if userID is same as their userID.
            return res.status(200).json("you managed to delete your posts")           
        }else{
            return res.status(403).json("cannot delete others post")
        }          
    } catch(err) {
        return res.status(500).json(err)
    }
    
    // }else if (!req.params.id){
    //     return res.status(404).json(err)
});

router.get("/:id", async (req, res) => {
    // HTTP post request
        try{
            const post = await Post.findById(req.params.id);
            const user = await User.findById(post.userId)
            if (!user.IsPrivate == true){
                return res.status(200).json(post); 
            }else{
                return res.status(500).json("the account is private");
            }     
        } catch(err) {
            return res.status(500).json(err)
        }
});

router.get("/profile/timeline/:username", async(req,res) => {
    try{
        const currentUser = await User.findOne({username: req.params.username})
        const userPost = await Post.find({userId: currentUser._id})
        return res.status(200).json(userPost)
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.get("/timeline/:id", async(req,res) => {
    try{
        const timeline_post = []
        const currentUser = await User.findById(req.params.id);
        const userPost = await Post.find({userId: req.params.id})
        const teams = await Team.findById(currentUser.BelongTo)
        if (teams == null){
            return res.status(200).json(userPost)
        } else {
            let size = 0
            let localminimum = 0
            const all = await Post.find()
            let pos = 0
            let stack = []
            for ( let i = 0; i<all.length ; i++){

                if (all[i].tags != undefined ){
                    let result = []
                    let size = 0
                    for ( let z = 0; z<all[i].tags.length; z++){
                        size = size + (all[i].tags[z] * all[i].tags[z])
                    }                   
                    result.push(all[i]._id)
                    result.push(size)
                    stack.push(result)
                }
            }
            console.log(stack[0][0])
            let minima = stack
            minima.sort();
            console.log(minima)
            const friends = await Promise.all(
                teams.followers.map((userId) => {
                    return User.findById(userId)
                })
            )
            timeline_post.push(userPost)
            for (let i = 0; i < friends.length; i++){
                if (currentUser._id !== friends[i]._id) {
                const friendPost = await Post.find({userId: friends[i]._id}) 
                timeline_post.push(friendPost)
                }
            }

            var merged = [].concat.apply([], timeline_post);
            var seenNames = {};
            array = merged.filter(function(currentObject) {
                if (currentObject._id in seenNames) {
                    return false;
                } else {
                    seenNames[currentObject._id] = true;
                    return true;
                }
            });
            return res.status(200).json(array)
        }
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.post("/:id/comment", async (req, res) => {
    // HTTP post request is used 
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(404).json("could not find it")
    }else{
        try{              
            const newComment = await new Comments({
                postId: post.id,
                userId: req.body.userId,
                desc: req.body.desc,
                img: req.body.img,
            });
            const savedComment = await newComment.save();   
            return res.status(200).json(savedComment)
        } catch(err) {
            return res.status(500).json(err)
        }  
    }  
});



router.delete("/:id/comment", async (req, res) => {
    // HTTP post request is used 
    try{              
        const comment = await Comments.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        if (!comment){
            return res.status(404).json("no comment found")
        }else if (user.id !== comment.userId){
            return res.status(403).json("you are not permitted.")
        }else{
            await comment.deleteOne()   
            return res.status(200).json("your comment is deleted")
        }
    } catch(err) {
        return res.status(500).json(err)
    }  
});

router.put("/:id/comment", async (req, res) => {
    // HTTP post request
    try{
        const comment = await Comments.findById(req.params.id);
        if (!comment){
            return res.status(404).json("could not find the comment")
        }else{
            if (comment.userId == req.body.userId ) {
                await comment.updateOne({
                    $set: req.body,
                    // set command allows user to change any values in their database
                })
                // only if userID is same as their userID.
                return res.status(200).json("you managed to change your comments")           
            }else{
                return res.send(403).json("cannot change others comment date")
            }
        }
        // const savedPost = await post.save();
        } catch(err) {
            return res.status(403).json(err)
        }
});

router.get("/:id/comment/all", async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
            if (!post){
                return res.status(404).json("no posts found");
            }else{
                const AllComment = await Comments.find({ postId: req.params.id })
                // find all comment with the given postId
                return res.status(200).json(AllComment);
                // separating post and commeny
            }  
        } catch(err) {
            return res.status(500).json(err)
        }
});
module.exports =  router;
