import { useState, type ChangeEvent, type FormEvent } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainForm from "./components/MainForm";
import Result from "./components/Result";
import History from "./components/History";
import { useClassifyEffect } from "./hooks/useClassifyEffect";

export default function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const { result, setResult, loading, classify, history } = useClassifyEffect();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFile(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setText("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await classify(text, file);
  };

  const handleClear = () => {
    setText("");
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        <MainForm
          text={text}
          file={file}
          loading={loading}
          onTextChange={handleTextChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
        {result && <Result result={result} />}
        <History
          history={history}
          show={showHistory}
          setShow={setShowHistory}
        />
        <Footer />
      </div>
    </div>
  );
}