// Fungsi untuk membaca JSON dan menghitung jumlah penyakit
async function fetchData() {
    try {
        const response = await fetch('/js/data_pasien.json'); // Pastikan path file benar
        const data = await response.json();

        const penyakitData = { 'Jantung': 0, 'Usus Buntu': 0, 'Kanker': 0, 'Diabetes': 0, 'Liver': 0 };

        data.forEach(entry => {
            const penyakit = entry.Penyakit.trim();
            if (penyakitData.hasOwnProperty(penyakit)) {
                penyakitData[penyakit]++;
            }
        });

        console.log(penyakitData); // Debug: cek apakah data sudah benar
        return penyakitData;
    } catch (error) {
        console.error("Error loading JSON file:", error);
        return null;
    }
}

// Fungsi untuk menampilkan chart dengan data yang diambil dari JSON
async function displayChart() {
    const data = await fetchData();
    if (!data) return; // Jika fetchData gagal, hentikan

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Jumlah Pasien',
                data: Object.values(data),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Panggil fungsi displayChart ketika halaman selesai dimuat
document.addEventListener('DOMContentLoaded', displayChart);

// Fungsi untuk membaca JSON dan menghitung rata-rata usia untuk setiap penyakit
async function fetchData() {
    try {
        const response = await fetch('/js/data_pasien.json'); // Pastikan path file benar
        const data = await response.json();

        const penyakitData = {
            'Jantung': { totalAge: 0, count: 0 },
            'Usus Buntu': { totalAge: 0, count: 0 },
            'Kanker': { totalAge: 0, count: 0 },
            'Diabetes': { totalAge: 0, count: 0 },
            'Liver': { totalAge: 0, count: 0 }
        };

        data.forEach(entry => {
            const penyakit = entry.Penyakit.trim();
            const usia = entry.Usia; // Pastikan ada field usia dalam JSON

            if (penyakitData.hasOwnProperty(penyakit)) {
                penyakitData[penyakit].totalAge += usia;
                penyakitData[penyakit].count++;
            }
        });

        // Hitung rata-rata usia untuk setiap penyakit
        const avgUsiaData = {};
        for (const penyakit in penyakitData) {
            const { totalAge, count } = penyakitData[penyakit];
            avgUsiaData[penyakit] = totalAge / count;
        }

        console.log(avgUsiaData); // Debug: cek apakah data sudah benar
        return avgUsiaData;
    } catch (error) {
        console.error("Error loading JSON file:", error);
        return null;
    }
}

// Fungsi untuk menampilkan pie chart dengan data rata-rata usia
async function displayPieChart() {
    const avgUsiaData = await fetchData();
    if (!avgUsiaData) return; // Jika fetchData gagal, hentikan

    const ctx = document.getElementById('pieChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(avgUsiaData),
            datasets: [{
                label: 'Rata-Rata Usia Pasien',
                data: Object.values(avgUsiaData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const label = tooltipItem.label;
                            const value = tooltipItem.raw;
                            return label + ': ' + value.toFixed(2) + ' tahun';
                        }
                    }
                }
            },
            aspectRatio: 4
        },

    });
}

// Panggil fungsi displayPieChart ketika halaman selesai dimuat
document.addEventListener('DOMContentLoaded', displayPieChart);




