window.addEventListener('load', function () {
    // Jeśli strona jest ładowana po wciśnięciu F5, zrób pełne przeładowanie strony
    if (!sessionStorage.getItem('reload')) {
        sessionStorage.setItem('reload', 'true');
        
        // Wymuszenie pełnego odświeżenia strony
        location.reload(true); // Wymusza odświeżenie, ignorując cache
    } else {
        sessionStorage.removeItem('reload');
    }
});

const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const toggleButton = document.getElementById('togglePage');
const timer = document.getElementById('timer');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const dateForm = document.getElementById('dateForm');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const setNowButton = document.getElementById('setNow');

const daysPreviewEl = document.getElementById('daysPreview');
const hoursPreviewEl = document.getElementById('hoursPreview');
const minutesPreviewEl = document.getElementById('minutesPreview');
const secondsPreviewEl = document.getElementById('secondsPreview');

dateInput.addEventListener('input', checkIfDataIsUnchanged);
timeInput.addEventListener('input', checkIfDataIsUnchanged);

// Funkcja do sprawdzania, czy dane w formularzu są różne od zapisanych w localStorage
function checkIfDataIsUnchanged() {
    const savedDate = localStorage.getItem('savedDate');
    const savedTime = localStorage.getItem('savedTime');
    const dateValue = dateInput.value;
    const timeValue = timeInput.value;

    // Porównaj zapisane dane z aktualnymi wartościami w formularzu
    const isUnchanged = savedDate === dateValue && savedTime === timeValue;

    // Wyszarez przycisk "Zapisz" jeśli dane się nie zmieniły
    const saveButton = document.getElementById('saveButton');
    if (isUnchanged) {
        saveButton.style.backgroundColor = '#718a6d';  // Szary kolor dla nieaktywnego przycisku
        saveButton.style.color = '#b0c9ab';  // Szary kolor 
        saveButton.style.pointerEvents = 'none';
    } else {
        saveButton.disabled = false; // Aktywuj przycisk, jeśli dane się różnią
        saveButton.style.backgroundColor = '';  // Przywróć oryginalny kolor
        saveButton.style.color = '';
        saveButton.style.pointerEvents = 'auto';  // Przywróć normalny kursor
    }
}

let targetDate = new Date();
let timerRunning = false;

function switchPage() {
    page1.classList.add('fade');
    page2.classList.add('fade');

    setTimeout(() => {
        page1.classList.toggle('hidden');
        page2.classList.toggle('hidden');

        page1.classList.remove('fade');
        page2.classList.remove('fade');

        page1.classList.add('fadeIn');
        page2.classList.add('fadeIn');

        setTimeout(() => {
            page1.classList.remove('fadeIn');
            page2.classList.remove('fadeIn');
        }, 500);
    }, 500);
}

toggleButton.addEventListener('click', switchPage);

setNowButton.addEventListener('click', () => {
    const now = new Date();
    const localDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const localTime = now.toTimeString().slice(0, 5);

    dateInput.value = localDate;
    timeInput.value = localTime;

    // Ponownie sprawdź, czy dane są różne po zapisaniu
    checkIfDataIsUnchanged();
});

dateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const dateValue = dateInput.value;
    const timeValue = timeInput.value;

    if (dateValue && timeValue) {
        targetDate = new Date(`${dateValue}T${timeValue}:00`);
        if (!isNaN(targetDate)) {
            localStorage.setItem('savedDate', dateValue);
            localStorage.setItem('savedTime', timeValue);

            showAlert('success', 'Data i godzina zostały zapisane.');
            // Ponownie sprawdź, czy dane są różne po zapisaniu
            checkIfDataIsUnchanged();
            switchPage();

            setTimeout(() => {
                timerRunning = true;
            }, 1500);
        } else {
            showAlert('warning', 'Wprowadzono niepoprawną datę lub godzinę.');
        }
    } else {
        showAlert('info', 'Wprowadź datę i godzinę.');
    }
});

function updateTimer() {
    if (timerRunning) {
        const now = new Date();
        const diff = now - targetDate;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = days;
            hoursEl.textContent = hours;
            minutesEl.textContent = minutes;
            secondsEl.textContent = seconds;

            daysPreviewEl.textContent = days;
            hoursPreviewEl.textContent = hours;
            minutesPreviewEl.textContent = minutes;
            secondsPreviewEl.textContent = seconds;
        } else {
            daysEl.textContent = 0;
            hoursEl.textContent = 0;
            minutesEl.textContent = 0;
            secondsEl.textContent = 0;

            daysPreviewEl.textContent = 0;
            hoursPreviewEl.textContent = 0;
            minutesPreviewEl.textContent = 0;
            secondsPreviewEl.textContent = 0;
        }
    }
}

setInterval(updateTimer, 1000);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker zarejestrowany:', registration);
    }).catch((error) => {
        console.error('Rejestracja Service Workera nie powiodła się:', error);
    });
}

