function uploadNormal(req,res){
  res.send({code:200, errMessage:'上传成功'});
}

function uploadBig(req,res){
  
}
module.exports = {
  uploadNormal,
  uploadBig
}