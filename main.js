// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDgGanI0xfwbMbF2Q20eftio7Hc6iyPVgI",
  authDomain: "insancemerlang-e9c87.firebaseapp.com",
  projectId: "insancemerlang-e9c87",
  storageBucket: "insancemerlang-e9c87.firebasestorage.app",
  messagingSenderId: "1009245252263",
  appId: "1:1009245252263:web:637bfe528eddfc0dc18982"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const siswaCollection = collection(db, "siswa")

// fungsi untuk menampilkan daftar siswa
export async function tampilkanBiodataSiswa() {
  // ambil snapshot data dari koleksi siswa
  const snapshot = await getDocs(siswaCollection)
  
  // ambil element tabel data
  const tabel = document.getElementById("tabelData")
  
  //kosongkan isi tablel 
  tabel.innerHTML = ""
  
  //loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data 
    const data = doc.data()
    const id = doc.id
    
    // buat element baris baru
    const baris = document.createElement("tr")
    
    //buat element kolom untuk nis
    const kolomNo = document.createElement("td")
    kolomNo.textContent = data.no
    
    //buat element kolom untuk nama
    const kolomNamalengkap = document.createElement("td")
    kolomNamalengkap.textContent = data.namalengkap
    
    // buat kolom kelas
    const kolomJenisKelamin = document.createElement("td")
    kolomJenisKelamin.textContent = data.jeniskelamin
    
    const kolomTanggalLahir = document.createElement("td")
    kolomTanggalLahir. textContent = data.tanggallahir
    
    const kolomAgama = document.createElement("td")
    kolomAgama.textContent = data.agama
    
    const kolomNotelpon = document.createElement("td")
    kolomNotelpon.textContent = data.notelpon
    
    const kolomHobi = document.createElement("td")
    kolomHobi.textContent = data.hobi
    
    const kolomCitacita = document.createElement("td")
    kolomCitacita.textContent = data.citacita
    
    const kolomAlamat = document.createEvent("td")
    kolomAlamat.textContent = data.alam
    // buat element kolom untuk Aksi
    const kolomAksi = document.createElement("td")
    
    // buat tombol edit
    const tombolEdit = document.createElement("button")
    tombolEdit.textContent = "Edit"
    tombolEdit.href = "edit.html?id" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delete"
    tombolHapus.onclick = async () => {
      await hapusSiswa(id)
    }
    
    //tambahkan element ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    //tambah kolom kedalam baris
    baris.appendChild(kolomNo)
    baris.appendChild(kolomNamalengkap)
    baris.appendChild(kolomJeniskelamin)
    baris.appendChild(kolomTanggallahir)
    baris.appendChild(kolomAgama)
    baris.appendChild(kolomNotelpon)
    baris.appendChild(kolomHobi)
    baris.appendChild(kolomCitacita)
    baris.appendChild(kolomAlamat)
    baris.appendChild(kolomAksi)
    
    //tambahkan baris kedalam tabel
    tabel.appendChild(baris)
  })
}


//fungsi untuk menambahkan data siswa
export async function tambahBiodataSiswa() {
  //ambil nilai dari form
  const no = document.getElementById('no').Value;
  const namalengkap = document.getElementById('namalengkap').Value;
  const jeniskelamin = document.getElementById('jeniskelamin').Value;
  const tanggallahir = document.getElementById('tanggallahir').Value;
  const agama = document.getElementById('agama').Value
  const notelpon = document.getElementById('notelpon').Value;
  const hobi = document.getElementById('hobi').Value
  const citacita = document.getElementById('citacita').Value;
  const alamat = document.getElementById('alamat').Value; 
  
  
  
  //tambahkan data ke firestore
  await addDoc(siswaCollection, {
    no: no,
    namalengkap : namalengkap,
    jeniskelamin: jeniskelamin,
    tanggallahir: tanggallahir,
    agama: agama,
    notelpon: notelpon,
    hobi: hobi,
    citacita: citacita,
    alamat: alamat
    
  })
  
  //alihkan ke halaman daftar siswa
  window.location.href = 'daftar.html'
}

//fungsi untuk menghapus data siswa
export async function hapusSiswa(id){
  if (!confirm("yakin ingin menghapus data ini?")) return
  //menghapus dokumen siswa berdasarkan id
  await deleteDoc(doc(db,"siswa", id))
  
  // refresh data siswa
  await tampilkanBiodataSiswa()
}
