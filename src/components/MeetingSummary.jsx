import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGenerateSummary } from "@/lib/api"

const MeetingSummary = () => {
  const { data: summary, isLoading, isError, refetch } = useGenerateSummary();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Meeting Summary</h2>
      <Button 
        onClick={() => refetch()} 
        className="mb-4" 
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Summary'}
      </Button>
      <ScrollArea className="flex-grow">
        {isError && <p className="text-red-500">Error generating summary. Please try again.</p>}
        {summary && <pre className="whitespace-pre-wrap">{summary}</pre>}
      </ScrollArea>
    </div>
  );
};

export default MeetingSummary;
