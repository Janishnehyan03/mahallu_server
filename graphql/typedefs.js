const gql = require("graphql-tag");

const typeDefs = gql`
  type Entry {
    _id: ID
    mahallu: String
    headOfTheFamily: String
    formNumber: String
    houseNumber: String
    contactNumber: String
    dateOfSurvey: String
    areaCode: String
    numberOfFamilyMembers: Int
    name: String
    gender: String
    dob: String
    relationWithHead: String
    mobileNumber: String
    maritalStatus: String
    educationalQualification: String
    institutionOfStudy: String
    religiousEducation: String
    materialEducation: String!
    jobDetails: String
    health: String
    bloodGroup: String
    jobType: JobType
    suggestions: String
    remarks: String
  }

  type JobType {
    govtService: Boolean
    privateSector: Boolean
    dailyWage: Boolean
  }

  type Mahallu {
    _id: ID
    name: String
    district: District
  }

  type District {
    _id: ID
    name: String
    state: String
  }

  type Query {
    entry(id: ID): Entry
    mahallu: [Mahallu]
  }

  type Mutation {
    createEntry(mahallu: String!, headOfTheFamily: String!): Entry
  }
  type Query {
    greetings: String
  }
`;

module.exports = { typeDefs };
