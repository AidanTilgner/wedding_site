import anime from "animejs/lib/anime.es.js";

export const staggerText = (textWrapper: Element, delay: number = 0) => {
  const t = setTimeout(() => {
    textWrapper.innerHTML = textWrapper.textContent
      ? textWrapper.textContent.replace(
          /([^\x00-\x80]|\w|\.|\,|\!|\')/g,
          "<span class='letter'>$&</span>"
        )
      : "";

    anime.timeline({ loop: false }).add({
      targets: ".staggered-text .letter",
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 4000,
      delay: (el, i) => 65 * (i + 1),
    });
  }, delay);

  return t;
};
