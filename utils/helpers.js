module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  restoreContent: (str) => {
    // Restore spaces
    const restoreSpaces = str.replace(/§/g, ' ');
    // Restore line breaks
    const restoreLines = restoreSpaces.replace(/€/g, '\n');
    return restoreLines;
  },
};
// \u00A0