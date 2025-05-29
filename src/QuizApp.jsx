import { useState, useEffect } from "react";

export default function QuizApp() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timer, setTimer] = useState(300); // 5 menit dalam detik
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedQuizState = localStorage.getItem("quizState");
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        if (savedQuizState) {
          try {
            const parsedState = JSON.parse(savedQuizState);
            setQuizData(parsedState.quizData);
            setCurrentQuestion(parsedState.currentQuestion);
            setScore(parsedState.score);
            setAnswered(parsedState.answered);
            setTimer(parsedState.timer);
            setScreen("quiz");
            setIsTimerRunning(true);
          } catch (e) {
            console.error("Error parsing saved quiz state:", e);
          }
        } else {
          setScreen("home");
        }
      } catch (e) {
        console.error("Error parsing saved user:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (screen === "quiz" && quizData && !quizEnded) {
      const quizState = {
        quizData,
        currentQuestion,
        score,
        answered,
        timer,
      };
      localStorage.setItem("quizState", JSON.stringify(quizState));
    }
  }, [quizData, currentQuestion, score, answered, timer, screen, quizEnded]);

  useEffect(() => {
    let interval;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && screen === "quiz") {
      endQuiz();
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer, screen]);

  const handleLogin = (username, password) => {
    setIsLoading(true);
    setTimeout(() => {
      if (username && password) {
        const userData = { username, loggedIn: true };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setScreen("home");
        setErrorMessage("");
      } else {
        setErrorMessage("Username dan password harus diisi!");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setQuizData(null);
    setScreen("login");
    localStorage.removeItem("user");
    localStorage.removeItem("quizState");
  };

  const fetchQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const data = await response.json();

      if (data.response_code === 0) {
        const formattedQuestions = data.results.map((q) => {
          const answers = [...q.incorrect_answers, q.correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((answer) => ({
              text: answer,
              isCorrect: answer === q.correct_answer,
            }));

          return {
            question: q.question,
            answers,
            category: q.category,
            difficulty: q.difficulty,
            correct_answer: q.correct_answer,
          };
        });

        setQuizData(formattedQuestions);
        setCurrentQuestion(0);
        setScore(0);
        setAnswered(0);
        setTimer(300);
        setQuizEnded(false);
        setScreen("quiz");
        setIsTimerRunning(true);
      } else {
        throw new Error("Error fetching quiz data");
      }
    } catch (error) {
      setErrorMessage("Gagal mengambil data kuis. Silakan coba lagi.");
      console.error("Error fetching quiz data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswered((prevAnswered) => prevAnswered + 1);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      endQuiz();
    }
  };

  const handleStopQuiz = () => {
    if (window.confirm("Apakah Anda yakin ingin menghentikan kuis?")) {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setIsTimerRunning(false);
    setQuizEnded(true);
    localStorage.removeItem("quizState");
  };

  const startNewQuiz = () => {
    setScreen("home");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const decodeHTML = (html) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">QuizApp</h1>
          {user && (
            <div className="flex items-center space-x-4">
              <span>Halo, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-center">Sedang memuat...</p>
          </div>
        </div>
      )}

      <main className="flex-grow container mx-auto p-4 md:p-8">
        {screen === "login" && (
          <LoginScreen onLogin={handleLogin} errorMessage={errorMessage} />
        )}

        {screen === "home" && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Selamat Datang di QuizApp
            </h2>
            <p className="mb-6 text-center">
              Uji pengetahuan Anda dengan kuis interaktif dari berbagai
              kategori.
            </p>
            <button
              onClick={fetchQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition">
              Mulai Kuis Baru
            </button>
          </div>
        )}

        {screen === "quiz" && quizData && !quizEnded && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="font-bold">
                  Soal {currentQuestion + 1}/{quizData.length}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  Dijawab: {answered}/{quizData.length}
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`mr-2 font-mono ${
                    timer < 60 ? "text-red-500" : ""
                  }`}>
                  ⏱️ {formatTime(timer)}
                </div>
                <button
                  onClick={handleStopQuiz}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">
                  Hentikan Kuis
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Kategori: {quizData[currentQuestion].category}</span>
                <span>Tingkat: {quizData[currentQuestion].difficulty}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {decodeHTML(quizData[currentQuestion].question)}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {quizData[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer.isCorrect)}
                    className="bg-gray-100 hover:bg-blue-100 border border-gray-300 p-3 rounded-lg text-left transition">
                    {decodeHTML(answer.text)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {quizEnded && quizData && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Hasil Kuis</h2>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-3 text-center">
                <div className="p-3">
                  <div className="text-3xl font-bold text-green-500">
                    {score}
                  </div>
                  <div className="text-sm text-gray-600">Benar</div>
                </div>
                <div className="p-3">
                  <div className="text-3xl font-bold text-red-500">
                    {answered - score}
                  </div>
                  <div className="text-sm text-gray-600">Salah</div>
                </div>
                <div className="p-3">
                  <div className="text-3xl font-bold text-blue-500">
                    {answered}
                  </div>
                  <div className="text-sm text-gray-600">Dijawab</div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="mb-2">Total soal: {quizData.length}</p>
              <p className="text-xl font-bold">
                Skor: {Math.round((score / quizData.length) * 100)}%
              </p>
            </div>

            <button
              onClick={startNewQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition">
              Kembali ke Beranda
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">© 2025 QuizApp - Aplikasi Kuis Interaktif</p>
      </footer>
    </div>
  );
}

function LoginScreen({ onLogin, errorMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login QuizApp</h2>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition">
          Login
        </button>
      </div>
    </div>
  );
}
