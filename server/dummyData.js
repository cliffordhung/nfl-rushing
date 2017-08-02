import Rushing from './models/rushing';
import rushingColumns from '../common/RushingColumn';
const fs = require('fs');

export default function () {
  Rushing.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    try {
      fs.readFile('./server/rushing.json', {encoding: 'utf8'},
        (err, data) => {
          if (err) {
            throw err;
          }

          const rushingJson = JSON.parse(data);
          //console.log('rushingJson: ', rushingJson);
          for (let i = 0; i < rushingJson.length; ++i) {
            const rushingElem = rushingJson[i];
            //console.log('rushingElem: ', rushingElem);

            let rushingObj = {};
            for (let j = 0; j < rushingColumns.length; ++j) {
              const col = rushingColumns[j];
              //console.log('col: ', col);
              if (col.inputSanitizer) {
                rushingObj[col.name] = col.inputSanitizer(rushingElem[col.inputName]);
              } else {
                rushingObj[col.name] = rushingElem[col.inputName];
              }
            }
            const rushingStat = new Rushing(rushingObj);

            rushingStat.save((err) => {
              if (err) {
                throw 'Error saving stat: ' + err;
              }
            });
          }
      });
    } catch (err) {
      console.error('error: ', err);
    }
  });
}
