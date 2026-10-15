declare module "xlsx-populate" {
  type CellValue = string | number | boolean | Date | null | undefined;

  interface Range {
    value(): CellValue[][];
  }

  interface Sheet {
    usedRange(): Range;
  }

  interface Workbook {
    sheet(index: number): Sheet;
  }

  const XlsxPopulate: {
    fromDataAsync(data: Buffer): Promise<Workbook>;
  };

  export default XlsxPopulate;
}