const foodData = [
    { nama: 'Apel', kalori: 52, kandungan: 'Vitamin C', manfaat: 'Menjaga kesehatan jantung' },
    { nama: 'Pisang', kalori: 96, kandungan: 'Vitamin B6, Vitamin C, Potasium', manfaat: 'Sumber energi cepat' },
    { nama: 'Bayam', kalori: 23, kandungan: 'Vitamin A, C, K, Zat besi', manfaat: 'Baik untuk mata' },
    { nama: 'Wortel', kalori: 41, kandungan: 'Vitamin A', manfaat: 'Meningkatkan kesehatan mata' },
    { nama: 'Daging Ayam', kalori: 239, kandungan: 'Protein, Vitamin B6', manfaat: 'Membangun jaringan otot' },
    { nama: 'Ikan Salmon', kalori: 208, kandungan: 'Protein, Vitamin D', manfaat: 'Baik untuk kesehatan otak' },
    { nama: 'Jeruk', kalori: 47, kandungan: 'Vitamin C', manfaat: 'Meningkatkan daya tahan tubuh' },
    { nama: 'Tomat', kalori: 18, kandungan: 'Vitamin A, C, Antioksidan', manfaat: 'Menyehatkan kulit' },
    { nama: 'Daging Sapi', kalori: 250, kandungan: 'Protein, Zat besi, Vitamin B12', manfaat: 'Menjaga kesehatan darah' },
    { nama: 'Ikan Tuna', kalori: 132, kandungan: 'Vitamin D', manfaat: 'Baik untuk kesehatan jantung' },
    { nama: 'Mangga', kalori: 60, kandungan: 'Vitamin A', manfaat: 'Baik untuk kulit' },
    { nama: 'Alpukat', kalori: 160, kandungan: 'Vitamin E', manfaat: 'Menjaga kesehatan kulit' },
    { nama: 'Brokoli', kalori: 55, kandungan: 'Vitamin C, K', manfaat: 'Baik untuk tulang' },
    { nama: 'Telur', kalori: 155, kandungan: 'Vitamin B12', manfaat: 'Sumber protein tinggi' },
    { nama: 'Ikan Lele', kalori: 105, kandungan: 'Vitamin B12', manfaat: 'Meningkatkan energi' },
    { nama: 'Nasi Putih', kalori: '175', kandungan: 'Karbohidrat, Protein, Vitamin B1', manfaat: 'Sumber energi' },
    { nama: 'Nasi Merah', kalori: '110', kandungan: 'Karbohidrat, magnesium, Vitamin B1, B3, B6 dan fosfor', manfaat: 'Sumber energi yang lebih lambat diserap' },
    { nama: 'Kentang Rebus', kalori: '87', kandungan: 'Karbohidrat, Vitamin A, Vitamin C, Kalium', manfaat: 'Baik untuk pencernaan dan membantu mengontrol tekanan darah karena kandungan kalium' },
    { nama: 'Ubi Jalar', kalori: '86', kandungan: 'Karbohidrat, Vitamin A (beta-karoten), vitamin C', manfaat: 'Baik untuk kesehatan mata, mendukung sistem kekebalan tubuh dan membantu pencernaan' },
    { nama: 'Roti Gandum', kalori: '67', kandungan: 'Karbohidrat, Vitamin B, Magnesium, Zat besi', manfaat: 'Sumber energi cepat, namun perlu diimbangi dengan makanan kaya serat dan vitamin karena rendah nilai gizi' }
    // Tambahkan 15 jenis makanan lainnya dengan format yang sama
];

// Konfigurasi untuk pagination
let currentPage = 1;
const itemsPerPage = 10;

function renderTable() {
    const tableBody = document.getElementById('foodTableBody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = foodData.slice(start, end);

    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.kalori}</td>
            <td>${item.kandungan}</td>
            <td>${item.manfaat}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = end >= foodData.length;
}

function nextPage() {
    currentPage++;
    renderTable();
}

function prevPage() {
    currentPage--;
    renderTable();
}

// Memuat tabel pertama kali
renderTable();

const avoidFoodData = [
    { nama: 'Gorengan', alasan: 'Kandungan minyak berlebih', dampak: 'Meningkatkan kolesterol dan risiko penyakit jantung' },
    { nama: 'Minuman Bersoda', alasan: 'Mengandung gula berlebih', dampak: 'Risiko diabetes dan kerusakan gigi' },
    { nama: 'Makanan Cepat Saji', alasan: 'Kandungan garam dan lemak tinggi', dampak: 'Meningkatkan tekanan darah dan obesitas' },
    { nama: 'Daging Merah Olahan', alasan: 'Mengandung pengawet', dampak: 'Risiko kanker dan penyakit jantung' },
    { nama: 'Makanan Manis', alasan: 'Mengandung gula tinggi', dampak: 'Penyebab obesitas dan diabetes' },
    { nama: 'Kue dan Pastry', alasan: 'Tinggi lemak trans', dampak: 'Menyebabkan kolesterol tinggi dan penyakit jantung' },
    // Tambahkan lebih banyak data jika diperlukan
];

function renderAvoidTable() {
    const avoidTableBody = document.getElementById('avoidTableBody');
    avoidTableBody.innerHTML = '';

    avoidFoodData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.alasan}</td>
            <td>${item.dampak}</td>
        `;
        avoidTableBody.appendChild(row);
    });
}

// Memuat tabel makanan yang harus dihindari pertama kali
renderAvoidTable();
