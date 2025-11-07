import React from 'react';
import { X } from 'lucide-react';

interface CookiePolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicy = ({ isOpen, onClose }: CookiePolicyProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">POLÍTICA DE COOKIES Y ALMACENAMIENTO LOCAL</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 prose max-w-none">
          <p>
            Este sitio web utiliza cookies y tecnologías similares para proporcionar el servicio, así como permitirnos mejorarlo, a través de la obtención de estadísticas sobre su uso, y otras finalidades.
          </p>

          <p>
            Navegar por esta web implica necesariamente la utilización de cookies y tecnologías similares siempre y cuando sea necesario para su funcionamiento. Asimismo, para ciertas finalidades, las cookies y el almacenamiento local estarán sujetas a su previo consentimiento. Puede aceptar o rechazar las cookies mediante el sistema de configuración establecido y también es posible configurar el navegador para impedir su uso.
          </p>

          <p>Esta política forma parte de nuestra política de privacidad e incluye lo siguiente:</p>
          <ul>
            <li>¿Qué son las cookies?</li>
            <li>¿Para qué se usan las cookies?</li>
            <li>¿Qué entendemos por tecnologías similares a las cookies?</li>
            <li>¿Qué son las cookies de terceros? ¿Quiénes son los destinatarios de la información?</li>
            <li>¿Durante cuánto tiempo se mantienen activas las cookies o tecnologías similares?</li>
            <li>Uso de navegadores con modo de navegación privada</li>
            <li>¿Cómo impedir el uso de cookies y cómo borrarlas?</li>
            <li>Información detallada sobre las cookies utilizadas por este sitio web</li>
          </ul>

          <h3>¿Qué son las cookies?</h3>
          <p>
            Las "cookies" son pequeños ficheros temporales que se crean en el dispositivo del usuario (ordenador, teléfono, tableta, etc.) cuando visita una web, y que permiten a la misma almacenar o recuperar información cuando navega, por ejemplo, para guardar sus preferencias de uso o para reconocerlo en posteriores visitas, así como obtener información sobre sus hábitos de navegación.
          </p>
          <p>
            Cuando una web crea una cookie en el dispositivo del usuario, se almacena la dirección/dominio de la web que ha creado la cookie, la duración de la cookie que puede ir de escasos minutos a varios años, así como el contenido de la cookie. El usuario puede deshabilitar las cookies en todo momento mediante el sistema de configuración de este sitio web, así como configurar su programa de navegación para impedir (bloquear) el uso de cookies por parte de determinadas webs, así como borrar las cookies almacenadas previamente.
          </p>

          <h3>¿Para qué se usan las cookies?</h3>
          <p>Los usos o finalidades más habituales son:</p>
          <ul>
            <li>Cookies técnicas esenciales. Se utilizan para gestionar el flujo de navegación dentro de la web o para mantener al usuario conectado a la misma. Al deshabilitarlas, es posible que algún apartado de la web no funcione correctamente.</li>
            <li>Cookies de personalización. Necesarias para recordar determinadas preferencias del usuario.</li>
            <li>Cookies analíticas. Nos ayudan a nosotros y a terceros a recopilar información de la procedencia de los usuarios y su navegación dentro de la web, a efectos de realizar un análisis estadístico para poder mejorar la estructura y los contenidos.</li>
            <li>Cookies publicitarias. Utilizadas para gestionar los anuncios que aparecen en la web, decidir el contenido o la frecuencia de los anuncios.</li>
            <li>Cookies publicitarias comportamentales. Ayudan a recopilar los hábitos de navegación del usuario para crear un perfil de sus intereses y para mostrarle anuncios adaptados a los mismos.</li>
            <li>Cookies para compartición social. Son necesarias para identificar al usuario en sus redes sociales y así permitirle compartir contenidos.</li>
          </ul>

          <h3>¿Qué entendemos por tecnologías similares a las cookies?</h3>
          <p>
            Se entiende por tecnologías similares cualquier tipo de mecanismo de almacenamiento y recuperación de datos que se utilice en el dispositivo del usuario para obtener información. Las más habituales incluyen:
          </p>
          <ul>
            <li>El almacenamiento local del navegador. Algunas webs utilizan almacenamientos locales llamados "sessionStorage" y "localStorage", así como la base de datos indexada del navegador, para guardar información;</li>
            <li>El almacenamiento local de los complementos del navegador, como por ejemplo el almacenamiento local de Flash ("Flash Local Shared Objects") o el almacenamiento local de Silverlight ("Isolated Objects").</li>
            <li>El "web beacon" es una técnica de rastreo que consiste en insertar en una página web (o en un correo electrónico) una imagen alojada en un servidor de Internet de forma que, cuando el navegador o programa de correo se conecta a dicho servidor para descargar y visualizar la imagen, la conexión queda registrada. Ello permite conocer que el usuario ha visualizado la página web o el correo. A veces esta imagen es muy pequeña o transparente de forma que el usuario no se percata de su existencia.</li>
            <li>Las técnicas de "fingerprinting" que combinan información obtenida del navegador o del equipo de navegación para distinguir a un usuario en sus sucesivas visitas distintos sitios web.</li>
          </ul>

          <h3>¿Qué son las cookies de terceros? ¿Quiénes son los destinatarios de la información?</h3>
          <p>Las cookies de esta web se pueden clasificar, en función de quién las crea, en dos categorías:</p>
          <ul>
            <li>Cookies propias: se crean y manejan desde nuestros sitios y dominios web, siendo la información obtenida gestionada directa o indirectamente por nosotros para nuestras propias finalidades.</li>
            <li>Cookies de terceros: son las cookies que se crean y se manejan desde otros sitios web que, aunque no están completamente bajo nuestro control, proporcionan funciones y características que hemos decidir incluir en nuestra web, como, por ejemplo: mapas interactivos, vídeos y elementos multimedia, botones para compartir en redes sociales, anuncios, etc. Estas cookies están bajo el control del tercero que proporciona la función correspondiente.</li>
          </ul>

          <h3>¿Durante cuánto tiempo se mantienen activas las cookies o tecnologías similares?</h3>
          <p>En función de su permanencia o tiempo de actividad, podemos diferenciar entre:</p>
          <ul>
            <li>Cookies temporales de sesión; permanecen almacenadas en el equipo de navegación hasta que el usuario abandona la página web; el navegador las borra al terminar la sesión de navegación.</li>
            <li>Cookies persistentes; permanecen en el equipo de navegación y la web las lee cada vez que el usuario realiza una nueva visita. Estas cookies se borran automáticamente pasado cierto plazo de tiempo, que puede ser corto o muy largo.</li>
          </ul>

          <h3>Uso de navegadores con modo de navegación privada</h3>
          <p>
            Si desea usar esta web con mayor grado de privacidad y limitando que las cookies queden almacenadas por plazos largos de tiempo, recomendamos que utilice un navegador web que disponga de una opción de navegación "privada". Puede obtener información sobre esta posibilidad en las páginas de ayuda de los navegadores más comunes:
          </p>

          <table className="min-w-full divide-y divide-gray-200 my-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navegador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de la función</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Más información</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Internet Explorer 8 y superior</td>
                <td className="px-6 py-4">InPrivate</td>
                <td className="px-6 py-4">
                  <a href="https://support.microsoft.com/es-es/products/internet-explorer" className="text-teal-600 hover:text-teal-700">Enlace</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Safari 2 y superior</td>
                <td className="px-6 py-4">Navegación privada</td>
                <td className="px-6 py-4">
                  <a href="https://support.apple.com/es-es/HT203036" className="text-teal-600 hover:text-teal-700">Enlace</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Opera 10.5 y superior</td>
                <td className="px-6 py-4">Navegación privada</td>
                <td className="px-6 py-4">
                  <a href="http://help.opera.com/Windows/12.00/es-ES/private.html" className="text-teal-600 hover:text-teal-700">Enlace</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">FireFox 3.5 y superior</td>
                <td className="px-6 py-4">Navegación privada</td>
                <td className="px-6 py-4">
                  <a href="https://support.mozilla.org/es/kb/navegacion-privada-Firefox-no-guardar-historial-navegacion" className="text-teal-600 hover:text-teal-700">Enlace</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Google Chrome 10 y superior</td>
                <td className="px-6 py-4">Modo incógnito</td>
                <td className="px-6 py-4">
                  <a href="https://support.google.com/chrome/answer/7005900?rd=1" className="text-teal-600 hover:text-teal-700">Enlace</a>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>¿Cómo impedir el uso de cookies y cómo borrarlas?</h3>
          <p>
            Puede configurar sus preferencias en cualquier momento mediante el sistema de configuración de cookies integrado en este sitio web, podrá activar / desactivar el uso de cookies según sus finalidades.
          </p>
          <p>
            Puede acceder al sistema de configuración mediante el enlace al pie de la página de inicio o pulsando aquí.
          </p>
          <p>
            La mayoría de navegadores permiten desactivar globalmente las cookies. Muchos navegadores también permiten borrar las cookies asociadas a webs/dominios concretos. Para ello el usuario debe consultar la ayuda de su navegador. A continuación se incluyen enlaces a las páginas de ayuda de los navegadores más habituales para conocer la configuración de cookies en cada uno:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" className="text-teal-600 hover:text-teal-700">Chrome</a></li>
            <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-teal-600 hover:text-teal-700">Explorer</a></li>
            <li><a href="https://privacy.microsoft.com/es-ES/windows-10-microsoft-edge-and-privacy" className="text-teal-600 hover:text-teal-700">Microsoft Edge</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-teal-600 hover:text-teal-700">Firefox</a></li>
            <li><a href="https://support.apple.com/kb/PH17191?viewlocale=es_ES&locale=es_ES" className="text-teal-600 hover:text-teal-700">Safari</a></li>
            <li><a href="https://support.apple.com/es-es/HT201265" className="text-teal-600 hover:text-teal-700">Safari para IOS</a></li>
            <li><a href="http://www.opera.com/es/help" className="text-teal-600 hover:text-teal-700">Opera</a></li>
          </ul>

          <p>
            Para borrar los datos guardados en el almacenamiento local del navegador, el usuario puede borrar el historial de navegación.
          </p>
          <p>
            Para conocer cómo borrar el almacenamiento local de Flash o para limitar la cantidad de espacio permitido, consultar las páginas de Ayuda de Adobe: <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" className="text-teal-600 hover:text-teal-700">http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html</a>
          </p>

          <h3>Información detallada sobre las cookies utilizadas por este sitio web</h3>
          <h4>Información sobre las cookies propias:</h4>
          <ul>
            <li>Cookies funcionales/técnicas: Necesarias para mostrar correctamente la página web y garantizar el correcto funcionamiento del sitio.</li>
            <li>Cookies Analíticas: Se utilizan para analizar el comportamiento de los usuarios de forma agregada y anónima incluyendo el número de visitantes a la web y a diferentes páginas internas, la procedencia de las visita, día y hora, plataforma, palabras de búsqueda que utiliza un usuario para encontrar su contenido deseado.</li>
          </ul>

          <h4>Información sobre las Cookies de Terceros:</h4>
          <p>Son cookies administradas y controladas por Terceros, con la finalidad de realizar/proporcionar funcionalidades, realizar análisis de navegación, personalización de la navegación y búsquedas, así como publicidad compartimental.</p>

          <table className="min-w-full divide-y divide-gray-200 my-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tercero Propietario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Información</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">YouTube</td>
                <td className="px-6 py-4">Sesión/1 año</td>
                <td className="px-6 py-4">
                  <a href="https://www.google.es/intl/es/policies/privacy/" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Twitter</td>
                <td className="px-6 py-4">Sesión/1 año</td>
                <td className="px-6 py-4">
                  <a href="https://help.twitter.com/es/rules-and-policies/twitter-cookies" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Facebook</td>
                <td className="px-6 py-4">Sesión/1 año</td>
                <td className="px-6 py-4">
                  <a href="https://es-es.facebook.com/policies/cookies/" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Instagram</td>
                <td className="px-6 py-4">Sesión/1 año</td>
                <td className="px-6 py-4">
                  <a href="https://help.instagram.com/519522125107875" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">LinkedIn</td>
                <td className="px-6 py-4">Sesión/1 año</td>
                <td className="px-6 py-4">
                  <a href="https://es.linkedin.com/legal/cookie-policy" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Google Inc</td>
                <td className="px-6 py-4">Permanente</td>
                <td className="px-6 py-4">
                  <a href="https://www.google.es/intl/es/policies/privacy/" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Adobe</td>
                <td className="px-6 py-4">Sesión/1 año</td>
                <td className="px-6 py-4">
                  <a href="https://docs.adobe.com/content/help/es-ES/core-services/interface/ec-cookies/cookies-privacy.html" className="text-teal-600 hover:text-teal-700">Ver política</a>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm text-gray-500 mt-8">
            NOTA: la información ofrecida es en fecha 26-10-2020 y le informamos que con el paso del tiempo puede no resultar exhaustiva, a pesar de que periódicamente la presente política de cookies es revisada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;