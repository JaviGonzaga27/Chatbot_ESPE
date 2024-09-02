import React, { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch('/api/preguntas')
      .then(response => response.json())
      .then(data => setPreguntas(data.preguntas))
      .catch(error => console.error('Error al obtener preguntas:', error));
  }, []);

  const handleSendClick = async (inputQuestion = userInput) => {
    if (!inputQuestion.trim() || isLoading) return;

    const newQuestion = { type: 'question', text: inputQuestion };
    setChatHistory(prev => [...prev, newQuestion]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputQuestion }),
      });

      if (!res.ok) {
        throw new Error('Error en la solicitud: ' + res.statusText);
      }

      const data = await res.json();
      const newResponse = { type: 'answer', text: data.response };
      setChatHistory(prev => [...prev, newResponse]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Hubo un problema al comunicarse con el servidor.';
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
      }
      const errorResponse = { type: 'answer', text: errorMessage };
      setChatHistory(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }

    setUserInput('');
  };

  return (
    <ChatContext.Provider value={{
      userInput,
      setUserInput,
      chatHistory,
      isLoading,
      preguntas,
      searchTerm,
      setSearchTerm,
      showQuestions,
      setShowQuestions,
      handleSendClick
    }}>
      {children}
    </ChatContext.Provider>
  );
};