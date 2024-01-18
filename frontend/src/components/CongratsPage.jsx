function CongratsPage({ login, password, email }) {
  console.log(login, password);
  return (
    <div className="flex h-full justify-center items-center font-bold text-5xl p-10 text-center">
      <h1> Twój wniosek został pomyślnie złożony</h1>
      <h2> Oczekuj na weryfikację przez pracownika urzędu gminy</h2>
      <p>
        Informacje o utworzonym koncie zostały przesłane droga elektroniczna na
        mail: {email}
      </p>
    </div>
  );
}

export default CongratsPage;
