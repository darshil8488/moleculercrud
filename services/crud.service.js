"use strict";

const DbMixin = require("../mixins/db.mixin");
const mongoose = require("mongoose");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");


module.exports = {

    
	name: "crud",
	mixins: [DbMixin("crud")],
	settings: {
	},

	/**
	 * Action Hooks
	 */
	hooks: {
	},

    adapter: new MongooseAdapter(mongoose.connect("mongodb://localhost:27017/crud001", { useNewUrlParser: true })),
    model: mongoose.model("Post", mongoose.Schema({
        title: { type: String },
        content: { type: String },
        votes: { type: Number, default: 1}
    })),
	
	actions: {

        create: {
            rest: "POST /create",

            async handler(ctx) {

                const doc = await this.adapter.insertMany([
                    { title: ctx.params.title , content: ctx.params.content , votes: ctx.params.votes },
                ]);
                return doc;
            }
        },
            
        findd: {
			rest: "GET /findd",
			async handler(ctx) {
                const dd =  this.adapter.find();
				return dd;
			}
		},

        delete: {
			rest: "DELETE /:id",
			async handler(ctx) {
                const dd =  this.adapter.removeById(ctx.params.id);
				return dd;
			}
		},
       
        findbyid: {
			rest: "GET /id/:id",
            handler(ctx) {
                return this.adapter.findOne({_id: ctx.params.id})
                    
            },
        },

        update : {
            rest: "PUT /update/:id",
			params: {
				id: "string",
				votes: "number|integer|positive"
			},
            handler(ctx) {
				const doc  = this.adapter.updateById(ctx.params.id, {  votes: ctx.params.votes } );
                return doc;
            },
        }

	},

	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
