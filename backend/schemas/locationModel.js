const mongoose = require('mongoose')

const locationModel = mongoose.Schema({
   Sname: {
      type : String,
      required:[true,'Please enter Street']
   },
   locality: {
      type : String,
      required:[true,'Please enter locality']
   },
   qpeople: {
      type : Number,
      required:[true,'Please enter qpeople']
   },
   ipeople: {
      type : Number,
      required:[true,'Please enter ipeople']
   },
   vpeople: {
      type : Number,
      required:[true,'Please enter vpeople']
   },
   containmentZone: {
      type: String,
      default: 'yes'
   }
})

const locationSchema = mongoose.model('location', locationModel)

module.exports = locationSchema