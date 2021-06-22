const models = require("../models");

module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Adam Scott',
    });
  },
  updateNote: async (parent, args, { models }) => {
    return await models.Note.updateOne({
      id: args.id
    },{
      content: args.content,
    });
  },
  deleteNote: async (parent, args, { models }) => {
    return await models.Note.de
  }
};
