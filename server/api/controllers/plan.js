const mongoose = require("mongoose");
const DayPlan = require("../models/plan");

exports.plan_get_all = (req, res, next) => {
  const loggedUserId = req.userData.userId;
  DayPlan.find({ userId: loggedUserId })
    .select("-__v")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        plan: docs.map((doc) => {
          return {
            _id: doc._id,
            day: doc.day,
            date: doc.date,
            breakfast: doc.breakfast,
            lunch: doc.lunch,
            dinner: doc.dinner,
            snacks: doc.snacs,
            request: {
              type: "GET",
              url: `http://localhost:4000/plan/${doc._id}`,
            },
            userId: doc.userId,
          };
        }),
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.plan_post = (req, res, next) => {
  const dayPlan = new DayPlan({
    _id: new mongoose.Types.ObjectId(),
    day: req.body.day,
    date: req.body.date,
    breakfast: req.body.recepies.breakfast,
    lunch: req.body.recepies.lunch,
    dinner: req.body.recepies.dinner,
    snacks: req.body.recepies.snacks,
    userId: req.userData.userId,
  });

  dayPlan
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created day plan",
        createdDayPlan: {
          _id: result._id,
          day: result.day,
          date: result.date,
          breakfast: result.breakfast,
          lunch: result.lunch,
          dinner: result.dinner,
          snacks: result.snacks,
        },
        request: {
          type: "GET",
          url: `http://localhost:4000/plan/${result._id}`,
        },
        userId: result.userId,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.plan_get_single = (req, res, next) => {
  const id = req.params.dayPlanId;
  const loggedUserId = req.userData.userId;
  DayPlan.findById(id)
    .select("-__v")
    .exec()
    .then((doc) => {
      if (doc && doc.userId === loggedUserId) {
        res.status(200).json({
          dayPlan: doc,
          request: {
            type: "GET",
            url: "http://localhost:4000/plan",
          },
        });
      } else {
        res.status(404).json({ message: "No valid ID" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.plan_patch = (req, res, next) => {
  const id = req.params.dayPlanId;
  DayPlan.update(
    { _id: id },
    {
      $set: {
        day: req.body.day,
        date: req.body.date,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        dinner: req.body.dinner,
        snacks: req.body.snacks,
      },
    }
  )
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Day plan updated",
        request: {
          type: "GET",
          url: `http://localhost:4000/plan/${id}`,
        },
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.plan_delete = (req, res, next) => {
  const id = req.params.dayPlanId;
  DayPlan.remove({ _id: id })
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Plan deleted",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
