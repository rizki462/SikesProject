document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // DROPDOWN JENIS KELAMIN
  // =============================
  const dropdownButton = document.querySelector("#dropdownJenisKelamin");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const inputHidden = document.querySelector("#jenis_kelamin");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedText = this.textContent;
      dropdownButton.querySelector("span").textContent = selectedText;
      inputHidden.value = selectedText;
      checkFormCompletion();
    });
  });

  // =============================
  // FLATPICKR TANGGAL LAHIR
  // =============================
  const tanggalInput = document.getElementById("tanggal_lahir");
  const btnTanggal = document.getElementById("btnTanggal");

  if (tanggalInput && typeof flatpickr === "function") {
    tanggalInput.value = "";

    const picker = flatpickr(tanggalInput, {
      dateFormat: "Y-m-d",
      maxDate: "today",
      allowInput: false,
      appendTo: document.body,
      onChange: checkFormCompletion,
    });

    if (btnTanggal) {
      btnTanggal.addEventListener("click", () => picker.open());
      btnTanggal.addEventListener("touchstart", () => picker.open());
    }
  }

  // =============================
  // INPUT & CHECKBOX
  // =============================
  const checkbox = document.getElementById("setuju");
  const btnDaftar = document.querySelector(".btn-register");
  const inputs = ["nama_pengguna", "jenis_kelamin", "tanggal_lahir", "email", "password", "repeatPassword"].map((id) => document.getElementById(id));

  function checkFormCompletion() {
    const allFilled = inputs.every((input) => input && input.value.trim() !== "");

    if (allFilled && checkbox.checked) {
      btnDaftar.disabled = false;
      btnDaftar.classList.add("active");
    } else {
      btnDaftar.disabled = true;
      btnDaftar.classList.remove("active");
    }
  }

  inputs.forEach((input) => input && input.addEventListener("input", checkFormCompletion));
  checkbox.addEventListener("change", checkFormCompletion);

  // =============================
  // TOGGLE PASSWORD (SINKRON)
  // =============================
  const password = document.getElementById("password");
  const repeatPassword = document.getElementById("repeatPassword");
  const toggleIcons = document.querySelectorAll(".toggle-password");

  let isVisible = false;

  toggleIcons.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      isVisible = !isVisible;

      password.type = isVisible ? "text" : "password";
      repeatPassword.type = isVisible ? "text" : "password";

      toggleIcons.forEach((el) => {
        const icon = el.querySelector("i");
        icon.classList.toggle("fa-eye", !isVisible);
        icon.classList.toggle("fa-eye-slash", isVisible);
      });
    });
  });

  // =============================
  // SUBMIT FORM
  // =============================
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {};
    inputs.forEach((input) => (data[input.id] = input.value));

    console.log("Data yang dikirim:", data);
    window.location.href = "verifikasi.html";
  });
});
