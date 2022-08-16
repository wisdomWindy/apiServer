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
  let {
    HASH,
    count
  } = req.body;
  let uploadDir = path.join(__dirname, '..', 'uploads');
  merge(HASH,count).then(res => {
    let {
      filename,
      path
    } = res;
    res.send({
      code:0,
      errMessage:'merge success',
      originalFilename:filename,
      servePath:path.replace(__dirname,HOSTNAME)
    });
  }).catch(err=>{
    res.cc(400,err);
  });
}
function uploadAlready(req,res){
  let {
    HASH
  } = req.body;
  let uploadDir = path.join(__dirname, '..', 'uploads');
  try{
    let path = `${uploadDir}/${HASH}`,
      fileList = [];
    fileList = fs.readFileSync(path);
    fileList = fileList.sort((a, b) => {
      let reg = /_(\d+)/;
      return reg.exec(a)[1] - reg.exec(b)[1];
    });
    res.send({
      code: 200,
      errMessage: 'success',
      fileList: fileList
    });
  }catch(err){
    res.cc(400, err);
  };
}
function merge(HASH,count){
  return new Promise((resolve,reject) => {
    let path = `${uploadDir}/${HASH}`,
    fileList =[],
    suffix,
    isExists;
    isExists = exists(path);
    if(!isExists){
      reject('HASH path is not found');
      return;
    }
    fileList.sort((a,b)=>{
      let reg = /_(\d+)/;
      return reg.exec(a)[1] - reg.exec(b)[1];
    }).forEach(item => {
      !isuffix ? suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1] : null;
      fs.appendFileSync(`${uploadDir}/${HASH}.${suffix}`, fs.readFileSync(`${path}/${item}`));
      fs.unlinkSync(`${path}/${item}`);
    });
    fs.rmdirSync(path);
    resolve({
      path:`${uploadDir}/${HASH}.${suffix}`,
      filename:`${HASH}.${suffix}`
    });
  });
}
module.exports = {
  uploadNormal,
  uploadBig,
  uploadBase64
}