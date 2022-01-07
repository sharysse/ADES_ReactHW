const createHttpError = require('http-errors');

const router = require('express').Router();

let lastId = 0;
let lastStudent;
const students= [];
var code = "";


router.get('/generateAts', function(req, res){
  var possible = "1234567890";
  code = '';

  for (var i = 0; i < 6; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
    if (i == 0 && code == "0") {
      code = "7"
    }
  }
    res.json({
      ats : code
    })
  
 
});

router.get('/', function (req, res) {
  res.json({
    students: students,
  });
});

router.get('/present', function (req, res, next) {
  if (!lastStudent) {
    return next(createHttpError(400, 'No Students Entered'));
  }

  res.json({
    id: lastId,
  });
});

// router.post('/', function (req, res) {
  router.post('/:adminNum', function (req, res) {
  const adminNo = req.params.adminNum;
  // const adminNo = req.body.num;
    lastId = lastId + 1;
    students.push({
      id: lastId,
      num : adminNo
    });
    res.status(201).json({
      id: lastId,
      num: adminNo
    });  
});

router.delete('/', function (req, res, next) {
  if (students.length === 0) {
    return next(createHttpError(400, 'No Students Entered'));
  }
  lastStudent = students.pop();
  res.json({ student: lastStudent });
});

module.exports = router;
