"use strict";
console.log('Hello world!');

"use strict";

const data1 = require("./data_stub")
var sizeof = require('object-sizeof');
//console.log(data1.vms);
console.log(JSON.stringify(data1.vms[0]));



const max:number = 4_535;
for (let index = 0; index < max; index++) {
    //arr_item.vpgs[0].name += index;
    const arr_item: any = data1.vms[0];
    //arr_item.identifier += index
    data1.vms.push(arr_item)    
}

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
 
const blogSchema = new Schema({
    _id: String,
    moko: Number,
    spiderman: Array
});
 
const BlogModel:any = mongoose.model("Blog", blogSchema);


//configure mongoose
mongoose.connect(
  "mongodb://[user_name:the_pwd]@localhost/db_name?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err : any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
).then(async() => {
    
    //await BlogModel.create({
        //title: "hi",
        //body: "hello",
        //image: "1"
    //});
    await BlogModel.findByIdAndDelete({_id : "ObjectId(...)"})

    await BlogModel.create(data1);
    console.log('done.');
    const result : any = await BlogModel.findById("ObjectId(...)");
    //console.log(result);
    
    console.log(sizeof(result));
    
    const result2 : any = await BlogModel.aggregate([
        {$addFields: 
            {
                dup: "spiderman.web", 
                dup2: "spiderman.web",
                dup3: "spiderman.web",
        }}
    ])
    console.log(sizeof(result2));
    console.log(result2[0]);

    //console.log(result2);

    //const result = await model.aggregate(query).allowDiskUse(true).exec();
    //await BlogModel.create();

});
