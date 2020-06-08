const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const {check, validationResult} = require("express-validator");

const User = require("../../models/User");
const CreateExam = require("../../models/CreateExam");

// POST api/exams
// Post questions
// Admin only
router.post('/', [auth, [
    check('field', 'Field is required').not().isEmpty(),
    check('dateOfConduct', 'Date of conduct is required').not().isEmpty(),
    check('from', 'Time of examination is required').not().isEmpty(),
    check('to', 'Time of examination is required').not().isEmpty(),
    check('mmarks', 'Maximum marks is required').not().isEmpty()

]], async (req, res) => {

    if(req.user.admin === false) {
        return res.status(401).json({ msg: "Not Authorized for this task"});
    }

    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({ errors: errors.array()});
    }

    const { field, dateOfConduct, from, to, mmarks } = req.body;

    const examinfo = {}
    examinfo.field = field;
    examinfo.dateOfConduct = dateOfConduct;
    examinfo.from = from;
    examinfo.to = to;
    examinfo.mmarks = mmarks;

    let exam = await CreateExam.findOne({from: req.body.from, dateOfConduct: req.body.dateOfConduct});
    if(exam) {
        return res.status(400).json({ errors: [{ msg: 'There is another examination on same date and time'}] });
    }

    exam = new CreateExam(examinfo);
    await exam.save();
    res.json(exam);

});

// PUT /api/exams/:exam_id
// Edit exam fields
// Admin only
router.put('/edit/:exam_id', [auth, [
    check('field', 'Field is required').not().isEmpty(),
    check('dateOfConduct', 'Date of conduct is required').not().isEmpty(),
    check('from', 'Time of examination is required').not().isEmpty(),
    check('to', 'Time of examination is required').not().isEmpty(),
    check('mmarks', 'Maximum marks is required').not().isEmpty()

]], async (req, res) => {

    if(req.user.admin === false) {
        return res.status(401).json({ msg: "Not Authorized for this task"});
    }

    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({ errors: errors.array()});
    }

    const { field, dateOfConduct, from, to, mmarks } = req.body;

    const examinfo = {}
    examinfo.field = field;
    examinfo.dateOfConduct = dateOfConduct;
    examinfo.from = from;
    examinfo.to = to;
    examinfo.mmarks = mmarks;


    await CreateExam.findOneAndUpdate({_id: req.params.exam_id}, {$set: examinfo}, {new: true});


    res.json({msg: 'Examination Info Updated'});


});


