import { useState } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import GeneratedResult from "./components/GeneratedResult";
import Loader from "./components/Loader.tsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [industry, setIndustry] = useState("");
  const [trend, setTrend] = useState("");
  const [result, setResult] = useState<{ idea: string; pitch: string } | null>(
    null
  );

  const handleGenerateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const prompt = `Generate a short startup idea (max 50 characters) and a brief one-liner pitch (max 120 characters) that combines the themes of "${industry}" and "${trend}". Format the response exactly as: Idea: [startup idea]. Pitch: [one-liner pitch].`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
      import.meta.env.VITE_API_KEY
    }`;

    try {
      const { data } = await axios.post(
        apiUrl,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      const ideaMatch = responseText.match(/Idea:\s*(.*?)\./);
      const pitchMatch = responseText.match(/Pitch:\s*(.*)/);

      const result = {
        idea: ideaMatch ? ideaMatch[1] : "",
        pitch: pitchMatch ? pitchMatch[1] : "",
      };

      setResult(result);
    } catch (error) {
      console.error("Error sending message:", error);
      setResult({
        idea: "Error",
        pitch:
          "Could not generate idea. Check your API quota or try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#E0F7FA] w-full min-h-screen pb-8">
      <div className="container mx-auto px-4 md:px-0 lg:w-[85%] py-20">
        <div className="flex items-center justify-center">
          <img
            src="/image.png"
            alt="logo"
            loading="lazy"
            className="max-w-80 w-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-3xl font-bold text-center text-[#00796B]">
            Discover the Latest Trends in Your Industry
          </h1>
          <p className="text-lg text-center text-[#004D40] mt-4">
            Enter your industry and get the latest trends
          </p>
        </div>

        <InputForm
          industry={industry}
          trend={trend}
          setIndustry={setIndustry}
          setTrend={setTrend}
          handleGenerateIdea={handleGenerateIdea}
          isLoading={isLoading}
        />

        {isLoading && <Loader />}

        {result && <GeneratedResult result={result} />}
      </div>
    </div>
  );
}
