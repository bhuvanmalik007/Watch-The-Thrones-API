/**
 * Created by bhuvanmalik on 21/02/16.
 */


var express = require('express');


var eroutes= function(Episode) {

    var episodeRouter=express.Router();

    var episodeController = require('../controllers/episodeController')(Episode);




    episodeRouter.route('/all')
        .post(episodeController.post)
        .get(episodeController.get);

   



    episodeRouter.route('/:EID')
        .delete(episodeController.del);

    episodeRouter.route('/:s')
        .get(episodeController.getseason)
        .patch(episodeController.patch);




    return episodeRouter;
};


module.exports = eroutes;