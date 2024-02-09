# Interaktivni kalendar
_Projekat za ITEH (2024)_

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
