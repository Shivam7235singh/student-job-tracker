import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company:{
        type :String,
        required : [true, 'Please provide company name'],
        trim : true,
       
    },
    position :{
        type :String,
        required : [true, 'Please provide position name'],
        trim : true,
    },
    status :{
        type :String,
        enum : ['interview', 'declined', 'pending'],
        default : 'pending',
    },
    appliedDate: {
        type: Date,
        required: true,
      },
      link: {
        type: String,
        default: "",
      },
    },
      { 
        timestamps: true, // adds createdAt and updatedAt fields automatically
      }
)

const Job = mongoose.model('Job', jobSchema)
export default Job;