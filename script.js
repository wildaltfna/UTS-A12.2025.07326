// ============================================================
const daftarTanaman = [
  {
    id: 1, nama: "Monstera", latin: "Monstera deliciosa",
    cahaya: "Terang", cahayaDetail: "Cahaya terang tidak langsung, dekat jendela",
    tingkat: "Mudah", harga: 85000, hariSiram: 7, gambar: "images/monstera.jpg",
    deskripsi: "Daun besar berlubang yang jadi ikon tanaman hias dalam ruangan.",
    tips: "Siram saat 2-3 cm tanah bagian atas sudah kering. Lap daun sesekali agar bebas debu."
  },
  {
    id: 2, nama: "Lidah Mertua", latin: "Sansevieria trifasciata",
    cahaya: "Teduh", cahayaDetail: "Tahan di ruangan redup, juga bisa di cahaya terang",
    tingkat: "Mudah", harga: 45000, hariSiram: 14, gambar: "images/Lidah-Mertua.png",
    deskripsi: "Tanaman tahan banting yang cocok untuk pemula dan jarang perlu disiram.",
    tips: "Jangan terlalu sering disiram karena akarnya mudah busuk."
  },
  {
    id: 3, nama: "Sirih Gading", latin: "Epipremnum aureum",
    cahaya: "Teduh", cahayaDetail: "Cahaya redup sampai sedang",
    tingkat: "Mudah", harga: 30000, hariSiram: 5, gambar: "images/sirih gading.jpg",
    deskripsi: "Tanaman rambat berdaun hijau-kuning yang cocok digantung atau diletakkan di rak.",
    tips: "Batangnya bisa dipotong dan ditanam di air untuk diperbanyak."
  },
  {
    id: 4, nama: "Calathea", latin: "Calathea orbifolia",
    cahaya: "Teduh", cahayaDetail: "Cahaya redup, hindari sinar langsung",
    tingkat: "Sedang", harga: 120000, hariSiram: 4, gambar: "images/calathea.jpg",
    deskripsi: "Daun lebar bergaris perak yang menjadi pemanis ruangan.",
    tips: "Suka udara lembap. Semprot daun jika udara terasa kering."
  },
  {
    id: 5, nama: "Kaktus Mini", latin: "Cactaceae",
    cahaya: "Terang", cahayaDetail: "Sinar matahari langsung beberapa jam sehari",
    tingkat: "Mudah", harga: 25000, hariSiram: 14, gambar: "images/kaktus.jpg",
    deskripsi: "Tanaman mungil yang cocok untuk meja kerja dan jendela.",
    tips: "Siram sedikit saja dan pastikan pot punya lubang drainase."
  },
  {
    id: 6, nama: "Aglonema", latin: "Aglaonema sp.",
    cahaya: "Teduh", cahayaDetail: "Cahaya redup sampai sedang",
    tingkat: "Sedang", harga: 95000, hariSiram: 7, gambar: "images/aglonema.jpg",
    deskripsi: "Daun bercorak hijau, merah muda, atau perak yang tahan di dalam ruangan.",
    tips: "Hindari sinar matahari langsung karena daunnya mudah pucat."
  },
  {
    id: 7, nama: "Lidah Buaya", latin: "Aloe vera",
    cahaya: "Terang", cahayaDetail: "Sinar matahari langsung atau cahaya terang",
    tingkat: "Mudah", harga: 35000, hariSiram: 10, gambar: "images/lidah buaya.jpg",
    deskripsi: "Tanaman berdaun tebal berisi gel yang sering dipakai untuk perawatan kulit.",
    tips: "Siram setelah tanah benar-benar kering."
  },
  {
    id: 8, nama: "Pakis Boston", latin: "Nephrolepis exaltata",
    cahaya: "Teduh", cahayaDetail: "Cahaya terang tidak langsung, udara lembap",
    tingkat: "Sedang", harga: 55000, hariSiram: 3, gambar: "images/pakis.jpg",
    deskripsi: "Daun melengkung rimbun yang cantik digantung di teras teduh.",
    tips: "Jaga tanah tetap lembap, tetapi jangan sampai tergenang air."
  }
];

