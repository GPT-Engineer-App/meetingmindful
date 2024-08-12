import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { useActionItems, useAddActionItem, useToggleActionItem } from "@/lib/api"

const ActionItems = () => {
  const [newItem, setNewItem] = useState('');
  const { data: actionItems, isLoading, isError } = useActionItems();
  const addActionItemMutation = useAddActionItem();
  const toggleActionItemMutation = useToggleActionItem();

  const addActionItem = () => {
    if (newItem.trim()) {
      addActionItemMutation.mutate(newItem);
      setNewItem('');
    }
  };

  const toggleActionItem = (id, completed) => {
    toggleActionItemMutation.mutate({ id, completed: !completed });
  };

  if (isLoading) return <div>Loading action items...</div>;
  if (isError) return <div>Error loading action items</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Action Items</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="New action item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button onClick={addActionItem} disabled={addActionItemMutation.isPending}>
          {addActionItemMutation.isPending ? 'Adding...' : 'Add'}
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        {actionItems.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => toggleActionItem(item.id, item.completed)}
              className="mr-2"
              disabled={toggleActionItemMutation.isPending}
            />
            <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ActionItems;
