const Entry = require("../models/entryModel");
const Mahallu = require("../models/mahalluModel");
const District=require('../models/districtModel') 

const resolvers = {
  Query: {
    mahallu: async (parent, args, context, info) => {
      let data = await Mahallu.find().populate("district");
      return data;
    },
    entries: async (parent, args) => {
      return await Entry.find().populate("mahallu");
    },
    districts: async (parent, args) => {
      return await District.find();
    },
    greetings: () => "Hello world",
  },
};

module.exports = { resolvers };
