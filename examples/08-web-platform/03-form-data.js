const formData = new FormData();

formData.append("name", "Osama Abu Motlaq");
formData.append("email", "osama@example.com");
formData.append("message", "Hello from JavaScript");

for (const [key, value] of formData.entries()) {
  console.log(key, value);
}