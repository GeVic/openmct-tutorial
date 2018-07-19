function DictionaryPlugin(){
  return function install() {
    // Root node using Open MCT API
    openmct.objects.addRoot({
      namespace: 'space.taxonomy',
      key: 'spacecraft'
    });
  }
};