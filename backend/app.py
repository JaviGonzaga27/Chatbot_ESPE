from flask import Flask, request, jsonify
from flask_cors import CORS
from controllers.chat_controller import chat_bp
from controllers.test_controller import test_bp
from controllers.preguntas_controller import preguntas_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Registrar blueprints
app.register_blueprint(chat_bp, url_prefix='/api')
app.register_blueprint(test_bp, url_prefix='/api')
app.register_blueprint(preguntas_bp, url_prefix='/api')

# Manejador de errores global
@app.errorhandler(Exception)
def handle_error(e):
    print(f"Ocurrió un error: {str(e)}")
    return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)