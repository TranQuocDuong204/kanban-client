import { utils, writeFileXLSX } from "xlsx";

export const handleExportExcel = (data, name) => {
    const ws = utils.json_to_sheet(data);
    const wd = utils.book_new();
    utils.book_append_sheet(wd, ws, "data");
    writeFileXLSX(wd, name ?? "Kanbandata.xlsx");
};