function controllaPassword() {
    const input = document.getElementById("pass-input").value;
    
    // Creiamo la password usando un array di frammenti uniti
    // Questo impedisce a un'IA o a un umano di vedere la password in un colpo solo
    const passParts = ["Vale", "_", "Andre", "_", "26", "_", "21"];
    const passwordCorretta = passParts.join(''); // Unisce i pezzi: "Vale_Andre_26_21"

    if (input === passwordCorretta) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-app").style.display = "block";
        
        caricaDati();
        generaCalendario(meseCorrente, annoCorrente);
        calcolaAllenamentiMensili();
    } else {
        setTimeout(() => alert("Password errata!"), 500);
    }
}

// Opzionale: Permette di premere "Invio" per entrare
document.getElementById("pass-input")?.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        controllaPassword();
    }
});



// 1. IL TUO BACINO DI FRASE MOTIVAZIONALI
const frasiSegrete = [
    "Sei una persona stupenda e tutto l'impegno che ci metti darà i suoi frutti! ❤️",
    "Ricordati che sei più forte di qualsiasi difficoltà. Ti amo! ❤️",
    "Oggi è un ottimo giorno per splendere come sai fare solo tu. ❤️",
    "Guarda indietro a quanta strada hai fatto, sii fiera di te stessa! ❤️",
    "Sei incredibile in tutto quello che fai, non dimenticarlo mai. ❤️",
    "Ogni passo che fai ti porta più vicina ai tuoi sogni, e io sono qui a fare il tifo per te. ❤️",
    "Sei più forte di qualsiasi sfida. ❤️",
    "Sei speciale, oggi, domani e sempre. ❤️",
    "Non smetterò mai di ammirare la persona stupenda che sei. ❤️",
    "Non smettere mai di inseguire i tuoi sogni, perché io sarò sempre il tuo primo fan. ❤️",
    "Grazie per essere semplicemente te stessa, è la cosa che preferisco al mondo. ❤️", 
    "La vita è un po' più bella da quando ci sei tu a colorarla. ❤️",
    "Respira e ricorda: sei capace di fare cose grandissime. ❤️",
    "Sei una persona stupenda, e se a volte lo dimentichi, te lo ricorderò io. ❤️"
];

const obiettiviSettimanali = [
    "Cucinare qualcosa di nuovo insieme! ❤️",
    "Passeggiata al tramonto e gelato. 🍦",
    "Serata film con popcorn, senza cellulari. 🍿",
    "Pic-nic al parco o in un posto carino. 🧺",
    "Leggere un libro o un articolo interessante insieme. 📚",
    "Fare una sessione di stretching o yoga di coppia. 🧘",
    "Visitare un posto nuovo della nostra città. 🗺️",
    "Dedicare una serata a giocare a carte o a un gioco da tavolo. 🃏",
    "Preparare una colazione speciale nel weekend. ☕",
    "Scattare una foto creativa insieme in un posto che ci piace. 📸",
    "Fare una sessione di decluttering/ordine creativo in casa. ✨",
    "Andare a vedere l'alba o il tramonto in un posto panoramico. 🌅"
];

// Funzione per mostrare una frase a caso
function mostraFraseCasuale() {
    const indice = Math.floor(Math.random() * frasiSegrete.length);
    document.getElementById('quote-text').innerText = frasiSegrete[indice];
}

// Funzione per aggiornare la foto
function aggiornaFoto() {
    const numFoto = 3; // Modifica questo numero in base a quante foto metti nella cartella "images"
    const numeroCasuale = Math.floor(Math.random() * numFoto) + 1;
    document.getElementById('daily-photo').src = `images/foto${numeroCasuale}.jpg`;
}


// 1. Navigazione principale (Home, Studio, Diario)
// Questa funzione nasconde le pagine principali e mostra quella cliccata
function cambiaTab(tabId, elementoBottone) {
    // Nascondi tutte le sezioni principali
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Mostra la sezione corretta
    const sezioneDaMostrare = document.getElementById(tabId);
    if (sezioneDaMostrare) {
        sezioneDaMostrare.classList.add('active');
    }
    
    // Gestisci lo stile dei bottoni in basso
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    if (elementoBottone) {
        elementoBottone.classList.add('active');
    }
}

