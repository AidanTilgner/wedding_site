export const staggerText = (textWrapper: Element, delay: number = 0) => {
  const t = setTimeout(() => {
    textWrapper.innerHTML = textWrapper.textContent
      ? textWrapper.textContent.replace(
          /([^\x00-\x80]|\w|\.|\,|\!|\')/g,
          "<span class='letter'>$&</span>"
        )
      : "";

    const letters: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
      ".staggered-text .letter"
    );
    letters.forEach((letter, i) => {
      letter.style.opacity = "0";
      setTimeout(() => {
        letter
          .animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 4000,
            easing: "ease-out",
          })
          .finished.then(() => {
            letter.style.opacity = "1";
          });
      }, 65 * (i + 1));
    });
  }, delay);

  return t;
};
