var episodeController = function(Episode){


    var post = function (req, res) {
        var episode = new Episode(req.body);
        episode.save();
        console.log(episode);
        res.send(episode);
    }


    var get = function (req, res) {
        Episode.find(function (err, episodes) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(episodes);
            }
        });
    }


    var getseason = function (req, res) {
        Episode.find({ "season":req.params.s}, function(err,episodes) {

            if (err) {
                console.log(err);
            }
            else {
                res.json(episodes);
            }
        });
    }


    var getep = function (req, res) {
        Episode.findOne({ "season":req.params.s, "episode":req.params.e}, function(err,episode) {

            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(episode);
            }
        });
    }




    var patch = function(req,res){
        if(req.body._id){
            delete req.body._id;
        }
        Episode.findOne({ "season":req.params.s, "episode":req.params.e}, function(err,epi) {
            req.episode=epi;
            if (err) {
                res.status(500).send(err);
            }
            else {

                for (var p in req.body) {
                    req.episode[p] = req.body[p];
                }

                req.episode.save(function (err) {
                    if (err) {
                        res.status(505).send(err);
                    }
                    else
                        res.json(req.episode);
                });

            }
        });

    }









    var del = function(req,res){
        Episode.findOne({ "season":req.params.s, "episode":req.params.e}, function(err,episode){
            if(err)
            {
                res.status(500).send(err);
            }
            else {
                episode.remove(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(204).send("removed");
                    }
                });
            }
        });

    }









    return{
        post:post,
        get:get,
        getseason:getseason,
        getep:getep,
        patch:patch,
        del:del


    }


}



module.exports = episodeController;
/**
 * Created by bhuvanmalik on 21/02/16.
 */
