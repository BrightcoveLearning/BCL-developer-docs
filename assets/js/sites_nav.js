var BCLS_sites_nav = ( function (window, document) {
  var site_select = document.getElementById('site_select');

  /**
   * get selected value for single select element
   * @param {htmlElement} e the select element
   * @return {string} value of selected element
   */
function getSelectedValue(e) {
  var selected = e.options[e.selectedIndex],
      val = selected.value,
      txt = selected.textContent,
      idx = e.selectedIndex;
  return val;
}

site_select.addEventListener('change', function() {
  var v = getSelectedValue(site_select);
  if (v !== '') {
    window.location.href = v;
  }
});


})(window, document);