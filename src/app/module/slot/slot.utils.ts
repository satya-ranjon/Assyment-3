interface IGenerateSlotsOptions {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

function generateSlots({
  startTime,
  endTime,
  slotDuration,
}: IGenerateSlotsOptions): { startTime: string; endTime: string }[] {
  // Convert times to minutes since midnight
  const startMinutes = convertTimeToMinutes(startTime);
  const endMinutes = convertTimeToMinutes(endTime);

  // Calculate total duration
  const totalDuration = endMinutes - startMinutes;

  // Calculate number of slots
  const numberOfSlots = Math.ceil(totalDuration / slotDuration);

  // Generate slot time intervals
  const slots: { startTime: string; endTime: string }[] = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = addMinutes(startTime, i * slotDuration);
    const slotEndTime = addMinutes(startTime, (i + 1) * slotDuration);
    slots.push({ startTime: slotStartTime, endTime: slotEndTime });
  }

  return slots;
}

function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}

function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(":");
  const totalMinutes = parseInt(hours) * 60 + parseInt(mins) + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMins = totalMinutes % 60;
  return `${newHours.toString().padStart(2, "0")}:${newMins
    .toString()
    .padStart(2, "0")}`;
}

export default generateSlots;
