import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

const headerPrimary = "bg-purple-700 text-slate-900";
const headerPrimaryDark = "bg-purple-800 text-slate-900";
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
  emptyText = 'Belum ada data. Klik "Tambah Data" untuk menambah data baru.',
  loading = false,
  rowClassName,
}) {
  const leafColumns = React.useMemo(() => {
    if (columnGroups && columnGroups.length) {
      // Kalau group punya children → pakai children
      // Kalau tidak punya children → treat dia sendiri sebagai column
      return columnGroups.flatMap((g) =>
        Array.isArray(g.children) && g.children.length ? g.children : [g]
      );
    }
    return columns ?? [];
  }, [columns, columnGroups]);

  // const leafColumns = React.useMemo(() => {
  //   if (columnGroups && columnGroups.length) {
  //     return columnGroups.flatMap((g) => g.children);
  //   }
  //   return columns ?? [];
  // }, [columns, columnGroups]);

  // cek apakah pagination aktif / lengkap props-nya
  const hasPagination =
    typeof onPageChange === "function" &&
    typeof page === "number" &&
    typeof pageSize === "number" &&
    typeof total === "number";

  // pageStart, pageEnd, pageCount sekarang hanya dihitung kalau hasPagination = true
  let pageStart = 0;
  let pageEnd = 0;
  let pageCount = 1;

  if (hasPagination) {
    pageStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
    pageEnd = Math.min(page * pageSize, total);
    pageCount = Math.max(1, Math.ceil(total / pageSize));
  }

  //  fungsi navigasi aman kalau pagination tidak dipakai
  const goFirst = () => {
    if (!hasPagination) return;
    onPageChange(1);
  };

  const goPrev = () => {
    if (!hasPagination) return;
    onPageChange(Math.max(1, page - 1));
  };

  const goNext = () => {
    if (!hasPagination) return;
    onPageChange(Math.min(pageCount, page + 1));
  };

  const goLast = () => {
    if (!hasPagination) return;
    onPageChange(pageCount);
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border border-slate-200 bg-white">
      <table className="min-w-[900px] w-full border-collapse">
        <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
          {columnGroups && columnGroups.length ? (
            (() => {
              const hasChildGroup = columnGroups.some(
                (g) => Array.isArray(g.children) && g.children.length
              );

              // Kalau TIDAK ada group dengan children sama sekali ⇒ header biasa
              if (!hasChildGroup) {
                return (
                  <tr className={headerPrimary}>
                    {columnGroups.map((c) => (
                      <th
                        key={c.key}
                        className={cn(
                          headerCellBase,
                          c.className,
                          c.align === "center" && "text-center",
                          c.align === "right" && "text-right"
                        )}
                        style={{ width: c.width ?? "auto" }}
                      >
                        {c.title}
                      </th>
                    ))}
                  </tr>
                );
              }

              // Ada paling tidak satu group dengan children ⇒ 2 baris header
              return (
                <>
                  {/* Baris 1: judul group (rowSpan / colSpan) */}
                  <tr className={cn(headerPrimary)}>
                    {columnGroups.map((g, i) => {
                      const hasChildren = Array.isArray(g.children) && g.children.length;

                      if (hasChildren) {
                        return (
                          <th
                            key={`g-${i}`}
                            className={cn(headerCellBase, "text-center", g.className)}
                            colSpan={g.children.length}
                          >
                            {g.title}
                          </th>
                        );
                      }

                      // group tanpa children → span 2 baris
                      return (
                        <th
                          key={`g-${i}`}
                          className={cn(
                            headerCellBase,
                            "text-center",
                            g.className,
                            g.align === "center" && "text-center",
                            g.align === "right" && "text-right"
                          )}
                          rowSpan={2}
                          style={{ width: g.width ?? "auto" }}
                        >
                          {g.title}
                        </th>
                      );
                    })}
                  </tr>

                  {/* Baris 2: hanya children dari group yang punya children */}
                  <tr className={headerPrimary}>
                    {columnGroups.map((g) =>
                      Array.isArray(g.children) && g.children.length
                        ? g.children.map((c) => (
                            <th
                              key={`c-${c.key}`}
                              className={cn(
                                headerCellBase,
                                c.className,
                                c.align === "center" && "text-center",
                                c.align === "right" && "text-right"
                              )}
                              style={{ width: c.width ?? "auto" }}
                            >
                              {c.title}
                            </th>
                          ))
                        : null
                    )}
                  </tr>
                </>
              );
            })()
          ) : (
            // fallback lama pakai `columns`
            <tr className={headerPrimary}>
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
          {loading ? (
            <tr>
              <td
                className={cn(bodyCellBase, "text-center text-slate-500")}
                colSpan={leafColumns.length || 1}
              >
                Memuat data...
              </td>
            </tr>
          ) : !data || data.length === 0 ? (
            <tr>
              <td
                className={cn(bodyCellBase, "text-center text-slate-500")}
                colSpan={leafColumns.length || 1}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => {
              const defaultKey = hasPagination ? `${page}-${idx}` : `${idx}`;
              const rKey = (rowKey ? rowKey(row, idx) : undefined) ?? defaultKey;

              const extraRowClass =
                typeof rowClassName === "function" ? rowClassName(row, idx) : rowClassName;

              return (
                <tr key={rKey} className={cn("even:bg-slate-50/50", extraRowClass)}>
                  {leafColumns.map((c, ci) => {
                    const content = c.render ? c.render(row, idx) : row?.[c.key] ?? "";
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
      {hasPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-3">
          <div className="text-[12px] text-slate-600">
            {total === 0 ? "No entries" : `Showing ${pageStart} to ${pageEnd} of ${total} entries`}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={goFirst}
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40"
              disabled={page <= 1}
              aria-label="First"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={goPrev}
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40"
              disabled={page <= 1}
              aria-label="Prev"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="min-w-[28px] text-center text-[12px] font-medium rounded-md border px-2 py-1 bg-white">
              {page}
            </div>
            <button
              onClick={goNext}
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40"
              disabled={page >= pageCount}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={goLast}
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] hover:bg-slate-50 disabled:opacity-40"
              disabled={page >= pageCount}
              aria-label="Last"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
