## GIT
- Inicializar un nuevo repositorio
```
git init 
```
```
git add .
```
```
git commit -m "Proyecto base Nest"
```
- Subir a Github
- Requisito 1: (Crear una cuenta en Github)
- Requisito 2: Crear un nuevo repositorio en github
- Asociar git local con el remoto:
```
git remote add origin url_repositorio_remoto
```
- Subir los cambios al repositorio remoto (github)
```
git push origin master
git push origin develop
```
- Listar las ramas:
```
git branch
```

## Git FLow
```
git flow init
```
- agregar un nuevo feature
```
git flow feature start add-configuracion
```
- finalizar el feature
```
git flow feature finish add-configuracion
```