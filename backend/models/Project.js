import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String, // 'file' or 'folder'
  content: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  parentId: String,
});

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  files: [fileSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model('Project', projectSchema);

