const Urls = require('../models/urls');
const short = require('short-uuid');
const { raw } = require('body-parser');

exports.postUrl =  function postUrl(req, res){
    const reqUrl = req.body.url;
    const hashedUrl = short.generate(reqUrl)
    const urlValue = new Urls()
    urlValue.url = reqUrl
    urlValue.urlHash = hashedUrl
    urlValue.shortUrl = "https://localhost/" + hashedUrl
    urlValue.save((err)=>{
        res.send({
            message:"Saved successfully",
            data:urlValue
        })
    })
}

exports.gethashedUrl = function gethashedUrl (req, res){
    const hashedKey = req.params.url;
    console.log(hashedKey)
    var query = {urlHash : hashedKey}
    const urlValue = new Urls()
    Urls.find(query,function(err, urlValue){
        if (urlValue){
            res.status(200).json(urlValue)

        }
        else{
            res.status(400).send(err)
        }
        
    })
    
}

exports.updateHashedUrl = function updateHashedUrl (req, res) {
    id =  req.params.id;
    url = req.body.url;
    hashedUrl = short.generate(url)
    urlHash = hashedUrl
    shortUrl = "https://localhost/" + hashedUrl
    const urlValue = new Urls()
    Urls.findByIdAndUpdate(id,url,urlHash,shortUrl, {useFindAndModify: false})
        .then(data=>{
            if (!data) {
                res.status(404).send({
                  message: `Cannot update Url with id=${id}. Maybe Url was not found!`
                });
              } else res.send({ message: "Url was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
              message: error
            });
          });
}

exports.deleteUlr = function deleteUrl (req, res){
    id = req.params.id 
    return new Promise((resolve, reject)=>{
        Urls.findByIdAndDelete({id:id},{new:true})
        .then((result)=> resolve())
        .catch((err)=>(reject(err)))
    })
}