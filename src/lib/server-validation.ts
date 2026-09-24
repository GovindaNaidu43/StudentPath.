export function textValue(value: FormDataEntryValue | null, field: string, maxLength = 5000) {
  if (typeof value !== "string") throw new Error(`Invalid ${field}`);
  const text = value.trim();
  if (text.length > maxLength) throw new Error(`${field} is too long`);
  return text;
}

export function idValue(value: FormDataEntryValue | null, field = "id") {
  const id = textValue(value, field, 100);
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error(`Invalid ${field}`);
  return id;
}

export function jsonArrayValue(value: FormDataEntryValue | null, field: string) {
  const raw = textValue(value, field, 200000);
  try {
    const parsed: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) throw new Error();
    return parsed;
  } catch {
    throw new Error(`Invalid ${field}`);
  }
}

export function requestString(value: unknown, field: string, maxLength: number) {
  if (typeof value !== "string") throw new Error(`Invalid ${field}`);
  const text = value.trim();
  if (!text || text.length > maxLength) throw new Error(`Invalid ${field}`);
  return text;
}