// Variabel yang berubah-ubah saat website dipakai
let filterAktif = "Semua";   // filter yang sedang dipilih
let kataCari = "";           // kata di kolom cari
let urutan = "bawaan";       // cara mengurutkan
let keranjang = [];          // isi: { id: 1, jumlah: 2 }
let favorit = [];            // isi: nomor id tanaman favorit

// ============================================================
// 2. MENGAMBIL ELEMEN HTML (DOM)
// ============================================================
const wadahTanaman = document.getElementById("daftarTanaman");
const pesanKosong = document.getElementById("pesanKosong");
const kolomCari = document.getElementById("kolomCari");
const pilihUrutan = document.getElementById("pilihUrutan");
const tombolFilter = document.querySelectorAll("#tombolFilter button");
const pilihTanaman = document.getElementById("pilihTanaman");
const inputTanggal = document.getElementById("inputTanggal");
const errorTanggal = document.getElementById("errorTanggal");
const hasilJadwal = document.getElementById("hasilJadwal");
const isiKeranjang = document.getElementById("isiKeranjang");
const jumlahKeranjang = document.getElementById("jumlahKeranjang");
const jumlahFavorit = document.getElementById("jumlahFavorit");
const navbar = document.getElementById("navbar");
const tombolAtas = document.getElementById("tombolAtas");
const notif = document.getElementById("notif");

// ============================================================
// 3. FUNGSI BANTU
// ============================================================

// Ubah angka jadi Rupiah. Contoh: 85000 menjadi "Rp 85.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Cari data tanaman berdasarkan id
function cariTanaman(id) {
  for (let i = 0; i < daftarTanaman.length; i++) {
    if (daftarTanaman[i].id === id) {
      return daftarTanaman[i];
    }
  }
}

// Dipanggil otomatis jika file gambar tidak ditemukan.
// MANIPULASI DOM: ganti <img> dengan kotak hijau berisi ikon.
function gantiGambar(gambar) {
  const kotak = document.createElement("div");
  kotak.className = "gambar-cadangan";
  kotak.textContent = "🪴";
  gambar.replaceWith(kotak);
}

// Munculkan pesan kecil di bawah layar selama 2 detik
function tampilkanNotif(pesan) {
  notif.textContent = pesan;
  notif.classList.add("tampil");
  setTimeout(function () {
    notif.classList.remove("tampil");
  }, 2000);
}

// Simpan keranjang dan favorit ke browser (localStorage)
function simpanData() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  localStorage.setItem("favorit", JSON.stringify(favorit));
}

// Ambil kembali data yang tersimpan saat halaman dibuka
function muatData() {
  const dataKeranjang = localStorage.getItem("keranjang");
  const dataFavorit = localStorage.getItem("favorit");
  if (dataKeranjang) {
    keranjang = JSON.parse(dataKeranjang);
  }
  if (dataFavorit) {
    favorit = JSON.parse(dataFavorit);
  }
}

// ============================================================
// 4. KATALOG: membuat dan menampilkan kartu tanaman
// ============================================================

