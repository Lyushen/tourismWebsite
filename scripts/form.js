    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('#myForm');
        const nameInput = document.querySelector('#fullName');
        const emailInput = document.querySelector('#emailAddress');
        const successMessage = document.querySelector('#formSuccessMessage');
    
        // Using querySelector within the parent .form-control div
        const nameError = document.querySelector('.form-control:nth-child(1) .field-error');
        const emailError = document.querySelector('.form-control:nth-child(2) .field-error');
    
        if (!nameError)
        console.log("Name Error. The element is ", nameError);
        if (!emailError)
        console.log("Email Error. The element is ", emailError);
    
        if (!form || !nameInput || !emailInput || !nameError || !emailError) {
            console.error("Some form elements or error display elements are not found! JS Validation could not be proceed.");
            return;
        }
    

        function validateName() {
            const nameParts = nameInput.value.trim().split(/\s+/); // Split by spaces
            const isNameValid = nameParts.length >= 2 && nameInput.validity.valid;
        
            if (isNameValid) {
                nameError.textContent = '';
                nameError.style.display = 'none';
            } else {
                nameError.textContent = 'Please enter your Full Name (at least two words)';
                nameError.style.display = 'block';
            }
        }

    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailPattern.test(emailInput.value);

        if (isValidEmail) {
            emailError.textContent = '';
            emailError.style.display = 'none';
        } else {
            if (emailInput.validity.valueMissing) {
                emailError.textContent = 'Please enter your email address';
            } else {
                emailError.textContent = 'Please enter a valid email address';
            }
            emailError.style.display = 'block';
        }
    }

    function isFormValid() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isEmailValid = emailPattern.test(emailInput.value) && emailInput.validity.valid;
        const isNameValid = nameInput.validity.valid;

        return isEmailValid && isNameValid;
    }

    function validateForm(event) {
        validateName();
        validateEmail();

        if (!isFormValid()) {
            console.log("Form validation failed");
            event.preventDefault();
            if (successMessage) {
                successMessage.style.display = 'none'; // Hide success message if visible    
            }
        } else {
            console.log("Form validation passed");
            // Display success message
            if (successMessage) {
                successMessage.style.display = 'block';
            
            //do our job
            const formData = {
                name: nameInput.value,
                email: emailInput.value
                // Add other form fields here
            };
    
            fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., show a success message)
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
        
        }}}
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    form.addEventListener('submit', validateForm);
});
