document.addEventListener('DOMContentLoaded', function() {
    const setPasswordInput = document.getElementById('setPassword');
    const setPasswordButton = document.getElementById('setPasswordButton');
    const practiceArea = document.querySelector('.practice-area');
    const practicePasswordInput = document.getElementById('practicePassword');
    const feedbackElement = document.getElementById('feedback');
    const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
    const maskedPasswordElement = document.getElementById('maskedPassword');
    const successCountElement = document.getElementById('successCount');
    const timerDisplayElement = document.getElementById('timerDisplay');
    const showTypingCheckbox = document.getElementById('showTypingCheckbox');

    let targetPassword = '';
    let typedPassword = '';
    let successCount = 0;
    let timerInterval;
    let startTime;
    let isShowingPassword = false;

    function generateMaskedPassword(password) {
        return '*'.repeat(password.length);
    }

    function updateMaskedDisplay() {
        maskedPasswordElement.textContent = isShowingPassword ? targetPassword : generateMaskedPassword(targetPassword);
    }

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 10);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateTimer() {
        if (startTime) {
            const currentTime = new Date();
            const elapsedSeconds = (currentTime - startTime) / 1000;
            timerDisplayElement.textContent = elapsedSeconds.toFixed(2);
        }
    }

    function resetPracticeArea() {
        practicePasswordInput.value = '';
        typedPassword = '';
        feedbackElement.textContent = '';
        practicePasswordInput.classList.remove('error');
        stopTimer();
        timerDisplayElement.textContent = '0.00';
        startTimer(); // Restart timer for next attempt
        practicePasswordInput.focus(); // Focus for immediate next attempt
    }

    setPasswordButton.addEventListener('click', function() {
        targetPassword = setPasswordInput.value;
        if (targetPassword) {
            practiceArea.style.display = 'block';
            updateMaskedDisplay(); // Initial masked display
            setPasswordInput.value = '';
            feedbackElement.textContent = '';
            resetPracticeArea(); // Resets input, timer etc. for a fresh start
        } else {
            alert('Please enter a password to practice.');
        }
    });

    practicePasswordInput.addEventListener('input', function() {
        typedPassword = practicePasswordInput.value;
        practicePasswordInput.classList.remove('error'); // Clear error style on new input

        if (!targetPassword.startsWith(typedPassword)) {
            practicePasswordInput.classList.add('error'); // Add error class for red style
            feedbackElement.textContent = 'Incorrect character.'; // Just indicate error
        } else {
            feedbackElement.textContent = ''; // Clear error message if correcting
        }
    });

    practicePasswordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (typedPassword === targetPassword) {
                feedbackElement.textContent = 'Success! Password typed correctly.';
                stopTimer();
                successCount++;
                successCountElement.textContent = successCount;
                resetPracticeArea(); // Reset for next practice of same password
            } else {
                feedbackElement.textContent = 'Incorrect password. Please try again.'; // In case they hit enter prematurely after error
                practicePasswordInput.classList.add('error'); // Ensure error style if not already there
            }
            event.preventDefault(); // Prevent form submission or default action
        }
    });

    showPasswordCheckbox.addEventListener('change', function() {
        isShowingPassword = showPasswordCheckbox.checked;
        updateMaskedDisplay();
    });

    showTypingCheckbox.addEventListener('change', function() {
        practicePasswordInput.type = showTypingCheckbox.checked ? 'text' : 'password';
    });
});