import Rushing from '../models/rushing';

/**
 * Get all rushings
 * @param req
 *        The query property specifies the player to filter by and the column and order to sort by
 * @param res
 * @returns void
 */
export function getRushings(req, res) {
  let filterParam = '';
  if (req.query.hasOwnProperty('playerFilter')) {
    filterParam = {
      player: new RegExp(req.query.playerFilter, 'i')
    };
  }

  let sortParams = [['player', 1]];
  if (req.query.hasOwnProperty('sortBy') && req.query.sortBy.hasOwnProperty('col')) {
    sortParams = [];
    let param = [];
    let sortByCol = req.query.sortBy.col;
    if (req.query.sortBy.col === 'lng') {
      sortByCol += '.len';
    }
    param.push(sortByCol)
    let order = 1;
    if (req.query.sortBy.hasOwnProperty('order')) {
      order = req.query.sortBy.order;
    }
    param.push(order);
    sortParams.push(param);
  }

  //console.log('filterParam: ', filterParam);
  //console.log('sortParams: ', sortParams);

  Rushing.find(filterParam).sort(sortParams).exec((err, rushings) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ rushings });
  });
}