document.addEventListener("DOMContentLoaded", () => {
  // === DROPDOWN JENIS KELAMIN ===
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

  // === FLATPICKR TANGGAL LAHIR ===
  // === FLATPICKR TANGGAL LAHIR ===
  const tanggalInput = document.getElementById("tanggal_lahir");
  const btnTanggal = document.getElementById("btnTanggal");

  if (tanggalInput && typeof flatpickr === "function") {
    // reset value supaya mobile tidak menimpa
    tanggalInput.value = "";

    const picker = flatpickr(tanggalInput, {
      dateFormat: "Y-m-d", // YYYY-MM-DD
      maxDate: "today",
      allowInput: false,
      appendTo: document.body, // popup muncul di luar container
      onChange: checkFormCompletion,
    });

    if (btnTanggal) {
      btnTanggal.addEventListener("click", () => picker.open());
      btnTanggal.addEventListener("touchstart", () => picker.open()); // support mobile
    }
  }

  // === CEKBOX DAN INPUT UNTUK AKTIFKAN TOMBOL DAFTAR ===
  const checkbox = document.getElementById("setuju");
  const btnDaftar = document.querySelector(".btn-register");
  const inputs = ["nama_pengguna", "jenis_kelamin", "tanggal_lahir", "email", "password", "repeat_password"].map((id) => document.getElementById(id));

  // fungsi cek semua input + checkbox
  function checkFormCompletion() {
    const allFilled = inputs.every((input) => input.value.trim() !== "");
    if (allFilled && checkbox.checked) {
      btnDaftar.disabled = false;
      btnDaftar.classList.add("active"); // bisa di CSS beri warna terang
    } else {
      btnDaftar.disabled = true;
      btnDaftar.classList.remove("active");
    }
  }

  // pasang event listener ke semua input & checkbox
  inputs.forEach((input) => input.addEventListener("input", checkFormCompletion));
  checkbox.addEventListener("change", checkFormCompletion);

  // === FUNGSI KIRIM FORM ===
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // mencegah reload halaman

    // Ambil semua nilai dari input
    const data = {};
    inputs.forEach((input) => (data[input.id] = input.value));

    console.log("Data yang dikirim:", data);

    // Contoh kirim ke server (aktifkan jika backend siap)
    /*
    fetch("https://alamat-api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(response => {
        console.log("Respon server:", response);
        alert("Pendaftaran berhasil!");
      })
      .catch(err => console.error("Error:", err));
    */
  });
});
