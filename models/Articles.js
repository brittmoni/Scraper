var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
  headline: {
    type: String
  },
  summary: {
    type: String
  },
  link: {
    type: String
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: 'Notes'
  }
});

var Articles = mongoose.model('Articles', ArticlesSchema);

module.exports = Articles;