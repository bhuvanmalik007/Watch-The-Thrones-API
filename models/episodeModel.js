/**
 * Created by bhuvanmalik on 21/02/16.
 */

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var episodeModel= new Schema({



    season: { type: String },
    episode:{type: String},
    href480:{type: String},
    href720:{type: String},
    episodename: {type: String},
    desc:{type: String},
    torrlink480:{type: String},
    torrlink720:{type: String},
    thumb: {type: String}

});


module.exports=mongoose.model('Episode', episodeModel,'episodes');