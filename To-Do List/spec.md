# Spécification fonctionnelle et technique --- Application Web de lecteur de musique

**Nom du projet :** MusicFlow\
**Version :** 1.0\
**Date :** 15 novembre 2026\
**Type :** Application web responsive --- HTML, CSS et JavaScript
vanilla

------------------------------------------------------------------------

## 1. Présentation du projet

MusicFlow est un lecteur de musique web permettant à un utilisateur
d'écouter des fichiers audio présents sur son appareil et de découvrir
des extraits musicaux à partir d'un catalogue externe.

L'application doit proposer une interface simple, moderne et adaptée aux
écrans mobiles, tablettes et ordinateurs. Elle ne nécessite aucun
framework JavaScript.

### 1.1 Objectifs

-   Lire, mettre en pause et contrôler des fichiers audio.
-   Importer des fichiers audio depuis l'appareil de l'utilisateur.
-   Créer et gérer une liste de lecture.
-   Rechercher des titres, artistes et albums dans un catalogue externe.
-   Afficher les informations et pochettes des morceaux.
-   Mémoriser les préférences et la liste de lecture dans le navigateur.
-   Fournir une expérience accessible et responsive.

### 1.2 Périmètre et limites

La lecture des fichiers importés localement est la fonctionnalité
principale. L'intégration du catalogue Apple iTunes permet de rechercher
des morceaux et, lorsque l'API fournit une URL d'extrait, d'écouter cet
extrait (généralement limité à environ 30 secondes).

Cette application ne fournit pas un accès illimité au catalogue complet
d'Apple Music et ne doit pas contourner les restrictions de lecture, de
licence ou de disponibilité géographique. Les morceaux locaux ne sont
pas téléversés vers un serveur.

------------------------------------------------------------------------

## 2. Fonctionnalités

### 2.1 Fonctionnalités essentielles (MVP)

  -----------------------------------------------------------------------
  ID                Fonctionnalité    Description       Priorité
  ----------------- ----------------- ----------------- -----------------
  F01               Importer des      Sélectionner un   Haute
                    fichiers          ou plusieurs      
                                      fichiers audio    
                                      depuis            
                                      l'appareil.       

  F02               Lire / mettre en  Démarrer ou       Haute
                    pause             suspendre la      
                                      lecture du        
                                      morceau courant.  

  F03               Morceau précédent Naviguer dans la  Haute
                    / suivant         liste de lecture. 

  F04               Barre de          Afficher et       Haute
                    progression       modifier la       
                                      position de       
                                      lecture.          

  F05               Réglage du volume Modifier le       Haute
                                      volume et         
                                      couper/rétablir   
                                      le son.           

  F06               Liste de lecture  Afficher les      Haute
                                      morceaux ajoutés  
                                      et sélectionner   
                                      un titre.         

  F07               Supprimer un      Retirer un titre  Haute
                    morceau           de la liste de    
                                      lecture.          

  F08               Recherche externe Rechercher un     Moyenne
                                      titre, un artiste 
                                      ou un album via   
                                      iTunes Search     
                                      API.              

  F09               Afficher les      Afficher titre,   Moyenne
                    métadonnées       artiste, album et 
                                      pochette si       
                                      disponibles.      

  F10               Favoris           Ajouter ou        Moyenne
                                      retirer un        
                                      morceau des       
                                      favoris.          

  F11               Lecture aléatoire Lire les titres   Moyenne
                                      dans un ordre     
                                      aléatoire.        

  F12               Répétition        Répéter le        Moyenne
                                      morceau courant   
                                      ou toute la       
                                      liste.            

  F13               Persistance       Conserver les     Haute
                    locale            préférences et    
                                      les métadonnées   
                                      de la liste entre 
                                      les visites.      

  F14               Thème clair /     Permettre de      Basse
                    sombre            changer           
                                      l'apparence de    
                                      l'interface.      
  -----------------------------------------------------------------------

### 2.2 Fonctionnalités complémentaires

