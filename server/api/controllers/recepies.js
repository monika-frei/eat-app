const mongoose = require("mongoose");
const Recepie = require("../models/recepie");

exports.recepies_get_all_recepies = (req, res, next) => {
  const loggedUserId = req.userData.userId;
  Recepie.find({ userId: loggedUserId })
    .select("-__v")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        recepies: docs.map((doc) => {
          return {
            _id: doc._id,
            category: doc.category,
            title: doc.title,
            ingredients: doc.ingredients,
            preparation: doc.preparation,
            // extra: {
            //   time: doc.extra.time,
            //   servings: doc.extra.servings,
            //   info: doc.extra.info,
            // },
            recepieImage: doc.recepieImage,
            request: {
              type: "GET",
              url: `http://localhost:4000/recepies/${doc._id}`,
            },
            userId: doc.userId,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

exports.recepies_create_recepie = (req, res, next) => {
  const recepie = new Recepie({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    title: req.body.title,
    ingredients: req.body.ingredients,
    preparation: req.body.preparation,
    // extra: {
    //   time: req.body.extra.time,
    //   servings: req.body.extra.servings,
    //   info: req.body.extra.info,
    // },
    recepieImage: req.file.path,
    userId: req.userData.userId,
  });
  recepie
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created recepie successfuly",
        createdRecepie: {
          _id: result._id,
          category: result.category,
          title: result.title,
          ingredients: result.ingredients,
          preparation: result.preparation,
          // extra: {
          //   time: result.extra.time,
          //   servings: result.extra.servings,
          //   info: result.extra.info,
          // },
          recepieImage: req.file.path,
          request: {
            type: "GET",
            url: `http://localhost:4000/recepies/${result._id}`,
          },
          userId: result.userId,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.recepies_get_single_recepie = (req, res, next) => {
  const id = req.params.recepieId;
  const loggedUserId = req.userData.userId;
  Recepie.findById(id)
    .select("-__v")
    .exec()
    .then((doc) => {
      if (doc && doc.userId === loggedUserId) {
        res.status(200).json({
          _id: doc._id,
          category: doc.category,
          title: doc.title,
          ingredients: doc.ingredients,
          preparation: doc.preparation,
          // extra: {
          //   time: doc.extra.time,
          //   servings: doc.extra.servings,
          //   info: doc.extra.info,
          // },
          recepieImage: doc.recepieImage,
          request: {
            type: "GET",
            url: "http://localhost:4000/recepies",
          },
          userId: doc.userId,
        });
        console.log(typeof loggedUserId, typeof doc.userId);
      } else {
        res.status(404).json({ message: "Not valid ID" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.recepies_change_recepie = (req, res, next) => {
  // można tutaj zmienić na : --> const updateOpt = {}; for(const opt of re.body){updateOpt[opt.propName]:opt.value} <-- i w set podmienić na obiekt updateOpt (założenie, że req.body jest tablicą)
  const id = req.params.recepieId;
  Recepie.update(
    { _id: id },
    {
      $set: {
        category: req.body.category,
        title: req.body.title,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        extra: {
          time: req.body.extra.time,
          servings: req.body.extra.servings,
          info: req.body.extra.info,
        },
      },
    }
  )
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Recepie updated",
        request: {
          type: "GET",
          url: `http://localhost:4000/recepies/${id}`,
        },
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.recepies_delete_recepie = (req, res, next) => {
  const id = req.params.recepieId;
  Recepie.remove({ _id: id })
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Recepie deleted",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
