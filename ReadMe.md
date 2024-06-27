kod zawarty w projekcie jest uproszczoną symulacją układu słonecznego oraz asteroid
użytkownik może kontrolować rakiete znajdującą się w układzie.

oprócz tego zostało zaimplementowane orbit controls.

aby otworzyć projekt z załadowanymi treksturami należy otworzyć folder "projekt pierwotny" na serwerze lokalnym.

przykład stworzenia serwera z urzyciem pythona.
wymagany zainstalowany python.

w wierszu poleceń przejść do folderu "projekt pierwotny".
wpisać polecenie zależne opd wersji pythona.
python -m SimpleHTTPServer (Python 2.x)
python -m http.server (Python 3.x)

więcej sposobów instalacji three.js oraz hostowania:
https://threejs.org/docs/index.html#manual/en/introduction/Installation

//sterowanie

w - zwiększenie mocy przepustnicy
s - zmniejszenie mocy przepustnicy
a - obrót w lewo
d - obrót w prawo
spacja - odpalenie silnika z mocą ustawioną na przepustnicy
x - zatrzymanie rakiety
c - wycentrowanie kamery na słońcu
1 - przełączanie swiatła
2 - wycentrowanie kamery na statku
3 - widok całego układu