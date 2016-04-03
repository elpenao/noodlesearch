import mongoose from 'mongoose';
import textSearch from 'mongoose-text-search';
const Schema = mongoose.Schema;

const pageSchema = new Schema({

  url: { type: 'String', required: true, unique:true },
  title: { type: 'String', required: true },
  text: {type: 'String', required: true}

});

pageSchema.plugin(textSearch);

// add a text index  array
pageSchema.index({ title: 'text' });

export default mongoose.model('Page', pageSchema);