// Funkcja do inicjalizacji
function initializePage() {
    const loadingScreen = document.getElementById('loadingScreen');
    const content = document.getElementById('content');
    const stopka = document.querySelector('.stopka');

    // Opóźnienie ładowania, aby dodać efekt ładowania
    setTimeout(function() {
        // Sprawdzenie zapisanych danych
        const savedDate = localStorage.getItem('savedDate');
        const savedTime = localStorage.getItem('savedTime');

        if (savedDate && savedTime) {
            const message = `Wczytano licznik od ${formatDate(savedDate)}, ${savedTime}. Czy kontynuować?`;
            showConfirmationAlert(message, () => {
                dateInput.value = savedDate;
                timeInput.value = savedTime;
                targetDate = new Date(`${savedDate}T${savedTime}:00`);
                timerRunning = true;
                updateTimerWithSavedData(targetDate);
            }, () => {
                const now = new Date();
                updateTimerWithSavedData(now);
            });
        } else {
            const now = new Date();
            updateTimerWithSavedData(now);
        }

        // Ukrywanie ekranu ładowania i pokazanie zawartości
        loadingScreen.classList.add('hidden');
        content.classList.add('visible');

        // Pokazanie stopki po załadowaniu
        if (stopka) {
            stopka.classList.remove('hidden');
        }
    }, 500); // Opóźnienie 0.5s, aby wyświetlić ekran ładowania
}

window.addEventListener('load', function () {
    initializePage(); // Zapewniamy, że ta funkcja jest uruchamiana zawsze, niezależnie od cache
    checkIfDataIsUnchanged();  // Sprawdź, czy dane się nie zmieniły
});


window.addEventListener('load', function () {
    // Kod odpowiedzialny za ładowanie tła
    const loadingScreen = document.getElementById('loadingScreen');
    const content = document.getElementById('content');
    
    // Opóźnienie 0,5s, żeby widoczny był ekran ładowania
    setTimeout(function() {
        loadingScreen.classList.add('hidden'); // Ukrywanie ekranu ładowania
        content.classList.remove('hidden'); // Pokazywanie zawartości
    }, 500); // Opóźnienie 0,5 sekundy
    
    // Zawsze inicjalizuj stronę na podstawie danych z localStorage
    const savedDate = localStorage.getItem('savedDate');
    const savedTime = localStorage.getItem('savedTime');

    if (savedDate && savedTime) {
        // Logika związaną z kontynuowaniem licznika
        const targetDate = new Date(`${savedDate}T${savedTime}:00`);
        updateTimerWithSavedData(targetDate);
    } else {
        // Logika przy wczytywaniu nowego licznika
        const now = new Date();
        updateTimerWithSavedData(now);
    }
});



function resetTimer() {
    // Funkcja do ustawienia licznika na 0
    daysEl.textContent = 0;
    hoursEl.textContent = 0;
    minutesEl.textContent = 0;
    secondsEl.textContent = 0;

    daysPreviewEl.textContent = 0;
    hoursPreviewEl.textContent = 0;
    minutesPreviewEl.textContent = 0;
    secondsPreviewEl.textContent = 0;
}

function updateTimerWithSavedData(targetDate) {
    // Funkcja do zaktualizowania licznika z podanym targetDate
    const diff = targetDate - new Date();
    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))); // Zapewniamy, że dni nie będą ujemne
    const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

    // Ustawienie wartości w odpowiednich elementach
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    // Ustawienie danych do podglądu
    daysPreviewEl.textContent = days;
    hoursPreviewEl.textContent = hours;
    minutesPreviewEl.textContent = minutes;
    secondsPreviewEl.textContent = seconds;
}



function formatDate(date) {
    // Funkcja do formatowania daty z 'yyyy-mm-dd' na 'dd.mm.yyyy'
    const dateParts = date.split('-');
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
}

function showAlert(type, message) {
    // Znajdź wszystkie aktywne alerty i ukryj je
    const activeAlerts = document.querySelectorAll('.custom-alert.show');
    activeAlerts.forEach(alert => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 300);
    });

    // Dodaj cooldown przed wyświetleniem nowego alertu
    setTimeout(() => {
        // Wyświetl nowy alert
        const alertElement = document.getElementById(`customAlert${type.charAt(0).toUpperCase() + type.slice(1)}`);
        alertElement.textContent = message;
        alertElement.classList.remove('hidden');
        alertElement.classList.add('show');
        alertElement.style.whiteSpace = 'pre-wrap';

        // Automatycznie ukryj alert po 3 sekundach
        setTimeout(() => {
            alertElement.classList.remove('show');
            setTimeout(() => {
                alertElement.classList.add('hidden');
            }, 300);
        }, 3000);
    }, 300); // Cooldown 0.5 sekundy
}


