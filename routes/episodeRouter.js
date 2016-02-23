/**
 * Created by bhuvanmalik on 21/02/16.
 */


var express = require('express');


var eroutes= function(Episode) {

    var episodeRouter=express.Router();

    var episodeController = require('../controllers/episodeController')(Episode);


    episodeRouter.route('/post')
        .post(episodeController.post);

    episodeRouter.route('/create/:s')
        .post(episodeController.createseason);




    episodeRouter.route('/all')
        .get(episodeController.getall);


    //episodeRouter.route('/:s/:e/u')
    //    .get(episodeController.update);
        
    episodeRouter.route('/:s/:e')
        .delete(episodeController.del)
        .patch(episodeController.patch)
        .get(episodeController.getep)
        .put(episodeController.put);
        



    episodeRouter.route('/:s')
        .get(episodeController.getseason)
       // .delete(episodeController.deleteseason)
    ;
    episodeRouter.route('/:id')
        .delete(episodeController.delbyid)
        // .delete(episodeController.deleteseason)
    ;



    return episodeRouter;
};


module.exports = eroutes;