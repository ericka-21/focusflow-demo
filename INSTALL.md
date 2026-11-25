# Instalación y publicación

## Requisitos

- Un navegador moderno.
- Una cuenta de GitHub para publicar el proyecto.
- Git (opcional, si prefieres subirlo desde la terminal).

No necesitas instalar Node.js, dependencias ni ejecutar un proceso de build.

## 1. Probar localmente

1. Descarga o clona este repositorio.
2. Abre la carpeta del proyecto.
3. Haz doble clic en `index.html`.

Opcionalmente, inicia un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## 2. Subir a GitHub

### Opción A: desde la web

1. En GitHub, crea un repositorio nuevo, por ejemplo `focusflow-demo`.
2. En el repositorio, selecciona **Add file → Upload files**.
3. Sube `index.html`, `README.md`, `INSTALL.md` y las carpetas `css/` y `js/`.
4. Confirma los cambios con **Commit changes**.

### Opción B: usando Git

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Initial FocusFlow demo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/focusflow-demo.git
git push -u origin main
```

Reemplaza `TU-USUARIO` por tu usuario de GitHub y ajusta la URL si el repositorio tiene otro nombre.

## 3. Activar GitHub Pages

1. Abre el repositorio en GitHub.
2. Entra en **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. En **Branch**, selecciona `main` y la carpeta `/(root)`.
5. Pulsa **Save**.
6. Espera a que termine la publicación. GitHub mostrará la URL del sitio en esa misma sección.

La dirección normalmente tendrá este formato:

```text
https://TU-USUARIO.github.io/focusflow-demo/
```

## 4. Actualizar la demo

Cada vez que subas cambios a la rama `main`, GitHub Pages volverá a publicar el sitio automáticamente.

## Solución de problemas

- **Página en blanco o 404:** verifica que `index.html` esté en la raíz seleccionada en Pages.
- **No cargan estilos o JavaScript:** comprueba que las rutas `css/styles.css` y `js/app.js` respeten mayúsculas y minúsculas.
- **No aparecen mis tareas en otro dispositivo:** es normal; esta demo guarda los datos en el `localStorage` del navegador y no utiliza una base de datos.
