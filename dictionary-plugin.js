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