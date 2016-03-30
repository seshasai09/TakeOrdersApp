var Food = require('./models/food');

function getFoodItems(res) {
    Food.find(function (err, allItems) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(allItems); // return all todos in JSON format
    });
   }
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all FoodItems
    app.get('/api/food', function (req, res) {
        // use mongoose to get all foodItems in the database
        getFoodItems(res);
    });


    // create foodItem and send back all foodItems after creation
    app.post('/api/food', function (req, res) {
        // create a foodItem, information comes from AJAX request from Angular
        var item =req.body;
        Food.create({
            Name: item.name,
            Price: parseInt(item.price)
        }, function (err, food) {
            if (err) {
                res.send(err);
            }
            // get and return all the todos after you create another
            getFoodItems(res);
        });

    });

    // delete a foodItem
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, item) {
            if (err)
                res.send(err);

            getFoodItems(res);
        });
    });


// get total of all items in database
    app.get('/api/total',function (req,res){

        Food.aggregate([{$group : {_id:null, total:{$sum:"$Price"}}}]
        , function(err,data){
                if (err) {
                    res.send(err);
                }else {
                    if(data!=null && data.length>0){
                    var total = data[0].total;
                    total = total + total * (.075);
                    res.json({total: total});
                    }else{
                        res.json({total: 0});
                    }
                }
            })


    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};