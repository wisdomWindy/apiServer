const path = require('path');
const formidable = require('formidable');
const sparkmd5 = require('spark-md5');
const fs = require('fs');

function uploadNormal(req, res) {
  let form = new formidable.IncomingForm({ multiples: true, uploadDir: path.join(__dirname, '..', 'uploads'), keepExtensions: true });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }
    res.send({ code: 200, errMessage: '上传成功' });
  });

}
function uploadBase64(req, res) {
  console.log(req.body)
  let fileData = req.body,
    file = fileData.file,
    filename = fileData.filename,
    spark = new sparkmd5.ArrayBuffer(),
    suffix = /\.([0-9a-zA-Z]+)$/.exec(filename)[1],
    path;
  file = decodeURIComponent(file);
  file = file.replace(/^(data:image\/\w+;base64,)/, '');
  file = Buffer.from(file, 'base64');
  spark.append(file);
  path = `${path.join(__dirname, '..', 'upload')}/${spark.end()}.${suffix}`;
  fs.writeFile(path, file, (err) => {
    if (err) {
      res.cc(400, err);
      return;
    }
    res.send({ code: 200, errMessage: '上传成功' });
  });
}

function uploadBig(req, res) {

}
module.exports = {
  uploadNormal,
  uploadBig,
  uploadBase64
}