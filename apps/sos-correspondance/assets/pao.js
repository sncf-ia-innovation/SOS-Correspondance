/* SOS Correspondance — « PAO » simulé : registre des dossiers voyage (DV) connus.
   Étape 1 des workflows (diapos 28/29) : Vérification DV + Nom auprès de PAO.
   Un couple (référence, nom) absent de ce registre => Rejetée, IHM 3.

   Chaque enregistrement porte aussi ce que PAO sait du client :
     nom    : nom de famille attendu (comparaison sans casse ni accents)
     mail   : false = pas d'adresse e-mail dans PAO (TIC TAC n'enverra qu'un SMS
              -> l'affichage code message devient IHM 14 / IHM 21)
     tictac : true = DV déjà traité par TIC TAC (étape 2 -> affichage code message
              direct : IHM 12/14 en ZOU→TGV, IHM 19/21 en TGV→ZOU)

   ── Couples de démo ────────────────────────────────────────────────
   AAA111 / DUPONT    cas nominal (mail ok)
   BBB222 / MARTIN    cas nominal
   CCC333 / BERNARD   cas nominal
   DDD444 / PETIT     cas nominal
   EEE555 / DURAND    pas d'e-mail dans PAO
   FFF666 / ROBERT    déjà traité par TIC TAC (mail ok)
   GGG777 / MOREAU    déjà traité par TIC TAC + pas d'e-mail
   Tout autre couple => IHM 3 (DV non connu).
*/
window.SOS_PAO = {
  "AAA111": { "nom": "DUPONT",  "mail": true,  "tictac": false },
  "BBB222": { "nom": "MARTIN",  "mail": true,  "tictac": false },
  "CCC333": { "nom": "BERNARD", "mail": true,  "tictac": false },
  "DDD444": { "nom": "PETIT",   "mail": true,  "tictac": false },
  "EEE555": { "nom": "DURAND",  "mail": false, "tictac": false },
  "FFF666": { "nom": "ROBERT",  "mail": true,  "tictac": true },
  "GGG777": { "nom": "MOREAU",  "mail": false, "tictac": true }
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
