const userProfile = async () => {
    // Get form element
    const form = document.querySelector('form');

    // Add event listener to form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const email = $('#email').val();
        const firstName = $('#first-name').val();
        const lastName = $('#last-name').val();
        const phoneNumber = $('#phone-number').val();
        const website = $('#website').val();
        const profilePicture = $('#profile-picture').val();
        const address = $('textarea').val();
        const city = $('#city').val();
        const postalCode = $('#postal-code').val();
        const country = $('#country').val();
        const state = $('#state').val();
        // Create an object with the form data
        const formData = {
            id: 2, // userID
            firstname: firstName,
            lastname: lastName,
            email: email,
            picture: profilePicture,
            phoneNumber: phoneNumber,
            website: website,
            isActive: 1,
            address: address,
            city: city,
            postalCode: postalCode,
            state: state,
            countryId: country
        };

        try {
            DataSource.updateUsers(formData)

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Organizer has been added',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/user/profile';
                }
            });
        } catch (message) {
            alert(message);
        }

        // Log the form data to the console
        console.log(formData);
    });
}

userProfile();