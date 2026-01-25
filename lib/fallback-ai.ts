export function fallbackDetectIssue(description: string) {
  const text = description.toLowerCase();

  // 🕳️ Pothole / Road damage
  if (
    ["pothole", "hole", "road", "asphalt", "street", "broken road"].some(
      (k) => text.includes(k)
    )
  ) {
    return "Pothole";
  }

  // 🗑️ Garbage / Waste
  if (
    ["garbage", "trash", "waste", "litter", "dump"].some(
      (k) => text.includes(k)
    )
  ) {
    return "Garbage";
  }

  // 💡 Streetlight
  if (
    ["streetlight", "street light", "lamp", "light", "pole"].some(
      (k) => text.includes(k)
    )
  ) {
    return "Streetlight";
  }

  return "Other";
}
