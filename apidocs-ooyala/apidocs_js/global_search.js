$(function () {
    console.log('ok');
    var $searchForm = $('.l-header .google-cse');
    var $searchInput = $('#edit-search-block-form--2', $searchForm);
    var $searchSubmit = $('input[type="submit"]', $searchForm);

    $searchSubmit.on('click', function (e) {
        if ($searchInput.val() === '') {
            e.preventDefault();
            $searchForm.toggleClass('active');
            $searchInput.focus();
        }
    });
});
