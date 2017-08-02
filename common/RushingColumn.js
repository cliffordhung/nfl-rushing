function sanitizeNumber(data) {
  if (typeof data === 'number') {
    return data;
  }

  return data.replace(/,/g, '');
}    

function getLng(data) {
  let len = 0;
  let hasTouchdown = false;
  if (Number.isInteger(data)) {
    return {
      len: data,
      hasTouchdown
    };
  }

  const found = data.match(/^-?(\d+)(T)?$/);      

  if (!found) {
    throw 'Error in getLng';
  }

  if (found.length >= 2) {
    len = found[1];
  }

  if (found.length > 2) {
    if (found[2] == 'T') {
      hasTouchdown = true;
    }        
  }      

  return {
    len,
    hasTouchdown
  };
}

// class definition for a rushing column
class RushingColumn {
	constructor(name, inputName, type, isSortable, inputSanitizer) {
		this.name = name;
		this.inputName = inputName;
		this.type = type;
		this.isSortable = isSortable;

		if (!inputSanitizer && type === 'Number') {
			this.inputSanitizer = sanitizeNumber;			
		} else {
			this.inputSanitizer = inputSanitizer;
		}		
	}

	name() {
		return this.name;
	}

	inputName() {
		return this.inputName;
	}	

	type() {
		return this.type;
	}

  displayValue(data) {
    if (this.name === 'lng') {
      const suffix = data.hasTouchdown ? 'T' : '';
      return data.len + suffix;
    } 
    return data;
  }

	isSortable() {
		return this.isSortable;
	}

  inputSanitizer() {
    return this.inputSanitizer;
  }
}

const rushingColumns = [
  new RushingColumn('player', 'Player', 'String', false, null),
  new RushingColumn('team', 'Team', 'String', false, null),
  new RushingColumn('pos', 'Pos', 'String', false, null),
  new RushingColumn('att', 'Att', 'Number', false, null),
  new RushingColumn('attg', 'Att/G', 'Number', false, null),
  new RushingColumn('yds', 'Yds', 'Number', true, null),
  new RushingColumn('avg', 'Avg', 'Number', false, null),
  new RushingColumn('ydsg', 'Yds/G', 'Number', false, null),
  new RushingColumn('td', 'TD', 'Number', true, null),
  new RushingColumn('lng', 'Lng', 'Mixed', true, getLng),  
  new RushingColumn('first', '1st', 'Number', false, null),
  new RushingColumn('firstPercentage', '1st%', 'Number', false, null),
  new RushingColumn('twentyPlus', '20+', 'Number', false, null),
  new RushingColumn('fortyPlus', '40+', 'Number', false, null),
  new RushingColumn('fum', 'FUM', 'Number', false, null)
];

export default rushingColumns;