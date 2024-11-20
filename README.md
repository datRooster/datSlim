<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
</head>
<body>

<h1>datSlim</h1>
<p>Un'applicazione Laravel con autenticazione API e gestione avanzata dei permessi</p>

<h2>Descrizione</h2>
<p><strong>datSlim</strong> è un'applicazione web sviluppata con Laravel che offre un sistema di autenticazione API robusto utilizzando <strong>Laravel Passport</strong> e una gestione dei permessi avanzata grazie a <strong>Spatie Laravel Permission</strong>. Attualmente è in fase di sviluppo, ma il sistema di autenticazione è pienamente funzionante e il codice ha superato con successo l'analisi statica di <strong>PHPStan</strong>.</p>

<h2>Caratteristiche</h2>
<ul>
    <li><strong>Autenticazione API Sicura</strong>: Implementazione di Laravel Passport per una gestione sicura dei token di accesso.</li>
    <li><strong>Gestione dei Permessi</strong>: Controllo granulare degli accessi con Spatie Laravel Permission.</li>
    <li><strong>Qualità del Codice</strong>: Codice conforme alle migliori pratiche, verificato da PHPStan.</li>
</ul>

<h2>Requisiti</h2>
<ul>
    <li><strong>PHP</strong> &gt;= 8.0</li>
    <li><strong>Composer</strong> &gt;= 2.0</li>
    <li><strong>Laravel</strong> &gt;= 9.x</li>
    <li><strong>MySQL</strong> o altro database supportato da Laravel</li>
</ul>

<h2>Installazione</h2>
<ol>
    <li>
        <strong>Clonare il Repository</strong>
        <pre><code>git clone https://github.com/tuo-username/datSlim.git
cd datSlim</code></pre>
    </li>
    <li>
        <strong>Installare le Dipendenze</strong>
        <pre><code>composer install</code></pre>
    </li>
    <li>
        <strong>Configurare le Variabili d'Ambiente</strong>
        <p>Copiare il file <code>.env.example</code> e rinominarlo in <code>.env</code>. Configurare le impostazioni del database e altre variabili necessarie.</p>
        <pre><code>cp .env.example .env</code></pre>
    </li>
    <li>
        <strong>Generare la Chiave dell'Applicazione</strong>
        <pre><code>php artisan key:generate</code></pre>
    </li>
    <li>
        <strong>Eseguire le Migrazioni e i Seeder</strong>
        <pre><code>php artisan migrate --seed</code></pre>
    </li>
    <li>
        <strong>Installare Laravel Passport</strong>
        <pre><code>php artisan passport:install</code></pre>
    </li>
    <li>
        <strong>Avviare il Server di Sviluppo</strong>
        <pre><code>php artisan serve</code></pre>
    </li>
</ol>

<h2>Utilizzo</h2>
<p>L'applicazione sarà disponibile su <code>http://localhost:8000</code>. È possibile interagire con le API utilizzando strumenti come <strong>Postman</strong> o <strong>cURL</strong>.</p>

<h3>Endpoint di Autenticazione</h3>
<ul>
    <li><strong>Registrazione</strong>: <code>POST /api/auth/register</code></li>
    <li><strong>Login</strong>: <code>POST /api/auth/login</code></li>
    <li><strong>Logout</strong>: <code>POST /api/auth/logout</code> (richiede il token di accesso)</li>
</ul>

<h2>Testing e Qualità del Codice</h2>
<p>Per eseguire l'analisi statica del codice e assicurarsi che sia conforme agli standard:</p>
<pre><code>vendor/bin/phpstan analyse</code></pre>

<h2>Contribuire</h2>
<p>Contributi, issue e richieste di nuove funzionalità sono i benvenuti! Sentiti libero di aprire una issue o una pull request.</p>

<h2>Roadmap</h2>
<ul>
    <li><strong>Implementazione delle funzionalità principali</strong></li>
    <li><strong>Test unitari e di integrazione</strong></li>
    <li><strong>Documentazione delle API</strong></li>
    <li><strong>Interfaccia utente con Vue.js o React</strong></li>
</ul>

<h2>Licenza</h2>
<p>Questo progetto è sotto licenza <a href="LICENSE">MIT License</a>.</p>

<h2>Contatti</h2>
<p>Per ulteriori informazioni:</p>
<ul>
    <li><strong>Email</strong>: tuo.email@example.com</li>
    <li><strong>GitHub</strong>: <a href="https://github.com/datRooster">datRooster</a></li>
</ul>

<hr>

<p><em>Nota: Questo README sarà aggiornato man mano che lo sviluppo procede.</em></p>

</body>
</html>