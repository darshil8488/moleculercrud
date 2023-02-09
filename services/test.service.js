"use strict";

const  mongoose = require("mongoose");
const DbMixin = require("../mixins/db.mixin");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const modelSchema = require("./test.model");


module.exports = {
    name : "test",
    mixins: [DbMixin("test")],
    adapter : new MongooseAdapter(mongoose.connect("mongodb://localhost:27017/crud001", { useNewUrlParser: true })),
    model : mongoose.model('Test',modelSchema),

    actions : {
        create:{
            rest : "POST /create",
            async handler(ctx){
               
                const data = {
                    Fname : ctx.params.Fname,
                    Lname : ctx.params.Lname,
                    r_no : ctx.params.r_no
                }
                const insertData = this.adapter.insert(data)
                .then(doc => {
                  return { 
                    id: doc._id, 
                    Fname : ctx.params.Fname,
                    Lname : ctx.params.Lname,
                    r_no : ctx.params.r_no,
                };
                });
                return insertData;
            }
        },

        find : {
            rest : "GET /find",
            async handler(){
                const getallData = this.adapter.find();
                return getallData;
            }
        },

        findById : {
            rest: "GET /id/:id",
            async handler(ctx){
                const findById = await this.adapter.findOne({_id : ctx.params.id});
                return findById;
            }
        },

        delete : {
            rest : "DELETE /:id",
            async handler(ctx){
                const deleteData = await this.adapter.removeById(ctx.params.id)
                return deleteData;
            }
        },

        update : {
            rest : "PUT /update/:id",
            async handler(ctx){
                const updateData = {
                    Fname : ctx.params.Fname,
                    Lname : ctx.params.Lname,
                    r_no : ctx.params.r_no
                }
                const data = this.adapter.updateById(ctx.params.id , updateData);
                return data;
            }
        }
    }
}