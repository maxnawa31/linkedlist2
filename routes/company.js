const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { User, Job, Company } = require ("../models");

router.get("/login", function(req, res, next) {
  session.set(["id"]) = company_id;
  return res.json("company/loginCompany")
})

router.get("/signup", function (req, res, next) {
  return res.json("company/signup");
});


router
  .get("/:company_id", function(req, res, next) {
    return Company.findById(req.params.company_id)
      .populate("User", "Job")
      .then(company => {
        return res.json("company/feed", {company})
      })
  })

  .post("/:company_id", function(req, res, next) {
    return Company.create(req.body).then(() => {
      return res.redirect("/:company_id")
    }); 
 })

  .patch("/:company_id", function(req, res, next) {
    return Company.findByIdAndUpdate(req.params.company_id, req.body).then(company =>{
      return res.redirect('/:company_id')
    })
  })
  .delete("/:company_id", function(req, res, next) {
    return Company.findByIdAndUpdate(req.params.company_id, req.body).then(company => {
        return res.redirect(':/login')
    });
  })

router.get("/:company_id/edit", function(req,res, next){
  return Company.findById(req.params.company_id).populate("User","Job").then(company =>{
    return res.json('company/edit',{company}) 
    })
})

router.get('/:company_id/show', function(req,res,next){
  return Company.findById(req.params.company_id).populate("User", "Job")
  .then(company => {
    return res.json('/company/show', {company})
  })
})


// router.get('/:company_id/jobs',function(req,res,next){
//   return Company.findById(req.params.company_id).populate('Job').then(company =>{
//       return res.json('company/jobs,', {company})
//   })
// })
// .post('/company_id/jobs', function(req,res,next){
//   return Job.create(req.body).then(() => {
//     return res.redirect('/:company_id/jobs')
//   })
// })

module.exports = router;