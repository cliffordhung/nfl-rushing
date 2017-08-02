import mongoose from 'mongoose';
import rushingColumns from '../../common/RushingColumn';
const Schema = mongoose.Schema;

let schemaObj = {};
for (let i = 0; i < rushingColumns.length; ++i) {
  const col = rushingColumns[i];
  let type = col.type;
  if (col.name === 'lng' && type === 'Mixed') {
    type = new Schema({len: 'Number', hasTouchdown: 'String'}, {_id: false});
  }
  schemaObj[col.name] = {
    type,
    required: true
  };
}

const rushingSchema = new Schema(schemaObj);

export default mongoose.model('Rushing', rushingSchema);
