const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".products .card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category || "";

      if (filter === "all" || category.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

  });
});