interface ChartLegendProps {
  items: Array<{
    color: string;
    label: string;
    total: string;
  }>;
  disclaimer?: string;
}

const ChartLegend = ({ items, disclaimer }: ChartLegendProps) => {
  return (
    <div className="mt-4 space-y-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ backgroundColor: item.color }}></div>
          <span>{item.label}. Total {item.total}</span>
        </div>
      ))}
      {disclaimer && (
        <p className="text-xs text-gray-500 italic">{disclaimer}</p>
      )}
    </div>
  );
};

export default ChartLegend;