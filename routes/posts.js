const express=require('express');
const hotels = require('../models/hotels');
const router=express.Router();

namefilter = [{}];
obj = {};
sortby = {};
cuisine = [''];
finalcond = {};
const filter = {
    info:{}
};
sortoptionlist = [{'info.price':-1}, {'info.price':1}, {'info.rating.rating_text':-1}];
textMatch = "";

router.get('/',async(req,res)=>{
    try{
        
        if(req.query['sortoption']){
            sortby = sortoptionlist[req.query['sortoption']-1]
        }

        if(req.query['resname']){
            textMatch = req.query['resname'];
            namefilter = [{'info.name':new RegExp(textMatch, 'i')},{'info.locality.address':new RegExp(textMatch, 'i')}];
            finalcond = {$or:namefilter}
        }

        if(req.query['cuisine']){
            cuisine = cuisine.concat(req.query['cuisine'])
            cuisinematch = { 'info.cuisine.name': { $in: cuisine } }
            finalcond = {$and:[{$or:namefilter},cuisinematch]}
        }

        const hotelsres=await hotels.find(finalcond).select(['info.name','info.cft.text','info.rating.rating_text','info.cuisine.name','info.locality','info.image.url','info.price']).sort(sortby);
        res.json(hotelsres);
    }catch(err){}
});

module.exports=router;