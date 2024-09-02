# ChatBot ESPE

Este proyecto es un chatbot desarrollado para la Universidad de las Fuerzas Armadas ESPE, diseñado para responder preguntas frecuentes de los estudiantes y personal universitario.

## Contribuyentes
- Javier Gonzaga
- William León
- Francisco Terán

## Características

- Interfaz de chat en tiempo real
- Lista de preguntas frecuentes con búsqueda
- Respuestas generadas por IA utilizando modelos de lenguaje avanzados
- Diseño responsive y amigable

## Tecnologías Utilizadas

### Frontend
- React.js
- Tailwind CSS
- React Icons

### Backend
- Flask (Python)
- Transformers (Hugging Face)
- FAISS para búsqueda eficiente de similitud
- Pandas para manejo de datos

## Estructura del Proyecto
```
proyecto/
│
├── backend/
│   ├── app.py
│   ├── models/
│   │   ├── ai_model.py
│   │   └── data_model.py
│   ├── controllers/
│   │   ├── chat_controller.py
│   │   ├── test_controller.py
│   │   └── preguntas_controller.py
│   ├── modelo_entrenado/
│   ├── preguntas_embeddings.npy
│   ├── Preguntas_ESPE-1080.xlsx
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.js
│   │   │   ├── ChatInput.js
│   │   │   ├── ChatMessages.js
│   │   │   └── PreguntasList.js
│   │   ├── context/
│   │   │   └── ChatContext.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## Configuración del Proyecto

### Requisitos Previos
- Python 3.8 (py -3.8 --version)
- Node.js 14+
- npm 6+

### Configuración del Backend

1. Navega al directorio del backend:
cd backend

2. Crea un entorno virtual:
py -3.8 -m venv venv

3. Activa el entorno virtual:
- En Windows: `venv\Scripts\activate`
- En macOS y Linux: `source venv/bin/activate`

4. Instala las dependencias:
pip install -r requirements.txt

5. Inicia el servidor Flask:
python app.py (tambien puede funcionar flask --app app.py run)



### Configuración del Frontend

1. Navega al directorio del frontend:
cd frontend

2. Instala las dependencias:
npm install

3. Inicia la aplicación React:
npm start

## Uso

Una vez que tanto el backend como el frontend estén en funcionamiento, abre tu navegador y visita `http://localhost:3000`. Deberías ver la interfaz del chatbot. Puedes hacer preguntas directamente en el chat o seleccionar una de las preguntas frecuentes de la lista.