// 2. Navigazione interna Diario (Musica, Calendario, Allenamenti)
// Questa funzione gestisce le tab dentro la pagina Diario
function cambiaSottoTab(idTab, bottoneCliccato) {
    // Rimuovi 'active' da tutti i bottoni delle sotto-tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Rimuovi 'active' da tutti i contenuti interni delle sotto-tab
    document.querySelectorAll('.tab-content-interno').forEach(c => c.classList.remove('active'));

    // Aggiungi 'active' al bottone che hai cliccato
    if (bottoneCliccato) {
        bottoneCliccato.classList.add('active');
    }
    
    // Mostra il contenuto corretto
    const contenutoDaMostrare = document.getElementById(idTab);
    if (contenutoDaMostrare) {
        contenutoDaMostrare.classList.add('active');
    }
}
// 3. LOGICA UNIVERSITÀ (Corona d'alloro)
// 3. LOGICA UNIVERSITÀ (Lista Esami)
let listaEsami = JSON.parse(localStorage.getItem('listaEsami')) || [];

function salvaEAggiorna() {
    localStorage.setItem('listaEsami', JSON.stringify(listaEsami));
    disegnaCorona();
    renderizzaLista();
}

function aggiungiEsame() {
    const nameInput = document.getElementById('exam-name');
    const cfuInput = document.getElementById('exam-cfu');
    const gradeInput = document.getElementById('exam-grade'); // Nuovo input

    const name = nameInput.value.trim();
    const cfu = parseInt(cfuInput.value);
    const grade = parseInt(gradeInput.value); // Legge il voto

    // Controllo di sicurezza: tutti i campi devono essere compilati
    if (!name || !cfu || !grade) {
        alert("Per favore, compila tutti i campi, incluso il voto!");
        return;
    }

    // Controllo che il voto sia valido (tra 18 e 30)
    if (grade < 18 || grade > 30) {
        alert("Inserisci un voto valido tra 18 e 30!");
        return;
    }

    // Salva l'esame includendo anche il voto
    listaEsami.push({ nome: name, cfu: cfu, voto: grade });
    
    // Svuota i tre campi di testo per il prossimo esame
    nameInput.value = '';
    cfuInput.value = '';
    gradeInput.value = '';

    // Salva nel computer e ridisegna tutto
    salvaEAggiorna();
    mostraMessaggioMotivazionale();
}

function resetEsami() {
    if (confirm("Vuoi davvero azzerare la lista esami?")) {
        listaEsami = [];
        salvaEAggiorna();
    }
}

function disegnaCorona() {
    const wreath = document.getElementById('wreath');
    wreath.innerHTML = '';
    
    // --- CONTROLLO BLOCCO LAUREA ---
    const checkbox = document.getElementById('check-tesi');
    const pallino = document.getElementById('tesi-pallino');
    
    if (listaEsami.length >= 22) {
        checkbox.disabled = false; // Sblocca la spunta
    } else {
        checkbox.disabled = true;  // Blocca la spunta
        checkbox.checked = false;  // Se togli un esame, si unchekka da sola
        if (pallino) pallino.classList.remove('laureato'); // Spegne il pallino blu
    }
    // ---------------------------------

    for (let i = 0; i < 22; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf' + (i < listaEsami.length ? ' active' : '');
        
        const angolo = (i / 22) * 2 * Math.PI; 
        const raggio = 120; 
        const x = 140 + raggio * Math.cos(angolo) - 12; 
        const y = 140 + raggio * Math.sin(angolo) - 12;
        
        leaf.style.left = `${x}px`;
        leaf.style.top = `${y}px`;
        
        wreath.appendChild(leaf);
    }
    aggiornaDashboard();
}

function renderizzaLista() {
    const ul = document.getElementById('exam-list');
    ul.innerHTML = ''; 

    for (let i = 0; i < listaEsami.length; i++) {
        const esame = listaEsami[i];
        
        const li = document.createElement('li');
        li.className = 'exam-item';
        
        // Aggiungiamo un contenitore per i CFU e la X
        li.innerHTML = `
            <span>${esame.nome} (Voto: ${esame.voto})</span>
            <div class="exam-actions">
                <span>${esame.cfu} CFU</span>
                <button class="btn-delete" onclick="rimuoviEsame(${i})">✖</button>
            </div>
        `;
        
        ul.appendChild(li);
    }
}
// 4. LOGICA TRACCIATORI QUOTIDIANI (Diario)
// Usiamo localStorage così l'app si ricorda dei giorni anche se viene chiusa!
const trackers = {
    workout: parseInt(localStorage.getItem('track_workout')) || 0,
    food: parseInt(localStorage.getItem('track_food')) || 0,
    happy: parseInt(localStorage.getItem('track_happy')) || 0
};

