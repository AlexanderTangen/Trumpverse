## Viktig merknad
Dette prosjektet ble laget som del av DS3103 Webutviklingseksamen 2024. Temaet (Donald Trump) var gitt av oppgaven, og prosjektet er utviklet kun for å løse eksamen. Det reflekterer ikke intensjon om politisk holdning.

## Om prosjektet

Prosjektet er en **fullstack-applikasjon** laget som en del av eksamen, bestående av:

- **Frontend:** React + TypeScript med Tailwind CSS og responsivt design  
- **Backend:** .NET 9 Web API (C#) med SQLite database, som håndterer CRUD-operasjoner

Applikasjonen lar React-frontenden kommunisere med Web API-et for å hente, opprette, oppdatere og slette data i databasen. Ingen innlogging er implementert, i henhold til eksamenskrav.

Prosjektet demonstrerer ferdigheter innen:  
- HTML5 og CSS3  
- CSS Grid og Tailwind, inkludert responsivt design  
- Universell utforming  
- React og TypeScript (ES6+)  
- .NET/C# Web API med SQLite  
- HTTP-forespørsler fra frontend til backend

---

## Kom i gang (lokal kjøring)

### Backend (.NET 9 Web API)
1. Åpne terminal i `TrumpVerseApi2`-mappen:

cd TrumpVerseApi2  
dotnet run  

API-et kjører nå på: http://localhost:5259

### Frontend (React)
1. Åpne terminal i `trumpverse-frontend`-mappen:

cd trumpverse-frontend  
npm install  
npm start  

Frontend kjører på: http://localhost:3000

Åpne nettleseren og naviger til http://localhost:3000 for å se applikasjonen.
