# Guía para Reconectar el Dominio www.africaguacanarias.com

## El Problema

Tu dominio **www.africaguacanarias.com** no se puede conectar porque aparece como "reservado" o "ya en uso". Esto ocurre cuando el dominio quedó asociado a un proyecto anterior en Netlify.

---

## Solución Paso a Paso

### PASO 1: Identificar y Limpiar Proyectos Antiguos

1. **Ve a tu cuenta de Netlify**: https://app.netlify.com/
2. **Revisa TODOS tus sitios/proyectos** (incluyendo los que parecen inactivos)
3. **Para cada proyecto, verifica:**
   - Ve a: `Site configuration` → `Domain management`
   - Busca si algún proyecto tiene configurado `africaguacanarias.com` o `www.africaguacanarias.com`

4. **Elimina el dominio del proyecto antiguo:**
   - En el proyecto que tenga el dominio, ve a `Domain management`
   - Click en los 3 puntos `...` junto al dominio
   - Selecciona `Remove domain`
   - Confirma la eliminación

5. **Opcional - Si el proyecto antiguo ya no lo necesitas:**
   - Ve a `Site configuration` → `General` → `Site information`
   - Baja hasta el final y click en `Delete site`

---

### PASO 2: Asegurar que tu Proyecto Actual Está Desplegado

1. **Verifica que tu proyecto actual esté en Netlify**
   - Si no lo está, necesitas hacer un nuevo deploy

2. **Para hacer un nuevo deploy (si es necesario):**

   **Opción A: Conectar desde Git (Recomendado)**
   - En Netlify: Click en `Add new site` → `Import an existing project`
   - Conecta tu repositorio de GitHub/GitLab/Bitbucket
   - Configura:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click `Deploy site`

   **Opción B: Deploy Manual**
   - Desde tu computadora, corre: `npm run build`
   - En Netlify: Arrastra la carpeta `dist` al área de deploy
   - Espera a que termine el deploy

---

### PASO 3: Conectar tu Dominio al Proyecto Correcto

1. **Ve al proyecto correcto en Netlify**
2. **Ve a**: `Site configuration` → `Domain management`
3. **Click en**: `Add a domain`
4. **Ingresa**: `www.africaguacanarias.com`
5. **Click en**: `Verify`

**Si aparece el error "dominio ya registrado":**
- Significa que no completaste bien el PASO 1
- Vuelve al PASO 1 y asegúrate de eliminar el dominio de TODOS los proyectos antiguos
- Espera 5-10 minutos después de eliminarlo antes de intentar agregarlo de nuevo

6. **Una vez agregado exitosamente, también agrega el dominio sin www:**
   - Click en `Add a domain` de nuevo
   - Ingresa: `africaguacanarias.com`
   - Netlify lo configurará automáticamente para redirigir a `www.africaguacanarias.com`

---

### PASO 4: Configurar DNS (Solo si es necesario)

**Netlify te mostrará si necesitas actualizar tus DNS.**

Si ves un mensaje que dice "Awaiting External DNS" o similar:

1. **Ve a tu proveedor de dominio** (donde compraste africaguacanarias.com)
   - Ejemplos: GoDaddy, Namecheap, 1&1, etc.

2. **Busca la sección de DNS/Nameservers**

3. **Configura los DNS según lo que te indica Netlify:**

   **Opción A: Usar Netlify DNS (Más fácil)**
   - En tu proveedor de dominios, cambia los nameservers a los que Netlify te proporciona
   - Ejemplo:
     ```
     dns1.p03.nsone.net
     dns2.p03.nsone.net
     dns3.p03.nsone.net
     dns4.p03.nsone.net
     ```

   **Opción B: Configurar registros A/CNAME manualmente**
   - Agrega un registro A para `@` (o africaguacanarias.com) apuntando a la IP de Netlify
   - Agrega un registro CNAME para `www` apuntando a tu sitio de Netlify

4. **Guarda los cambios**

⏱️ **IMPORTANTE**: Los cambios de DNS pueden tardar de 30 minutos a 48 horas en propagarse completamente.

---

### PASO 5: Activar HTTPS/SSL

1. **En Netlify, ve a**: `Site configuration` → `Domain management` → `HTTPS`
2. **Verifica SSL/TLS certificate**
   - Netlify normalmente activa esto automáticamente
   - Si no, click en `Verify DNS configuration` y luego `Provision certificate`

3. **Activa**: `Force HTTPS` (para que siempre use https://)

---

## Verificación Final

Una vez completados todos los pasos, verifica:

✅ `http://africaguacanarias.com` → redirige a `https://www.africaguacanarias.com`
✅ `https://africaguacanarias.com` → redirige a `https://www.africaguacanarias.com`
✅ `http://www.africaguacanarias.com` → redirige a `https://www.africaguacanarias.com`
✅ `https://www.africaguacanarias.com` → funciona correctamente

---

## Problemas Comunes y Soluciones

### "El dominio está siendo usado por otro equipo"
- **Causa**: El dominio está en un proyecto de otro equipo/cuenta de Netlify
- **Solución**: Debes acceder a esa cuenta y eliminar el dominio, o contactar a Netlify Support

### "No puedo encontrar el proyecto antiguo"
- **Solución**:
  1. Revisa si tienes múltiples cuentas de Netlify (personal y de trabajo)
  2. Contacta a Netlify Support con tu dominio para que te ayuden a localizarlo

### "Los cambios DNS no funcionan"
- **Causa**: La propagación DNS tarda tiempo
- **Solución**: Espera 24-48 horas. Puedes verificar el estado en: https://dnschecker.org/

### "Error de certificado SSL"
- **Causa**: El certificado aún no se ha generado o el DNS no está configurado correctamente
- **Solución**:
  1. Verifica que el DNS esté configurado correctamente
  2. Espera a que Netlify genere automáticamente el certificado (puede tardar unos minutos)
  3. Si después de 1 hora no funciona, ve a HTTPS y click en "Provision certificate"

---

## Archivos de Configuración Incluidos

Tu proyecto ahora incluye:

1. **`netlify.toml`**: Configuración oficial de Netlify
   - Define cómo construir tu proyecto
   - Configura las redirecciones
   - Establece headers correctos

2. **`public/_redirects`**: Respaldo de las redirecciones
   - Netlify usará primero `netlify.toml`, pero este archivo sirve como respaldo

Ambos archivos están configurados para que:
- `africaguacanarias.com` redirija a `www.africaguacanarias.com`
- Las rutas de React Router funcionen correctamente
- Los archivos SEO (sitemap.xml, robots.txt) se sirvan correctamente

---

## Contacto de Soporte

Si después de seguir todos estos pasos aún tienes problemas:

**Netlify Support**: https://www.netlify.com/support/
- Menciona tu dominio: `www.africaguacanarias.com`
- Explica que el dominio aparece como "ya registrado" pero es tu dominio
- Proporciona tu email de cuenta de Netlify

---

## Notas Importantes

⚠️ **No elimines tu proyecto actual** hasta estar seguro de que el dominio esté conectado correctamente al nuevo

⚠️ **Guarda tus credenciales de Firebase**: Están en el archivo `.env` y son necesarias para que tu sitio funcione

⚠️ **Los cambios DNS son sensibles**: Una vez que cambies los DNS, tu sitio puede estar temporalmente inaccesible durante la propagación

✅ **Este proyecto ya está configurado**: Solo necesitas seguir los pasos de reconexión del dominio
