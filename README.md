# Interaktivni kalendar
_Projekat za ITEH (2024)_

Projekat _Interaktivni kalendar_ predstavlja sveobuhvatno rešenje za efikasno upravljanje vremenom i organizaciju događaja. Pruža korisnicima mogućnost preciznog planiranja i praćenja događaja tokom godine. Interaktivni Kalendar se ističe jednostavnim interfejsom i efikasnim alatima za organizaciju, čineći upravljanje vremenom inspirativnim i prilagodljivim iskustvom. 
Projekat omogućava funkcionalnosti:
1.	Kreiranje naloga user-a u sistemu
2.	Prijava user-a na sistem
3.	Promena lozinke user-a
4.	Kreiraj događaj
5.	Prikaži događaje
6.	Obriši odredjeni događaj na osnovu id-ija
7.	Izmeni odredjeni dogadjaj
8.	Prikaži sve korisnike
9.	Prikaži korisnika na osnovu id-ija
10.	Eksport fajlova u .ics formatu
11.	Slanje notifikacija na mail adresu korisnika
12. Povezivanje sa Google calendarom
13.	Odjava user-a iz sistema


## Pokretanje
> [!NOTE]
> Za sve komande koristiti Git Bash.

### Inicijalno podešavanje
```bash
cd backend
php artisan migrate:fresh --seed
```
### Pokretanje bekenda
```bash‚
cd backend; php artisan serve;
```
API server je zatim dostupan na  [http://localhost:8000](http://localhost:8000).
### Pokretanje frontenda
```bash
cd frontend; npm start
```
Aplikacija je zatim dostupna na  [http://localhost:3000](http://localhost:3000).
