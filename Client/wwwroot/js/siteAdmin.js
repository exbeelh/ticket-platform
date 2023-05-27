if (auth.isAuthenticated()) {
    $('#user_auth_name').text(JWTName);
    $('#user_auth_email').text(JWTEmail);
    $('.user_auth_picture').attr('src', `${BASE_URL_API}/images/${JWTPicture}`);
}
