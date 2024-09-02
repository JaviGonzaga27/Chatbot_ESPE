import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ChatContext } from '../context/ChatContext';

function PreguntasList() {
  const { showQuestions, preguntas, searchTerm, setSearchTerm, handleSendClick } = useContext(ChatContext);

  const filteredPreguntas = preguntas.filter(pregunta =>
    pregunta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`transition-all duration-300 ease-in-out ${showQuestions ? 'w-1/3' : 'w-0'} border-r border-[#70ac8f] overflow-hidden`}>
      <div className="p-4 h-full flex flex-col">
        <img src="logoESCUDO.png" alt="Logo ESPE" className="w-20 mb-4" />
        <h2 className="text-lg font-semibold mb-4 text-[#04743c]">Preguntas Frecuentes</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar preguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pr-10 border border-[#70ac8f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258354]"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#70ac8f]" />
        </div>
        <div className="overflow-y-auto flex-grow">
          {filteredPreguntas.map((pregunta, index) => (
            <button
              key={index}
              onClick={() => handleSendClick(pregunta)}
              className="w-full text-left p-2 mb-2 bg-[#e4e8e7] hover:bg-[#70ac8f] hover:text-white rounded-lg text-[#04743c] transition-colors duration-200"
            >
              {pregunta}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreguntasList;