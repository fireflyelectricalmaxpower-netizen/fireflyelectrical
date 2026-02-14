const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".products .card");
const loading = document.getElementById("loading");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    // 🔥 SHOW LOADING
    loading.style.display = "grid";
    cards.forEach(card => card.style.display = "none");

    // Simulate loading delay (like Facebook)
    setTimeout(() => {

      loading.style.display = "none";

      cards.forEach(card => {
        const category = card.dataset.category || "";

        if (filter === "all" || category.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

    }, 700); // 0.7s loading animation

  });
});
