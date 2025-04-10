// jobModel.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Please provide job role/position'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    required: [true, 'Please provide the date of application'],
  },
  link: {
    type: String,
    trim: true,
    default: '',
  },
  
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