function aggiornaNumeriTracker() {
    document.getElementById('count-workout').innerText = trackers.workout;
    document.getElementById('count-food').innerText = trackers.food;
    document.getElementById('count-happy').innerText = trackers.happy;
}

function incrementaTracker(tipo) {
    trackers[tipo]++;
    localStorage.setItem(`track_${tipo}`, trackers[tipo]);
    aggiornaNumeriTracker();
}

// Esegui queste funzioni appena l'app viene aperta sul telefono
window.onload = function() {
    mostraFraseCasuale();
    aggiornaFoto();
    impostaObiettivoSettimanale();
    caricaStatoObiettivo();
    disegnaCorona();
    renderizzaLista(); // <--- AGGIUNTO QUESTO
    aggiornaNumeriTracker();
};

// Cambia frase E foto ogni volta che l'app torna visibile
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        mostraFraseCasuale();
        aggiornaFoto(); // Aggiunto questo
    }
});

function aggiornaFoto() {
    const numFoto = 26; // Ora il sistema sa che deve pescare tra 26 foto
    const numeroCasuale = Math.floor(Math.random() * numFoto) + 1;
    document.getElementById('daily-photo').src = `images/foto${numeroCasuale}.jpeg`;
}


function impostaObiettivoSettimanale() {
    const data = new Date();
    // Imposta la data al giovedì della settimana corrente (standard ISO)
    const giovedi = new Date(data.getFullYear(), data.getMonth(), data.getDate() + (3 - (data.getDay() + 6) % 7));
    const primoGennaio = new Date(giovedi.getFullYear(), 0, 1);
    
    // Calcola il numero della settimana ISO
    const numeroSettimana = Math.ceil((((giovedi - primoGennaio) / 86400000) + primoGennaio.getDay() + 1) / 7);

    // Selezione obiettivo
    const indice = (numeroSettimana - 1) % obiettiviSettimanali.length;
    document.getElementById('goal-text').innerText = obiettiviSettimanali[indice];
}


// Salva lo stato della checkbox
function salvaStatoObiettivo() {
    const isChecked = document.getElementById('goal-check').checked;
    // Salviamo la settimana corrente per resettare la spunta automaticamente lunedì
    const settimanaCorrente = getNumeroSettimana();
    localStorage.setItem('goal_status', isChecked);
    localStorage.setItem('goal_week', settimanaCorrente);
}

// Carica lo stato della checkbox
function caricaStatoObiettivo() {
    const isChecked = localStorage.getItem('goal_status') === 'true';
    const savedWeek = parseInt(localStorage.getItem('goal_week'));
    const currentWeek = getNumeroSettimana();

    // Se è una nuova settimana, resetta la spunta
    if (savedWeek !== currentWeek) {
        document.getElementById('goal-check').checked = false;
        localStorage.setItem('goal_status', false);
    } else {
        document.getElementById('goal-check').checked = isChecked;
    }
}

// Funzione helper per il numero settimana (da usare anche in impostaObiettivoSettimanale)
function getNumeroSettimana() {
    const data = new Date();
    const inizioAnno = new Date(data.getFullYear(), 0, 1);
    return Math.ceil((((data - inizioAnno) / 86400000) + inizioAnno.getDay() + 1) / 7);
}

function segnaLaurea() {
    const pallino = document.getElementById('tesi-pallino');
    const checkbox = document.getElementById('check-tesi');
    
    if (checkbox.checked) {
        pallino.classList.add('laureato');
    } else {
        pallino.classList.remove('laureato');
    }
}

function aggiornaDashboard() {
    // 1. Aggiorna il contatore degli esami
    const esamiSuperati = listaEsami.length;
    document.getElementById('stats-esami').innerText = `${esamiSuperati} / 22`;

    // 2. Calcolo dei CFU totali e della sommatoria per la media ponderata
    let cfuTotali = 0;
    let sommatoriaProdotti = 0; // Questo conterrà la somma di (Voto * CFU)

    for (let i = 0; i < listaEsami.length; i++) {
        const cfuEsame = parseInt(listaEsami[i].cfu) || 0;
        const votoEsame = parseInt(listaEsami[i].voto) || 0;

        cfuTotali += cfuEsame;
        sommatoriaProdotti += (votoEsame * cfuEsame);
    }

    // Aggiorna la casella dei CFU a schermo
    document.getElementById('stats-cfu').innerText = `${cfuTotali} / 180`;

    // 3. Calcolo finale della media ponderata
    let mediaPonderata = 0;
    
    // Il controllo serve a evitare la divisione per zero se la lista è vuota
    if (cfuTotali > 0) {
        mediaPonderata = sommatoriaProdotti / cfuTotali;
    }

    // Aggiorna la casella della media, arrotondando a due cifre decimali (es: 27.45)
    document.getElementById('stats-media').innerText = mediaPonderata.toFixed(2);
}

