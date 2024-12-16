// Función para obtener el estado del rastreo desde AfterShip
async function trackPackage(trackingNumber) {
  const apiKey = 'asat_829733ce84e1424faac8a1f358c5c156'; // Tu API Key de AfterShip
  const url = `https://api.aftership.com/v4/trackings/${trackingNumber}`;  // URL de la API de rastreo

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'aftership-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.meta.code === 200) {
      const trackingInfo = data.data.tracking;
      const location = trackingInfo.trackings[0].location || 'Ubicación no disponible';
      const status = trackingInfo.trackings[0].status;
      const lastUpdate = trackingInfo.trackings[0].checkpoint.time;

      // Muestra la información en la página
      document.getElementById('trackingInfo').style.display = 'block';
      document.getElementById('trackingInfo').innerHTML = `
        <h3>Estado del Paquete:</h3>
        <p><strong>Ubicación:</strong> ${location}</p>
        <p><strong>Estado:</strong> ${status}</p>
        <p><strong>Última Actualización:</strong> ${lastUpdate}</p>
      `;
    } else {
      alert('No se pudo obtener la información del paquete. Intenta nuevamente.');
    }
  } catch (error) {
    console.error('Error al rastrear el paquete:', error);
    alert('Error al rastrear el paquete.');
  }
}

// Evento para ejecutar la función cuando el formulario sea enviado
document.getElementById('trackingForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const trackingNumber = document.getElementById('trackingNumber').value;
  if (trackingNumber) {
    trackPackage(trackingNumber);
  }
});