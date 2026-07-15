/* SOS Correspondance — « PAO » simulé : registre des dossiers voyage (DV) connus.
   Étape 1 des workflows (diapos 28/29) : Vérification DV + Nom auprès de PAO.
   Un couple (référence, nom) absent de ce registre => Rejetée, IHM 3.

   Chaque enregistrement porte aussi ce que PAO sait du client :
     nom    : nom de famille attendu (comparaison sans casse ni accents)
     mail   : false = pas d'adresse e-mail dans PAO (TIC TAC n'enverra qu'un SMS
              -> l'affichage code message devient IHM 14 / IHM 21)
     tictac : true = DV déjà traité par TIC TAC (étape 2 -> affichage code message
              direct : IHM 12/14 en ZOU→TGV, IHM 19/21 en TGV→ZOU)
     code   : (optionnel) code message TIC TAC spécifique par sens, quand le cas
              n'est pas le simple « billet envoyé » : { "zou-tgv": "13", "tgv-zou": "20" }
     pax/type/tgv/transp/dest : données voyage connues de PAO (nb passagers,
              profil, n° train grande ligne, transporteur, destination finale)

   ── Couples de démo ────────────────────────────────────────────────
   AAA111 / DUPONT    cas nominal (mail ok)
   BBB222 / MARTIN    cas nominal
   CCC333 / BERNARD   cas nominal
   DDD444 / PETIT     cas nominal
   EEE555 / DURAND    pas d'e-mail dans PAO
   FFF666 / ROBERT    déjà traité par TIC TAC (mail ok)
   GGG777 / MOREAU    déjà traité par TIC TAC + pas d'e-mail
   HHH888 / LEFEBVRE  TIC TAC : billet envoyé mais train complet, pas de place
                      assise garantie (ZOU→TGV -> IHM 13)
   III999 / GARCIA    TIC TAC : report + hébergement (TGV→ZOU -> IHM 20)
   JJJ000 / ROUX      DIGIPEC : hébergement + report J+1 (IHM 22, les deux sens)

   ── Jeux de données demandés (réunion 15/07) — IHM 1 / 2 / 15 ──────
   KKK111 / LEROY     « autres transporteurs » : à saisir avec le sens
                      « Autres cas » -> IHM 1
   LLL222 / FOURNIER  demande PRÉ-ENREGISTRÉE « A traiter Supervision »
                      (semée par sos-widgets.js) : resoumettre en ZOU!→TGV*
                      -> doublon en cours de traitement, IHM 2 ; la demande
                      est visible dans la file Supervision + Consultation
   MMM333 / GIRARD    demande PRÉ-ENREGISTRÉE « Traitée : correspondance OK »
                      (semée par sos-widgets.js) : resoumettre en ZOU!→TGV*
                      -> maintien de correspondance déjà traité, IHM 15
   Tout autre couple => IHM 3 (DV non connu).
*/
window.SOS_PAO = {
  "AAA111": { "nom": "DUPONT",  "mail": true,  "tictac": false, "pax": 2, "type": "PMR / PSH", "tgv": "8901", "transp": "INOUI",       "dest": "Paris-Gare-de-Lyon" },
  "BBB222": { "nom": "MARTIN",  "mail": true,  "tictac": false, "pax": 1, "type": "Client T",  "tgv": "7805", "transp": "OUIGO",       "dest": "Lyon-Part-Dieu" },
  "CCC333": { "nom": "BERNARD", "mail": true,  "tictac": false, "pax": 4, "type": "Groupes",   "tgv": "4761", "transp": "INTERCITÉS",  "dest": "Paris-Austerlitz" },
  "DDD444": { "nom": "PETIT",   "mail": true,  "tictac": false, "pax": 1, "type": "Mineur",    "tgv": "9261", "transp": "TGV LYRIA",   "dest": "Genève" },
  "EEE555": { "nom": "DURAND",  "mail": false, "tictac": false, "pax": 1, "type": "PMR / PSH", "tgv": "8907", "transp": "INOUI",       "dest": "Paris-Gare-de-Lyon" },
  "FFF666": { "nom": "ROBERT",  "mail": true,  "tictac": true,  "pax": 2, "type": "Client T",  "tgv": "8915", "transp": "INOUI",       "dest": "Paris-Gare-de-Lyon" },
  "GGG777": { "nom": "MOREAU",  "mail": false, "tictac": true,  "pax": 1, "type": "PMR / PSH", "tgv": "7801", "transp": "OUIGO",       "dest": "Lyon-Part-Dieu" },
  "HHH888": { "nom": "LEFEBVRE", "mail": true, "tictac": true, "code": { "zou-tgv": "13", "tgv-zou": "19" }, "pax": 3, "type": "Groupes",  "tgv": "8923", "transp": "INOUI", "dest": "Paris-Gare-de-Lyon" },
  "III999": { "nom": "GARCIA",   "mail": true, "tictac": true, "code": { "zou-tgv": "12", "tgv-zou": "20" }, "pax": 1, "type": "Client T", "tgv": "8901", "transp": "INOUI", "dest": "Paris-Gare-de-Lyon" },
  "JJJ000": { "nom": "ROUX",     "mail": true, "tictac": true, "code": { "zou-tgv": "22", "tgv-zou": "22" }, "pax": 2, "type": "PMR / PSH", "tgv": "9261", "transp": "TGV LYRIA", "dest": "Genève" },
  "KKK111": { "nom": "LEROY",    "mail": true,  "tictac": false, "pax": 1, "type": "Client T",  "tgv": "8901", "transp": "INOUI", "dest": "Paris-Gare-de-Lyon" },
  "LLL222": { "nom": "FOURNIER", "mail": true,  "tictac": false, "pax": 2, "type": "PMR / PSH", "tgv": "8901", "transp": "INOUI", "dest": "Paris-Gare-de-Lyon" },
  "MMM333": { "nom": "GIRARD",   "mail": true,  "tictac": false, "pax": 1, "type": "Client T",  "tgv": "8907", "transp": "INOUI", "dest": "Paris-Gare-de-Lyon" }
};

/* Recherche PAO : couple DV + nom (insensible casse/accents). null = inconnu. */
window.SOS_PAO_LOOKUP = function (dv, nom) {
  var rec = window.SOS_PAO[(dv || '').toUpperCase().trim()];
  if (!rec) { return null; }
  var norm = function (s) {
    return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim();
  };
  return norm(nom) === norm(rec.nom) ? rec : null;
};
