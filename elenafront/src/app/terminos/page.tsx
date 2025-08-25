"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumbs />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-8">
              📋 Términos y Condiciones - Elena Benítez Peluquería
            </h1>
            
            <div className="bg-gray-50 border-l-4 border-amber-500 p-6 mb-8">
              <p className="text-sm text-gray-700 mb-0">
                <strong>Última actualización:</strong> Agosto 2025<br />
                <strong>Aplicable a:</strong> Elena Benítez - Peluquería Profesional Luque, Paraguay
              </p>
            </div>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                1. Información del Establecimiento
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Razón Social:</strong> Elena Benítez - Belleza Integral<br />
                <strong>Ubicación:</strong> c/ Sportivo Luqueño y Moisés Bertoni, Luque, Paraguay<br />
                <strong>Teléfono:</strong> +595 991 743889<br />
                <strong>Especialidad:</strong> Servicios de peluquería y belleza integral
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                2. Servicios Ofrecidos
              </h2>
              <p className="text-gray-700 mb-4">
                Elena Benítez ofrece servicios profesionales de belleza que incluyen:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Maquillaje profesional para eventos y ocasiones especiales</li>
                <li>Tratamientos capilares: lavados, cortes, coloración, alisados</li>
                <li>Diseño y perfilado profesional de cejas</li>
                <li>Servicios de manicura y pedicura</li>
                <li>Extensiones de uñas acrílicas</li>
                <li>Depilación profesional</li>
                <li>Servicios a domicilio (área de cobertura: 15km desde Luque)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                3. Reservas y Citas
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Horarios de atención:</strong> Lunes a Sábado de 8:00 a 18:00 horas</li>
                <li><strong>Reservas:</strong> Se recomienda reservar cita previa vía WhatsApp o llamada telefónica</li>
                <li><strong>Cancelaciones:</strong> Se solicita avisar con al menos 2 horas de anticipación</li>
                <li><strong>No show:</strong> Las citas no canceladas pueden generar cargos del 30% del servicio</li>
                <li><strong>Reprogramación:</strong> Permitida hasta 24 horas antes de la cita</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                4. Políticas de Pago
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Formas de pago:</strong> Efectivo y transferencias bancarias</li>
                <li><strong>Moneda:</strong> Guaraníes paraguayos (PYG)</li>
                <li><strong>Servicios a domicilio:</strong> Pago al finalizar el servicio</li>
                <li><strong>Paquetes:</strong> Descuentos disponibles para múltiples servicios</li>
                <li><strong>Precios:</strong> Sujetos a cambios, consultar tarifas actualizadas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                5. Responsabilidades del Cliente
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Informar sobre alergias, sensibilidades o condiciones médicas relevantes</li>
                <li>Llegar puntualmente a las citas programadas</li>
                <li>Mantener un comportamiento respetuoso hacia el personal y otros clientes</li>
                <li>Seguir las indicaciones post-tratamiento proporcionadas</li>
                <li>Avisar sobre embarazo o lactancia antes de cualquier tratamiento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                6. Responsabilidades del Establecimiento
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Proporcionar servicios profesionales con productos de calidad</li>
                <li>Mantener estrictas normas de higiene y bioseguridad</li>
                <li>Utilizar instrumentos esterilizados y desinfectados</li>
                <li>Contar con profesionales capacitados y experimentados</li>
                <li>Informar sobre los cuidados post-tratamiento necesarios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                7. Privacidad y Datos Personales
              </h2>
              <p className="text-gray-700 mb-4">
                Elena Benítez se compromete a proteger la privacidad de sus clientes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Los datos personales se utilizan únicamente para brindar el servicio</li>
                <li>No compartimos información con terceros sin consentimiento</li>
                <li>Las fotografías requieren autorización previa del cliente</li>
                <li>Derecho a solicitar eliminación de datos personales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                8. Limitaciones de Responsabilidad
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>No nos hacemos responsables por reacciones alérgicas no informadas previamente</li>
                <li>Los resultados pueden variar según el tipo de cabello/piel de cada persona</li>
                <li>No garantizamos la duración exacta de tratamientos (depende del cuidado posterior)</li>
                <li>El cliente asume responsabilidad por información incorrecta proporcionada</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                9. Contacto y Consultas
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Para consultas sobre estos términos y condiciones, contactanos:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>📱 WhatsApp:</strong> +595 991 743889</li>
                  <li><strong>📍 Dirección:</strong> c/ Sportivo Luqueño y Moisés Bertoni, Luque</li>
                  <li><strong>🕒 Horarios:</strong> Lunes a Sábado 8:00-18:00</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                10. Modificaciones
              </h2>
              <p className="text-gray-700">
                Elena Benítez se reserva el derecho de modificar estos términos y condiciones en cualquier momento. 
                Las modificaciones serán comunicadas a través de nuestros canales oficiales y entrarán en vigencia 
                inmediatamente después de su publicación.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-center text-gray-600 text-sm">
                Al utilizar nuestros servicios, el cliente acepta estos términos y condiciones en su totalidad.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
