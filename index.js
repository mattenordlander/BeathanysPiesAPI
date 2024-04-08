// Bring in the express server and create application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo')
// use the express Router obejct
let router = express.Router();

// Create GET to return a list of all  pies
router.get('/', function (req, res, next){

   pieRepo.get(function(data){
     // you should always return status()
     res.status(200).json({
        "status":200,
        "statusText":"OK",
        "message": "All pies retrived",
        "data":data
    });
   },function(err){
    next(err);
   });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/',router);

// Create server to listen on port 5000
let server = app.listen(5000,function() {
    console.log('Node server is running on http://localhost:5000...')
});