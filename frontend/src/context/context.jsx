import { createContext, useState } from "react";;
import axios from "axios";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setHelpContent(null);
  };
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setShowResult(true);
    setLoading(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);

      const data = { prompt: input };
      const token = localStorage.getItem("token");

      const header = { token: token };
      try {
        response = await axios.post("http://localhost:9000/api/ai", data, {
          headers: header,
        });
        if (response.data.response) {
          setResultData(response.data.response);
        } else {
          alert(response.data.msg);
        }
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
    setInput("");
    setLoading(false);
  };
  async function runChat(prompt) {
    const data = { prompt };
    const token = localStorage.getItem("token");
    const header = { token: token };

    try {
      const response = await axios.post("http://localhost:9000/api/ai", data, {
        headers: header,
      });
      setResultData(response.data.response);
    } catch (err) {
      alert("Some Error occured, Try again");
    }
  }
   

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
    darkMode,
    toggleDarkMode,
    expanded,
    handleToggle,
     
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
