## Viktig merknad
Dette prosjektet ble laget som del av Webutviklingseksamen 2024. Temaet (Donald Trump) var gitt av oppgaven, og prosjektet er utviklet kun for å løse eksamen. Det reflekterer ikke intensjon om politisk holdning.

Dette er eksamensprosjektet i **DS3103 Webutvikling**, høsten 2024. Prosjektet er laget som en **fullstack-løsning** bestående av:

- **Frontend:** React + TypeScript med Tailwind CSS og responsivt design.  
- **Backend:** .NET 9 Web API (C#) med SQLite-database, som håndterer CRUD-operasjoner.

---

## Om prosjektet

Eksamen gikk ut på å lage en fullstack-applikasjon der React-frontenden kommuniserer med Web API-et for å hente, opprette, oppdatere og slette data i databasen. Ingen innlogging er implementert, i henhold til eksamenskrav.

Prosjektet viser ferdigheter innen:
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