function rimuoviEsame(indice) {
    // Rimuove 1 solo elemento dalla lista partendo da quell'indice
    listaEsami.splice(indice, 1);
    
    // Salva i nuovi dati, aggiorna la lista, i pallini e la dashboard
    salvaEAggiorna();
}

const messaggiMotivazionali = [
    "Bravissima! Un altro passo verso la corona! 🎓",
    "Grande! Continua così, stai andando alla grande! 💪",
    "Un esame in meno, un brindisi in più! 🥂",
    "Sei una macchina da guerra! Avanti tutta! 🔥",
    "Fatto! Ora un po' di meritato riposo! 😴",
    "Che soddisfazione! Segna quel pallino verde! ✨"
];

function mostraMessaggioMotivazionale() {
    const testoEl = document.getElementById("toast-text");
    const toast = document.getElementById("toast-messaggio");
    const numeroEsami = listaEsami.length;
    
    // I NOSTRI TRAGUARDI SPECIALI
    if (numeroEsami === 3) {
        testoEl.innerText = "Tre esami superati! Sai bene che il 3 è un numero speciale... che ti porti sempre questa fortuna e questi sorrisi! ✨";
        lanciaFuochi();
    } 
    else if (numeroEsami === 11) {
        testoEl.innerText = "Sei esattamente a metà percorso! Forza, non mollare adesso che stai andando alla grande! 💪🎓";
        lanciaFuochi();
    } 
    else if (numeroEsami === 22) {
        testoEl.innerText = "Incredibile! Hai completato TUTTI gli esami! Sei fantastica! Ora manca solo la tesi! 🎉🚀";
        lanciaFuochi();
    } 
    else {
        // Se non è un traguardo speciale, pesca una frase a caso e NO fuochi
        const indiceCasuale = Math.floor(Math.random() * messaggiMotivazionali.length);
        testoEl.innerText = messaggiMotivazionali[indiceCasuale];
    }
    
    toast.classList.add("mostra");
}
// Nuova funzione per chiudere il popup
function chiudiToast() {
    const toast = document.getElementById("toast-messaggio");
    toast.classList.remove("mostra");
}

function lanciaFuochi() {
    var duration = 3000; // L'animazione dura 3 secondi
    var end = Date.now() + duration;

    (function frame() {
        // Fuochi da sinistra
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#2a9d8f', '#007EA7', '#e76f51'] // Ottanio, Ceruleo, Corallo
        });
        // Fuochi da destra
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#2a9d8f', '#007EA7', '#e76f51']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function celebraLaurea(checkbox) {
    if (checkbox.checked) {
        const testoEl = document.getElementById("toast-text");
        const toast = document.getElementById("toast-messaggio");
        
        testoEl.innerText = "CONGRATULAZIONI DOTTORESSA! 🎓👩‍🎓 Traguardo epico raggiunto, sono incredibilmente fiero di te! ❤️";
        toast.classList.add("mostra");
        
        // Lanciamo i fuochi d'artificio!
        lanciaFuochi();
    }
}

function cambiaTab(idTab) {
    // 1. Rimuove 'active' da tutti i bottoni e contenuti
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // 2. Aggiunge 'active' solo al bottone cliccato e alla scheda corrispondente
    event.currentTarget.classList.add('active');
    document.getElementById(idTab).classList.add('active');
}




