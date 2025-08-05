# Cookbook API

API REST per la gestione di ricette, recensioni e autenticazione utenti. Realizzata con Node.js, Express e MongoDB.

## Funzionalità principali

- Registrazione e login utente (JWT)
- Creazione, visualizzazione e cancellazione ricette personali
- Recensioni sulle ricette
- Integrazione con MealDB per ricerca ricette
- Middleware di autenticazione per proteggere le rotte

## Struttura del progetto

- `/src/models`: Modelli Mongoose (User, Recipe, Review)
- `/src/controllers`: Logica delle rotte
- `/src/routes`: Definizione delle API REST
- `/src/middleware`: Middleware di autenticazione
- `/src/test`: Test automatici con Jest e Supertest

## Installazione

1. Clona il repository
2. Installa le dipendenze:
   ```
   npm install
   ```
3. Crea un file `.env` con le variabili necessarie (es. MONGODB_URI, JWT_SECRET)
4. Avvia il server:
   ```
   npm start
   ```

## Test

Per eseguire i test automatici:
```
npm test
```

## API principali

- `POST /auth/register` - Registrazione utente
- `POST /auth/login` - Login utente
- `PUT /auth/api/user` - Aggiorna dati utente
- `DELETE /auth/api/user` - Cancella utente
- `POST /recipe` - Crea ricetta
- `GET /recipe` - Visualizza ricette utente
- `DELETE /recipe/:id` - Cancella ricetta
- `POST /review` - Crea recensione
- `GET /review/meal/:idMeal` - Visualizza recensioni di una ricetta
- `DELETE /review/:id` - Cancella recensione


## Rotte MealDB

Queste rotte permettono di interagire con l'API pubblica di TheMealDB:

- `GET /mealdb/search-by-name`
- Ricerca ricette tramite MealDB
- `GET /mealdb/search?s=<nome>`
  Cerca pasto per nome.
- `GET /mealdb/search-by-letter?f=<lettera>`
  Cerca pasti che iniziano con una lettera specifica.
- `GET /mealdb/lookup?i=<id>`
  Ottieni dettagli di un pasto tramite ID.
- `GET /mealdb/random`
  Restituisce un pasto casuale.
- `GET /mealdb/categories`
  Elenca tutte le categorie disponibili.
- `GET /mealdb/list?type=<c|a|i>`
  Elenca categorie (`c`), aree (`a`) o ingredienti (`i`).
- `GET /mealdb/filter-by-ingredient?i=<ingrediente>`
  Filtra pasti per ingrediente.
- `GET /mealdb/filter-by-category?c=<categoria>`
  Filtra pasti per categoria.
- `GET /mealdb/filter-by-area?a=<area>`
  Filtra pasti per area geografica.

Tutti i parametri vanno passati come query string.

## Note

- Tutte le rotte protette richiedono il token JWT nell’header `Authorization`.
- Per testare le API puoi usare Postman o strumenti simili.
