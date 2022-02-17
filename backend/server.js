const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const BioRoutes = require('./routes/bio');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
/* connecting database */
connectDB();


app.use('/users', BioRoutes);

//----------deployment-----------------

__dirname = path.resolve();

if(process.env.NODE_ENV==="production") {
 app.use(express.static(path.join(__dirname,"/frontend/build")));

 app.get('*',(req,res)=>{
   res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
 });
}else{
	app.get("/", (req, res)=>{
      res.send("API is running..");
	});
}


//----------deployment-----------

/* connecting server */
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Node JS Server Started`));