// Membuat teks HTML untuk satu kartu tanaman
function buatKartu(t) {
  const sudahFavorit = favorit.includes(t.id);
  const kelasHati = sudahFavorit ? "tombol-hati aktif" : "tombol-hati";
  const simbolHati = sudahFavorit ? "♥" : "♡";

  return (
    '<div class="col-sm-6 col-lg-3">' +
      '<div class="kartu-tanaman h-100">' +
        '<img src="' + t.gambar + '" alt="' + t.nama + '" class="gambar-tanaman" onerror="gantiGambar(this)">' +
        '<div class="isi-kartu">' +
          '<div class="d-flex justify-content-between align-items-center">' +
            '<span class="label-cahaya">' + t.cahaya + '</span>' +
            '<button class="' + kelasHati + '" onclick="ubahFavorit(' + t.id + ')" aria-label="Tandai favorit">' + simbolHati + '</button>' +
          '</div>' +
          '<h3 class="h5 mt-2 mb-0">' + t.nama + '</h3>' +
          '<p class="latin mb-1">' + t.latin + '</p>' +
          '<p class="harga">' + formatRupiah(t.harga) + '</p>' +
          '<div class="d-grid gap-2">' +
            '<button class="btn tombol-garis btn-sm" onclick="lihatDetail(' + t.id + ')">Lihat detail</button>' +
            '<button class="btn tombol-botol btn-sm" onclick="tambahKeKeranjang(' + t.id + ')">Tambah ke keranjang</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

function tampilkanTanaman() {
  // Langkah 1: kumpulkan tanaman yang lolos filter dan pencarian
  const hasil = [];

  for (let i = 0; i < daftarTanaman.length; i++) {
    const t = daftarTanaman[i];

    // Apakah cocok dengan filter yang dipilih?
    let cocokFilter = false;
    if (filterAktif === "Semua") {
      cocokFilter = true;
    } else if (filterAktif === "Favorit") {
      cocokFilter = favorit.includes(t.id);
    } else {
      cocokFilter = (t.cahaya === filterAktif);
    }

    // Apakah nama (atau nama latin) mengandung kata yang dicari?
    const kata = kataCari.toLowerCase();
    const cocokCari = t.nama.toLowerCase().includes(kata) || t.latin.toLowerCase().includes(kata);

    if (cocokFilter && cocokCari) {
      hasil.push(t);
    }
  }

  // Langkah 2: urutkan hasilnya
  if (urutan === "murah") {
    hasil.sort(function (a, b) { return a.harga - b.harga; });
  } else if (urutan === "mahal") {
    hasil.sort(function (a, b) { return b.harga - a.harga; });
  } else if (urutan === "nama") {
    hasil.sort(function (a, b) { return a.nama.localeCompare(b.nama); });
  }

  // Langkah 3: tampilkan ke halaman
  // MANIPULASI DOM: isi wadah dengan kartu-kartu baru
  let isiHtml = "";
  for (let i = 0; i < hasil.length; i++) {
    isiHtml += buatKartu(hasil[i]);
  }
  wadahTanaman.innerHTML = isiHtml;

  // MANIPULASI DOM: tampilkan atau sembunyikan pesan "tidak ada hasil"
  if (hasil.length === 0) {
    pesanKosong.classList.remove("d-none");
  } else {
    pesanKosong.classList.add("d-none");
  }
}

// Pencarian: berjalan setiap kali pengguna mengetik
kolomCari.addEventListener("input", function () {
  kataCari = kolomCari.value;
  tampilkanTanaman();
});

// Urutkan: berjalan saat pilihan diganti
pilihUrutan.addEventListener("change", function () {
  urutan = pilihUrutan.value;
  tampilkanTanaman();
});

// Filter: berjalan saat tombol diklik
for (let i = 0; i < tombolFilter.length; i++) {
  tombolFilter[i].addEventListener("click", function () {
    filterAktif = tombolFilter[i].getAttribute("data-filter");

    // MANIPULASI DOM: pindahkan tanda "aktif" ke tombol yang diklik
    for (let j = 0; j < tombolFilter.length; j++) {
      tombolFilter[j].classList.remove("aktif");
    }
    tombolFilter[i].classList.add("aktif");

    tampilkanTanaman();
  });
}

// ============================================================
// 5. FAVORIT
// ============================================================
function ubahFavorit(id) {
  const posisi = favorit.indexOf(id);

  if (posisi === -1) {
    favorit.push(id); // belum favorit, jadi ditambahkan
    tampilkanNotif("Ditambahkan ke favorit");
  } else {
    favorit.splice(posisi, 1); // sudah favorit, jadi dihapus
  }

  simpanData();
  jumlahFavorit.textContent = favorit.length; // MANIPULASI DOM
  tampilkanTanaman();
}

// ============================================================
// 6. MODAL DETAIL
// ============================================================
function lihatDetail(id) {
  const t = cariTanaman(id);

  // MANIPULASI DOM: isi judul dan isi modal
  document.getElementById("modalJudul").textContent = t.nama;
  document.getElementById("modalIsi").innerHTML =
    '<p class="latin">' + t.latin + '</p>' +
    '<p>' + t.deskripsi + '</p>' +
    '<ul class="daftar-rawat">' +
      '<li><strong>Cahaya:</strong> ' + t.cahayaDetail + '</li>' +
      '<li><strong>Penyiraman:</strong> setiap ' + t.hariSiram + ' hari</li>' +
      '<li><strong>Tingkat perawatan:</strong> ' + t.tingkat + '</li>' +
      '<li><strong>Tips:</strong> ' + t.tips + '</li>' +
    '</ul>' +
    '<p class="harga">' + formatRupiah(t.harga) + '</p>';

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalDetail"));

  // Tombol di modal menambah tanaman yang sedang dilihat
  document.getElementById("modalTambah").onclick = function () {
    tambahKeKeranjang(t.id);
    modal.hide();
  };

  modal.show();
}

// ============================================================
// 7. KERANJANG
// ============================================================
function tambahKeKeranjang(id) {
  let sudahAda = false;

  // Kalau tanaman sudah ada di keranjang, jumlahnya ditambah 1
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      keranjang[i].jumlah++;
      sudahAda = true;
    }
  }

  // Kalau belum ada, tambahkan sebagai item baru
  if (!sudahAda) {
    keranjang.push({ id: id, jumlah: 1 });
  }

  simpanData();
  tampilkanKeranjang();
  tampilkanNotif(cariTanaman(id).nama + " masuk keranjang");
}

