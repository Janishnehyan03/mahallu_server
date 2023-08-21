const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const Mahallu = require("../models/mahalluModel");
const Entry = require("../models/entryModel");

// Define GraphQL types
const EntryType = new GraphQLObjectType({
  name: "Entry",
  fields: () => ({
    _id: { type: GraphQLID },
    mahallu: { type: GraphQLString },
    headOfTheFamily: { type: GraphQLString },
    formNumber: { type: GraphQLString },
    houseNumber: { type: GraphQLString },
    contactNumber: { type: GraphQLString },
    dateOfSurvey: { type: GraphQLString }, // You can use GraphQLString for date
    areaCode: { type: GraphQLString },
    numberOfFamilyMembers: { type: GraphQLInt },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    dob: { type: GraphQLString }, // You can use GraphQLString for date
    relationWithHead: { type: GraphQLString },
    mobileNumber: { type: GraphQLString },
    maritalStatus: { type: GraphQLString },
    educationalQualification: { type: GraphQLString },
    institutionOfStudy: { type: GraphQLString },
    religiousEducation: { type: GraphQLString },
    materialEducation: { type: new GraphQLNonNull(GraphQLString) }, // Non-null field
    jobDetails: { type: GraphQLString },
    health: { type: GraphQLString },
    bloodGroup: { type: GraphQLString },
    jobType: {
      type: new GraphQLObjectType({
        name: "JobType",
        fields: {
          govtService: { type: GraphQLBoolean },
          privateSector: { type: GraphQLBoolean },
          dailyWage: { type: GraphQLBoolean },
        },
      }),
    },
    suggestions: { type: GraphQLString },
    remarks: { type: GraphQLString },
  }),
});
const DistrictType = new GraphQLObjectType({
  name: "District",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    state: { type: GraphQLString },
  }),
});

const MahalluType = new GraphQLObjectType({
  name: "Mahallu",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    district: { type: DistrictType }, // You might want to change this to a custom GraphQL type if District has more fields
  }),
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    entry: {
      type: EntryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Entry.find();
      },
    },
    mahallu: {
      type: new GraphQLList(MahalluType), // Use GraphQLList to represent a list of MahalluType
      async resolve(parent, args) {
        try {
          const mahallus = await Mahallu.find()
            .populate("district")
            .select("name");
          return mahallus;
        } catch (error) {
          throw new Error("Error fetching Mahallu data: " + error.message);
        }
      },
    },
  },
});

// Define Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEntry: {
      type: EntryType,
      args: {
        mahallu: { type: new GraphQLNonNull(GraphQLString) },
        headOfTheFamily: { type: new GraphQLNonNull(GraphQLString) },
        // Add other fields here
      },
      resolve(parent, args) {
        // Here you would write the logic to create a new entry in your database
        // You can use the args to get the values provided in the mutation
        // Return the created entry object
      },
    },
  },
});

// Create GraphQL Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
