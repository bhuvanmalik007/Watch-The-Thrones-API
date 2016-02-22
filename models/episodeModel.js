/**
 * Created by bhuvanmalik on 21/02/16.
 */

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var episodeModel= new Schema({



    season: { type: String },
    episode:{type: String},
    href:{type: String},
    desc:{type: String},
    torrlink:{type: String},
    thumb: {type: String}

});


module.exports=mongoose.model('Episode', episodeModel,'episodes');