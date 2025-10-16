// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referencia a la ubicación de la encuesta en la base de datos
const pollRef = database.ref('poll');

// Manejar el envío del formulario
const pollForm = document.getElementById('poll-form');
pollForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const option = document.querySelector('input[name="option"]:checked').value;
  submitVote(option);
});

// Función para enviar el voto a Firebase
function submitVote(option) {
  pollRef.child(option).transaction((currentValue) => {
    return (currentValue || 0) + 1;
  });
}

// Actualizar los resultados en tiempo real
pollRef.on('value', (snapshot) => {
  const results = snapshot.val();
  updateResults(results);
});

// Función para actualizar la sección de resultados
function updateResults(results) {
  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = '';
  for (let option in results) {
    const li = document.createElement('li');
    li.textContent = `${option}: ${results[option]} votos`;
    resultsList.appendChild(li);
  }
}