-   Afficher un état vide lorsque la liste de lecture ne contient aucun
    morceau.
-   Afficher un message d'erreur si un fichier n'est pas pris en charge.
-   Afficher un indicateur de chargement pendant une recherche.
-   Gérer les résultats de recherche indisponibles ou incomplets.
-   Permettre le glisser-déposer de fichiers audio dans la zone
    d'importation (optionnel).
-   Ajouter des raccourcis clavier : espace pour lecture/pause, flèches
    pour naviguer (optionnel).

------------------------------------------------------------------------

## 3. Parcours utilisateur principal

1.  L'utilisateur ouvre MusicFlow.
2.  L'application affiche le lecteur, la liste de lecture et la zone de
    recherche.
3.  L'utilisateur importe des fichiers audio ou recherche un morceau
    dans le catalogue.
4.  Il ajoute un titre à la liste de lecture.
5.  Il sélectionne un morceau et appuie sur Lecture.
6.  Le lecteur met à jour le titre, l'artiste, la pochette et la
    progression.
7.  L'utilisateur peut modifier le volume, passer au morceau suivant,
    activer la répétition ou la lecture aléatoire.
8.  La liste et les préférences sont sauvegardées localement lorsque
    cela est possible.

------------------------------------------------------------------------

## 4. Composants de l'interface utilisateur

### 4.1 Structure générale

L'interface se compose de cinq zones principales :

1.  **En-tête** : logo MusicFlow, navigation et bouton de thème.
2.  **Recherche** : champ de recherche, bouton de validation et
    résultats.
3.  **Contenu principal** : liste de lecture et bibliothèque.
4.  **Lecteur audio** : pochette, informations du morceau et commandes.
5.  **Pied de page** : informations de version et mentions relatives aux
    sources musicales.

### 4.2 Inventaire des composants

  -----------------------------------------------------------------------
  Composant               Éléments                Comportement
  ----------------------- ----------------------- -----------------------
  `AppHeader`             Logo, navigation,       Reste visible en haut
                          bouton thème            de l'application.

  `SearchBar`             Champ texte, bouton     Lance une recherche
                          rechercher              après validation.

  `SearchResults`         Liste de résultats      Affiche les morceaux
                                                  trouvés et une action
                                                  Ajouter.

  `PlaylistPanel`         Liste des titres,       Permet de sélectionner
                          compteur                ou supprimer un
                                                  morceau.

  `TrackItem`             Pochette miniature,     Devient le morceau
                          titre, artiste, durée   courant au clic.

  `NowPlaying`            Grande pochette, titre, Affiche les
                          artiste, album          informations du morceau
                                                  courant.

  `PlaybackControls`      Précédent,              Contrôle la lecture
                          lecture/pause, suivant  audio.

  `ProgressBar`           Temps écoulé, curseur,  Permet de consulter et
                          durée                   modifier la position.

  `VolumeControl`         Icône son, curseur      Modifie ou coupe le
                                                  volume.

  `LibraryImport`         Bouton de sélection de  Importe les fichiers
                          fichiers, zone de dépôt audio locaux.

  `ToastMessage`          Message temporaire      Informe l'utilisateur
                                                  d'une action ou d'une
                                                  erreur.
  -----------------------------------------------------------------------

### 4.3 Disposition responsive

-   **Ordinateur (≥ 1024 px)** : recherche et bibliothèque dans la zone
    principale, liste de lecture sur le côté, lecteur fixé en bas.
-   **Tablette (768 à 1023 px)** : panneaux empilés ou affichés en deux
    colonnes selon la largeur.
-   **Mobile (\< 768 px)** : interface en une colonne, commandes du
    lecteur accessibles en bas, boutons suffisamment grands pour le
    tactile.

### 4.4 États d'interface à prévoir

-   Chargement des résultats.
-   Aucun résultat trouvé.
-   Liste de lecture vide.
-   Aucun morceau sélectionné.
-   Lecture en cours.
-   Lecture en pause.
-   Fichier audio non pris en charge.
-   Erreur réseau ou API indisponible.
-   Extrait externe indisponible ou arrivé à sa fin.

