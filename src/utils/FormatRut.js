export const FormatRut = (string) => {
  if (string) {
    //match any character except "-", numbers and k letter
    let val = string.replace(/-|[^k|^K|\d]/g, "");
    val =
      val.substring(0, val.length - 1) + "-" + val.substring(val.length - 1);
    return val;
  } else {
    return "";
  }
};
