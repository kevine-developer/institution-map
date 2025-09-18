#  Carte des Institutions de Madagascar
## Ce README décrit les fonctionnalités actuelles et les évolutions prévues.

Une application web interactive conçue pour localiser, rechercher et visualiser les institutions publiques de Madagascar sur une carte dynamique.

> ** Objectif** : Faciliter l'accès à l'information sur les services publics malgaches grâce à une interface cartographique moderne et intuitive.

##  Aperçu

![Capture d'écran de l'application](./docs/screenshot.png)
<!-- TODO: Ajouter une vraie capture d'écran -->

##  Fonctionnalités Principales

###  Cartographie Interactive
- **Visualisation Leaflet** avec clustering automatique des marqueurs
- **Navigation fluide** : zoom, déplacement, géolocalisation
- **Marqueurs personnalisés** selon le type d'institution

###  Recherche & Filtrage Avancé
- **Recherche textuelle** en temps réel
- **Filtres par catégorie** : Éducation, Santé, Administration, Justice, etc.
- **Filtres géographiques** : Région, District, Commune
- **Géolocalisation** : "Institutions près de moi"

###  Informations Détaillées
- **Fiches complètes** pour chaque institution
- **Coordonnées** : adresse, téléphone, email
- **Services proposés** et horaires d'ouverture
- **Photos** et descriptions (si disponibles)

###  Interface Utilisateur
- **Design responsive** : optimisé pour desktop, tablette et mobile
- **Thèmes multiples** : mode sombre et clair
- **Accessibilité** : navigation au clavier, contraste élevé

##  Stack Technique

### Frontend
- **Framework** : Next.js 14+ (React 18)
- **Langage** : TypeScript
- **Cartographie** : Leaflet + React-Leaflet
- **Clustering** : leaflet.markercluster
- **Styling** : Tailwind CSS

### Backend
- **Runtime** : Node.js + Express.js
- **Base de données** : PostgreSQL
- 
### Outils de Développement
- **Gestionnaire de paquets** : npm/yarn/pnpm
- **Linting** : ESLint + Prettier
- **CI/CD** : GitHub Actions (optionnel)

##  Source des Données

Les données proviennent de plusieurs sources fiables :

- ** API Institutions Publiques de Madagascar**
- En train d'être developper

- ** Données Géographiques**
- En train d'être developper



##  Modèle de Données

### Institution
```typescript
interface Institution {
  id: string
  name: string
  category: CategoryType
  description?: string
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  region: string
  district: string
  commune: string
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  services: string[]
  openingHours?: OpeningHours
  photos?: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Catégories Supportées
-  **Éducation** : Écoles, universités, centres de formation
-  **Santé** : Hôpitaux, centres de santé, dispensaires
-  **Administration** : Mairies, préfectures, services publics
-  **Justice** : Tribunaux, cours d'appel, commissariats
-  **Finances** : Perceptions, trésoreries, banques publiques
-  **Transport** : Gares, aéroports, ports
-  **Agriculture** : Centres agricoles, coopératives

##  Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commiter** vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Pusher** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

###  Guidelines de Contribution
- Suivre les conventions de code existantes
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Respecter les principes d'accessibilité web

##  Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

##  Support et Contact

- ** Issues** : [GitHub Issues](https://github.com/votre-username/madagascar-institutions-map/issues)
- ** Email** : contact@votre-domain.com
- ** Documentation** : [Wiki du projet](https://github.com/votre-username/madagascar-institutions-map/wiki)

##  Remerciements

- **OpenStreetMap** pour les données cartographiques
- **Communauté Open Source** pour les outils et bibliothèques utilisés

---

** Si ce projet vous est utile, n'hésitez pas à lui donner une étoile !**

> ** Note** : Ce projet est en développement actif. N'hésitez pas à consulter les [issues ouvertes](https://github.com/votre-username/madagascar-institutions-map/issues) pour voir les fonctionnalités à venir.
