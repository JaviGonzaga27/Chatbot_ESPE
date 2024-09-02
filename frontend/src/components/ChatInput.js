import React, { useContext } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { ChatContext } from '../context/ChatContext';

function ChatInput() {
  const { userInput, setUserInput, handleSendClick, isLoading } = useContext(ChatContext);

  return (
    <div className="p-4 border-t border-[#70ac8f]">
      <div className="flex space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendClick()}
          placeholder="Escribe tu pregunta"
          className="flex-grow px-4 py-2 text-[#04743c] border border-[#70ac8f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258354]"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSendClick()}
          className={`px-4 py-2 text-white bg-[#04743c] rounded-lg hover:bg-[#258354] focus:outline-none focus:ring-2 focus:ring-[#70ac8f] focus:ring-opacity-50 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;