document.addEventListener("DOMContentLoaded", () => {
  const btnMasuk = document.getElementById("btnMasuk");

  btnMasuk.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
});
