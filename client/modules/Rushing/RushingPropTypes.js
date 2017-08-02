import { PropTypes } from 'react';
import rushingColumns from '../../../common/RushingColumn';

function getPropType(type) {
  switch (type) {
    case 'Number':
      return PropTypes.number.isRequired;
    case 'String':
      return PropTypes.string.isRequired;
    case 'Mixed':
      return PropTypes.object.isRequired;
    default:
      return PropTypes.string.isRequired;
  }
}

export function getRushingPropTypes() {
  let typeObj = {};
  for (let i = 0; i < rushingColumns.length; ++i) {
    const col = rushingColumns[i];
    typeObj[col.name] = getPropType(col.type);
  }
  return typeObj;
}