export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `Count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

//returnerer string, hvor parameter kan være enten number eller string.
export function print(input: number | string): string {
  let html = "";
  if (typeof input == "number") {
    html = `This is a number: ${input}`;
  } else {
    html = `This is a string: ${input}`;
  }
  return html;
}

export function testing(): void {
  console.log(print(5));
  console.log(print("hei"));
}
