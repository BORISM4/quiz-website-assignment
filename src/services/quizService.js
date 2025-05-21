export async function loadQuizData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Could not load data.json");
    return await response.json();
  } catch (error) {
    console.error("Error loading quiz data:", error);
    throw error;
  }
}
