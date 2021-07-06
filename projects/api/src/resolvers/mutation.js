const mongoose = require('mongoose');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const models = require('../models');
const gravatar = require('../util/gravatar');

const Mutation = {
  newNote: async (parent, { content }, { models, user }) => {

    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note.');
    }
    return await models.Note.create({
      content: content,
      author: mongoose.Types.ObjectId(user.id),
    });
  },
  updateNote: async (parent, { content, id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note');
    }

    const note = await models.Note.findById(id);

    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the note");
    }

    // return await models.Note.findOneAndUpdate({
    //   _id: id
    // }, {
    //   $set: {
    //     content,
    //   },
    // }, {
    //   new: true,
    // });
    return await note.update({
      $set: { content },
    });
  },
  deleteNote: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a note');
    }
    
    const note = await models.Note.findById({ _id: id });

    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the note");
    }

    try {
      await note.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  signUp: async (parent, { email, username, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);
    
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { email, username, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }
    
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });
    
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }
    
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }
    
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};

module.exports = Mutation;