//JUKEBOX
const canzoni = [
    { titolo: "Jovanotti - Ragazza Magica", file: "music/Jovanotti - Ragazza Magica.mp3", img: "" },
    { titolo: "Il bello dell'amore", file: "music/Il bello dellamore.mp3", img: "" },
    { titolo: "Zero Assoluto - Per Dimenticare", file: "music/Zero Assoluto - Per Dimenticare (Official Video).mp3", img: "" },
    { titolo: "Modà - Quel sorriso in volto", file: "music/Quel sorriso in volto - Modà.mp3", img: "" },
    { titolo: "Enrico Nigiotti - Tu sei per me", file: "music/Enrico Nigiotti - Tu sei per me (Visual Video).mp3", img: "" },
    { titolo: "Fasma, GG - Per sentirmi vivo", file: "music/Fasma, GG - Per sentirmi vivo (Official Video - Sanremo 2020).mp3", img: "" },
    { titolo: "Gio Montana - BACIAMI", file: "music/Gio Montana - BACIAMI.mp3", img: "" },
    { titolo: "Quella foto di noi due", file: "music/Quella foto di noi due.mp3", img: "" },
    { titolo: "Fuoco e benzina", file: "music/Fuoco e benzina.mp3", img: "" },
    { titolo: "New West - Those Eyes", file: "music/New West - Those Eyes (Home Session).mp3", img: "" },
    { titolo: "Soli assieme", file: "music/Soli assieme.mp3", img: "" },
    { titolo: "Random - Chiasso", file: "music/Random - Chiasso (Prod. Zenit) [Official Video].mp3", img: "" },
    { titolo: "Lowlow & Mostro - Supereroi Falliti", file: "music/LOWLOW & MOSTRO - 07 - SUPEREROI FALLITI (LYRIC VIDEO).mp3", img: "" },
    { titolo: "Scudo", file: "music/Scudo.mp3", img: "" },
    { titolo: "Cali", file: "music/Cali.mp3", img: "" },
    { titolo: "Piccola Stella", file: "music/Piccola Stella.mp3", img: "" },
    { titolo: "Bresh, SHUNE - Guasto D'Amore", file: "music/Bresh, SHUNE - Guasto D'Amore.mp3", img: "" },
    { titolo: "Coez - Faccio un casino", file: "music/Coez - Faccio un casino.mp3", img: "" },
    { titolo: "Ultimo - ROMANTICA", file: "music/Ultimo - ROMANTICA.mp3", img: "" }
];

const audioPlayer = document.getElementById('audio-player');

