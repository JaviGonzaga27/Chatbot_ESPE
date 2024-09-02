import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os

class DataModel:
    def __init__(self):
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        preguntas_path = os.path.join(current_dir, 'Preguntas_ESPE-1080.xlsx')
        self.df_test = pd.read_excel(preguntas_path)
        self.df_test = self.df_test.rename(columns={"Pregunta": "text", "Respuesta": "labels"})
        self.label_encoder = LabelEncoder()
        self.df_test['labels'] = self.label_encoder.fit_transform(self.df_test['labels'])

    def get_preguntas(self):
        return self.df_test['text'].tolist()

    def get_similar_questions_answers(self, indices):
        similar_questions = [self.df_test.iloc[idx]['text'] for idx in indices]
        similar_answers = [self.label_encoder.inverse_transform([self.df_test.iloc[idx]['labels']])[0] for idx in indices]
        return similar_questions, similar_answers