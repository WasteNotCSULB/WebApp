const router = require('express').Router();
const async = require('async');
const Category = require('../models/category');
const Item = require('../models/item');


// waste not
// status: good
router.get('/items', (req, res, next) => {
  const perPage = 10;
  const page = req.query.page;
  async.parallel([
    function(callback) {
      Item.count({}, (err, count) => {
        var totalItems = count;
        callback(err, totalItems);
      });
    },
    function(callback) {
      Item.find({})
        .skip(perPage * page)
        .limit(perPage)
        .populate('category')
        .exec((err, items) => {
          if(err) return next(err);
          callback(err, items);
        });
    }
  ], function(err, results) {
    var totalItems = results[0];
    var items = results[1];


    res.json({
      success: true,
      message: 'category',
      items: items,
      totalItems: totalItems,
      pages: Math.ceil(totalItems / perPage)
    });
  });

});

//  status GET: good
//  status POST: good
router.route('/categories')
  .get((req, res, next) => {
    Category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories
      })
    })
  })
  .post((req, res, next) => {


    Category.find({name: req.body.category}, (err, category) => {
      /* https://stackoverflow.com/questions/23507807/json-object-returns-undefined-value */
      if(category[0]){
        res.json({
          message: category[0].name + " already exists"});
      } else {
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
          success: true,
          message: "Successful, please refresh the page to see updated changes"
        });
      }
    });
  });

  // waste not
 // status: good

    router.get('/categories/:id', (req, res, next) => {
      const perPage = 10;
      const page = req.query.page;
      async.parallel([
        function(callback) {
          Item.count({ category: req.params.id }, (err, count) => {
            var totalItems = count;
            callback(err, totalItems);

          });
        },
        function(callback) {
          Item.find({ category: req.params.id })
            .skip(perPage * page)
            .limit(perPage)
            .populate('category')
            .exec((err, items) => {
              if(err) return next(err);
              callback(err, items);
            });
        },
        function(callback) {
          Category.findOne({ _id: req.params.id }, (err, category) => {
           callback(err, category)
          });
        }
      ], function(err, results) {
        var totalItems = results[0];
        var items = results[1];
        var category = results[2];
        res.json({
          success: true,
          message: 'category',
          items: items,
          categoryName: category.name,
          totalItems: totalItems,
          pages: Math.ceil(totalItems / perPage)
        });
      });

    });

  // wastenot
// status: good
  router.get('/item/:id', (req, res, next) => {
    Item.findById({ _id: req.params.id })

      .populate('category')
      .exec((err, item) => {
        if (err) {
          res.json({
            success: false,
            message: 'Item is not found'
          });
        } else {
          if (item) {
            res.json({
              success: true,
              item: item
            });
          }
        }
      });
  });

module.exports = router;
