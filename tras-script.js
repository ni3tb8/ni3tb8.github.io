// Funkcja do inicjalizacji
 function initializePage() {
  const loadingScreen = document.getElementById('loadingScreen');
  const content = document.getElementById('content');
  const input = document.getElementById('kierunek');

  // Opóźnienie ładowania, aby dodać efekt ładowania
  setTimeout(function () {
      // Ukrywanie ekranu ładowania i pokazanie zawartości
      loadingScreen.classList.add('hidden');
      content.classList.add('visible');

      // Dodanie tekstu do inputa po załadowaniu strony
      input.value = "Dzień dobry!";
      input.disabled = true; // Wyłączenie inputa
      setTimeout(() => {
          input.value = ''; // Przywrócenie pustego pola
          input.disabled = false; // Włączenie inputa
          document.getElementById('capitalizeToggle').checked = true;
          toggleCapitalization();
      }, 1500); // 1.5 sekundy
  }, 500); // Opóźnienie 0.5s dla ekranu ładowania
}

// Dodanie zdarzenia 'load'
window.addEventListener('load', function () {
  initializePage();
  checkIfDataIsUnchanged();
});

function updateTime() {
            // Ustawienie strefy czasowej Warszawa
            const optionsTime = { timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit' };

            // Aktualna data i czas
            const now = new Date();

            // Ręczne formatowanie daty
            const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
            const dayName = days[now.getDay()];
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();

            const date = `${dayName}, ${day}.${month}.${year},`;
            const time = now.toLocaleTimeString('pl-PL', optionsTime);

            // Wyświetlanie w HTML
            document.getElementById('time').textContent = time;
            document.getElementById('date').textContent = date;
        }

        // Obsługa checkboxa
        document.getElementById('toggleVisibility').addEventListener('change', function () {
            const timeDiv = document.getElementById('time');
            const dateDiv = document.getElementById('date');
            if (this.checked) {
                timeDiv.style.display = 'block'; // Włącz widoczność godziny
                dateDiv.style.display = 'block'; // Włącz widoczność daty
            } else {
                timeDiv.style.display = 'none'; // Wyłącz widoczność godziny
                dateDiv.style.display = 'none'; // Wyłącz widoczność daty
            }
        });

        // Aktualizacja co minutę
        setInterval(updateTime, 30000);

        // Pierwsze wywołanie funkcji
        setTimeout(() => {
          updateTime();
        }, "2000");

const capitalizeToggle = document.getElementById('capitalizeToggle');

// Funkcja do kapitalizacji tekstu
function capitalizeText(text) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Funkcja do synchronizacji stanu kapitalizacji z checkboxem
function toggleCapitalization() {
  const shouldCapitalize = capitalizeToggle.checked;

  // Klasy elementów, które mają być aktualizowane
  const classesToToggle = [
    '.rotated-marqueeOst',
    '.rotated-marquee',
    'input.stopOst',
    '.stop input',
    '.top-section input'
  ];

  classesToToggle.forEach(className => {
    document.querySelectorAll(className).forEach(element => {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (shouldCapitalize) {
          // Zastosowanie kapitalizacji w polach input
          element.value = capitalizeText(element.value);
          element.style.textTransform = 'capitalize'; // Ustawiamy kapitalizację
        } else {
          // Usuwamy kapitalizację przy wyłączeniu
          element.style.textTransform = 'none'; // Usuwamy 'capitalize'
        }
      } else {
        if (shouldCapitalize) {
          // Kapitalizacja dla elementów tekstowych
          element.textContent = capitalizeText(element.textContent);
        } else {
          // Usuwamy kapitalizację dla tekstu w innych elementach
          element.style.textTransform = 'none';
        }
      }
    });
  });
}

// Domyślne zastosowanie kapitalizacji na początku
toggleCapitalization();

// Nasłuchiwanie zmiany stanu checkboxa
capitalizeToggle.addEventListener('change', toggleCapitalization);

