
# Application du test technique Troov

Bonjour, vous trouverez dans ce readme comment installer et configurer l'application.




## Installation

Après avoir cloné le projet, installer les packages npm :

```bash
  cd troov
  npm i
```

Renommer le fichier .env.local en .env

Se rendre dans le dossier "api" et installer également les packages npm :

```bash
  cd ./api/
  npm i
```
Suivre la même logique avec le fichier .env.local (Renommer le fichier .env.local en .env).

Une fois les packages installés, il suffit de démarrer le serveur API* :
```bash
  npm run dev
```
*Cette commande va automatiquement compiler l'API, donc pas besoin de passer par `npm run build`.

Retournez à la racine du projet et démarrer le serveur Nitro Nuxt 3 :
```bash
  cd ..
  npm run dev -o
```


N'oubliez pas de configurer le fichier .env de l'API pour bien configurer la BDD MongoDB. De même avec le fichier .env du projet Nuxt afin de bien paramétrer la bonne URI de l'API.

## Tech Stack

**Client:** Nuxt 3.x, TailwindCSS

**Server:** Node, Express, MongoDB via Mongoose, Bcrypt pour le hashage des mdp
