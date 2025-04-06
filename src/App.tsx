import axios from "axios";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [trend, setTrend] = useState<string>("");
  const [result, setResult]: any = useState(null);

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
      // setResult(responseText);
      const ideaMatch = responseText.match(/Idea:\s*(.*?)\./);
      const pitchMatch = responseText.match(/Pitch:\s*(.*)/);

      const result = {
        idea: ideaMatch ? ideaMatch[1] : "",
        pitch: pitchMatch ? pitchMatch[1] : "",
      };

      setResult(result);
    } catch (error) {
      console.error("Error sending message:", error);
      setResult(
        "Error: Could not generate idea. Check your API quota or try again later."
      );
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

        <form onSubmit={handleGenerateIdea}>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
            <div className="flex flex-col justify-center gap-4">
              <label
                htmlFor="industry"
                className="block text-lg text-[#004D40] uppercase font-mono tracking-widest text-center"
              >
                Industry
              </label>
              <input
                type="text"
                id="industry"
                className="w-80 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center  gap-4">
              <label
                htmlFor="trend"
                className="block text-lg text-[#004D40] uppercase font-mono tracking-widest text-center"
              >
                Trend
              </label>
              <input
                type="text"
                id="trend"
                className="w-80 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={trend}
                onChange={(e) => setTrend(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-10">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#00796B] rounded-md cursor-pointer outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Fetch Trends"}
            </button>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 text-sm">
                Generating your brilliant idea...
              </p>
            </div>
          )}

          {result && (
            <div className="flex justify-center mt-10 animate-fade-in">
              <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl border border-[#B2DFDB]">
                <h2 className="text-2xl font-bold text-[#00796B] text-center mb-4">
                  🚀 Generated Idea
                </h2>
                <p className="text-lg text-[#004D40] mb-2">
                  <strong>Idea:</strong> {result.idea}
                </p>
                <p className="text-lg text-[#004D40]">
                  <strong>Pitch:</strong> {result.pitch}
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
