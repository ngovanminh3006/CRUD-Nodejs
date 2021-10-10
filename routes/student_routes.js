var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const Student = database.db.Student;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const students = await Student.findAll();
  res.render('student_view/index', { 
    title: 'Welcome to student page', 
    students:students,
  });
});

router.get('/add', function(req, res, next) {
  res.render("student_view/create");
});
router.post("/createStudent", async function(req, res) {
  const {email, username} = req.body;
  await Student.create({ username: username, email: email}); 
  res.redirect("/student");
});  
//delete student
router.get("/deleteStudent/:id", async function(req, res) {
  const {id} = req.params;

await Student.destroy({
  where: {
    id: id,
  },
});
  res.redirect("/student");
});

//update student
router.get("/updateStudent/:id", async function(req, res) {
  const {id} = req.params;
  const student = await Student.findOne({
      where: {
        id: id,
      },
});

  const {id: studentId, username, email} = student.dataValues;
  res.render("student_view/update", {
    studentId: studentId,
    studentName: username, 
    studentEmail: email,
  });
});

// edit student
router.post("/editStudent", async function (req, res) {
  const { id, email, username } = req.body;


  await Student.update(
  { email: email, username : username }, 
  {
    where: {
      id: id, 
    },
  },
  );

  res.redirect("/student");
});



module.exports = router;
