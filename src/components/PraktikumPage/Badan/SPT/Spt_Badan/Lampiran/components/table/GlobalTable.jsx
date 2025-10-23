import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Pencil, Trash2 } from "lucide-react";

function cn(...cls) {
    return cls.filter(Boolean).join(" ");
}

const headerYellow = "bg-purple-500 text-slate-900";       
const headerYellowDark = "bg-purple-500 text-slate-900";   
const headerCellBase = "px-3 py-2 text-[12px] font-semibold border border-slate-200";
const bodyCellBase = "px-3 py-[10px] text-[13px] border border-slate-200 text-slate-700 align-top";

export default function GlobalTable({
    columns,
    columnGroups,
    data,
    rowKey,
    page,
    pageSize,
    total,
    onPageChange,
    stickyHeader = true,
    footerRow,
}) {
    const leafColumns = React.useMemo(() => {
        if (columnGroups && columnGroups.length) {
            return columnGroups.flatMap((g) => g.children);
        }
        return columns ?? [];
    }, [columns, columnGroups]);

    const pageStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const pageEnd = Math.min(page * pageSize, total);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    const goFirst = () => onPageChange(1);
    const goPrev = () => onPageChange(Math.max(1, page - 1));
    const goNext = () => onPageChange(Math.min(pageCount, page + 1));
    const goLast = () => onPageChange(pageCount);

    return (
        <div className="w-full overflow-x-auto rounded-md border border-slate-200 bg-white">
            <table className="min-w-[900px] w-full border-collapse">
                <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
                    {columnGroups && columnGroups.length ? (
                        <>
                            <tr className={cn(headerYellowDark)}>
                                {columnGroups.map((g, i) => (
                                    <th
                                        key={`g-${i}`}
                                        className={cn(headerCellBase, "text-center")}
                                        colSpan={g.children.length}
                                    >
                                        {g.title}
                                    </th>
                                ))}
                            </tr>
                            <tr className={headerYellow}>
                                {columnGroups.flatMap((g) =>
                                    g.children.map((c) => (
                                        <th
                                            key={`c-${c.key}`}
                                            className={cn(
                                                headerCellBase,
                                                c.className,
                                                c.align === "center" && "text-center",
                                                c.align === "right" && "text-right"
                                            )}
                                            style={{ width: c.width }}
                                        >
                                            {c.title}
                                        </th>
                                    ))
                                )}
                            </tr>
                        </>
                    ) : (
                        <tr className={headerYellow}>
                            {leafColumns.map((c) => (
                                <th
                                    key={c.key}
                                    className={cn(
                                        headerCellBase,
                                        c.className,
                                        c.align === "center" && "text-center",
                                        c.align === "right" && "text-right"
                                    )}
                                    style={{ width: c.width }}
                                >
                                    {c.title}
                                </th>
                            ))}
                        </tr>
                    )}
                </thead>

                <tbody>
                    {(!data || data.length === 0) ? (
                        <tr>
                            <td className={cn(bodyCellBase, "text-center text-slate-500")} colSpan={leafColumns.length}>
                                Tidak ada data.
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => {
                            const rKey = (rowKey ? rowKey(row, idx) : undefined) ?? `${page}-${idx}`;
                            return (
                                <tr key={rKey} className="even:bg-slate-50/50">
                                    {leafColumns.map((c, ci) => {
                                        const content = c.render ? c.render(row, idx) : (row?.[c.key] ?? "");
                                        return (
                                            <td
                                                key={`${rKey}-${ci}`}
                                                className={cn(
                                                    bodyCellBase,
                                                    c.className,
                                                    c.align === "center" && "text-center",
                                                    c.align === "right" && "text-right"
                                                )}
                                            >
                                                {content}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    )}
                </tbody>

                {footerRow ? (
                    <tfoot>
                        <tr className="bg-slate-50">
                            <td colSpan={leafColumns.length} className="p-0">
                                {footerRow}
                            </td>
                        </tr>
                    </tfoot>
                ) : null}
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-3">
                <div className="text-[12px] text-slate-600">
                    Showing {pageStart} to {pageEnd} of {total} entries
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={goFirst} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40" disabled={page <= 1} aria-label="First">
                        <ChevronsLeft size={16} />
                    </button>
                    <button onClick={goPrev} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40" disabled={page <= 1} aria-label="Prev">
                        <ChevronLeft size={16} />
                    </button>
                    <div className="min-w-[28px] text-center text-[12px] font-medium rounded-md border px-2 py-1 bg-white">
                        {page}
                    </div>
                    <button onClick={goNext} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40" disabled={page >= pageCount} aria-label="Next">
                        <ChevronRight size={16} />
                    </button>
                    <button onClick={goLast} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40" disabled={page >= pageCount} aria-label="Last">
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
