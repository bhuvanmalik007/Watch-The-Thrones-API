/**
 * Created by bhuvanmalik on 21/02/16.
 */


var express = require('express');


var eroutes= function(Episode) {

    var episodeRouter=express.Router();

    var episodeController = require('../controllers/episodeController')(Episode);
    
    
     episodeRouter.route('/:id')
        .delete(episodeController.delbyid);


    episodeRouter.route('/post')
        .post(episodeController.post);

    episodeRouter.route('/all')
        .get(episodeController.getall);


    episodeRouter.route('/:s/:e')
        .delete(episodeController.del)
        .patch(episodeController.patch)
        .get(episodeController.getep)
        .put(episodeController.put);
        



    episodeRouter.route('/:s')
        .get(episodeController.getseason)
        .post(episodeController.createseason);
    episodeRouter.route('/hello')
        .get(function(req,res){
console.log("sd");
        res.send("hello");

    });





    return episodeRouter;
};


module.exports = eroutes;