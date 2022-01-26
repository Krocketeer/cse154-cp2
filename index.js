/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 1/20/22
 * Creative Project #2
 * Description: Provides functionality for adding new input rows
 * (links and versions) and formatting proof for vendor projects
 */

'use strict';
(function() {
  window.addEventListener('load', init);

  /**
   * Provides functionality for adding additional input rows and
   * submitting proof for formatting into printable page
   */
  function init() {
    let addButton = document.getElementById('add-button');
    let button = document.getElementById('submit-button');

    addButton.addEventListener('click', addInputs);
    button.addEventListener('click', formatProof);
  }

  /**
   * Takes a user's input of title, version(s), and link(s)
   * and formats it on a new page. Checks if there is at least
   * one title, one version, and one link
   */
  function formatProof() {
    let td = document.getElementsByTagName('td');
    let warning = document.getElementById('warning');
    if (!checkMinInput()) {
      warning.classList.add('active');
    } else {
      warning.classList.remove('active');
      let title = document.getElementById('title-input').value;
      title = escapeHTML(title);
      let entries = [];
      for (let i = 0; i < td.length; i++) {
        let entry = escapeHTML(td[i].getElementsByTagName('input')[0].value);
        if (entry) {
          entries.push(entry);
        }
      }

      let tableEntries = createTable(entries);
      localStorage.setItem('title', title);
      localStorage.setItem('entries', tableEntries);
      window.open('template.html');
    }
  }

  /**
   * Provides functionality for adding new input rows (versions
   * and links) to the page
   */
  function addInputs() {
    let trCount = document.querySelectorAll('tr').length;
    let table = document.getElementsByTagName('table');
    let tr = document.createElement('tr');
    let versionTD = document.createElement('td');
    let linkTD = document.createElement('td');
    let versionLabel = document.createElement('label');
    let linkLabel = document.createElement('label');
    let versionInput = document.createElement('input');
    let linkInput = document.createElement('input');

    versionInput.classList.add('version-input');
    linkInput.classList.add('link-input');

    table[0].appendChild(tr);
    versionTD.appendChild(versionLabel);
    versionLabel.innerText = `Version ${trCount}`;
    versionLabel.setAttribute('for', `version-${numInWords(trCount)}`);
    versionTD.appendChild(versionInput);

    linkTD.appendChild(linkLabel);
    linkLabel.innerText = `Link ${trCount}`;
    linkLabel.setAttribute('id', `link-${numInWords(trCount)}`);
    linkTD.appendChild(linkInput);

    tr.appendChild(versionTD);
    tr.appendChild(linkTD);
  }

  /**
   * Checks if there is a valid input (anything typed in) for the title
   * version, and link inputs.
   * @returns {boolean} Returns true if there is at least one title,
   * one version, and one link; returns false otherwise.
   */
  function checkMinInput() {
    let td = document.getElementsByTagName('td');
    let titleInput = document.getElementById('title-input').value;

    let VLInputs = [];
    for (let i = 0; i < td.length; i++) {
      VLInputs.push(td[i].getElementsByTagName('input')[0].value !== "");
    }

    let minVersionLink = (countOccurrences(VLInputs, true) >= 2);
    return (titleInput && minVersionLink);
  }

  /**
   * Takes an array and a value and counts the number of times
   * the value appears in the array
   * Base code credit: https://stackoverflow.com/a/5669730/17459524
   * @param {Array} array The array to search
   * @param {*} value The value to search for
   * @returns {Number} The occurrences of the value in the array
   */
  function countOccurrences(array, value) {
    return array.reduce((arr, val) => (val === value ? arr + 1 : arr), 0);
  }

  /**
   * Takes a string and removes any HTML special characters from it
   * Base code credit: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/18108463
   * @param {String} text The string to be formatted
   * @returns {String} The string without HTML special characters
   */
  function escapeHTML(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Takes HTML formatted labels and inputs and formats them inside
   * a table row entry tags to create a table
   * @param {String} entries values inputted into links and versions
   * @returns {String} HTML formatted entries for a table
   */
  function createTable(entries) {
    let table = ``;
    for (let i = 0; i < entries.length; i += 2) {
      table += `<tr>
        <td class="version">${escapeHTML(entries[i])}</td>
        <td class="link">${escapeHTML(entries[i + 1])}</td>
      </tr>`;
    }
    return table;
  }

  /**
   * Takes an integer and returns its word form e.g. 4 -> four
   * Base code credit: https://stackoverflow.com/questions/14766951/transform-numbers-to-words-in-lakh-crore-system
   * @param {Number} num integer
   * @returns {string} the integer in word form
   */
  function numInWords(num) {
    const NUM_ARR_ONE = ['', 'one', 'two', 'three', 'four', 'five',
      'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
      'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
      'eighteen', 'nineteen'];
    const NUM_ARR_TWO = ['', '', 'twenty', 'thirty', 'forty',
      'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const MAX_LEN = 9;

    if ((num = num.toString()).length > MAX_LEN) {
      return 'overflow';
    }
    let number =
      ('000000000' + num).substr(-(MAX_LEN)).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!number) {
      return;
    }
    let str = '';
    str += (number[1] !== 0) ? (NUM_ARR_ONE[Number(number[1])] ||
      NUM_ARR_TWO[number[1][0]] + ' ' + NUM_ARR_ONE[number[1][1]]) + '' : '';
    str += (number[2] !== 0) ? (NUM_ARR_ONE[Number(number[2])] ||
      NUM_ARR_TWO[number[2][0]] + ' ' + NUM_ARR_ONE[number[2][1]]) + '' : '';
    str += (number[3] !== 0) ? (NUM_ARR_ONE[Number(number[3])] ||
      NUM_ARR_TWO[number[3][0]] + ' ' + NUM_ARR_ONE[number[3][1]]) + 'thousand ' : '';
    str += (number[4] !== 0) ? (NUM_ARR_ONE[Number(number[4])] ||
      NUM_ARR_TWO[number[4][0]] + ' ' + NUM_ARR_ONE[number[4][1]]) + 'hundred ' : '';
    str += (number[5] !== 0) ? ((str !== '') ? 'and ' : '') +
      (NUM_ARR_ONE[Number(number[5])] || NUM_ARR_TWO[number[5][0]] + ' ' +
        NUM_ARR_ONE[number[5][1]]) + '' : '';
    str = str.trim();

    // https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case
    return str.replace(/\s+/g, '-').toLowerCase();
  }
})();