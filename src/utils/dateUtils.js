export function getFormattedDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
      }).format(date)
}
