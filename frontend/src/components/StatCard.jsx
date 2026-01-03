export default function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#0F1115] rounded-xl p-5 shadow-sm border dark:border-[#16171A]">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}
