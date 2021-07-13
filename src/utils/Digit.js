export const Digit = (string) => {
    if (string) {
      return {  digit: string.substr(0,string.indexOf("-")), number: string.slice(4, string.lenght) };
    } else {
      return "";
    }
  };