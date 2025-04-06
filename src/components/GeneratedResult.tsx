interface Props {
  result: {
    idea: string;
    pitch: string;
  };
}

export default function GeneratedResult({ result }: Props) {
  return (
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
  );
}
