const express = require('express');
const router = express.Router();
const moment = require('moment');
var crypto = require('crypto');

const config = require('../config/database');
const db = require('../config/connections');
const jwt = require('jsonwebtoken');


router.get('/', (req,res) => {
    res.send('Welcome to AuctionSoftware API.');
  });

  router.post('/login', (req,res) => {
    console.log(req.body);
    var token = null;
    const data = req.body;
    console.log(data.username);
    console.log(data.password);
    let sql = 'SELECT * FROM ilance_users WHERE username=?';
    let query = db.query(sql,[data.username],(err,result, fields) =>{
      if(result.length){
        console.log(data.password);
        data.password = md5(md5(data.password + result[0].salt));
        console.log('ssthis', data.password);
        let sql = 'SELECT * FROM ilance_users WHERE username=? AND password=?';
        let query = db.query(sql,[data.username,data.password],(err,result, fields) =>{
          if(err) throw err;
          console.log(result.length);
          if(!result.length){
            res.json({msg:'Password is incorrect'});
          }
          else if (result.length === 1){
              var payload = {user_id: result[0].user_id};
              token = jwt.sign(payload, config.secret, {
                expiresIn: 604800 //1 week in second
              });
              res.json({success:true, token: token, user:{user_id:result[0].user_id}});
          } else {
            res.json({msg:'more user with same user and password found'});
          }
        });
      } else {
        res.json({msg:'Wrong Username or User not registered)'});
      }
    });
  });

  router.get('/projectdetails/:first/:rows', (req, res) => {
    var first = parseInt(req.params.first, 10);
    var rows = parseInt(req.params.rows, 10);
    let totalRecordsSql;
    let sql;
    let totalRecordsArgs = [];
    let sqlArgs = [];
    console.log('sss');
    totalRecordsSql = `SELECT COUNT(id) as total_records FROM ilance_projects`;
    sql = `SELECT a.project_id,a.project_title, a.description,b.username,a.tags FROM
     (SELECT id FROM ilance_projects ORDER BY id ASC LIMIT ?, ?) o JOIN ilance_projects as a ON a.id = o.id
     INNER JOIN ilance_users as b ON a.user_id = b.user_id ORDER BY a.project_title ASC`;
    sqlArgs = [first, rows];
    let query = db.query(totalRecordsSql, (err, result) => {
      if (err) throw err;
      console.log('sssrun22');
      var total_records = result[0].total_records;
      db.query(sql, sqlArgs, (err, resultnew) => {
        if (err) throw err;
        console.log('sssrun');
        res.send({result: resultnew.length ? resultnew : [{msg: 'No records found!'}], total_records: total_records});
      });
    });
  });


  // SELECT a.project_id,a.project_title, a.description,b.username,a.tags FROM ilance_projects as a INNER JOIN ilance_users as b ON a.user_id = b.user_id ORDER BY a.project_title ASC

  function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }

module.exports=router;