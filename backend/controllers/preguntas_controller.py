from flask import Blueprint, jsonify
from models.data_model import DataModel

preguntas_bp = Blueprint('preguntas', __name__)
data_model = DataModel()

@preguntas_bp.route('/preguntas', methods=['GET'])
def get_preguntas():
    preguntas = data_model.get_preguntas()
    return jsonify({'preguntas': preguntas})