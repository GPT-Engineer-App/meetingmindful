import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateSummary = async () => {
  await delay(1500); // Simulate API delay
  return `
    Meeting Summary:
    1. Project status update: On track
    2. New feature implementation: Agreed on priorities
    3. Budget review for Q3: Approved with minor adjustments
    4. Team performance evaluation: Overall positive
    5. Next steps: Follow up on action items
  `;
};

const fetchActionItems = async () => {
  await delay(1000);
  return [
    { id: 1, text: "Review project timeline", completed: false },
    { id: 2, text: "Schedule team building event", completed: true },
    { id: 3, text: "Update budget spreadsheet", completed: false },
  ];
};

const addActionItem = async (newItem) => {
  await delay(500);
  return { id: Date.now(), text: newItem, completed: false };
};

const toggleActionItem = async ({ id, completed }) => {
  await delay(500);
  return { id, completed };
};

// React Query hooks
export const useGenerateSummary = () => {
  return useQuery({
    queryKey: ["meetingSummary"],
    queryFn: generateSummary,
    enabled: false, // Don't run automatically
  });
};

export const useActionItems = () => {
  return useQuery({
    queryKey: ["actionItems"],
    queryFn: fetchActionItems,
  });
};

export const useAddActionItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addActionItem,
    onSuccess: (newItem) => {
      queryClient.setQueryData(["actionItems"], (oldItems) => [...oldItems, newItem]);
    },
  });
};

export const useToggleActionItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleActionItem,
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(["actionItems"], (oldItems) =>
        oldItems.map((item) =>
          item.id === updatedItem.id ? { ...item, completed: updatedItem.completed } : item
        )
      );
    },
  });
};
