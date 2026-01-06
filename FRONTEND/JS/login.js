// Jalankan setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  const linkDaftar = document.getElementById("linkDaftar");

  // === KIRIM DATA LOGIN ===
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil nilai input dari form
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    console.log("Data login dikirim:", data);

    // === Jika ingin kirim ke backend, aktifkan kode berikut ===
    /*
    fetch("https://alamat-api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Respon server:", response);
        alert("Login berhasil!");
        // contoh: redirect ke dashboard
        // window.location.href = "dashboard.html";
      })
      .catch((err) => console.error("Error:", err));
    */
    window.location.href = "verifikasi.html";
  });

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const icon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });

  // === PINDAH KE HALAMAN REGISTER ===
  linkDaftar.addEventListener("click", (e) => {
    e.preventDefault(); // Supaya tidak reload
    window.location.href = "register.html"; // Arahkan ke halaman register
  });
});
