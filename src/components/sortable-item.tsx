import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps extends React.HTMLProps<HTMLDivElement> {
  id: string;
  gripIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function SortableItem({id, gripIcon, children, ...props}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      {...props} 
      {...attributes} 
      {...listeners}
      style={style} 
      role="listitem"
    >
      {gripIcon}{children}
    </div>
  );
};