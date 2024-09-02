import React from 'react';
import Chat from './components/Chat';
import PreguntasList from './components/PreguntasList';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <div className="flex justify-center h-screen bg-[#e4e8e7]">
        <div className="flex w-full max-w-6xl bg-white shadow-lg">
          <PreguntasList />
          <Chat />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;