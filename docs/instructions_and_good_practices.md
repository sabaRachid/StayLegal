# Guide de structure et style pour StayLegal (React Native + Expo)

## 1. Arborescence du projet

```
/StayLegal
│
├── /assets          → Images, icônes, polices
│
├── /data            → JSON des fiches (caq.json, nas.json, etc.)
│
├── /components      → Petits composants réutilisables
│   ├── ChecklistItem.tsx
│   ├── ModuleCard.tsx
│   └── ...
│
├── /hooks           → Hooks personnalisés (useNotifications.ts, useStorage.ts)
│
├── /navigation      → Définitions de la navigation (AppNavigator.tsx)
│
├── /screens         → Écrans de l’application
│   ├── HomeScreen.tsx
│   ├── FicheScreen.tsx
│   └── ...
│
├── /utils           → Fonctions utilitaires (formatDate.ts, validate.ts)
│
├── App.tsx          → Point d’entrée Expo
└── app.json         → Config Expo (métadonnées, icônes)
```

> **Conseil** : limitez la taille de chaque fichier. Un fichier = une responsabilité unique.

---

## 2. Rôles et responsabilités des dossiers

* **/assets** : stocke toutes les ressources statiques (images, icônes).
* **/data** : JSON bruts des procédures. Sert à alimenter dynamiquement les écrans.
* **/components** : petits blocs (boutons, cartes, items) sans logique métier lourde.
* **/hooks** : abstractions React (stateful) pour réutiliser la logique (stockage, notifications).
* **/navigation** : configuration de `@react-navigation` : stacks, tabs, drawer.
* **/screens** : pages complètes, composant par écran.
* **/utils** : fonctions pures (formatage de date, calculs, validation).
* **App.tsx** : wrapper global : providers (NavigationContainer, ThemeProvider, etc.).

---

## 3. Bases de React & JSX

1. **Composant fonctionnel** :

   ```jsx
   import React from 'react';
   import { View, Text } from 'react-native';

   export default function MonComposant({ titre }) {
     return (
       <View>
         <Text>{titre}</Text>
       </View>
     );
   }
   ```

2. **Props** : paramètres passés au composant ; immuables.

3. **State et hooks** : gestion du state local :

   ```jsx
   import React, { useState, useEffect } from 'react';

   export function Exemple() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       console.log('count a changé :', count);
     }, [count]);

     return (
       <Button onPress={() => setCount(c => c + 1)} title={String(count)} />
     );
   }
   ```

4. **Events** : `<Button onPress={handler} />`, `<TouchableOpacity onPress={...}>`

5. **Styles** : objets JS :

   ```jsx
   const styles = StyleSheet.create({
     container: { flex: 1, padding: 16, backgroundColor: '#fff' },
   });
   ```

---

## 4. Conventions et style de code

* **Typescript** : utilisez des `.tsx` avec types pour props/state.
* **Nommage** : PascalCase pour composants (`MyComponent.tsx`), camelCase pour fonctions/hooks.
* **Index files** : chaque dossier peut avoir un `index.ts` qui réexporte.
* **Hooks** : prefixez `use` (ex : `useNotifications`).
* **Organisation** : un composant = 1 dossier si plus de 3 fichiers associés (styles, tests).

---

## 5. Flux de données & stockage

1. **Chargement des JSON** :

   ```ts
   import caqData from '../data/caq.json';
   ```
2. **AsyncStorage** : sauvegarde du statut des checklists.
3. **Contexte global** : si plusieurs écrans partagent le même state, utilisez React Context.

---

## 6. Navigation

* **Stack Navigator** pour la flow principal.
* **Tab Navigator** si tu veux un menu en bas (ex : Démarches / Vie pratique).
* Fichier unique `AppNavigator.tsx` pour centraliser.

---

## 7. Notifications locales (expo-notifications)

* Crée un hook `useNotifications` qui :

  1. Demande la permission.
  2. Planifie des rappels (ex : 6 mois avant expiration).
* Utilise `Notifications.scheduleNotificationAsync({ content, trigger })`.

---

## 8. Bonnes pratiques & next steps

* **Tests** : commençez par des tests unitaires sur utilitaires.
* **Lint & Prettier** : configurez ESLint + Prettier pour code propre.
* **CI/CD** : ajoutez GitHub Actions pour `eas build` automatique.

---

## 9. Rôle concret des fichiers JSON

Les JSON dans `/data` contiennent les données de chaque procédure (CAQ, Permis d’études, NAS, RAMQ, PTPD) :

* **Structure uniforme** : mêmes clés (`conditions`, `documents`, `frais`, `delai`, etc.) pour toutes.
* **Alimentation dynamique** : un composant unique (`FicheScreen`) lit le JSON et génère automatiquement le titre, la liste des conditions, la checklist et les liens.
* **Facilité de maintenance** : modifier la fiche n’implique pas de toucher au code, juste au fichier JSON.

---

## 10. Qu’est-ce qu’un state et un hook ?

* **State** : données locales à un composant qui peuvent changer au fil du temps (ex : état d’une case cochée). Chaque fois que le state change, le rendu du composant se met à jour.

  ```tsx
  const [checked, setChecked] = useState(false);
  ```
* **Hook** : fonction spéciale React (`use...`) permettant d’utiliser le state ou le cycle de vie dans un composant fonctionnel :

  * `useState` : déclare et lit le state local.
  * `useEffect` : exécute du code après chaque rendu ou sur des dépendances.
  * **Hook personnalisé** : tu crées par exemple `useStorage(key)` pour centraliser la lecture/écriture dans AsyncStorage.