// Mapa zamian tekstów
const replacements = {
      " nz": " NŻ",
      "\\[": "(", // Zamiana "[" na "("
      "\\]": ")", // Zamiana "]" na ")"
      " pp": " P+R",
      " PP": " P+R",
      "skm": "SKM",
      "pkm": "PKM",
      " ska": " SKA",
      "pl ": "Plac ",
      "awf": "AWF",
      "zoo": "ZOO",
      "cm ": "Cmentarz ",
      "pkp": "PKP",
      "pks": "PKS",
      "mpk": "MPK"
    };

    // Funkcja do automatycznej zamiany tekstu
    function replaceText(inputElement) {
      let value = inputElement.value;

      // Iteruj po zamianach i zastąp tekst
      for (const [pattern, replacement] of Object.entries(replacements)) {
        const regex = new RegExp(pattern, "g");
        value = value.replace(regex, replacement);
      }

      // Ustawienie zmienionego tekstu
      inputElement.value = value;
    }

    // Nasłuchiwanie zdarzeń na polach tekstowych
    document.addEventListener('input', function (event) {
      if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
        replaceText(event.target);
      }
    });

//  const mainColorSelector = document.getElementById('color-selector');
    const secondaryColorSelector = document.getElementById('secondary-color-selector');
//  const syncCheckbox = document.getElementById('sync-colors');

    // Funkcja zmieniająca kolor w stylach CSS
    //function changeColorInCSS(newColor, oldColor) {
    //  const styleElement = document.getElementById('dynamic-style');
    //  const currentStyles = styleElement.innerHTML;
    //  const newStyles = currentStyles.replace(new RegExp(oldColor, 'g'), newColor);
    //  styleElement.innerHTML = newStyles;
    //}

    // Funkcja do zmiany tła dla klas .top-section i .line-number
    function changeSecondaryColor(color) {
      document.querySelectorAll('.top-section, .line-number, .bottom-section').forEach(element => {
        element.style.backgroundColor = color;
      });
    }

    // Zmienna przechowująca bieżący kolor dla głównego wybieraka
    //let currentColor = "#303030";

    // Obsługa głównego wybieraka koloru
    //mainColorSelector.addEventListener('change', function () {
    //  const selectedColor = this.value;
    //  changeColorInCSS(selectedColor, currentColor);
    //  currentColor = selectedColor;
    //
      // Jeśli synchronizacja jest włączona, zmień też drugi wybierak i odpowiednie elementy
    //  if (syncCheckbox.checked) {
    //    secondaryColorSelector.value = selectedColor;
    //    changeSecondaryColor(selectedColor);
    //  }
    //});

    // Obsługa drugiego wybieraka koloru
    secondaryColorSelector.addEventListener('change', function () {
      const selectedColor = this.value;
      changeSecondaryColor(selectedColor);
    });

    // Obsługa synchronizacji z tickboxem
    //syncCheckbox.addEventListener('change', function () {
    //  if (this.checked) {
    //    // Jeśli checkbox jest zaznaczony, ustaw drugi wybierak na wartość pierwszego i zmień kolory
    //    secondaryColorSelector.value = mainColorSelector.value;
    //    changeSecondaryColor(mainColorSelector.value);
    //    secondaryColorSelector.disabled = true; // Wyszarzenie drugiego wybieraka
    //  } else {
    //    secondaryColorSelector.disabled = false; // Odblokowanie drugiego wybieraka
    //  }
    //});

    // Ustawienie stanu początkowego dla drugiego wybieraka
    //if (syncCheckbox.checked) {
    //  secondaryColorSelector.disabled = true;
    //}

// Synchronizacja kierunku z ostatnim przystankiem
document.getElementById('kierunek').addEventListener('input', function() {
      const ostatniPrzystanekInput = document.getElementById('ostatniprzystanek');
      // Aktualizuj wartość tylko, jeśli pole jest zablokowane
      if (ostatniPrzystanekInput.disabled) {
        ostatniPrzystanekInput.value = this.value;
      }
    });

    // Przełączanie atrybutu 'disabled' w polu ostatniego przystanku
    document.getElementById('toggle-ostatniprzystanek').addEventListener('change', function() {
      const ostatniPrzystanekInput = document.getElementById('ostatniprzystanek');
      if (this.checked) {
        // Jeśli tickbox zaznaczony, odblokuj pole
        ostatniPrzystanekInput.disabled = false;
        ostatniPrzystanekInput.placeholder = "Przystanek końcowy";
      } else {
        // Jeśli tickbox odznaczony, zablokuj pole i zsynchronizuj z kierunkiem
        ostatniPrzystanekInput.disabled = true;
        ostatniPrzystanekInput.value = document.getElementById('kierunek').value;
        ostatniPrzystanekInput.placeholder = "Kierunek";
      }
    });

    const checkbox = document.getElementById('toggleCheckbox');
        const liniaKomentarz = document.getElementById('liniaKomentarz');
        const optionSelect = document.getElementById('optionSelect');
        const lineNumberElement = document.querySelector('.line-number');
        const lineNumberComment = document.querySelector('.bottom-section');

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                liniaKomentarz.style.display = 'block';
                optionSelect.disabled = false;
                if (lineNumberElement) {
                    lineNumberElement.style.height = '225px';
                    lineNumberElement.style.marginTop = '-25px';
                    lineNumberComment.style.height = '65px';
                }
            } else {
              setTimeout(() => {
                liniaKomentarz.style.display = 'none';
                optionSelect.disabled = true;
              }, "300");
                if (lineNumberElement) {
                    lineNumberElement.style.height = '250px';
                    lineNumberElement.style.marginTop = '0px';
                    lineNumberComment.style.height = '65px';
                }
            }
        });

        optionSelect.addEventListener('change', () => {
            const selectedValue = optionSelect.value;
            liniaKomentarz.textContent = selectedValue;
        });

    const line = document.getElementById('line');
const maxStops = 26;

function updateStops() {
  const stops = Array.from(line.querySelectorAll('.stop, .stopOst'));
  const totalStops = stops.length;

  // Usunięcie strzałki i przestrzeni po niej, gdy liczba przystanków spadnie poniżej limitu
  const arrowStop = line.querySelector('.stop.arrow');
  if (totalStops <= maxStops && arrowStop) {
    arrowStop.remove();
    updateStops(); // Natychmiastowa aktualizacja pozycji
    return; // Uniknięcie dalszego przetwarzania w tej iteracji
  }

  // Aktualizowanie pozycji przystanków
  stops.forEach((stop, index) => {
    const position = (index / (totalStops - 1)) * 96;
    stop.style.left = `${position}%`;

    const input = stop.querySelector('input');
    const circle = stop.querySelector('.circle');

    if (input && input.value.includes('NŻ')) {
      stop.classList.add('night-stop');
    } else {
      stop.classList.remove('night-stop');
    }
  });
}

function addStop(target) {
  const stops = Array.from(line.querySelectorAll('.stop, .stopOst'));
  const lastStop = stops[stops.length - 1]; // Ostatni przystanek, który nie powinien być ruszany

  // Sprawdzenie limitu i dodanie strzałki, jeśli limit został przekroczony
  if (stops.length >= maxStops) {
    if (!line.querySelector('.stop.arrow')) {
      const arrowStop = document.createElement('div');
      arrowStop.className = 'stop arrow';
      arrowStop.innerHTML = `
        <div class="top-section-list"> >> </div>  <!-- Tylko strzałka -->
      `;
      line.insertBefore(arrowStop, lastStop); // Dodaj strzałkę przed ostatnim przystankiem
      updateStops();
    }
    return; // Blokowanie dodawania nowych przystanków
  }

  // Tworzenie nowego przystanku
  const newStop = document.createElement('div');
  newStop.className = 'stop';
  newStop.innerHTML = `  
    <input class="skrol" type="text" placeholder="Przystanek">
    <div class="circle"></div>
  `;

  // Znajdź indeks elementu docelowego
  const targetIndex = stops.indexOf(target);

  // Wstaw nowy przystanek za elementem docelowym
  if (targetIndex >= 0) {
    line.insertBefore(newStop, stops[targetIndex + 1]);
  } else {
    line.appendChild(newStop); // Jeśli brak targetu, dodaj na końcu
  }

  // Obsługa zdarzeń dla nowego przystanku
  const input = newStop.querySelector('input');
  input.addEventListener('input', () => updateStops());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addStop(newStop);
    }
    if (e.key === 'Enter' && e.shiftKey) {
      const caretPosition = input.selectionStart;
      input.value =
        input.value.substring(0, caretPosition) +
        '\n' +
        input.value.substring(caretPosition);
    }
  });

  input.addEventListener('blur', () => {
    const isFirstStop = input === line.querySelector('.stop input');
    const isLastStop = input === line.querySelector('#ostatni input');

    if (!input.value.trim() && !isFirstStop && !isLastStop) {
      const parentStop = input.parentElement;
      parentStop.remove();
      updateStops();
    }
  });

  updateStops();
  input.focus();
}


    document.querySelectorAll('.stop input').forEach((input) => {
      input.addEventListener('input', () => updateStops());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          addStop(input.parentElement);
        }
        if (e.key === 'Enter' && e.shiftKey) {
          const caretPosition = input.selectionStart;
          input.value =
            input.value.substring(0, caretPosition) +
            '\n' +
            input.value.substring(caretPosition);
        }
      });

      input.addEventListener('blur', () => {
  const isFirstStop = input === line.querySelector('.stop input');
  const isLastStop = input === line.querySelector('#ostatni input'); // Check if this is the last stop with id 'ostatni'

  if (!input.value.trim() && !isFirstStop && !isLastStop) {
    const parentStop = input.parentElement;
    parentStop.remove();
    updateStops();
  } else if (isLastStop && !input.value.trim()) {
    input.placeholder = 'Przystanek końcowy'; // Keep the placeholder or default value for the last stop
  }
});
    });

    updateStops();

    let areMarqueesEnabled = true; // Global state to track marquee toggle

        // Function to toggle marquee for a specific input
        function toggleMarquee(element) {
            const isMarqueeAdded = element.dataset.marqueeAdded === "true";
            let marqueeTag;

            // Check the class of the element (skrol or skrolOst)
            const isSkrol = element.classList.contains("skrol");
            const isSkrolOst = element.classList.contains("skrolOst");

            // Decide the class for marquee
            const marqueeClass = isSkrolOst ? "rotated-marqueeOst" : "rotated-marquee";

            if (!isMarqueeAdded) {
                marqueeTag = document.createElement("marquee");
                marqueeTag.textContent = element.value;
                marqueeTag.className = marqueeClass;

                // Append marquee and hide input
                element.parentNode.insertBefore(marqueeTag, element);
                element.style.display = "none";
                element.dataset.marqueeAdded = "true";
                element.dataset.marqueeRef = marqueeTag;
            } else {
                // Remove marquee and show input
                marqueeTag = element.previousSibling; // Find the marquee element
                if (marqueeTag && marqueeTag.tagName === "MARQUEE") {
                    marqueeTag.parentNode.removeChild(marqueeTag);
                }
                element.style.display = "block";
                element.dataset.marqueeAdded = "false";
            }
        }

        // Function to handle blur event
        function handleBlur(event) {
            const inputField = event.target;
            const isSkrol = inputField.classList.contains("skrol");
            const isSkrolOst = inputField.classList.contains("skrolOst");

            // Trigger marquee based on the class and length of the value
            if ((isSkrol && inputField.value.length > 25 || isSkrolOst && inputField.value.length > 20) && areMarqueesEnabled) {
                toggleMarquee(inputField);
            }
        }

        // Function to handle focus event
        function handleFocus(event) {
            const inputField = event.target;
            if (inputField.dataset.marqueeAdded === "true") {
                toggleMarquee(inputField);
            }
        }

        // Attach events to an input
        function attachEventsToInput(inputField) {
            inputField.dataset.marqueeAdded = "false"; // capitalizeize marquee state
        //    inputField.addEventListener("blur", handleBlur);
            inputField.addEventListener("focus", handleFocus);
        }

        // Toggle marquees globally
        function toggleAllMarquees() {
            const inputs = document.querySelectorAll('.skrol, .skrolOst'); // Select both skrol and skrolOst
            inputs.forEach(inputField => {
                const isMarqueeAdded = inputField.dataset.marqueeAdded === "true";
                const isSkrol = inputField.classList.contains("skrol");
                const isSkrolOst = inputField.classList.contains("skrolOst");

                // Trigger marquee based on the class and length of the value
                if (areMarqueesEnabled && 
                    ((isSkrol && inputField.value.length > 25) || (isSkrolOst && inputField.value.length > 20)) && 
                    !isMarqueeAdded) {
                    toggleMarquee(inputField);
                } else if (!areMarqueesEnabled && isMarqueeAdded) {
                    toggleMarquee(inputField);
                }
            });

            areMarqueesEnabled = !areMarqueesEnabled; // Toggle global state
        }

        // Add a new input dynamically
        function addNewInput() {
            const newInput = document.createElement("input");
            newInput.type = "text";
            newInput.className = "skrol"; // Default to skrol class
            newInput.placeholder = "Type at least 25 characters";
            document.body.insertBefore(newInput, document.getElementById("skroloff"));
            attachEventsToInput(newInput); // Attach events to new input
        }

        // Attach events to existing inputs
        document.querySelectorAll('.skrol, .skrolOst').forEach(attachEventsToInput);

        // Attach event to the 'Toggle Marquees' button
        document.getElementById('skroloff').addEventListener('click', toggleAllMarquees);

        // Attach event to the 'Add Input' button
        document.getElementById('addInput').addEventListener('click', addNewInput);