// Carica la playlist
const playlistEl = document.getElementById('playlist');
canzoni.forEach((canzone, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<button onclick="caricaCanzone(${index})">${canzone.titolo}</button>`;
    playlistEl.appendChild(li);
});

function caricaCanzone(index) {
    const c = canzoni[index];
    audioPlayer.src = c.file;
    
    const albumArt = document.getElementById('album-art');
    if (c.img && c.img !== "") {
        albumArt.src = c.img;
    } else {
        albumArt.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/%3E%3C/svg%3E";
    }
    
    document.getElementById('song-title').innerText = c.titolo;
    
    // CORREZIONE: Usa classList per attivare il player
    const playerContainer = document.getElementById('player-container');
    playerContainer.classList.remove('player-hidden');
    playerContainer.classList.add('player-visible');
    
    audioPlayer.play();
    document.getElementById('play-pause-btn').innerHTML = '<i class="fas fa-pause"></i>';
}

function togglePlay() {
    const btn = document.getElementById('play-pause-btn');
    if (audioPlayer.paused) {
        audioPlayer.play();
        btn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        btn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function stopSong() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    document.getElementById('play-pause-btn').innerHTML = '<i class="fas fa-play"></i>';
}

function skip(sec) {
    audioPlayer.currentTime += sec;
}

// Aggiorna barra progresso
audioPlayer.addEventListener('timeupdate', () => {
    const bar = document.getElementById('progress-bar');
    bar.max = audioPlayer.duration;
    bar.value = audioPlayer.currentTime;
});

let listaTask = []; // Questa variabile "ricorda" i task

// --- TO-DO LIST LOGIC ---
function aggiungiTask() {
    const input = document.getElementById('nuovo-task');
    const testo = input.value.trim();

    if (testo !== "") {
        // Aggiungiamo alla nostra memoria
        listaTask.push({ testo: testo, completato: false });
        input.value = "";
        
        renderizzaLista(); // Disegniamo la lista
        salvaDati();       // Salviamo su disco
    }
}

function renderizzaLista() {
    const lista = document.getElementById('lista-task');
    lista.innerHTML = ""; // Pulisce la lista visiva

    listaTask.forEach((item, index) => {
        const li = document.createElement('li');
        if(item.completato) li.classList.add('completato');
        
        const spanTesto = document.createElement('span');
        spanTesto.innerText = item.testo;
        spanTesto.onclick = () => {
            listaTask[index].completato = !listaTask[index].completato;
            renderizzaLista();
            salvaDati();
        };

        const btnElimina = document.createElement('button');
        btnElimina.innerHTML = '<i class="fas fa-trash"></i>';
        btnElimina.onclick = () => {
            listaTask.splice(index, 1);
            renderizzaLista();
            salvaDati();
        };

        li.appendChild(spanTesto);
        li.appendChild(btnElimina);
        lista.appendChild(li);
    });
}

// Permette di aggiungere il task anche premendo il tasto "Invio" sulla tastiera
document.getElementById('nuovo-task')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        aggiungiTask();
    }
});


// --- LOGICA CALENDARIO E NOTE CON COLORI ---
let dataAttuale = new Date();
let meseCorrente = dataAttuale.getMonth();
let annoCorrente = dataAttuale.getFullYear();

const nomiMesi = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

// Il database ora salverà oggetti: { testo: "Appunti...", colore: "#HEX" }
let noteCalendario = {};
let dataSelezionataAttuale = "";

function generaCalendario(mese, anno) {
    const contenitoreGiorni = document.getElementById("calendar-days");
    const testataMese = document.getElementById("month-year");
    
    contenitoreGiorni.innerHTML = "";
    testataMese.innerText = `${nomiMesi[mese]} ${anno}`;
    
    let primoGiorno = new Date(anno, mese, 1).getDay();
    primoGiorno = primoGiorno === 0 ? 6 : primoGiorno - 1;
    
    const giorniNelMese = new Date(anno, mese + 1, 0).getDate();
    const oggi = new Date();
    
    for (let i = 0; i < primoGiorno; i++) {
        const cellaVuota = document.createElement("div");
        cellaVuota.classList.add("empty");
        contenitoreGiorni.appendChild(cellaVuota);
    }
    
    for (let i = 1; i <= giorniNelMese; i++) {
        const cellaGiorno = document.createElement("div");
        cellaGiorno.innerText = i;
        
        const chiaveData = `${anno}-${mese}-${i}`;
        
        // Se ci sono note per questo giorno, creiamo i pallini
        if (noteCalendario[chiaveData] && noteCalendario[chiaveData].length > 0) {
            // Estrae tutti i colori usati in questo giorno e usa Set per togliere i doppioni
            const coloriUsati = [...new Set(noteCalendario[chiaveData].map(nota => nota.colore))];
            
            // Crea il contenitore dei pallini
            const contenitorePallini = document.createElement("div");
            contenitorePallini.className = "dots-container";
            
            // Crea un pallino per ogni colore unico trovato
            coloriUsati.forEach(colore => {
                const pallino = document.createElement("span");
                pallino.className = "calendar-dot";
                pallino.style.backgroundColor = colore;
                contenitorePallini.appendChild(pallino);
            });
            
            cellaGiorno.appendChild(contenitorePallini);
        }
        
        if (i === oggi.getDate() && mese === oggi.getMonth() && anno === oggi.getFullYear()) {
            cellaGiorno.classList.add("oggi");
        }
        
        cellaGiorno.onclick = () => apriNota(anno, mese, i, chiaveData);
        
        contenitoreGiorni.appendChild(cellaGiorno);
    }
}

function cambiaMese(direzione) {
    meseCorrente += direzione;
    
    if (meseCorrente < 0) {
        meseCorrente = 11;
        annoCorrente--;
    } else if (meseCorrente > 11) {
        meseCorrente = 0;
        annoCorrente++;
    }
    
    generaCalendario(meseCorrente, annoCorrente);
    document.getElementById("sezione-note").classList.remove("visibile");
}

function apriNota(anno, mese, giorno, chiaveData) {
    dataSelezionataAttuale = chiaveData;
    const sezioneNote = document.getElementById("sezione-note");
    sezioneNote.classList.add("visibile");
    document.getElementById("data-selezionata-nota").innerText = `Note per il ${giorno} ${nomiMesi[mese]} ${anno}`;
    document.getElementById("testo-nota").value = "";
    aggiornaListaNote();
}

function salvaNota() {
    if (dataSelezionataAttuale === "") return;
    
    const textarea = document.getElementById("testo-nota");
    const testo = textarea.value.trim();
    
    // Trova quale colore ha scelto l'utente
    const coloreSelezionato = document.querySelector('input[name="colore-nota"]:checked').value;
    
    if (testo !== "") {
        if (!noteCalendario[dataSelezionataAttuale]) {
            noteCalendario[dataSelezionataAttuale] = [];
        }
        
        // Salva sia il testo che il colore
        noteCalendario[dataSelezionataAttuale].push({
            testo: testo,
            colore: coloreSelezionato
        });
        
        textarea.value = ""; 
        aggiornaListaNote(); 
        generaCalendario(meseCorrente, annoCorrente); 
        salvaDati();
        
        const btn = document.querySelector(".btn-salva-nota");
        const testoOriginale = btn.innerText;
        btn.innerText = "Aggiunta! ✔️";
        setTimeout(() => btn.innerText = testoOriginale, 1500);
    }
}

function aggiornaListaNote() {
    const contenitoreLista = document.getElementById("lista-note-giorno");
    contenitoreLista.innerHTML = ""; 
    
    const noteDelGiorno = noteCalendario[dataSelezionataAttuale];
    
    if (noteDelGiorno && noteDelGiorno.length > 0) {
        noteDelGiorno.forEach((nota, index) => {
            const divNota = document.createElement("div");
            divNota.className = "nota-item";
            
            // Applica il colore scelto al bordo sinistro della nota
            divNota.style.borderLeftColor = nota.colore;
            
            const spanTesto = document.createElement("span");
            spanTesto.innerText = nota.testo;
            
            const btnElimina = document.createElement("button");
            btnElimina.className = "elimina-nota-btn";
            btnElimina.innerHTML = '<i class="fas fa-trash"></i>';
            btnElimina.onclick = () => eliminaNota(index);
            
            divNota.appendChild(spanTesto);
            divNota.appendChild(btnElimina);
            contenitoreLista.appendChild(divNota);
        });
    }
}

function eliminaNota(indice) {
    noteCalendario[dataSelezionataAttuale].splice(indice, 1);
    
    if (noteCalendario[dataSelezionataAttuale].length === 0) {
        delete noteCalendario[dataSelezionataAttuale];
    }
    
    aggiornaListaNote();
    generaCalendario(meseCorrente, annoCorrente);
    salvaDati();
}

document.addEventListener("DOMContentLoaded", () => {
    generaCalendario(meseCorrente, annoCorrente);
});



// --- LOGICA ALLENAMENTI ---
function toggleAllenamento(bottone) {
    // 1. Accende o spegne il colore del cerchietto
    bottone.classList.toggle('completato');
    const isCompletato = bottone.classList.contains('completato');
    
    // 2. Capisce quale bottone hai cliccato (0 = Lunedì, 1 = Martedì, ..., 6 = Domenica)
    const giorniContainer = bottone.parentNode;
    const indexGiornoCliccato = Array.from(giorniContainer.children).indexOf(bottone);
    
    // 3. Calcola la data esatta di quel giorno nella settimana in corso
    const oggi = new Date();
    // Trasforma la data di oggi per far partire la settimana di Lunedì (0=Lun, 6=Dom)
    const giornoOggi = oggi.getDay() === 0 ? 6 : oggi.getDay() - 1; 
    
    // Quanti giorni di differenza ci sono tra oggi e il bottone cliccato?
    const differenzaGiorni = indexGiornoCliccato - giornoOggi;
    
    const dataTarget = new Date(oggi);
    dataTarget.setDate(oggi.getDate() + differenzaGiorni);
    
    // Crea la "chiave" che il calendario usa per riconoscere i giorni (es. "2026-5-28")
    const chiaveData = `${dataTarget.getFullYear()}-${dataTarget.getMonth()}-${dataTarget.getDate()}`;
    
    // 4. Aggiunge o rimuove la nota nel Calendario
    if (isCompletato) {
        // Se il cerchio si accende, crea la nota
        if (!noteCalendario[chiaveData]) {
            noteCalendario[chiaveData] = [];
        }
        // Usa il rosa pastello e aggiunge il testo
        noteCalendario[chiaveData].push({
            testo: "Allenamento completato! 💪",
            colore: "#ffb3c6"
        });
    } else {
        // Se il cerchio si spegne (l'utente ci clicca di nuovo), cancella solo questa nota
        if (noteCalendario[chiaveData]) {
            noteCalendario[chiaveData] = noteCalendario[chiaveData].filter(nota => nota.testo !== "Allenamento completato! 💪");
            
            // Se non ci sono altre note in quel giorno, pulisce la memoria
            if (noteCalendario[chiaveData].length === 0) {
                delete noteCalendario[chiaveData];
            }
        }
    }
    
    // 5. Aggiorna immediatamente il calendario visivo per far apparire/sparire il pallino
    generaCalendario(meseCorrente, annoCorrente);
    
    // Se, per caso, il cassetto delle note di quel giorno è aperto, lo aggiorna in diretta
    if (dataSelezionataAttuale === chiaveData) {
        aggiornaListaNote();
    }
    calcolaAllenamentiMensili();
    salvaDati();
}


// --- LOGICA ACQUA E CONTATORE ALLENAMENTI ---
let bicchieriAcqua = 0;

function cambiaAcqua(variazione) {
    bicchieriAcqua += variazione;
    
    // Evita che i bicchieri scendano sotto lo zero
    if (bicchieriAcqua < 0) {
        bicchieriAcqua = 0;
    }
    
    // Aggiorna l'HTML
    document.getElementById("contatore-acqua").innerText = bicchieriAcqua;
    document.getElementById("totale-ml").innerText = (bicchieriAcqua * 150) + " ml totali";
salvaDati();
}

function calcolaAllenamentiMensili() {
    let conteggio = 0;
    
    // Cerca in tutte le note del calendario per trovare quelle di questo mese
    for (const [chiave, note] of Object.entries(noteCalendario)) {
        const partiData = chiave.split('-');
        const annoNota = parseInt(partiData[0]);
        const meseNota = parseInt(partiData[1]);
        
        // Se la nota è di questo mese e questo anno
        if (annoNota === annoCorrente && meseNota === meseCorrente) {
            // Controlla se dentro la nota c'è il testo dell'allenamento
            const haAllenamento = note.some(nota => nota.testo === "Allenamento completato! 💪");
            if (haAllenamento) {
                conteggio++;
            }
        }
    }
    
    document.getElementById("contatore-mensile").innerText = conteggio;
}

// Aggiorna il contatore mensile all'avvio della pagina
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(calcolaAllenamentiMensili, 500); // Leggero ritardo per assicurarsi che i dati siano caricati
});

// Aggiungiamo il ricalcolo del mese dentro la funzione che avevamo fatto prima
// NOTA: Devi aggiungere "calcolaAllenamentiMensili();" alla fine della funzione toggleAllenamento(bottone)




// --- LOGICA DI SALVATAGGIO ---
function salvaDati() {
    localStorage.setItem("noteMieiDati", JSON.stringify(noteCalendario));
    localStorage.setItem("acquaMieiDati", bicchieriAcqua);
    
    // Salvataggio della To-Do List
    localStorage.setItem("todoListDati", JSON.stringify(listaTask)); 
    
    // Salvataggio stato allenamenti
    const statiAllenamento = Array.from(document.querySelectorAll('.day-circle'))
                                  .map(btn => btn.classList.contains('completato'));
    localStorage.setItem("allenamentiSettimana", JSON.stringify(statiAllenamento));
}

// --- LOGICA DI CARICAMENTO ---
function caricaDati() {
    // 1. Caricamento Note Calendario
    const noteSalvate = localStorage.getItem("noteMieiDati");
    if (noteSalvate) {
        noteCalendario = JSON.parse(noteSalvate);
    }

    // 2. Caricamento Acqua
    const acquaSalvata = localStorage.getItem("acquaMieiDati");
    if (acquaSalvata) {
        bicchieriAcqua = parseInt(acquaSalvata);
        // Aggiorna interfaccia acqua
        const contatore = document.getElementById("contatore-acqua");
        const totale = document.getElementById("totale-ml");
        if (contatore) contatore.innerText = bicchieriAcqua;
        if (totale) totale.innerText = (bicchieriAcqua * 150) + " ml totali";
    }

    // 3. Caricamento Allenamenti Settimanali
    const allenamentiSalvati = localStorage.getItem("allenamentiSettimana");
    if (allenamentiSalvati) {
        const stati = JSON.parse(allenamentiSalvati);
        const bottoni = document.querySelectorAll('.day-circle');
        stati.forEach((stato, index) => {
            if (bottoni[index] && stato) {
                bottoni[index].classList.add('completato');
            }
        });
    }

    // 4. Caricamento To-Do List
    const todoSalvato = localStorage.getItem("todoListDati");
    if (todoSalvato) {
        listaTask = JSON.parse(todoSalvato); // Aggiorna la variabile globale
        renderizzaLista(); // Disegna i task nell'HTML
    }
}