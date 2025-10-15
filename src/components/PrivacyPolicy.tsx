import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy = ({ isOpen, onClose }: PrivacyPolicyProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">POLÍTICA DE PRIVACIDAD</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 prose max-w-none">
          <p>
            La Política de Privacidad forma parte de las Condiciones Generales que rigen la presente Web.
          </p>

          <h3>¿Quién es el responsable del tratamiento de tus datos?</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA</p>
            <p>CIF: Q3500374H</p>
            <p>Domicilio: C/ Secundino Alonso nº 98, 1º planta, Puerto del Rosario, 35600, Fuerteventura.</p>
            <p>Tfno: 928861070</p>
          </div>

          <p>
            Puedes dirigirte de cualquier forma para comunicarte con nosotros.
            Nos reservamos el derecho a modificar o adaptar la presente Política de Privacidad en cualquier momento. Te recomendamos revisar la misma, y si te has registrado y accedes a tu cuenta o perfil, se te informará de las modificaciones.
          </p>

          <p>Si eres alguno de los siguientes colectivos, consulta la información desplegable:</p>

          <div className="space-y-8">
            {/* CLIENTES */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ CLIENTES</h4>
              <h5>¿Con que finalidades vamos a tratar tus datos personales?</h5>
              <ul>
                <li>Elaboración del presupuesto y seguimiento del mismo mediante comunicaciones entre ambas partes.</li>
                <li>Información por medios electrónicos, que versen sobre tu solicitud.</li>
                <li>Información comercial o de eventos por medios electrónicos, siempre que exista autorización expresa.</li>
                <li>Gestionar los servicios administrativos, de comunicaciones y de logística realizados por el Responsable.</li>
                <li>Facturación y declaración de los impuestos oportunos.</li>
                <li>Realizar las transacciones que correspondan.</li>
                <li>Gestiones de control y recobro.</li>
              </ul>
            </div>

            {/* CONTACTOS DE LA WEB */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ CONTACTOS DE LA WEB O DEL CORREO ELECTRÓNICO</h4>
              <h5>¿Qué datos recopilamos a través de la Web?</h5>
              <p>
                Podemos tratar tu IP, qué sistema operativo o navegador usas, e incluso la duración de tu visita, de forma anónima.
                Si nos facilitas datos en el formulario de contacto, te identificarás para poder contactar contigo, en caso de que sea necesario.
              </p>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Contestar a tus consultas, solicitudes o peticiones.</li>
                <li>Gestionar el servicio solicitado, contestar tu solicitud, o tramitar tu petición.</li>
                <li>Información por medios electrónicos, que versen sobre tu solicitud.</li>
                <li>Información comercial o de eventos por medios electrónicos, siempre que exista autorización expresa.</li>
                <li>Realizar análisis y mejoras en la Web, sobre nuestros productos y servicios. Mejorar nuestra estrategia comercial.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de tus datos?</h5>
              <p>
                La aceptación y consentimiento del interesado, otorgado a través de una acción voluntaria, como en los casos donde para realizar una solicitud sea necesario cumplimentar un formulario y hacer un "click" en el botón de enviar, la realización del mismo implicará necesariamente que ha sido informado y ha otorgado expresamente su consentimiento al contenido de la cláusula anexada a dicho formulario o aceptación de la política de privacidad.
              </p>
              <p>
                Todos nuestros formularios cuentan con el símbolo * en los datos obligatorios. Si no facilitas esos campos, o no marcas el checkbox de aceptación de la política de privacidad, no se permitirá el envío de la información.
              </p>
            </div>

            {/* NEWSLETTER */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ CONTACTOS DE NEWSLETTER, COMUNICACIONES INFORMATIVAS Y COMERCIALES</h4>
              <h5>¿Qué datos tratamos en el envío de comunicaciones informativas?</h5>
              <p>
                Si está vinculado con nosotros por una relación contractual previa o si nos ha dado su consentimiento, podremos enviarle comunicaciones informativas a través de correo electrónico, sms y otras vías electrónicas de comunicación, sobre actividades, eventos, servicios y productos propios y de otras empresas de la isla, de acuerdo con las funciones de promoción comercial de productos, bienes y servicios de empresas que tiene esta entidad.
              </p>
              <p>
                Almacenaremos únicamente su email y número de teléfono en nuestra base de datos, y procederemos a enviarle mensajes periódicamente, hasta que solicite la baja, o dejemos de enviar mensajes.
              </p>
              <p>Siempre tendrá la opción de darse de baja, en cualquier comunicación.</p>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Información por medios electrónicos, que versen sobre su solicitud.</li>
                <li>Información informativa, comercial o de eventos por medios electrónicos.</li>
                <li>Realizar análisis y mejoras en el envío de mailing, para mejorar nuestra estrategia comercial.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de sus datos?</h5>
              <p>
                La legitimación para el tratamiento de sus datos se basa en un interés legítimo del responsable así como un su consentimiento expreso.
              </p>
            </div>

            {/* ENCUESTAS */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ ENCUESTAS DE CALIDAD</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Valorar el grado de calidad en el servicio dispensado.</li>
                <li>Mejorar los servicios ofrecidos.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de tus datos?</h5>
              <p>La base legal es el interés legítimo del responsable de mantener la calidad de sus servicios.</p>
              <h5>¿Durante cuánto tiempo vamos a mantener los datos personales?</h5>
              <p>Los datos se conservarán mientras dure el tratamiento.</p>
            </div>

            {/* PROVEEDORES */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ PROVEEDORES</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Información por medios electrónicos, que versen sobre tu solicitud.</li>
                <li>Información comercial o de eventos por medios electrónicos, siempre que exista autorización expresa.</li>
                <li>Gestionar los servicios administrativos, de comunicaciones y de logística realizados por el Responsable.</li>
                <li>Facturación.</li>
                <li>Realizar las transacciones que correspondan.</li>
                <li>Facturación y declaración de los impuestos oportunos.</li>
                <li>Gestiones de control y recobro.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de tus datos?</h5>
              <p>
                La base legal es la aceptación de una relación contractual, o en su defecto tu consentimiento al contactar con nosotros u ofrecernos sus productos por alguna vía.
              </p>
              <h5>¿Durante cuánto tiempo vamos a mantener los datos personales?</h5>
              <p>Durante la vigencia de las relaciones entre las partes y por los plazos de prescripción derivados de las mismas.</p>
            </div>

            {/* CANAL ÉTICO */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ CANAL ÉTICO</h4>
              <h5>¿Qué datos recopilamos a través del Canal Ético?</h5>
              <p>
                En caso de identificarse podremos recabar: nombre, apellido, email, teléfono y los datos personales de tercero/s que nos proporcione en la comunicación.
              </p>
              <h5>¿Con qué finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Gestionar las comunicaciones</li>
                <li>Adoptar las medidas correctivas correspondientes y,</li>
                <li>En caso de ser necesario, informarle sobre el resultado del procedimiento.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de tus datos?</h5>
              <p>La base legal es la obligación legal o, en su defecto, el interés público.</p>
            </div>

            {/* REDES SOCIALES */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ CONTACTOS REDES SOCIALES</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Contestar a sus consultas, solicitudes o peticiones.</li>
                <li>Gestionar el servicio solicitado, contestar su solicitud, o tramitar su petición.</li>
                <li>Relacionarnos con usted y crear una comunidad de seguidores.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de sus datos?</h5>
              <p>
                Las bases que legitiman el tratamiento es el consentimiento voluntario del interesado de ponerse en contacto y, en su caso, la aceptación de una relación contractual en el entorno de la red social que corresponda. El tratamiento de los datos dentro de la Red Social se realizará conforme a sus políticas de Privacidad.
              </p>
              <h5>¿Durante cuánto tiempo vamos a mantener los datos personales?</h5>
              <p>
                Sólo podemos consultar o dar de baja sus datos de forma restringida al tener un perfil específico. Los trataremos tanto tiempo como usted nos lo permita siguiéndonos, siendo amigos o dándole a "me gusta", "seguir" o botones similares.
              </p>
              <p>
                Cualquier rectificación de sus datos o restricción de información o de publicaciones debe realizarla a través de la configuración de su perfil o usuario en la propia red social.
              </p>
            </div>

            {/* AGENCIA DE COLOCACIÓN */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ SERVICIO DE AGENCIA DE COLOCACIÓN DE EMPLEO</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <p>
                Trataremos sus datos con la finalidad de ofrecerle nuestro servicio de intermediación laboral entre las ofertas y demandas de trabajo y, así, ponerle en contacto con empresas que están buscando contratar.
              </p>
              <h5>¿Cuál es la legitimación para el tratamiento de sus datos?</h5>
              <p>La base legal es su consentimiento inequívoco al realizar los trámites correspondientes</p>
              <h5>¿A quién comunicaremos sus datos personales?</h5>
              <p>
                Comunicaremos sus datos al Servicio Público de Empleo Estatal y los Servicios Públicos de la Comunidad Autónoma. También comunicaremos tus datos a aquellas empresas que estén buscando trabajadores para ayudarte a conseguir empleo.
              </p>
            </div>

            {/* ACTIVIDADES FORMATIVAS */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ ACTIVIDADES FORMATIVAS</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Gestionar su participación en el correspondiente curso o formación.</li>
                <li>Trámites administrativos de cobro de la actividad cuando esta no sea gratuita.</li>
                <li>Emisión del correspondiente diploma en su caso.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de sus datos?</h5>
              <p>
                La base legal para el tratamiento de sus datos es su consentimiento al realizar la inscripción en el curso o actividad formativa
              </p>
              <h5>¿A quién comunicaremos sus datos personales?</h5>
              <p>
                En algunos casos, colaboramos con Administraciones o Entidades Públicas para la impartición de la formación, por lo que es posible que tengamos que comunicarles datos personales de los participantes.
              </p>
            </div>

            {/* TALLERES Y EVENTOS */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ TALLERES, SEMINARIOS, JORNADAS Y OTROS EVENTOS INFORMATIVOS</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Gestionar tu participación en el evento.</li>
                <li>En su caso, proporcionarte el certificado de asistencia.</li>
                <li>Trámites administrativos de cobro de la actividad cuando esta no sea gratuita.</li>
                <li>Para el acceso al evento B2B se realizará a través del enlace https://africagua-water-and-renewable-energy.b2.match.io/signup y podrá acceder con el usuario registrado ó sus claves de usuario de Google o Linkedin.</li>
              </ul>
              <h5>¿Cuál es la legitimación para el tratamiento de sus datos?</h5>
              <p>
                La base legal para el tratamiento de sus datos es su consentimiento al realizar la inscripción en el taller, seminario, jornada o evento.
              </p>
            </div>

            {/* PROCESO ELECTORAL */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ PROCESO ELECTORAL</h4>
              <h5>¿Con qué finalidades vamos a tratar sus datos personales?</h5>
              <p>
                Trataremos los datos personales con la finalidad de gestionar el proceso electoral (candidatos, avalistas, miembros de la junta electoral, votos por correo).
              </p>
              <h5>¿Cuál es la legitimación para el tratamiento de tus datos?</h5>
              <p>
                La base legal para los tratamientos indicados con anterioridad es una obligación legal aplicada al responsable del tratamiento. Detallamos las siguientes bases legales:
              </p>
              <ul>
                <li>Ley 4/2014, de 1 de abril, Básica de las Cámaras Oficiales de Comercio, Industria, Servicios y Navegación.</li>
                <li>Real Decreto 669/2015, de 17 de julio, por el que se desarrolla la Ley 4/2014, de 1 de abril, Básica de las Cámaras Oficiales de Comercio, Industria, Servicios y Navegación.</li>
                <li>Ley 10/2019, de 25 de abril, de Cámaras Oficiales de Comercio, Industria, Servicios y Navegación de Canarias.</li>
              </ul>
            </div>

            {/* DEMANDANTES DE EMPLEO */}
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="font-bold">+ DEMANDANTES DE EMPLEO</h4>
              <h5>¿Con que finalidades vamos a tratar sus datos personales?</h5>
              <ul>
                <li>Organización de procesos de selección para la contratación de empleados.</li>
                <li>Citarte para entrevistas de trabajo y evaluar tu candidatura.</li>
                <li>Si nos has dado tu consentimiento, se lo podremos ceder a empresas colaboradoras o afines, con el único objetivo de ayudarte a encontrar empleo.</li>
                <li>Si aceptas la política de privacidad, nos das tu consentimiento para ceder tu solicitud de empleo a las entidades que componen el grupo de empresas con el objetivo de incluirte en sus procesos de selección de personal.</li>
              </ul>
              <p>
                Asimismo, te comunicamos que transcurrido un año desde la recepción de tu currículum vitae, procederemos a su destrucción segura.
              </p>
              <h5>¿Cuál es la legitimación para el tratamiento de tus datos?</h5>
              <p>
                La base legal, si presentas tu CV como candidatura espontánea, es tu consentimiento inequívoco, al enviarnos tu CV. Si estás en un proceso de selección lanzado por esta entidad y al que estás aplicando, la base jurídica es la ejecución de acciones precontractuales.
              </p>
              <h5>¿Durante cuánto tiempo vamos a mantener los datos personales?</h5>
              <p>
                Si aporta un CV para un puesto vacante publicado, tus datos serán tratados en marco del proceso de selección de dicha vacante y lo eliminaremos al finalizar el proceso si no ha sido escogido.
              </p>
              <p>
                Si aporta un CV en un buzón de candidaturas espontáneas o nuestro apartado de "trabaja con nosotros", conservaremos sus datos por el plazo de un año en base al consentimiento del interesado.
              </p>
            </div>
          </div>

          <h3>¿Qué medidas de seguridad aplicamos?</h3>
          <p>
            Hemos adoptado un nivel óptimo de protección de los Datos Personales que manejamos, y hemos instalado todos los medios y medidas técnicas a nuestra disposición según el estado de la tecnología para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los Datos Personales.
          </p>

          <p>
            Tus datos no se cederán a terceros, salvo obligación legal. En concreto se comunicarán a la Agencia Estatal de la Administración Tributaria y a bancos y entidades financieras para el cobro del servicio prestado o producto adquirido Como a los encargados del tratamiento necesarios para la ejecución del acuerdo.
          </p>

          <p>
            En caso de compra o pago, si eliges alguna aplicación, web, plataforma, tarjeta bancaria, o algún otro servicio online, tus datos se cederán a esa plataforma o se tratarán en su entorno, siempre con la máxima seguridad.
          </p>

          <p>
            Cuando se lo ordenemos, tendrán acceso a nuestra web la empresa de desarrollo y mantenimiento web, alojamiento web/hosting. Las mismas tendrán firmado un contrato de prestación de servicios que les obliga a mantener el mismo nivel de privacidad que nosotros.
          </p>

          <p>
            Podrán realizarse transferencias internacionales de datos al usarse aplicaciones americanas, no obstante, dichas transferencias se realizarán a las entidades que hayan demostrado que cumplen con el nivel de protección y garantías de acuerdo con los parámetros y exigencias previstas en la normativa vigente en materia de protección de datos, como el Reglamento Europeo, o cuando exista una habilitación legal para realizar la transferencia internacional.
          </p>

          <h3>¿Qué Derechos tienes?</h3>
          <ul>
            <li>A saber si estamos tratando tus datos o no.</li>
            <li>A acceder a tus datos personales.</li>
            <li>A solicitar la rectificación de tus datos si son inexactos.</li>
            <li>A solicitar la supresión de tus datos si ya no son necesarios para los fines para los que fueron recogidos o si nos retiras el consentimiento otorgado.</li>
            <li>A solicitar la limitación del tratamiento de sus datos, en algunos supuestos, en cuyo caso sólo los conservaremos de acuerdo con la normativa vigente.</li>
            <li>A portar tus datos, que te serán facilitados en un formato estructurado, de uso común o lectura mecánica. Si lo prefieres, se los podemos enviar al nuevo responsable que nos designes. Sólo es válido en determinados supuestos.</li>
            <li>A presentar una reclamación ante la Agencia Española de Protección de Datos o autoridad de control competente, si crees que no te hemos atendido correctamente.</li>
            <li>A revocar el consentimiento para cualquier tratamiento para el que hayas consentido, en cualquier momento.</li>
          </ul>

          <p>
            Si modificas algún dato, te agradecemos que nos lo comuniques para mantenerlos actualizados.
          </p>

          <h3>¿Quieres un formulario para el ejercicio de Derechos?</h3>
          <ul>
            <li>Tenemos formularios para el ejercicio de tus derechos, pídenoslos por email o si lo prefieres, puedes usar los elaborados por la Agencia Española de Protección de Datos o terceros.</li>
            <li>Las solicitudes deben ir firmados electrónicamente o aportar la identificación fehaciente de la persona que lo ejercita.</li>
            <li>Los formularios pueden ser presentados presencialmente, enviados por carta o por mail en la dirección del Responsable al inicio de este texto.</li>
          </ul>

          <h3>¿Cuánto tardamos en contestarte al Ejercicio de Derechos?</h3>
          <p>
            Depende del derecho, pero como máximo en un mes desde tu solicitud, y dos meses si el tema es muy complejo y te notificamos que necesitamos más tiempo.
          </p>

          <h3>¿Tratamos cookies?</h3>
          <p>
            Si usamos otro tipo de cookies que no sean las necesarias, podrás consultar la política de cookies en el enlace correspondiente desde el inicio de nuestra web.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;