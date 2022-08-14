const path = require('path');
const formidable = require('formidable');

function uploadNormal(req,res){
  let form = new formidable.IncomingForm({multiples:true, uploadDir: path.join(__dirname, '..','uploads'), keepExtensions:true});
  form.parse(req,function(err, fields, files){
    if(err){
      res.send(err);
      return;
    }
    res.send({ code: 200, errMessage: '上传成功' });
  });
  
}

function uploadBig(req,res){

}
module.exports = {
  uploadNormal,
  uploadBig
}