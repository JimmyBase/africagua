# 🚀 Deploy Directo a Netlify (Sin GitHub)

## ✅ Configuración Completada

Tu proyecto ya está configurado para hacer deploys directos a Netlify sin necesidad de GitHub.

## 📋 Pasos para Tu Primer Deploy

### 1️⃣ Autenticación con Netlify (Solo una vez)

Abre tu terminal y ejecuta:

```bash
npx netlify login
```

Esto abrirá tu navegador para que autorices el acceso. Una vez autorizado, ya estarás listo.

### 2️⃣ Hacer Deploy a Producción

Para publicar tus cambios directamente a **www.africaguacanarias.com**, ejecuta:

```bash
npm run deploy
```

Este comando:
- ✅ Hace el build del proyecto
- ✅ Sube los archivos directamente a Netlify
- ✅ Publica en tu dominio en 30-60 segundos

### 3️⃣ Deploy de Prueba (Opcional)

Si quieres probar antes de publicar, usa:

```bash
npm run deploy:draft
```

Esto crea una URL temporal de previsualización sin afectar tu sitio en producción.

## 🔄 Flujo de Trabajo Diario

1. Haces cambios en tu código
2. Ejecutas: `npm run deploy`
3. ¡Tu sitio se actualiza automáticamente!

## ⚙️ Desconectar GitHub (Opcional)

Si quieres desconectar completamente GitHub de Netlify:

1. Ve a tu panel de Netlify: https://app.netlify.com
2. Selecciona tu sitio "africaguacanarias"
3. Ve a **Site configuration** > **Build & deploy** > **Continuous deployment**
4. Haz clic en **"Stop auto publishing"** o elimina la conexión con GitHub

De esta forma, solo tus deploys manuales con `npm run deploy` actualizarán el sitio.

## 🎯 Ventajas de Este Método

- ✅ **Sin configuración de HTTPS**: Netlify lo maneja automáticamente
- ✅ **Sin commits a GitHub**: Deploy directo desde tu computadora
- ✅ **Control total**: Tú decides cuándo publicar
- ✅ **Más rápido**: Sin esperar a GitHub Actions

## 🆘 Solución de Problemas

### Error: "No site configured"
Ejecuta: `npx netlify link --id=418e1a7a-e735-4fff-8816-4ed02ec3c38c`

### Error: "Not authorized"
Ejecuta nuevamente: `npx netlify login`

### El deploy no se ve reflejado
Espera 1-2 minutos y limpia el caché del navegador (Ctrl + Shift + R)

## 📞 Comandos Útiles

```bash
# Ver estado del sitio
npx netlify status

# Ver logs del último deploy
npx netlify logs

# Abrir el panel de Netlify
npx netlify open
```

---

**¡Listo!** Ahora tienes deploy directo sin complicaciones de GitHub.
