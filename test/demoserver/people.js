"use strict"
let persons = [];

const router = require("express").Router();
const createPerson = function(body){
  return {
    name: body.name,
    last_name: body.last_name,
    hobbies: body.hobbies
  }
};
router.route("/").get((req,res,next)=> {
  res.send(persons);
});

router.route("/").post((req,res,next)=> {
  try {
    let person = createPerson(req.body);
    person.totalHobbies = person.hobbies.length;
    persons.push(person);
    res.send(person)
  } catch(error) {
    res.status(500).send("error")
  }

});

router.route("/:id([0-9]+)").get((req,res,next)=> {
  let index = req.params.id;
  if(persons && persons[index]) {
    res.send(persons[index]);
  } else {
    res.status(404).send("not found");
  }
});

router.route("/:id([0-9]+)").put((req,res,next)=> {
  let index = req.params.id;
  if(persons && persons[index]) {
    try {
      let person = createPerson(req.body);
      persons[index] = person;
      res.send(person);
    } catch(error) {
      res.status(500).send("error")
    }

  } else {
    res.status(404).send("not found");
  }
});

router.route("/:id([0-9]+)").delete((req,res,next)=> {
  let index = req.params.id;
  if(persons && persons[index]) {
    let person = persons[index];
    persons.splice(index,1);
    res.send(person);
  } else {
    res.status(404).send("not found");
  }
});

module.exports = router;
