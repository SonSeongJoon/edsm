export default function ReasonText({ reasonText }) {
  return (
    <div>
      <h1 className="font-bold text-xl mb-1">반려사유</h1>
      {reasonText &&
        Object.entries(reasonText).map(([key, value]) => (
          <div key={key} className="p-4 border rounded-md shadow-sm bg-white">
            <h5 className="font-semibold mb-2">{key}</h5>
            <p>{value}</p>
          </div>
        ))}
    </div>
  );
}



