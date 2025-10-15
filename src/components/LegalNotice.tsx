import React from 'react';
import { X } from 'lucide-react';

interface LegalNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalNotice = ({ isOpen, onClose }: LegalNoticeProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">AVISO LEGAL</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 prose max-w-none">
          <p>
            Las presentes Condiciones tienen por objeto establecer y regular las normas de uso de la página web https://camaradefuerteventura.org (en adelante, la "Web").
          </p>
          <p>
            El acceso y la navegación en el sitio web, o el uso de los servicios del mismo, implican la aceptación expresa e íntegra de todas y cada una de las presentes Condiciones Generales de uso recogidas en este Aviso Legal, incluidas las Condiciones Generales y Particulares de Contratación así como la Política de Privacidad y Cookies, relativa a las finalidades de los tratamientos de los datos que nos facilites. Por favor, te recomendamos que las leas atentamente.
          </p>

          <h3>1. TITULAR</h3>
          <p>
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, los datos identificativos del titular del Portal Web en el que estás navegando son:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA</p>
            <p>CIF: Q3500374H</p>
            <p>C/ Secundino Alonso, nº 98, 1º planta, Puerto del Rosario, 35600, Fuerteventura.</p>
          </div>

          <h3>2. PROPIEDAD INTELECTUAL</h3>
          <p>
            CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA es titular, y tiene la correspondiente licencia, sobre los derechos de explotación de propiedad intelectual e industrial de la Web.
          </p>
          <p>
            Todos los contenidos de la Web, incluyendo el diseño gráfico, código fuente, logos, textos, gráficos, ilustraciones, fotografías, y demás elementos que aparecen en la Web, salvo que se indique lo contrario, son titularidad exclusiva de CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA.
          </p>
          <p>
            En ningún caso se entenderá que el acceso y navegación del Usuario implica una renuncia, transmisión, licencia o cesión total ni parcial de dichos derechos por parte de CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA, sobre cualquier otro derecho relacionado con su Web y los servicios ofrecidos en la misma.
          </p>
          <p>
            Asimismo, está prohibido modificar, copiar, reutilizar, explotar, reproducir, comunicar públicamente, hacer segundas o posteriores publicaciones, cargar archivos, enviar por correo, transmitir, usar, tratar o distribuir de cualquier forma la totalidad o parte de los contenidos incluidos en la Web para propósitos públicos o comerciales, si no se cuenta con la autorización expresa y por escrito de CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA o, en su caso, del titular de los derechos a que corresponda.
          </p>
          <p>
            El Usuario reconoce, en consecuencia, que la reproducción, distribución, comercialización, transformación, y en general, cualquier otra forma de explotación, por cualquier procedimiento, de todo o parte de los contenidos de esta Web constituye una infracción de los derechos de propiedad intelectual y/o industrial del titular de la Web o del titular de los mismos.
          </p>

          <h3>3. UTILIZACIÓN DE LA PÁGINA</h3>
          <p>
            El Usuario se compromete a utilizar la Web, los contenidos y servicios de conformidad con la legalidad vigente y el presente Aviso Legal.
          </p>
          <p>
            Del mismo modo, el Usuario se obliga a no utilizar la Web o los servicios que se presten a través de ella con fines o efectos ilícitos o contrarios al contenido del presente Aviso Legal, lesivos de los intereses o derechos de terceros, o que de cualquier forma puedan dañar, inutilizar o deteriorar la Web o sus servicios, o impedir un normal disfrute de la Web por otros Usuarios.
          </p>
          <p>
            Asimismo, el Usuario se compromete expresamente a no destruir, alterar, inutilizar o, de cualquier otra forma, dañar los datos, programas o documentos electrónicos y demás que se encuentren en la presente Web.
          </p>
          <p>
            El Usuario se compromete a no obstaculizar el acceso de otros Usuarios al servicio de acceso mediante el consumo masivo de los recursos informáticos a través de los cuales el titular de la Web presta el servicio, así como a no realizar acciones que dañen, interrumpan o generen errores en dichos sistemas.
          </p>
          <p>
            El Usuario se compromete a no introducir programas, virus, macros, applets, controles ActiveX o cualquier otro dispositivo lógico o secuencia de caracteres que causen o sean susceptibles de causar cualquier tipo de alteración en los sistemas informáticos del titular de la Web o de terceros.
          </p>
          <p>
            El Usuario es responsable de la adecuada custodia y confidencialidad de cualesquiera identificadores y/o contraseñas que le sean suministradas por la Web, y se compromete a no ceder su uso a terceros, ya sea temporal o permanente, ni a permitir su acceso a personas ajenas.
          </p>
          <p>
            Será responsabilidad del Usuario la utilización ilícita de los servicios por cualquier tercero ilegítimo que emplee a tal efecto una contraseña a causa de una utilización no diligente o de la pérdida de la misma por el Usuario.
          </p>
          <p>
            En virtud de lo anterior, es obligación del Usuario notificar de forma inmediata a los gestores de la Web, cualquier hecho que permita el uso indebido de los identificadores y/o contraseñas, tales como el robo, extravío, o el acceso no autorizado a los mismos, con el fin de proceder a su inmediata cancelación.
          </p>
          <p>
            Mientras no se comuniquen tales hechos, CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA quedará eximida de cualquier responsabilidad que pudiera derivarse del uso indebido de los identificadores o contraseñas por terceros no autorizados.
          </p>

          <h3>4. FUNCIONAMIENTO DE LA WEB</h3>
          <p>
            CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA excluye toda responsabilidad que se pudiera derivar de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento operativo del sistema electrónico, motivado por causas ajenas al titular de la Web.
          </p>
          <p>
            Asimismo, CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA también excluye cualquier responsabilidad que pudiera derivarse por retrasos o bloqueos en el funcionamiento operativo de este sistema electrónico causado por deficiencias o sobrecarga en las líneas telefónicas o en Internet, así como de daños causados por terceras personas mediante intromisiones ilegítimas fuera del control de CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA.
          </p>
          <p>
            CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA está facultada para suspender temporalmente, y sin previo aviso, el acceso a la Web con motivo de operaciones de mantenimiento, reparación, actualización o mejora.
          </p>

          <h3>5. RÉGIMEN DE RESPONSABILIDAD</h3>
          <p>
            CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA no garantiza la licitud, fiabilidad, utilidad, veracidad o exactitud de los servicios o de la información que se presten por terceros a través de la Web.
          </p>
          <p>
            El Usuario es el único responsable de las infracciones en las que pueda incurrir o de los perjuicios que pueda causar por la mala utilización de la Web, quedando CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA, sus socios, empresas del grupo, colaboradores, empleados y representantes, exonerados de cualquier clase de responsabilidad que se pudiera derivar por las acciones del Usuario.
          </p>
          <p>
            CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA empleará todos los esfuerzos y medios razonables para facilitar información actualizada y fehaciente en la Web, no obstante, el titular de la Web no garantiza la inexistencia de errores, o de posibles inexactitudes y/u omisiones en los contenidos publicados por terceros accesibles a través de esta Web.
          </p>
          <p>
            El Usuario es el único responsable frente a cualquier reclamación o acción legal, judicial o extrajudicial, iniciada por terceras personas contra el titular de la Web basada en una mala utilización por parte del Usuario de la Web. En su caso, el Usuario asumirá cuantos gastos, costes e indemnizaciones sean solicitados a CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA con motivo de tales reclamaciones o acciones legales.
          </p>

          <h3>6. JURISDICCIÓN Y LEY APLICABLE</h3>
          <p>
            El presente Aviso Legal se regirá e interpretará conforme a la legislación española.
          </p>
          <p>
            CÁMARA OFICIAL DE COMERCIO, INDUSTRIA, SERVICIOS Y NAVEGACIÓN DE FUERTEVENTURA y el Usuario, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten a los Juzgados y Tribunales de la ciudad de Las Palmas de Gran Canaria, Las Palmas (España), salvo que la normativa aplicable según el caso impida a las partes someterse a un fuero específico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;