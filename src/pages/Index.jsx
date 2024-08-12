import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Video, FileText, List, Send } from 'lucide-react';
import MeetingSummary from '@/components/MeetingSummary';
import ActionItems from '@/components/ActionItems';

const Index = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('meeting');

  const handleSendMessage = () => {
    // TODO: Implement sending message to backend
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-center">MeetingMind</h1>
      </header>
      <main className="flex-grow flex">
        <div className="w-3/4 p-4">
          {activeTab === 'meeting' && (
            <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
              <div className="flex-grow overflow-y-auto mb-4">
                {/* Meeting content will be displayed here */}
                <p className="text-gray-500 text-center mt-8">Join a meeting to see content here</p>
              </div>
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Ask a question or give a command..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {activeTab === 'summary' && <MeetingSummary />}
          {activeTab === 'actionItems' && <ActionItems />}
        </div>
        <div className="w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-xl font-semibold mb-4">Meeting Controls</h2>
            <div className="space-y-4">
              <Button className="w-full">
                <Mic className="mr-2 h-4 w-4" /> Join Audio
              </Button>
              <Button className="w-full">
                <Video className="mr-2 h-4 w-4" /> Join Video
              </Button>
              <Button className="w-full" onClick={() => setActiveTab('meeting')}>
                <Video className="mr-2 h-4 w-4" /> Meeting
              </Button>
              <Button className="w-full" onClick={() => setActiveTab('summary')}>
                <FileText className="mr-2 h-4 w-4" /> View Summary
              </Button>
              <Button className="w-full" onClick={() => setActiveTab('actionItems')}>
                <List className="mr-2 h-4 w-4" /> Action Items
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
