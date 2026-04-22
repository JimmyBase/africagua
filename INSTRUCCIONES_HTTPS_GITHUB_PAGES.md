# Guía para Activar HTTPS en africaguacanarias.com

## Archivos Creados

He configurado tu proyecto para desplegar en GitHub Pages con HTTPS automático. Los siguientes archivos fueron creados:

1. **public/CNAME** - Identifica tu dominio personalizado para GitHub Pages
2. **.github/workflows/deploy.yml** - Automatiza el despliegue cuando hagas push al repositorio

## Pasos para Completar la Configuración

### 1. Configurar GitHub Pages en tu Repositorio

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En "Build and deployment":
   - **Source**: Selecciona "GitHub Actions"
5. **NO configures el dominio personalizado manualmente** (el archivo CNAME lo hace automáticamente)

### 2. Añadir las Variables de Entorno (Secrets)

Para que el build funcione en GitHub Actions, necesitas añadir las variables de entorno:

1. En tu repositorio, ve a **Settings** > **Secrets and variables** > **Actions**
2. Haz clic en **New repository secret**
3. Añade cada una de estas secrets con sus valores del archivo `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GOOGLE_MAPS_API_KEY`

### 3. Configurar DNS del Dominio

Debes actualizar los registros DNS de africaguacanarias.com en tu proveedor de dominios:

#### Opción A: Usar Registros A (Recomendado)

Elimina cualquier registro A existente y crea estos 4 registros A:

```
Tipo: A
Nombre: @ (o déjalo vacío)
Valor: 185.199.108.153

Tipo: A
Nombre: @ (o déjalo vacío)
Valor: 185.199.109.153

Tipo: A
Nombre: @ (o déjalo vacío)
Valor: 185.199.110.153

Tipo: A
Nombre: @ (o déjalo vacío)
Valor: 185.199.111.153
```

#### Opción B: Usar CNAME (Si tu proveedor lo permite para el dominio raíz)

```
Tipo: CNAME
Nombre: @
Valor: [tu-usuario-github].github.io
```

#### Para el subdominio www (Opcional pero recomendado)

```
Tipo: CNAME
Nombre: www
Valor: [tu-usuario-github].github.io
```

### 4. Subir los Cambios a GitHub

```bash
git add .
git commit -m "Configurar GitHub Pages con HTTPS para africaguacanarias.com"
git push origin main
```

### 5. Activar HTTPS en GitHub

Una vez que hayas hecho push y el DNS esté configurado:

1. Espera 24-48 horas para que el DNS se propague (aunque puede ser mucho más rápido)
2. Ve a **Settings** > **Pages** en GitHub
3. Una vez que GitHub detecte tu dominio, verás la opción **Enforce HTTPS**
4. **Activa "Enforce HTTPS"** (puede tardar unos minutos en aparecer esta opción)
5. GitHub emitirá automáticamente un certificado SSL gratuito de Let's Encrypt

## Verificación

Después de completar todos los pasos:

1. Visita https://africaguacanarias.com - Debería mostrar tu sitio con el candado verde
2. Verifica que http://africaguacanarias.com redirija automáticamente a https://
3. Comprueba que todas las páginas funcionen correctamente

## Tiempos Estimados

- **Despliegue inicial en GitHub Actions**: 2-5 minutos después del push
- **Propagación DNS**: 1-48 horas (usualmente 1-4 horas)
- **Emisión del certificado SSL**: 5-15 minutos después de que el DNS se propague
- **Activación de HTTPS forzado**: Inmediato una vez disponible

## Solución de Problemas

### El sitio no carga después de 48 horas

- Verifica que los registros DNS estén correctamente configurados
- Usa herramientas como [whatsmydns.net](https://www.whatsmydns.net) para verificar la propagación
- Asegúrate de que el workflow de GitHub Actions se ejecutó correctamente (pestaña "Actions" en GitHub)

### "Enforce HTTPS" no aparece

- Espera a que el DNS se propague completamente
- Verifica que el archivo CNAME esté en el directorio raíz del branch gh-pages o en dist/
- Intenta eliminar y volver a añadir el dominio en Settings > Pages

### Error 404 después del despliegue

- Verifica que la branch sea "main" en el workflow
- Comprueba que el workflow esté usando "GitHub Actions" como source
- Revisa los logs del workflow en la pestaña "Actions"

### Las variables de entorno no funcionan

- Asegúrate de haber añadido todos los secrets en Settings > Secrets and variables > Actions
- Verifica que los nombres coincidan exactamente (distinguen mayúsculas/minúsculas)

## Alternativa: Migrar a Netlify (Más Rápido)

Si tienes problemas con GitHub Pages o necesitas HTTPS inmediatamente, considera usar Netlify:

1. Crea una cuenta en [netlify.com](https://netlify.com)
2. Conecta tu repositorio de GitHub
3. Netlify detectará automáticamente la configuración (netlify.toml)
4. Añade el dominio africaguacanarias.com
5. Actualiza el DNS según las instrucciones de Netlify
6. **HTTPS se activará automáticamente en minutos**

## Contacto

Si necesitas ayuda adicional, consulta la documentación oficial:
- [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Securing GitHub Pages with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
