import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

const ActionItems = () => {
  const [actionItems, setActionItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addActionItem = () => {
    if (newItem.trim()) {
      setActionItems([...actionItems, { text: newItem, completed: false }]);
      setNewItem('');
    }
  };

  const toggleActionItem = (index) => {
    const updatedItems = [...actionItems];
    updatedItems[index].completed = !updatedItems[index].completed;
    setActionItems(updatedItems);
  };

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
        <Button onClick={addActionItem}>Add</Button>
      </div>
      <ScrollArea className="flex-grow">
        {actionItems.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => toggleActionItem(index)}
              className="mr-2"
            />
            <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ActionItems;
