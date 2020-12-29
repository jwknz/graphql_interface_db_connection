import mongoose from 'mongoose';

export const Family = mongoose.model('Family', { name: String, numberOfPeople: Number });

export const Member = mongoose.model('Member', { name: String, age: Number });