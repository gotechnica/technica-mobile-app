export default getDevoolooperName(name) => {
  // A, E, I, O, U
  let vowels = new Set();
  vowels.add('A');
  vowels.add('E');
  vowels.add('I');
  vowels.add('O');
  vowels.add('U');

  name = name.toUpperCase();

  let newName = '';
  for (let i = 0; i < name.length; i++) {
    if (vowels.has(name.charAt(i))) {
      newName += 'oo';
    } else {
      newName += name.charAt(i);
    }
  }

  // Turn to title case
  return newName.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
