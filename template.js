/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 1/20/22
 * Creative Project #2
 * Description: Retrieves input entries and formats it in a new page for a user to print
 */

'use strict';
(function() {
    window.addEventListener('load', init);

    function init() {
        let titleToInput = document.getElementById('input-title');
        let rowsToInput = document.getElementById('input-rows');

        titleToInput.textContent = localStorage.getItem('title');
        rowsToInput.insertAdjacentHTML('afterend', localStorage.getItem('entries'));
    }
})();