// perubahan bernilai +1 atau -1
function ubahJumlah(id, perubahan) {
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      keranjang[i].jumlah += perubahan;
    }
  }

  // Buang item yang jumlahnya sudah 0
  const keranjangBaru = [];
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].jumlah > 0) {
      keranjangBaru.push(keranjang[i]);
    }
  }
  keranjang = keranjangBaru;

  simpanData();
  tampilkanKeranjang();
}

function hapusItem(id) {
  const keranjangBaru = [];
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id !== id) {
      keranjangBaru.push(keranjang[i]);
    }
  }
  keranjang = keranjangBaru;

  simpanData();
  tampilkanKeranjang();
}

// Hitung total harga seluruh isi keranjang
function hitungTotal() {
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    total += cariTanaman(keranjang[i].id).harga * keranjang[i].jumlah;
  }
  return total;
}

function tampilkanKeranjang() {
  // Hitung jumlah seluruh tanaman untuk angka di navbar
  let semuaJumlah = 0;
  for (let i = 0; i < keranjang.length; i++) {
    semuaJumlah += keranjang[i].jumlah;
  }
  jumlahKeranjang.textContent = semuaJumlah; // MANIPULASI DOM

  // Kalau keranjang kosong, tampilkan pesan saja
  if (keranjang.length === 0) {
    isiKeranjang.innerHTML = '<p class="teks-redup">Keranjang masih kosong. Pilih tanaman dari katalog.</p>';
    return;
  }

  // Kalau ada isinya, buat tabel
  let baris = "";
  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    const t = cariTanaman(item.id);

    baris +=
      '<tr>' +
        '<td>' + t.nama + '</td>' +
        '<td>' + formatRupiah(t.harga) + '</td>' +
        '<td>' +
          '<button class="tombol-jumlah" onclick="ubahJumlah(' + t.id + ', -1)" aria-label="Kurangi">-</button> ' +
          '<span class="mx-2">' + item.jumlah + '</span>' +
          '<button class="tombol-jumlah" onclick="ubahJumlah(' + t.id + ', 1)" aria-label="Tambah">+</button>' +
        '</td>' +
        '<td>' + formatRupiah(t.harga * item.jumlah) + '</td>' +
        '<td><button class="btn btn-sm tombol-garis" onclick="hapusItem(' + t.id + ')">Hapus</button></td>' +
      '</tr>';
  }

  // MANIPULASI DOM: tulis tabel dan total ke halaman
  isiKeranjang.innerHTML =
    '<div class="table-responsive">' +
      '<table class="table tabel-keranjang align-middle">' +
        '<thead><tr><th>Tanaman</th><th>Harga</th><th>Jumlah</th><th>Subtotal</th><th></th></tr></thead>' +
        '<tbody>' + baris + '</tbody>' +
      '</table>' +
    '</div>' +
    '<p class="total-keranjang">Total: ' + formatRupiah(hitungTotal()) + '</p>';
}