// GET /api/exams
// GET all the exams
// Public
router.get('/', auth, async (req, res) => {
    try {
        const exams = await CreateExam.find();
        res.json(exams);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// GET api/exams/:exam_id
// get exams by ID
// Public
router.get('/:exam_id', auth,  async (req, res) => {
    try {
        
        const exam = await CreateExam.findOne({_id: req.params.exam_id})

        if(!exam) return res.status(404).json({msg: "Exam not found"})

        res.json(exam);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// DELETE /api/exam/:exam_id
// Delete a exam
// Admin Only
router.delete('/:exam_id', auth, async (req, res) => {
    try {
        if(req.user.admin === false) {
            return res.status(401).json({ msg: "Not Authorized for this task"});
        }
        await CreateExam.findOneAndRemove({_id: req.params.exam_id});
        res.json({msg: 'Examination deleted'});
    } catch(err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
    
})


// PUT api/exam/:exam_id/que
// ADD a question
// Admin only
router.put('/:exam_id/que', [auth, [
    check('que', 'Question is required').not().isEmpty(),
    check('ans', 'Correct Answer is required').not().isEmpty(),
    check('opts', 'All options must be filled').not().isEmpty(),
    check('marks', 'Marks for question must be filled').not().isEmpty()
]], async (req, res) => {

    if(req.user.admin === false) {
        return res.status(401).json({ msg: "Not Authorized for this task"});
    }

    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({ errors: errors.array()});
    }

    const {que, isSubjective, ans, marks} = req.body;
    const newque = {que, isSubjective, ans, marks}
    // if(isSubjective === false) {

    // }
    newque.opts = [];
    const {opts} = req.body
    newque.opts.push(...opts);

    try {
        const exam = await CreateExam.findOne({_id: req.params.exam_id})
        exam.ques.push(newque);

        await exam.save();

        res.json(exam.ques);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// PUT /api/exams/:exam_id/que/:que_id
// Edit a question
// Admin only
router.put('/:exam_id/que/:que_id', [auth, [
    check('que', 'Question is required').not().isEmpty(),
    check('ans', 'Correct Answer is required').not().isEmpty(),
    check('opts', 'All options must be filled').not().isEmpty(),
    check('marks', 'Marks for question must be filled').not().isEmpty()
]], async (req, res) => {
    if(req.user.admin === false) {
        return res.status(401).json({ msg: "Not Authorized for this task"});
    }
        const {que, isSubjective, ans, marks} = req.body;
        const newque = {que, isSubjective, ans, marks}
        // if(isSubjective === false) {
    
        // }
        newque.opts = [];
        const {opts} = req.body
        newque.opts.push(...opts);

    try {
        let exam = await CreateExam.findOne({_id: req.params.exam_id});   

        // Get question index
        console.log(req.params.que_id)
        const queIndex = exam.ques.map(que => que._id).indexOf(req.params.que_id);
        console.log(queIndex)
        exam.ques[queIndex] = newque;

        await CreateExam.findOneAndUpdate({_id: req.params.exam_id}, 
            {
                 ques: exam.ques
            }
            );

        exam = await CreateExam.findOne({_id: req.params.exam_id});

        await exam.save();
        res.json(exam);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// DELETE /api/exams/:exam_id/que/:que_id
// DELETE a question
// Admin only
router.delete('/:exam_id/que/:que_id', auth, async (req, res) => {
    if(req.user.admin === false) {
        return res.status(401).json({ msg: "Not Authorized for this task"});
    }
    try {
        const exam = await CreateExam.findOne({_id: req.params.exam_id});

        // Get its remove index
        const removeIndex = exam.ques.map(que => que.id).indexOf(req.params.que_id);

        exam.ques.splice(removeIndex, 1);
        await exam.save();
        res.json(exam.ques);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// PUT /api/exam/:exam_id/subscribe
// Subscription of an examination
// Private
router.put('/:exam_id/subs', auth, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id});
        const exam = await CreateExam.findOne({_id: req.params.exam_id});

        user.exams.unshift(exam);
        user.exams[0].ques.forEach((que) => {
            user.exams[0].optChosen.push('');
        })
        user.save();
        res.json(user.exams);


    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// DELETE /api/exam/:exam_id/subs
// Remove a subscription
// Private
router.delete('/:exam_id/subs', auth, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id});

        const removeIndex = user.exams.map(exam => exam._id).indexOf(req.params.exam_id);
        user.exams.splice(removeIndex, 1);
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
})



// PUT /api/exam/:exam_id/:que_id
// Answering question
// Private
router.put('/:exam_id/:que_id', auth, async (req, res) => {
    try {
        
        const {optChosen} = req.body;
        const user = await User.findOne({_id: req.user.id});
        const examIndex = await user.exams.map(exam => exam._id).indexOf(req.params.exam_id);
        const queIndex = await user.exams[examIndex].ques.map(que => que._id.toString()).indexOf(req.params.que_id);
        user.exams[examIndex].optChosen[queIndex] = optChosen;



        
        await User.findOneAndUpdate({_id: req.user.id}, 
            {
                 exams: user.exams
            }
            )

       
        await user.save();
        res.json(user.exams);


    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});


// PUT /api/exam/:exam_id
// Submiting exam
// Private
router.put('/:exam_id', auth, async (req, res) => {
    try {
        
        const user = await User.findOne({_id: req.user.id});
        const examIndex = user.exams.map(exam => exam._id).indexOf(req.params.exam_id);
        if(user.exams[examIndex].isSubmitted === false){
                    user.exams[examIndex].ques.forEach((que, i) => {
            if(user.exams[examIndex].optChosen[i] == que.ans){
                que.isCorrect = true;
                user.exams[examIndex].marksobt = user.exams[examIndex].marksobt + que.marks;
            }
                
        });

        user.exams[examIndex].isSubmitted = true;

        await User.findOneAndUpdate({_id: req.user.id}, 
            {
                 exams: user.exams
            }
            );
        }

        await user.save();
        res.json(user.exams);


    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});


module.exports = router;