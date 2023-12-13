const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const Comments = require("../models/Comments");
const Team = require("../models/Team");
const { OpenAIApi, Configuration, default: OpenAI, } = require("openai");
const { write } = require("fs");


// router.get("/", (req, res) => {
//     res.send("post routerrrrr");
// });
function plane(coord, coef, constant) {
    let container = 0;
    for (let i = 0; i < coef.length; i++) {
        container += coord[i] * coef[i];
    }
    let result = constant - container;
    return result;
}
function ANNOYMD(U, data) {
    let container = []
    let flag = false;
    let target, midpoint, direction, dot, above, below, point;

    while (!flag) {
        target = data[Math.floor(Math.random() * data.length)];

        while (arraysEqual(target, U)) {
            target = data[Math.floor(Math.random() * data.length)];
        }
        // console.log("target: ", target[0][1]," ", target[1]);
        
        // console.log("user: ", U);

        midpoint = U.map((u, i) => (u + target[0][i]) / 2);
        // console.log("midpoint : ", midpoint);

        direction = U.map((u, i) => u - target[0][i]);
        // console.log("DIRECTION: ", direction);

        dot = midpoint.reduce((acc, m, i) => acc + m * direction[i], 0);
        console.log("User data: ", plane(U, direction, dot));
        console.log("Target data: ", plane(target[0], direction, dot));

        above = [];
        below = [];
        point = false;

        if (plane(U, direction, dot) > 0) {
            above.push(U);
            point = true;
        } else {
            below.push(U);
            point = false;
        }

        data.forEach(item => {
            if (plane(item[0], direction, dot) >= 0) {
                above.push(item);
            } else {
                below.push(item);
            }
        });
        console.log("above container: ", above.length)
        console.log("below container: ", below.length)
        console.log("POINT FLAG : ", point);
        let num = 0
        for (let i = 0; i < U.length; i++){
            num += (U[i]-below[0][i])
        }
        console.log("This is the result from sutraction between U[i]-below[i]", num)
        if (point === true) {
            console.log("below condition ;)");
            if (above.length <= 20) {
                flag = true;
            } else if (above.length >= 21) {
                console.log(above.shift(), " ", above);
                let recursive_Call = ANNOYMD(U, above);
                console.log("Recursive function: ", recursive_Call)
                flag = true;
            }
        } else {
            console.log("above condition ;)");
            if (below.length <= 20 ) {
                flag = true;
            } else if (below.length >= 21) {
                console.log(below.shift(), " ", U);
                let recursive_Call = ANNOYMD(U, below);
                console.log("Recursive function: ", recursive_Call)
                flag = true;
            }
        }
    }
    if (point === true) {
        if (container.length > 0){
            console.log("recommended: ", above);
            let Using_Array = container[container.length-1]
            console.log("Using_Array: ", Using_Array)
            for (let i = 0; i < Using_Array.length; i++){
                if (above.filter(x => x==Using_Array[i]).length > 0){
                    above.splice(above.indexOf(Using_Array[i]), 1)
                }
            }
            container.push(above)
            console.log("Container variable: ", container)
            return above;
        } else if (container.length <= 0){
            container.push(above)
            return above
        }
    } else {
        if (container.length > 0){
            let Using_Array = container[container.length-1]
            console.log("Using_Array: ", Using_Array)
            for (let i = 0; i < Using_Array.length; i++){
                if (below.filter(x => x==Using_Array[i]).length > 0){
                    below.splice(below.indexOf(Using_Array[i]), 1)
                }
            }
            container.push(below)
            console.log("Container variable: ", container)
            return below;
        } else if (container.length <= 0){
            container.push(below)
            return below
        }
    }
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

router.post("/", async (req, res) => {
    try{              
        if (!(req.body.desc)){
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

router.delete("/", async(req,res) => {
    console.log("called")
    try{
        const posts = await Post.find()
        for (let i = 0; i < posts.length; i++){
            const post = await Post.findByIdAndDelete(posts[i]._id)
        }
        console.log(posts)
        return res.status(200).json("hel")
    }catch(err){
        return res.status(404).json(err)
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
        const post = await Post.find()
        const one_post_vector_data = currentUser.tags;
        let data = []
        for (let i = 0; i < post.length; i++){
            file = []
            file.push(post[i].tags)
            file.push(post[i]._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"))
            data.push(file)

        }
        // console.log(data)
        var recommended = ANNOYMD(one_post_vector_data, data)
        while (recommended.length < 3){
            recommended = ANNOYMD(one_post_vector_data, data)
        }
        const timeline = []
        console.log("finished recommending. ")
        console.log("returned result: ", recommended[1][1])
        for (let i = 1; i < recommended.length; i++){
            var feed = await Post.findById(recommended[i][1])
            console.log(feed)
            timeline.push(feed)  
        }
        console.log("timeline content length:")
        return res.status(200).json(timeline)
    }
    catch(err){
        return res.status(500).json(err)
    }
})
router.post("/:id/commentAI", async (req, res) => {
    // HTTP post request is used 
    const post = await AI.findById(req.params.id)
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
                if (!(AllComment)) {
                    return res.status(200).json("null");
                }else{
                    return res.status(200).json(AllComment);
                    // separating post and commeny
                }
            }  
        } catch(err) {
            return res.status(500).json(err)
        }
});
module.exports =  router;
