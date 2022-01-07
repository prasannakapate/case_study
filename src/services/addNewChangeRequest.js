export default function addNewChangeRequest(inputData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputData),
  };

  return fetch(
    'https://mocki.io/v1/bee7c3c2-a900-42c4-b746-fe81096bcc32',
    requestOptions
  );
}