------------------------------------------------------------------------

## 5. API externes et interfaces navigateur

### 5.1 Apple iTunes Search API

**Documentation :** https://performance-partners.apple.com/search-api\
**Endpoint de recherche :** `https://itunes.apple.com/search`

Cette API publique permet de rechercher des morceaux et de récupérer des
métadonnées telles que le titre, l'artiste, l'album, la pochette et,
selon le résultat, une URL d'extrait audio.

**Exemple de requête :**

``` text
https://itunes.apple.com/search?term=daft+punk&entity=song&limit=10
```

**Paramètres utilisés :**

  -----------------------------------------------------------------------
  Paramètre                           Rôle
  ----------------------------------- -----------------------------------
  `term`                              Texte recherché (titre, artiste ou
                                      album).

  `entity=song`                       Limite les résultats aux morceaux.

  `limit=10`                          Nombre maximal de résultats
                                      souhaité.

  `country=FR`                        Pays du catalogue à interroger (à
                                      adapter si nécessaire).
  -----------------------------------------------------------------------

**Champs utiles de la réponse :**

-   `trackId` : identifiant du morceau.
-   `trackName` : titre.
-   `artistName` : artiste.
-   `collectionName` : album.
-   `artworkUrl100` : pochette.
-   `previewUrl` : URL de l'extrait audio, si disponible.
-   `trackTimeMillis` : durée annoncée.
-   `trackViewUrl` : page du morceau dans l'écosystème Apple.

**Exemple d'utilisation JavaScript :**

