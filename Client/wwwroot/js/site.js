// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$('.page-title').css('background-image', 'url(' + BASE_URL + '/dist/images/bg/02.jpg)');

if (auth.isAuthenticated()) {
    $('#user_authenticated').removeClass('d-none');
    $('#user_not_authenticated').addClass('d-none');
    $('#user_not_authenticated').removeClass('d-sm-block');
    $('#user_auth_name').html(`<i class="fa fa-user me-2 text-primary"></i> Hello ${JWTName}`)
    $('#hero_user_name').text(JWTName);
    $('#hero_user_picture').attr('src', `${BASE_URL_API}/images/${JWTPicture}`);

    if (JWTRole === 'User') {
        $('.event_organizer_menu').addClass('d-none');
        $('.user_menu').removeClass('d-none');
    } else if (JWTRole === 'Event Organizer') {
        $('.event_organizer_menu').removeClass('d-none');
        $('.user_menu').addClass('d-none');
    }
} else {
    $('#user_authenticated').addClass('d-none');
    $('#user_not_authenticated').removeClass('d-none');
    $('#user_not_authenticated').addClass('d-sm-block');
}
