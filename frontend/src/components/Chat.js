import React, { useRef, useEffect, useContext } from 'react';
import { FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import { ChatContext } from '../context/ChatContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

function Chat() {
  const { showQuestions, setShowQuestions, chatHistory} = useContext(ChatContext);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={`flex flex-col transition-all duration-300 ease-in-out ${showQuestions ? 'w-2/3' : 'w-full'}`}>
      <div className="p-4 flex justify-between items-center border-b border-[#70ac8f]">
        {!showQuestions && <img src="logoESPE.png" alt="Logo ESPE" className="h-20" />}
        <button
          onClick={() => setShowQuestions(!showQuestions)}
          className="text-[#04743c] p-2 rounded-full hover:bg-[#e4e8e7] transition-colors duration-200"
        >
          {showQuestions ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <ChatMessages chatContainerRef={chatContainerRef} />
      <ChatInput />
    </div>
  );
}

export default Chat;