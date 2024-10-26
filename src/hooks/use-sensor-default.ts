import { isMobile } from "@/lib/is-mobile";
import { KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export function useSensorDefault() {
  const sensors = useSensors(
    useSensor(isMobile() ? TouchSensor : PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return sensors;
}