module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  restoreContent: (str) => {
    const restoreSpaces = str.replace(/§/g, '&nbsp;');
    const restoreLines = restoreSpaces.replace(/€/g, '<br>');
    return restoreLines;
  },
};


// FUNCTIONS TO ADD TO THE EDIT AND CREATE POSTS TO BE ABLE TO CONVERT SPACE AND LINES TO SYMBOLS
// MAKE SURE THAT THE RENDERED CODE SNIPPET ON THE PAGE IS IN {{{ }}} BRACKETS TO RENDER THE HTML, NOT JUST THE STRING
function convertNewParagraph(str) {
  return str.replace(/\n/g, '€');
};

function convertSpaces(str) {
  return str.replace(/[ \t]/g, '§');
};