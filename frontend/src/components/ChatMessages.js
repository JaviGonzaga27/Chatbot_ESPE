import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function ChatMessages({ chatContainerRef }) {
  const { chatHistory, isLoading } = useContext(ChatContext);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-grow overflow-y-auto p-4 space-y-4"
    >
      {chatHistory.map((item, index) => (
        <div 
          key={index} 
          className={`p-3 rounded-lg max-w-[80%] ${
            item.type === 'question' 
              ? 'bg-[#04743c] text-white ml-auto' 
              : 'bg-[#e4e8e7] text-[#04743c] mr-auto'
          }`}
        >
          <p className="text-sm">
            {item.text}
          </p>
        </div>
      ))}
      {isLoading && (
        <div className="text-center text-[#258354]">
          <p>Cargando respuesta...</p>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;