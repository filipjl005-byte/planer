// Pobieramy elementy HTML na podstawie ich identyfikatorów (id).
const formularz = document.querySelector('#formularz');
const pole = document.querySelector('#nowe-zadanie');
const lista = document.querySelector('#lista-zadan');
const postep = document.querySelector('#postep');

// Liczymy wszystkie zadania oraz zaznaczone pola wyboru.
function aktualizujPostep() {
  const wszystkie = lista.querySelectorAll('li').length;
  const gotowe = lista.querySelectorAll('input:checked').length;
  postep.textContent = `Ukończone zadania: ${gotowe} z ${wszystkie}`;
}

// Funkcja tworzy pojedynczy wiersz listy: pole wyboru, tekst i przycisk.
function dodajZadanie(tekst) {
  const wiersz = document.createElement('li');
  const etykieta = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', aktualizujPostep);

  const opis = document.createElement('span');
  opis.textContent = tekst;
  etykieta.append(checkbox, opis);

  const usun = document.createElement('button');
  usun.type = 'button';
  usun.className = 'usun';
  usun.textContent = 'Usuń';
  usun.setAttribute('aria-label', `Usuń zadanie: ${tekst}`);
  usun.addEventListener('click', function () {
    wiersz.remove();
    aktualizujPostep();
    pole.focus();
  });

  wiersz.append(etykieta, usun);
  lista.append(wiersz);
  aktualizujPostep();
}

// Zatrzymujemy odświeżenie strony, sprawdzamy tekst i dodajemy zadanie.
formularz.addEventListener('submit', function (zdarzenie) {
  zdarzenie.preventDefault();
  const tekst = pole.value.trim();
  if (tekst === '') return;
  dodajZadanie(tekst);
  pole.value = '';
  pole.focus();
});

// Przykładowe zadania widoczne po otwarciu lub odświeżeniu strony.
dodajZadanie('Powtórzyć ułamki z matematyki');
dodajZadanie('Przeczytać rozdział lektury');
