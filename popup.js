document.getElementById('runScriptButton').addEventListener('click', function() {
  // Dapatkan tab yang aktif
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tabId = tabs[0].id;  // Ambil ID tab aktif

    // Eksekusi script di tab aktif
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: function() {
        // Hapus semua kelas di elemen body, kecuali kelas yang diperlukan
        const bodyElement = document.body;
        const preservedClasses = ['telabox', 'transpose-toolbox'];  // Daftar kelas yang tidak akan dihapus
        bodyElement.className = bodyElement.className
          .split(' ')  // Mengubah daftar kelas menjadi array
          .filter(className => preservedClasses.includes(className))  // Menyaring kelas yang perlu dipertahankan
          .join(' ');  // Menggabungkan kembali menjadi string

        // Ambil semua elemen dengan kelas "transpose-toolbox" dan "telabox"
        const transposeElements = document.querySelectorAll('.transpose-toolbox');
        const telaboxElements = document.querySelectorAll('.telabox');

        // Hapus semua elemen lain di body
        document.body.innerHTML = '';

        // Menambahkan elemen dengan kelas "transpose-toolbox" (satu kolom)
        transposeElements.forEach(element => {
          // Menambahkan gaya CSS untuk menampilkan "transpose-toolbox" dalam satu kolom
          element.style.columnCount = '1';  // Satu kolom
          element.style.columnGap = '0';    // Tidak ada jarak antar kolom
          element.style.whiteSpace = 'normal'; // Membungkus teks dengan normal (bukan pre-wrap)

          // Menambahkan elemen "transpose-toolbox" ke body
          document.body.appendChild(element);
        });

        // Menambahkan elemen dengan kelas "telabox" ke body (dua kolom dengan garis pemisah)
        telaboxElements.forEach(element => {
          // Menambahkan gaya CSS untuk membuat 2 kolom dalam elemen <pre> di dalam "telabox"
          const preElements = element.querySelectorAll('pre');

          preElements.forEach(pre => {
            // Mengubah teks di dalam <pre> menjadi dua kolom
            pre.style.columnCount = '2';  // Membagi teks menjadi 2 kolom
            pre.style.columnGap = '20px';  // Menambahkan jarak antar kolom
            pre.style.whiteSpace = 'pre-wrap';  // Membungkus teks untuk mencegah pemotongan kata
            pre.style.wordWrap = 'break-word'; // Memastikan kata panjang terputus dengan baik
            pre.style.lineHeight = '1.1'; // Mengatur jarak antar baris menjadi lebih rapat (nilai lebih kecil)
            pre.style.columnRule = '1px solid black';  // Menambahkan garis pemisah dengan ketebalan 1px dan warna hitam
          });

          // Menambahkan elemen "telabox" ke body
          document.body.appendChild(element);
          // mengaktifkan designmode
          document.designMode = "on";
          // mengubah warna menjadi putih
          document.body.style.backgroundColor = 'black';
        });
      }
    });
  });
});
