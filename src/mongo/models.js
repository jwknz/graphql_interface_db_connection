import mongoose from 'mongoose';

export const Family = mongoose.model('Family', { name: String });

export const Member = mongoose.model('Member', { name: String });