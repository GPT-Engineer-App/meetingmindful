import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const MeetingSummary = () => {
  const [summary, setSummary] = useState('');

  const generateSummary = () => {
    // TODO: Implement API call to generate summary
    const dummySummary = `
      Meeting Summary:
      1. Project status update
      2. Discussion on new feature implementation
      3. Budget review for Q3
      4. Team performance evaluation
      5. Next steps and action items
    `;
    setSummary(dummySummary);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Meeting Summary</h2>
      <Button onClick={generateSummary} className="mb-4">Generate Summary</Button>
      <ScrollArea className="flex-grow">
        <pre className="whitespace-pre-wrap">{summary}</pre>
      </ScrollArea>
    </div>
  );
};

export default MeetingSummary;
