<script>
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      const dropdown = this.closest('.dropdown');
      const btnText = dropdown.querySelector('.dropdown-toggle span');
      const hiddenInput = document.getElementById('jenis_kelamin');

      btnText.textContent = this.textContent;
      hiddenInput.value = this.textContent; // simpan ke input tersembunyi
    });
  });
</script>
