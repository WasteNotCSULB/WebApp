const router = require('express').Router();
const Item = require('../models/item');


const aws = require('aws-sdk'); // aws is a library for communicating with our services, s3
const multer = require('multer'); // multer ia a library for uploading images
const multerS3 = require('multer-s3'); // multer is a library for uploading directly to s3
const s3 = new aws.S3({ accessKeyId: "AKIAJMQNBEXTEX22COGA", secretAccessKey: "VNqW9UXLr84eSgFdUz10yH0WXsFsMu3V6XnDw/eI"});
// s3 key above was deleted on AWS for security reasons

const faker = require('faker');


const checkJWT = require('../middlewares/check-jwt');

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'amazonowebapplicationcsulb',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

// waste not
// status: GET good
// status: POST good
// In the amazono web app, we have to find the owner of the item,
// but in the zero waste item, there is no sellers so we don't need owners
// However the user must be admin to post or add a new item
  router.route('/items')
    .get(checkJWT, (req, res, next) => {
      Item.find({})
        .populate('category')
        .exec((err, items) => {
          if (items) {
            res.json({
              success: true,
              message: "Items",
              items: items
            });
          }
        });
    })
    .post(checkJWT, (req, res, next) => {
      let item = new Item();
      item.category = req.body.category;
     // console.log("204 reqbody " + req.body.category);
     // console.log(JSON.stringify(req.body));

    //  console.log("404 title reqbody " + req.body.title);

      item.title = req.body.title;
      item.description = req.body.description;
      item.image = req.body.image;
      item.save();
      res.json({
        success: true,
        message: 'Successfully Added the item',
      });
    });

/* Just for testing Waste Not Compost Items */
router.get('/faker/CompostItemTest',(req, res, next) => {
  for (i = 0; i < 20; i++) {
    let item = new Item();
    item.category = "5ace82a94561ae0ecf27a16a"; // compostId
    item.image = faker.image.food();
    item.title = faker.commerce.productName();
    item.description = faker.lorem.words();
    item.save();
  }

  res.json({
    message: "Successfully added 20 compost pictures for testing purposes"
  });

});



/* Five Waste Not Compost Items */
router.get('/faker/CompostItemFive',(req, res, next) => {
  for (i = 0; i < 5; i++) {
    let item = new Item();
    item.category = "5ace82a94561ae0ecf27a16a"; // compostId
    if(i == 0){
      item.image = "https://i.pinimg.com/originals/ae/c7/d6/aec7d6a5fd9701adbb513887416b8291.jpg";
      item.title = "Pizza boxes";
      item.description = "The pizza box is a folding box made of cardboard in which hot pizzas are stored for takeaway.";

    } else if (i == 1) { 
      item.image = "https://images.pexels.com/photos/45161/teabag-tea-label-drink-45161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
      item.title = "Tea Bags";
      item.description = "A tea bag is a small, porous, sealed bag containing dried plant material, which is immersed in boiling water to make a tea or an infusion.";
    } else if (i == 2) {

      item.image = "https://www.gingercasa.com/wp-content/uploads/2016/11/used-coffee-grounds.jpg";
      item.title = "Coffee Grounds";
      item.description = "Coffee grounds are the waste product from brewing coffee.";
    } else if (i == 3) {
      item.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQERfb2Nl5NwhzBrKDDrC39VfIMN67uMi8BJ9Ud0tm1WNv0N5cj";
      item.title = "Paper Towel";
      item.description =  "A Paper towel is an absorbent towel made from tissue paper instead of cloth.";

    } else if (i == 4) {
      item.image = "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/12/25/1419535813760/2215166779_81043f2d7e_o-2060x1236.jpeg?w=300&q=55&auto=format&usm=12&fit=max&s=fe471b8a145a1c4a89d476ee1123eafd";
      item.title = "Soiled Paper Plates";
      item.description = "Flat vessel on which food can be served";
       
    } else {
      item.image = faker.image.food();
      item.title = faker.commerce.productName();
      item.description = faker.lorem.words();
    }
    item.save();
  }

  res.json({
    message: "Successfully added 5 compost items"
  });

});



module.exports = router;