``` js
async function searchTracks(query) {
  const params = new URLSearchParams({
    term: query,
    entity: "song",
    limit: "10"
  });

  const response = await fetch(
    `https://itunes.apple.com/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("La recherche musicale a échoué.");
  }

  const data = await response.json();
  return data.results.map(track => ({
    id: String(track.trackId),
    title: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    artwork: track.artworkUrl100,
    previewUrl: track.previewUrl ?? null,
    duration: track.trackTimeMillis ?? null,
    source: "itunes"
  }));
}
```

**Contraintes :** - L'API fournit des métadonnées et des extraits
lorsqu'ils sont disponibles, pas nécessairement les morceaux complets. -
La disponibilité des extraits peut varier selon le titre et le
territoire. - Vérifier les conditions d'utilisation et les règles
d'attribution d'Apple avant une mise en production. - Prévoir une
gestion des erreurs réseau et une limitation des requêtes côté
interface.

### 5.2 API natives du navigateur

Ces interfaces ne sont pas des services externes, mais elles sont
essentielles au fonctionnement de l'application.

  -----------------------------------------------------------------------
  API / technologie                   Utilisation
  ----------------------------------- -----------------------------------
  HTML `<audio>`                      Lecture des fichiers locaux et des
                                      extraits distants.

  `File` et `FileList`                Accès aux fichiers sélectionnés par
                                      l'utilisateur.

  `URL.createObjectURL()`             Création d'une URL temporaire pour
                                      lire un fichier local.

  `localStorage`                      Sauvegarde des préférences et des
                                      métadonnées de la liste.

  `fetch()`                           Appels à l'API iTunes.

  `URLSearchParams`                   Construction sûre des paramètres de
                                      recherche.

  `Drag and Drop API`                 Importation de fichiers par
                                      glisser-déposer (optionnel).
  -----------------------------------------------------------------------

**Important :** les URL créées avec `URL.createObjectURL()` sont
temporaires et ne doivent pas être sauvegardées dans `localStorage`.
Après rechargement de la page, l'utilisateur devra sélectionner à
nouveau les fichiers locaux. Pour conserver réellement des fichiers
audio entre les sessions, une évolution utilisant IndexedDB et une
stratégie de stockage adaptée sera nécessaire.

------------------------------------------------------------------------

## 6. Décomposition des fonctions clés JavaScript

Le code doit être organisé en fonctions réutilisables. Il peut être
réparti dans plusieurs fichiers JavaScript ou conservé dans un seul
fichier pour un premier prototype.

### 6.1 État global de l'application

``` js
const state = {
  playlist: [],
  currentIndex: -1,
  isPlaying: false,
  isShuffle: false,
  repeatMode: "off", // "off", "one", "all"
  volume: 0.8,
  favorites: [],
  theme: "light"
};
```

Chaque morceau doit suivre un format homogène :

``` js
{
  id: "identifiant-unique",
  title: "Titre du morceau",
  artist: "Nom de l'artiste",
  album: "Nom de l'album",
  artwork: "https://exemple.com/pochette.jpg",
  audioUrl: "URL temporaire ou previewUrl",
  source: "local" // ou "itunes"
}
```

### 6.2 Fonctions de gestion de la bibliothèque

  -----------------------------------------------------------------------
  Fonction                            Rôle
  ----------------------------------- -----------------------------------
  `handleFileImport(event)`           Récupère les fichiers sélectionnés
                                      et filtre les formats audio
                                      acceptés.

  `createTrackFromFile(file)`         Transforme un fichier local en
                                      objet morceau et crée son URL
                                      temporaire.

  `addTrack(track)`                   Ajoute un morceau à la liste de
                                      lecture.

  `removeTrack(trackId)`              Supprime un morceau et corrige
                                      l'index courant si nécessaire.

  `renderPlaylist()`                  Met à jour visuellement la liste de
                                      lecture.

  `clearPlaylist()`                   Vide la liste après confirmation de
                                      l'utilisateur (optionnel).
  -----------------------------------------------------------------------

Formats à accepter en priorité : MP3, WAV, OGG, M4A et AAC, selon la
prise en charge du navigateur.

### 6.3 Fonctions de lecture audio

  -----------------------------------------------------------------------
  Fonction                            Rôle
  ----------------------------------- -----------------------------------
  `playTrack(index)`                  Charge et lance le morceau
                                      correspondant à l'index.

  `togglePlay()`                      Alterne entre lecture et pause.

  `pauseTrack()`                      Met le morceau courant en pause.

  `playNext()`                        Passe au morceau suivant en
                                      respectant le mode de répétition et
                                      le mode aléatoire.

  `playPrevious()`                    Revient au morceau précédent.

  `setVolume(value)`                  Modifie le volume de l'élément
                                      audio.

  `seekTo(value)`                     Déplace la tête de lecture à une
                                      position donnée.

  `updateProgress()`                  Actualise la barre de progression
                                      et le temps affiché.

  `handleTrackEnded()`                Détermine l'action à effectuer à la
                                      fin d'un morceau.
  -----------------------------------------------------------------------

**Élément audio partagé :**

``` js
const audio = new Audio();

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", handleTrackEnded);
audio.addEventListener("play", () => {
  state.isPlaying = true;
  updatePlayerControls();
});
audio.addEventListener("pause", () => {
  state.isPlaying = false;
  updatePlayerControls();
});
```

### 6.4 Fonctions de recherche externe

  ------------------------------------------------------------------------
  Fonction                             Rôle
  ------------------------------------ -----------------------------------
  `searchTracks(query)`                Interroge l'API iTunes et renvoie
                                       les résultats normalisés.

  `renderSearchResults(tracks)`        Affiche les résultats de recherche.

  `addSearchResultToPlaylist(track)`   Ajoute un résultat à la liste de
                                       lecture.

  `handleSearchSubmit(event)`          Valide la saisie et lance la
                                       recherche.
  ------------------------------------------------------------------------

Prévoir un délai anti-rebond (debounce) si la recherche est déclenchée
automatiquement pendant la saisie, afin d'éviter les appels réseau
excessifs.

### 6.5 Fonctions de persistance et de préférences

  -----------------------------------------------------------------------
  Fonction                            Rôle
  ----------------------------------- -----------------------------------
  `saveAppState()`                    Enregistre les données persistantes
                                      dans `localStorage`.

  `loadAppState()`                    Récupère les préférences et
                                      métadonnées sauvegardées.

  `toggleFavorite(trackId)`           Ajoute ou retire un morceau des
                                      favoris.

  `toggleShuffle()`                   Active ou désactive la lecture
                                      aléatoire.

  `setRepeatMode(mode)`               Définit le mode de répétition.

  `setTheme(theme)`                   Change le thème et sauvegarde le
                                      choix.
  -----------------------------------------------------------------------

Ne sauvegarder que les données sérialisables : identifiants, titres,
artistes, pochettes, favoris et préférences. Les fichiers `File`, les
éléments audio et les URL `blob:` ne doivent pas être stockés comme
s'ils étaient permanents.

### 6.6 Fonctions d'interface et utilitaires

  -----------------------------------------------------------------------
  Fonction                            Rôle
  ----------------------------------- -----------------------------------
  `renderNowPlaying(track)`           Met à jour le titre, l'artiste et
                                      la pochette du lecteur.

  `formatTime(seconds)`               Convertit une durée en format
                                      `mm:ss`.

  `showToast(message, type)`          Affiche une notification
                                      temporaire.

  `updatePlayerControls()`            Met à jour les états des boutons du
                                      lecteur.

  `escapeHTML(value)`                 Évite l'injection de HTML lorsque
                                      du texte externe est affiché.

  `cleanupObjectURLs()`               Libère les URL temporaires avec
                                      `URL.revokeObjectURL()`.
  -----------------------------------------------------------------------

### 6.7 Exemple de logique de lecture

``` js
async function playTrack(index) {
  const track = state.playlist[index];

  if (!track) return;

  state.currentIndex = index;
  audio.src = track.audioUrl;

  try {
    await audio.play();
    state.isPlaying = true;
    renderNowPlaying(track);
    renderPlaylist();
    saveAppState();
  } catch (error) {
    state.isPlaying = false;
    showToast("Impossible de lire ce morceau.", "error");
  }

  updatePlayerControls();
}

