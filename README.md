# STOCKFLOW

## Présentation du projet

Cette application permet à différents gérants de boutique de voir exactement leur stock.
Elle permet :
    - Voir les produits qui sont en alerte de stock,
    - Passer une commande chez un fournisseur
    - Voir les différents status des commandes
    - Voir les détails des commandes

### Choix technologiques

* Backend: Java/SringBoot
* Frontend: React Js
* BDD: PostgreSQL

## Prérequis

* Java 17
* Node 18+
* Docker pour la bd
* Un IDE

## Installation et lancement

D'abord lancer le backend depuis son IDE
cd stockflow/frontend
npm install
npm run dev
L'application sera disponible par défaut à l'adresse suivante :

URL : http://localhost:5173

## Documentation des endpoints

### Produit
* Récupération des produits
Méthode: Get
Route: /api/produits
Body exemple: 
réponse exemple:
  [
      {
      "id": 0,
      "sku": "string",
      "nom": "string",
      "categorie": "string",
      "prixUnitaire": 0,
      "quantiteStock": 0,
      "seuilAlerte": 0,
      "boutiqueId": 0,
      "dateCreation": "2026-05-11T12:13:11.234Z",
      "dateModification": "2026-05-11T12:13:11.234Z",
      "statut": "ALERTE",
      "enAlerte": true
      }
  ]

### Récupération d'un produit par son id 
* Méthode: GET
* Route: /api/produits/:id
* Body exemple: 
  réponse exemple:
  {
  "id": 0,
  "sku": "string",
  "nom": "string",
  "categorie": "string",
  "prixUnitaire": 0,
  "quantiteStock": 0,
  "seuilAlerte": 0,
  "boutiqueId": 0,
  "dateCreation": "2026-05-11T12:07:25.422Z",
  "dateModification": "2026-05-11T12:07:25.422Z",
  "statut": "ALERTE",
  "enAlerte": true
  }

### Création d'un produit
* Méthode: POST
* Route: /api/produits
* Body exemple:
  {
  "sku": "string",
  "nom": "string",
  "categorie": "string",
  "prixUnitaire": 0,
  "quantiteStock": 0,
  "seuilAlerte": 0,
  "boutiqueId": 0,
  "dateCreation": "2026-05-11T12:16:32.321Z",
  "dateModification": "2026-05-11T12:16:32.321Z",
  "statut": "ALERTE",
  "enAlerte": true
  }
* réponse exemple:
  {
  "id": 0,
  "sku": "string",
  "nom": "string",
  "categorie": "string",
  "prixUnitaire": 0,
  "quantiteStock": 0,
  "seuilAlerte": 0,
  "boutiqueId": 0,
  "dateCreation": "2026-05-11T12:16:32.321Z",
  "dateModification": "2026-05-11T12:16:32.321Z",
  "statut": "ALERTE",
  "enAlerte": true
  }

### Modification d'un produit par son id
* Méthode: PUT
* Route: /api/produits/:id
* Body exemple:
  {
  "id": 0,
  "sku": "string",
  "nom": "string",
  "categorie": "string",
  "prixUnitaire": 0,
  "quantiteStock": 0,
  "seuilAlerte": 0,
  "boutiqueId": 0,
  "dateCreation": "2026-05-11T12:19:05.333Z",
  "dateModification": "2026-05-11T12:19:05.333Z",
  "statut": "ALERTE",
  "enAlerte": true
  }
* Response exemple:
  {
  "id": 0,
  "sku": "string",
  "nom": "string",
  "categorie": "string",
  "prixUnitaire": 0,
  "quantiteStock": 0,
  "seuilAlerte": 0,
  "boutiqueId": 0,
  "dateCreation": "2026-05-11T12:19:05.333Z",
  "dateModification": "2026-05-11T12:19:05.333Z",
  "statut": "ALERTE",
  "enAlerte": true
  }

### Modification de la quantité du produit par son id
* Méthode: PATCH
* Routes: /api/produits/:id/stock

### Suppression d'un produit par son id
* Méthode: DELETE
* Route: /api/produits/:id

## Ce qui est fait / Ce qui ne l'est pas

* Affichage du dasboard avec les différentes valeurs
* Partie gestion des stocks(Tous les filtres ne passent pas)
* Commandes: Création de commande, Passage de EN_ATTENTE à CONFIRMEE mais pas de CONFIRMEE a LIVREE

## Difficultés rencontrées

Les différents problèmes rencontrés sont:
* L'association entre deux tables, la manière de recevoir un objet et l'attribuer ;a un autre objet dans une liste
* Les valeurs du dasborad à afficher

## Ce que vous feriez différemment

* La création d'une entité Produit pour une meilleure géreance
* La mise en place de la sécurité
* Mieux isoler les 
* Mettre en place des tests unitaires