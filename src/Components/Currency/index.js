export const currency = (currency) => {
  let reverse = currency?.toString()?.split("")?.reverse()?.join(""),
    rupiah = reverse?.match(/\d{1,3}/g);
  rupiah = rupiah?.join(",")?.split("")?.reverse()?.join("");

  return rupiah;
};
