export default function AdminTable({ columns, rows, empty = "Nenhum registro encontrado." }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-sky-300/10 bg-white/10 backdrop-blur-xl">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase text-slate-400">
          <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3">{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td className="px-4 py-6 text-center text-slate-400" colSpan={columns.length}>{empty}</td></tr>
          )}
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-sky-300/10">
              {columns.map((col) => <td key={col.key} className="px-4 py-3 align-top">{col.render ? col.render(row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
