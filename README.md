# PredatorSimulation

La vie artificielle est un champ de recherche interdisciplinaire alliant informatique et biologie, mais avec des applications dans des domaines variés tels que l'économie ou l'archéologie. Son objectif est de créer des systèmes artificiels s'inspirant des systèmes vivants, soit sous la forme de programmes informatiques, soit sous la forme de robots.

Dans cet exercice, le but est de créer un vivarium composé de plusieurs espèces.

# Utilisation

Pour lancer la simulation :
- https://www.yanis-ouled-moussa.fr/playGround/PredatorSimulation/
- **Click gauche** : Afficher/Cacher les jauges de l'Agent le plus proche

# Agents

- Decomposeurs

![](Documentation\Images\Decomposor.png)

> Comportements
>
> - Mangent les cadavres

- Herbivores

![](Documentation\Images\Herbivore.png)

> Comportements
>
> - Mangent les végétaux
> - Se rapprochent des Superprédateurs pour se protéger des Prédateurs
> - Fuient les Prédateurs

- Prédateurs

![](Documentation\Images\Predator.png)

> Comportements
>
> - Mangent les Herbivores
> - Se déplacent en meute pour chasser
> - Fuient les Super Prédateurs

- Super Prédateurs

![](Documentation\Images\Superpredator.png)

> Comportements
>
> - Mangent les Prédateurs
> - Se rapprochent des Herbivores pour chasser les Prédateurs


# Bonus

- Le déplacement aléatoire des agents se fait à l'aide du bruit de Perlin afin que leur déplacements soit plus crédible et fluide
- Il est possible d'afficher et de cacher les jauges des Agents afin d'observer leur état
- Lorsqu'un agent est fatigué, il s'arrête et un cercle jaune indique son état