function togglePlay() {
  if (!audio.src) {
    if (state.playlist.length > 0) playTrack(0);
    return;
  }

  if (audio.paused) {
    audio.play().catch(() => {
      showToast("La lecture n'a pas pu démarrer.", "error");
    });
  } else {
    audio.pause();
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}
```

------------------------------------------------------------------------

## 7. Architecture et organisation des fichiers

Pour une réalisation sans framework, l'organisation suivante est
recommandée :

``` text
musicflow/
│
├── index.html
├── README.md
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── css/
│   ├── style.css
│   └── responsive.css
│
└── js/
    ├── app.js
    ├── state.js
    ├── player.js
    ├── playlist.js
    ├── search.js
    ├── storage.js
    └── ui.js
```

**Responsabilités :** - `app.js` : initialisation de l'application et
écouteurs d'événements. - `state.js` : état partagé de l'application. -
`player.js` : commandes et événements audio. - `playlist.js` : import,
ajout, suppression et affichage des morceaux. - `search.js` :
communication avec iTunes Search API. - `storage.js` : sauvegarde et
chargement des préférences. - `ui.js` : rendu des composants et
notifications.

------------------------------------------------------------------------

## 8. Exigences non fonctionnelles

### 8.1 Compatibilité

-   Versions récentes de Chrome, Firefox, Edge et Safari.
-   Interface adaptée aux mobiles, tablettes et ordinateurs.
-   Fonctionnement sans framework ni outil de compilation obligatoire.

### 8.2 Accessibilité

-   Utiliser des éléments HTML sémantiques.
-   Ajouter des libellés accessibles aux boutons iconographiques.
-   Assurer une navigation au clavier.
-   Maintenir un contraste suffisant entre le texte et l'arrière-plan.
-   Ne pas communiquer un état uniquement par la couleur.
-   Prévoir des textes alternatifs pour les pochettes informatives.

### 8.3 Performance

-   Charger les résultats de recherche à la demande.
-   Limiter le nombre de résultats affichés.
-   Éviter de reconstruire toute l'interface à chaque mise à jour de
    progression.
-   Utiliser des images de taille adaptée.
-   Révoquer les URL temporaires lorsqu'elles ne sont plus utilisées.

### 8.4 Sécurité et confidentialité

-   Ne pas injecter directement du contenu de l'API dans `innerHTML`.
-   Traiter les données externes comme non fiables.
-   Ne pas demander de compte utilisateur pour la version MVP.
-   Ne pas téléverser les fichiers audio locaux.
-   Ne pas stocker d'informations personnelles inutiles.
-   Vérifier les règles d'utilisation et les droits associés aux
    contenus musicaux.

------------------------------------------------------------------------

## 9. Critères d'acceptation

Le MVP est considéré comme fonctionnel lorsque :

1.  L'utilisateur peut importer un fichier audio pris en charge.
2.  Le fichier importé apparaît dans la liste de lecture.
3.  L'utilisateur peut lancer, suspendre et reprendre la lecture.
4.  Les boutons précédent et suivant fonctionnent.
5.  La progression et la durée sont affichées correctement.
6.  Le volume peut être modifié.
7.  Un morceau peut être supprimé de la liste.
8.  Une recherche iTunes affiche des résultats ou un message explicite
    en cas d'échec.
9.  Un extrait externe peut être lu lorsqu'une URL est disponible.
10. Les préférences et favoris sont conservés après rechargement.
11. L'interface reste utilisable sur mobile et ordinateur.
12. Les erreurs de lecture et de réseau sont signalées clairement.

------------------------------------------------------------------------

## 10. Plan de développement recommandé

  -----------------------------------------------------------------------
  Étape                   Travail                 Résultat attendu
  ----------------------- ----------------------- -----------------------
  1                       Créer la structure HTML Toutes les zones de
                                                  l'interface sont
                                                  présentes.

  2                       Développer le style CSS Interface responsive
                                                  avec thèmes clair et
                                                  sombre.

  3                       Créer l'état et la      Ajout, sélection et
                          liste de lecture        suppression des
                                                  morceaux.

  4                       Intégrer l'élément      Lecture, pause,
                          audio                   navigation, progression
                                                  et volume.

  5                       Ajouter l'import local  Lecture des fichiers de
                                                  l'utilisateur.

  6                       Connecter iTunes Search Recherche et affichage
                          API                     des résultats externes.

  7                       Ajouter favoris et      Préférences
                          persistance             sauvegardées
                                                  localement.

  8                       Tester et corriger      Vérification des
                                                  critères d'acceptation
                                                  et de la compatibilité.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 11. Évolutions possibles après le MVP

-   Utiliser IndexedDB pour conserver les fichiers audio importés entre
    les sessions.
-   Créer des playlists multiples.
-   Ajouter une visualisation audio.
-   Ajouter des raccourcis clavier configurables.
-   Ajouter une fonctionnalité d'installation PWA.
-   Ajouter une synchronisation multi-appareils via un backend, avec
    authentification et stockage adaptés.

------------------------------------------------------------------------

## 12. Résumé des choix techniques

  Élément                       Choix
  ----------------------------- ----------------------------
  Structure                     HTML5
  Design                        CSS3
  Logique                       JavaScript vanilla (ES6+)
  Lecture audio                 HTMLAudioElement
  Recherche musicale            Apple iTunes Search API
  Requêtes HTTP                 Fetch API
  Stockage MVP                  localStorage
  Stockage futur des fichiers   IndexedDB
  Déploiement                   Hébergement statique HTTPS
  Framework                     Aucun

**Principe directeur :** privilégier une application légère,
compréhensible et maintenable, dont la lecture des fichiers locaux reste
opérationnelle même si l'API externe est temporairement indisponible.