---

## 11. Stratégie de code par domaine (CAQ, NAS, etc.)

Pour chaque domaine :

1. **Fichier JSON** (`caq.json`, `nas.json`, ...)
2. **Écran dédié** : `FicheScreen.tsx` reçoit un paramètre `type` (ex : "CAQ") et importe le JSON correspondant.
3. **Checklist dynamique** : itère sur `documents` ou `conditions`, affiche une liste de `ChecklistItem` avec `checked` issu du state.
4. **Rappels** : à la lecture du `delai` et de la date d’expiration saisie par l’utilisateur, planifier une notification via `useNotifications`.
5. **Géolocalisation** (NAS, centres Service Canada) : si le JSON contient un champ `locationUrl`, afficher une carte avec `react-native-maps`.
6. **Validation et sauvegarde** : chaque modification du state (case cochée, date d’expiration) se persiste via `useStorage`.

Cette logique componentise chaque responsabilité :

* **Lecture des données** → JSON
* **Affichage** → `FicheScreen` + `ChecklistItem` + `ModuleCard`
* **Stockage** → `useStorage`
* **Notifications** → `useNotifications`

---

## 12. Rôle du `index.ts` / `index.tsx`

* **Regroupement** : dans `/components`, `/hooks` ou `/utils`, un `index.ts` réexporte tous les modules du dossier.

  ```ts
  // components/index.ts
  export { default as ChecklistItem } from './ChecklistItem';
  export { default as ModuleCard } from './ModuleCard';
  ```
* **Import simplifié** : au lieu de `import ChecklistItem from '../components/ChecklistItem';`, tu écris `import { ChecklistItem } from '../components';`
* **Clarté** : centralise les points d’entrée pour chaque dossier et facilite la navigation dans le projet.

13. Bonnes pratiques détaillées

13.1 Bonnes pratiques générales de code

Séparation des responsabilités (SRP) : un module/fichier doit avoir une seule raison de changer.

DRY (Don't Repeat Yourself) : factorisez et réutilisez le code commun.

KISS (Keep It Simple, Stupid) : privilégiez la clarté et la simplicité.

YAGNI (You Aren't Gonna Need It) : n’ajoutez pas de fonctionnalités avant d’en avoir réellement besoin.

Nommage explicite : variables, fonctions et composants doivent refléter leur rôle.

Typed à 100% : activez le mode strict de TypeScript (strict: true) pour une meilleure sécurité.

Lint et formatage : configurez ESLint et Prettier, et intégrez-les à votre CI.

Tests unitaires : couvrez la logique métier et les utilitaires, pas forcément l’UI.

Revue de code : privilégiez les Pull Requests pour partager et valider les changements.

Documentation : commentez les modules complexes et maintenez un README à jour.

13.2 Bonnes pratiques par dossier

/assets

Organisez les assets par type (images, icônes, polices) dans des sous-dossiers.

Nommez en kebab-case (e.g. logo-app.png), sans espaces et en minuscules.

Optimisez les images (conversion WebP, compression) pour réduire la taille de l’app.

Préférez les SVG ou icônes vectorielles (via react-native-svg ou @expo/vector-icons).

/data

Validez chaque fichier JSON à l’aide d’un schéma TypeScript ou zod.

Gardez la structure uniforme d’un domaine à l’autre (mêmes clés pour chaque fiche).

Commentez ou nommez clairement les champs pour comprendre leur usage.

Versionnez les JSON et évitez les modifications non revendiquées (git diff propre).

/components

Créez des composants atomiques et réutilisables (boutons, listes, cartes).

Un composant = un dossier si >3 fichiers (code, styles, tests, types).

Limitez la logique : les composants ne font que de l’affichage et de la gestion d’UI.

Testez les composants critiques avec @testing-library/react-native.

Documentez les props avec des interfaces TypeScript.

/hooks

Chaque hook personnalisé doit remplir une seule responsabilité (accès au storage, notifications, API).

Prefixez toujours use (e.g. useStorage, useNotifications).

Gérez correctement le cycle de vie et le nettoyage (useEffect cleanup).

Documentez l’API du hook (paramètres, valeur de retour) via TSdoc.

/navigation

Centralisez la configuration des navigators dans AppNavigator.tsx.

Ne placez pas de logique métier dans les écrans de navigation.

Utilisez les types générés par React Navigation (ParamList) pour typer vos routes.

Séparez stacks et tabs dans des fichiers distincts si nécessaire.

/screens

Un écran = un composant fonctionnel avec une hiérarchie de sous-composants.

Déléguez la logique aux hooks ou composants, écrivez l’UI dans le screen.

Restez concis : <200 lignes par écran idéalement.

Gérez l’état local avec useState ou useReducer pour les formulaires complexes.

/utils

Fonctions pures sans effets de bord (e.g. formatDate, validateEmail).

Organisez les utilitaires par thème (date, validation, calculs).

Documentez chaque fonction avec un commentaire de signature (TSdoc).

Testez les utilitaires avec des cas d’usage variés.

App.tsx & configuration

Gardez App.tsx minimal : provider, navigation et thème.

Configurez app.json et app.config.js pour les icônes, permissions et splash.

Ne mettez pas de logique métier dans la configuration.

Versionnez le fichier de config et commentez les clés importantes.