// ============================================================
// 8. FORM PEMESANAN (dengan validasi)
// ============================================================
document.getElementById("formPesan").addEventListener("submit", function (event) {
  event.preventDefault(); // cegah halaman reload

  const nama = document.getElementById("inputNama").value.trim();
  const hp = document.getElementById("inputHp").value.trim();
  const alamat = document.getElementById("inputAlamat").value.trim();
  const pesanSukses = document.getElementById("pesanSukses");

  let formValid = true;

  // Cek nama: minimal 3 karakter
  if (nama.length < 3) {
    document.getElementById("errorNama").textContent = "Nama minimal 3 karakter.";
    formValid = false;
  } else {
    document.getElementById("errorNama").textContent = "";
  }

  // Cek nomor HP: hanya angka, panjang 10 sampai 13 digit
  const polaHp = /^[0-9]{10,13}$/;
  if (!polaHp.test(hp)) {
    document.getElementById("errorHp").textContent = "Nomor HP harus 10-13 digit angka.";
    formValid = false;
  } else {
    document.getElementById("errorHp").textContent = "";
  }

  // Cek alamat: minimal 10 karakter
  if (alamat.length < 10) {
    document.getElementById("errorAlamat").textContent = "Alamat minimal 10 karakter.";
    formValid = false;
  } else {
    document.getElementById("errorAlamat").textContent = "";
  }

  // Cek keranjang tidak boleh kosong
  if (formValid && keranjang.length === 0) {
    pesanSukses.textContent = "";
    tampilkanNotif("Keranjang masih kosong");
    return;
  }

  // Kalau semuanya benar, proses pesanan
  if (formValid) {
    pesanSukses.textContent =
      "Terima kasih, " + nama + "! Pesanan senilai " + formatRupiah(hitungTotal()) +
      " akan dikirim ke alamatmu.";

    keranjang = []; // kosongkan keranjang
    simpanData();
    tampilkanKeranjang();
    document.getElementById("formPesan").reset();
  } else {
    pesanSukses.textContent = "";
  }
});

// ============================================================
// 9. JADWAL SIRAM
// ============================================================

// Isi pilihan tanaman di form jadwal
function isiPilihanTanaman() {
  for (let i = 0; i < daftarTanaman.length; i++) {
    // MANIPULASI DOM: buat <option> baru
    const opsi = document.createElement("option");
    opsi.value = daftarTanaman[i].id;
    opsi.textContent = daftarTanaman[i].nama + " (siram tiap " + daftarTanaman[i].hariSiram + " hari)";
    pilihTanaman.appendChild(opsi);
  }
}

function hitungJadwal() {
  // Validasi: tanggal wajib diisi
  if (inputTanggal.value === "") {
    errorTanggal.textContent = "Pilih tanggal terakhir menyiram.";
    return;
  }
  errorTanggal.textContent = "";

  const t = cariTanaman(Number(pilihTanaman.value));

  // Tanggal terakhir siram + jumlah hari siram = tanggal siram berikutnya
  const berikutnya = new Date(inputTanggal.value + "T00:00:00");
  berikutnya.setDate(berikutnya.getDate() + t.hariSiram);

  // Tanggal hari ini (jam diabaikan supaya selisih hari akurat)
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  // Selisih hari: milidetik dibagi jumlah milidetik dalam satu hari
  const sisaHari = Math.round((berikutnya - hariIni) / (1000 * 60 * 60 * 24));

  // Tulis tanggal dalam bahasa Indonesia
  const teksTanggal = berikutnya.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  // Tentukan kalimat status
  let status = "";
  if (sisaHari > 0) {
    status = sisaHari + " hari lagi.";
  } else if (sisaHari === 0) {
    status = "Hari ini waktunya menyiram.";
  } else {
    status = "Sudah terlambat " + Math.abs(sisaHari) + " hari. Segera siram.";
  }

  // MANIPULASI DOM: tampilkan hasil
  hasilJadwal.innerHTML =
    '<div class="hasil-jadwal">' +
      '<p class="mb-1">Siram <strong>' + t.nama + '</strong> berikutnya pada:</p>' +
      '<p class="h5 mb-1">' + teksTanggal + '</p>' +
      '<p class="mb-2">' + status + '</p>' +
      '<p class="mb-0 teks-redup">Tips: ' + t.tips + '</p>' +
    '</div>';
}

