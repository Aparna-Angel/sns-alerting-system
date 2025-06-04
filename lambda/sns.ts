export const handler = async () => {
    console.log("Lambda executed");
    throw new Error("Simulated error");
  };
  