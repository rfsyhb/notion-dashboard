export function mapExpensesItem(page: any) {
  return {
    id: page.id,
    "Product": page.properties["Product"]?.title[0]?.plain_text || "",
    "Date": page.properties["Date"]?.date?.start || "",
    "IDR": page.properties["IDR"]?.number || 0,
    "Image": page.properties["Image"]?.files[0]?.file?.url || "",
  }
}