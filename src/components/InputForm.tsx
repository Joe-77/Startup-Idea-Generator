interface Props {
  industry: string;
  trend: string;
  setIndustry: (value: string) => void;
  setTrend: (value: string) => void;
  handleGenerateIdea: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function InputForm({
  industry,
  trend,
  setIndustry,
  setTrend,
  handleGenerateIdea,
  isLoading,
}: Props) {
  return (
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

        <div className="flex flex-col justify-center gap-4">
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
          className="px-4 py-2 text-white bg-[#00796B] rounded-md cursor-pointer outline-none disabled:bg-gray-400 disabled:cursor-not-allowed duration-300"
          disabled={isLoading || trend === "" || industry === ""}
        >
          {isLoading ? "Loading..." : "Fetch Trends"}
        </button>
      </div>
    </form>
  );
}