function showConfirmationAlert(message, onConfirm, onCancel) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert option'; // Klasa alertu dostosowana do stylu

    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginTop = '15px';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Tak';
    confirmButton.style.backgroundColor = '#224a1d';
    confirmButton.style.border = 'none';
    confirmButton.style.color = '#fefefe';
    confirmButton.style.padding = '10px 20px';
    confirmButton.style.borderRadius = '30px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.style.fontSize = '16px';
    confirmButton.style.transition = '0.3s ease';

    confirmButton.addEventListener('mouseover', () => {
        confirmButton.style.backgroundColor = '#218838';
    });
    confirmButton.addEventListener('mouseout', () => {
        confirmButton.style.backgroundColor = '#224a1d';
    });
    confirmButton.addEventListener('click', () => {
        alertContainer.classList.add('fadeOut'); // Dodanie klasy fadeOut
        setTimeout(() => {
            document.body.removeChild(alertContainer); // Usunięcie alertu po animacji
            onConfirm(); // Wywołanie funkcji onConfirm po kliknięciu "Tak"
            toggleButton.disabled = false; // Przywrócenie dostępności przycisku togglePage
            toggleButton.style.pointerEvents = 'auto'; // Przywrócenie możliwości klikania przycisku
            toggleButton.style.backgroundColor = ''; // Przywrócenie oryginalnego koloru
            toggleButton.style.color = '';
            document.body.style.color = '#fefefe';
        }, 500);

            // Zablokowanie przycisku "Zapisz"
            const saveButton = document.getElementById('saveButton');
            saveButton.disabled = true;
            saveButton.style.backgroundColor = '#718a6d';  // Szary kolor dla nieaktywnego przycisku
            saveButton.style.color = '#b0c9ab';
            saveButton.style.pointerEvents = 'none';

        setTimeout(() => {
            showAlert('success', 'Pomyślnie wczytano dane.');
        }, 500);
    });
    

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Nie';
    cancelButton.style.backgroundColor = '#574124';
    cancelButton.style.border = 'none';
    cancelButton.style.color = '#fefefe';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.borderRadius = '30px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.fontSize = '16px';
    cancelButton.style.transition = '0.3s ease';

    cancelButton.addEventListener('mouseover', () => {
        cancelButton.style.backgroundColor = '#a87025';
    });
    cancelButton.addEventListener('mouseout', () => {
        cancelButton.style.backgroundColor = '#574124';
    });
    cancelButton.addEventListener('click', () => {
        alertContainer.classList.add('fadeOut'); // Dodanie klasy fadeOut
        setTimeout(() => {
            // Usunięcie danych z localStorage
            localStorage.removeItem('savedDate');
            localStorage.removeItem('savedTime');

            // Ustaw puste wartości w formularzu
            dateInput.value = '';
            timeInput.value = '';

            // Ustawienie flagi, że użytkownik nie chce kontynuować licznika
            localStorage.setItem('skipTimer', 'true');

            document.body.removeChild(alertContainer); // Usunięcie alertu po animacji
            onCancel(); // Wywołanie funkcji onCancel po kliknięciu "Nie"
            toggleButton.disabled = false; // Przywrócenie dostępności przycisku togglePage
            toggleButton.style.pointerEvents = 'auto'; // Przywrócenie możliwości klikania przycisku
            toggleButton.style.backgroundColor = ''; // Przywrócenie oryginalnego koloru
            toggleButton.style.color = '';
            document.body.style.color = '#fefefe';
        }, 500); // Po 500 ms (czas trwania animacji) usuwamy alert
        setTimeout(() => {
            showAlert('info', 'Wprowadź nowe dane.');
        }, 500);
    });

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);

    alertContainer.appendChild(alertMessage);
    alertContainer.appendChild(buttonContainer);

    document.body.appendChild(alertContainer);

    // Wyłączanie przycisku togglePage
    toggleButton.disabled = true;
    toggleButton.style.pointerEvents = 'none'; // Wyłączenie kliknięcia przycisku
    toggleButton.style.backgroundColor = '#576478'; // Zmiana koloru przycisku na szary (lub inny nieaktywny)
    toggleButton.style.color = '#abb7c9';
    document.body.style.color = '#525252';

    // Ustawienie początkowej widoczności i animacji
    setTimeout(() => {
        alertContainer.classList.add('show');
    }, 100);
}

document.addEventListener('DOMContentLoaded', function () {
    const savedDate = localStorage.getItem('savedDate');
    const savedTime = localStorage.getItem('savedTime');
    const skipTimer = localStorage.getItem('skipTimer');

    console.log('Saved Date:', savedDate);
    console.log('Saved Time:', savedTime);
    console.log('Skip Timer:', skipTimer);

    const loadingScreen = document.getElementById('loadingScreen');
    const content = document.getElementById('content');

    setTimeout(function () {
        loadingScreen.classList.add('hidden');
        content.classList.add('visible');
    }, 500);
}, 100); // Ustawić niewielkie opóźnienie
