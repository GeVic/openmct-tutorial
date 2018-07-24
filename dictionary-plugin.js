// Adding types similar to 'folder'
openmct.types.addType('example.telemetry', {
  name: 'Example Telemetry Point',
  description: 'For tutorial',
  cssClass: 'icon-telemetry'
});

function getDictionary() {
  return http.get('/dictionary.json').then(function (result){
    return result.data;
  });
}

var objectProvider = {
  get: function (identifier) {
    return getDictionary().then(function (dictionary){
      // check for th identifier key
      if (identifier.key == 'spacecraft') {
        return {
          identifier: identifier,
          name: dictionary.name,
          type: 'folder',
          location: 'ROOT'
        };
      } else {
        var measurement = dictionary.measurements.filter(function (m) {
          return m.key === identifier.key;
        })[0];
        return {
          identifier: identifier,
          name: measurement.name,
          type: 'example.telemetry',
          telemetry: {
            values: measurement.values
          },
          location: 'example.taxonomy:spacecraft'
        }
      }
    });
  }
};

function DictionaryPlugin(){
  return function install() {
    // Root node using Open MCT API
    openmct.objects.addRoot({
      namespace: 'space.taxonomy',
      key: 'spacecraft'
    });

    // Object provider :- It will provide openmct with the object for the identifier 
    openmct.objects.addProvider('space.taxonomy', objectProvider);
  }
};