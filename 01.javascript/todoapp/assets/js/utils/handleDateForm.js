export default function handleDateForm(date) {
  const dateForm = new Date(date);
  const year = dateForm.getFullYear();
  const month = dateForm.getMonth() + 1;
  const day = dateForm.getDate();
  return `${year}/${month}/${day}`;
}
