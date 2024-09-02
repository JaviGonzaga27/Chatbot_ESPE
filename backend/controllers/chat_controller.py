from flask import Blueprint, request, jsonify
from models.ai_model import AIModel
from models.data_model import DataModel

chat_bp = Blueprint('chat', __name__)
ai_model = AIModel()
data_model = DataModel()
respuesta_cache = {}

@chat_bp.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('question')
    print(f"Pregunta recibida: {user_input}")  # Registro de depuración
    
    if user_input in respuesta_cache:
        print("Respuesta encontrada en caché")
        return jsonify({'response': respuesta_cache[user_input]})
    
    query_embedding = ai_model.generate_embeddings_roberta([user_input]).reshape(1, -1)
    closest_indices, _ = ai_model.buscar_pregunta_similar(query_embedding)
    
    similar_questions, similar_answers = data_model.get_similar_questions_answers(closest_indices)
    
    best_answer = similar_answers[0]
    
    prompt = f"Pregunta del usuario: {user_input}\nPreguntas similares encontradas: {', '.join(similar_questions)}\nRespuestas asociadas: {', '.join(similar_answers)}\nRespuesta del chatbot:"
    
    ai_model.generate_embeddings_mpnet([prompt])  # Esto no cambia la respuesta, solo genera un embedding
    
    respuesta_cache[user_input] = best_answer
    
    print(f"Respuesta generada: {best_answer}")  # Registro de depuración
    return jsonify({'response': best_answer})