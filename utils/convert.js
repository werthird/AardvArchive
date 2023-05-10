// HELPER FUNCTIONS FOR CLIENT-SIDE JS

// Convert spaces and line breaks
function convertContent(str) {
  const convertSpaces = str.replace(/[ \t]/g, '§');
  const convertLinesBreaks = convertSpaces.replace(/\n/g, '€');
  return convertLinesBreaks;
};



module.exports = {
  convertContent,
}