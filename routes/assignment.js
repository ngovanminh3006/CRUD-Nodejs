var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const Assignment = database.db.Assignment;
const Student = database.db.Student;


/* GET home page. */
router.get('/', async function(req, res,) {
  const assignments = await Assignment.findAll({
    include: Student, //JOIN ( INNER JOIN, OUTER JOIN, LEFT JOIN, RIGHT JOIN)
  });
  console.log(assignments);
  res.render("assignment_view/index", {
    assignments: assignments,
    title: 'Assignment page',
  });
});

// router.post("/editASM", async function (req, res) {
//   const { id, email, username } = req.body;


//   await Assignment.update(
//   { title: title, username : username }, 
//   {
//     where: {
//       id: asmId, 
//     },
//   },
//   );


router.get('/add', async function(req, res,) {
    const students = await Student.findAll();
    res.render("assignment_view/create", {
      students: students,
    });
});

router.post("/createAssignment", async function(req, res) {
    const {title, content, student_Id} = req.body;
    //INSERT INTO Assignment VALUES ()
    await Assignment.create({  
        title: title,
        content: content,
        student_Id: student_Id,
    });        

    res.redirect("/asm");
  });


module.exports = router;
