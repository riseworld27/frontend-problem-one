var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function convertFlattenObject(a) {
  let b = {};
  Object.keys(a).forEach((key) => {
    const item = a[key];
    if (!Array.isArray(item) && typeof item === 'object') {
      b = { ...b, ...convertFlattenObject(item) };
    } else {
      b[key] = item;
    }
  });
  return b;
}

function mutateArray(a) {
  // first step
  let result = a.map((b) => convertFlattenObject(b));

  // second step
  result = result.map(({ some_array, ...others }) => ({
    ...others,
    some_total: some_array.reduce((a, b) => a + b, 0),
  }));

  // third step
  result = result.filter(({ guest_type }) => guest_type === 'guest');

  // fourth step
  return result.sort((a, b) => {
    return a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name);
  });
}

$(document).ready(function() {
  $('#originalArray').html(JSON.stringify(arr, null, 2));
  $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
