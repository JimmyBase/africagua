# Pasos Siguientes para Activar HTTPS

## Resumen Rapido

He configurado tu proyecto para que GitHub Pages proporcione HTTPS automaticamente. Ahora necesitas completar estos 3 pasos:

## 1. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** > **Pages**
3. En "Source" selecciona: **GitHub Actions**

## 2. Añadir Variables de Entorno (Secrets)

En GitHub: **Settings** > **Secrets and variables** > **Actions** > **New repository secret**

Añade estos secrets con los valores de tu archivo `.env`:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_GOOGLE_MAPS_API_KEY`

## 3. Configurar DNS del Dominio

En tu proveedor de dominio (donde compraste africaguacanarias.com), crea estos 4 registros A:

```
Tipo: A | Nombre: @ | Valor: 185.199.108.153
Tipo: A | Nombre: @ | Valor: 185.199.109.153
Tipo: A | Nombre: @ | Valor: 185.199.110.153
Tipo: A | Nombre: @ | Valor: 185.199.111.153
```

## 4. Subir los Cambios

```bash
git add .
git commit -m "Configurar HTTPS para GitHub Pages"
git push origin main
```

## 5. Esperar y Activar HTTPS

1. Espera 1-24 horas (normalmente 1-4 horas)
2. Ve a **Settings** > **Pages** en GitHub
3. Activa **"Enforce HTTPS"** cuando aparezca la opcion

## Resultado

Despues de completar estos pasos, tu sitio:
- Se desplegara automaticamente en cada push
- Tendra HTTPS activo (candado verde)
- Redirigira automaticamente HTTP a HTTPS
- Ya no mostrara el aviso "No es seguro"

## Problemas?

Consulta el archivo **INSTRUCCIONES_HTTPS_GITHUB_PAGES.md** para guia detallada y solucion de problemas.

## Alternativa Rapida: Netlify

Si necesitas HTTPS ya, usa Netlify (SSL automatico en minutos):
1. Conecta tu repo en netlify.com
2. Añade el dominio
3. Actualiza DNS segun Netlify
4. HTTPS automatico!
