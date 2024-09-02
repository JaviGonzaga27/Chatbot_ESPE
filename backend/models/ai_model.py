import os
import numpy as np
import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification, AutoTokenizer, AutoModel
import faiss

class AIModel:
    def __init__(self):
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        modelo_entrenado_path = os.path.join(current_dir, 'modelo_entrenado')
        embeddings_path = os.path.join(current_dir, 'preguntas_embeddings.npy')

        self.tokenizer_roberta = RobertaTokenizer.from_pretrained(modelo_entrenado_path)
        self.model_roberta = RobertaForSequenceClassification.from_pretrained(modelo_entrenado_path)
        self.model_roberta.eval()

        self.preguntas_embeddings = np.load(embeddings_path)
        d = self.preguntas_embeddings.shape[1]
        self.index = faiss.IndexFlatL2(d)
        self.index.add(self.preguntas_embeddings)

        self.tokenizer_mpnet = AutoTokenizer.from_pretrained("microsoft/mpnet-base")
        self.model_mpnet = AutoModel.from_pretrained("microsoft/mpnet-base")
        self.model_mpnet.eval()

    def generate_embeddings_roberta(self, text_list):
        embeddings = []
        for text in text_list:
            inputs = self.tokenizer_roberta(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
            inputs = {key: value.to('cuda' if torch.cuda.is_available() else 'cpu') for key, value in inputs.items()}
            with torch.no_grad():
                outputs = self.model_roberta(**inputs)
            embeddings.append(outputs.logits.cpu().numpy().flatten())
        return np.array(embeddings)

    def generate_embeddings_mpnet(self, text_list):
        embeddings = []
        for text in text_list:
            inputs = self.tokenizer_mpnet(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
            inputs = {key: value.to('cuda' if torch.cuda.is_available() else 'cpu') for key, value in inputs.items()}
            with torch.no_grad():
                outputs = self.model_mpnet(**inputs)
            cls_embedding = outputs.last_hidden_state[:, 0, :].cpu().numpy()
            embeddings.append(cls_embedding.flatten())
        return np.array(embeddings)

    def buscar_pregunta_similar(self, query_embedding, k=3):
        distances, indices = self.index.search(query_embedding, k)
        return indices[0], distances[0]