document.getElementById("tombolJadwal").addEventListener("click", hitungJadwal);

// ============================================================
// 9B. FORM KOMUNITAS (text, textarea, select, checkbox)
// ============================================================
document.getElementById("formKomunitas").addEventListener("submit", function (event) {
  event.preventDefault(); // cegah halaman reload

  const nama = document.getElementById("komunitasNama").value.trim();
  const alamat = document.getElementById("komunitasAlamat").value.trim();
  const kota = document.getElementById("komunitasKota").value;
  const hasil = document.getElementById("hasilKomunitas");

  // Ambil semua checkbox hobi yang dicentang
  const hobiDicentang = document.querySelectorAll('input[name="hobi"]:checked');
  const daftarHobi = [];
  for (let i = 0; i < hobiDicentang.length; i++) {
    daftarHobi.push(hobiDicentang[i].value);
  }

  let formValid = true;

  // Cek nama (type text): minimal 3 karakter
  if (nama.length < 3) {
    document.getElementById("errorKomNama").textContent = "Nama minimal 3 karakter.";
    formValid = false;
  } else {
    document.getElementById("errorKomNama").textContent = "";
  }

  // Cek alamat (textarea): minimal 10 karakter
  if (alamat.length < 10) {
    document.getElementById("errorKomAlamat").textContent = "Alamat minimal 10 karakter.";
    formValid = false;
  } else {
    document.getElementById("errorKomAlamat").textContent = "";
  }

  // Cek kota (select): harus memilih salah satu
  if (kota === "") {
    document.getElementById("errorKomKota").textContent = "Pilih salah satu kota.";
    formValid = false;
  } else {
    document.getElementById("errorKomKota").textContent = "";
  }

  // Cek hobi (checkbox): minimal satu dicentang
  if (daftarHobi.length === 0) {
    document.getElementById("errorKomHobi").textContent = "Pilih minimal satu hobi.";
    formValid = false;
  } else {
    document.getElementById("errorKomHobi").textContent = "";
  }

  // MANIPULASI DOM: tampilkan ringkasan jika semua benar
  if (formValid) {
    hasil.innerHTML =
      '<div class="hasil-jadwal">' +
        '<p class="mb-1"><strong>Terima kasih, ' + nama + '!</strong> Kamu sudah terdaftar.</p>' +
        '<p class="mb-1">Alamat: ' + alamat + '</p>' +
        '<p class="mb-1">Kota: ' + kota + '</p>' +
        '<p class="mb-0">Hobi: ' + daftarHobi.join(", ") + '</p>' +
      '</div>';
    document.getElementById("formKomunitas").reset();
  } else {
    hasil.innerHTML = "";
  }
});

// ============================================================
// 10. EFEK SAAT SCROLL
// ============================================================
window.addEventListener("scroll", function () {
  // Navbar diberi bayangan setelah halaman turun
  if (window.scrollY > 50) {
    navbar.classList.add("bayangan");
  } else {
    navbar.classList.remove("bayangan");
  }

  // Tombol "kembali ke atas" muncul setelah scroll jauh
  if (window.scrollY > 300) {
    tombolAtas.classList.remove("d-none");
  } else {
    tombolAtas.classList.add("d-none");
  }
});

tombolAtas.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================================
// 11. JALANKAN SAAT HALAMAN DIBUKA
// ============================================================
muatData();                                  // ambil keranjang dan favorit yang tersimpan
isiPilihanTanaman();                         // isi pilihan di form jadwal
jumlahFavorit.textContent = favorit.length;  // tampilkan jumlah favorit di navbar
tampilkanTanaman();                          // buat kartu katalog
tampilkanKeranjang();                        // tampilkan isi keranjang
