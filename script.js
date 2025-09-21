// متغيرات عامة
let allMedicines = [];
const allMedicineChoice = document.getElementById("allMedicineChoice");
const availableMedicineChoice = document.getElementById("availableMedicineChoice");


// إخفاء شاشة التحميل وإظهار المحتوى
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainContent').classList.add('show');
            loadMedicines();
        }, 500);
    }, 3000);
});

// تحميل الأدوية من الخادم
async function loadMedicines() {
    try {
        const response = await fetch('https://tatbeqak.site/apps/tatbeqey/apps/makhzan/get.php');
        const data = await response.json();
        allMedicines = data.medicines;
        displayMedicines(allMedicines);
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        // بيانات تجريبية في حالة عدم توفر الخادم
        allMedicines = [
            { name: 'باراسيتامول 500مج', price: 15.50, quantity: 100 },
            { name: 'أسبرين 100مج', price: 12.00, quantity: 50 },
            { name: 'أموكسيسيلين 500مج', price: 35.75, quantity: 30 },
            { name: 'إيبوبروفين 400مج', price: 18.25, quantity: 80 },
            { name: 'أوميبرازول 20مج', price: 45.00, quantity: 25 }
        ];
        displayMedicines(allMedicines);
    }
}

// عرض الأدوية في الجدول
function displayMedicines(medicines) {
    const tableBody = document.getElementById('medicineTableBody');
    
    if (medicines.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" class="no-results">لا توجد أدوية متطابقة مع البحث</td></tr>';
        return;
    }

    tableBody.innerHTML = medicines.map(medicine => `
        <tr>
            <td>${medicine.name}</td>
            <td class="price">${medicine.price.toFixed(2)}</td>
            <td class="${medicine.availability == null ? 'status-not-available' : (medicine.availability ? 'status-available' : 'status-not-available')}">${medicine.availability == null ? 'غير متوفر' : (medicine.availability ? 'متوفر' : 'غير متوفر')}</td>
        </tr>
    `).join('');
}

// وظيفة البحث
function searchMedicines(searchTerm) {
    if (!searchTerm.trim()) {
        displayMedicines(allMedicines);
        return;
    }

    const filteredMedicines = allMedicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayMedicines(filteredMedicines);
}

// إعداد البحث
document.getElementById('searchInput').addEventListener('input', function(e) {
    searchMedicines(e.target.value);
});

// البحث عند الضغط على Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMedicines(e.target.value);
    }
});

function switchTab(tabName) {

    allMedicineChoice.classList.toggle("active-choice");
    availableMedicineChoice.classList.toggle("active-choice");

    if(tabName == "all"){
        displayMedicines(allMedicines);
    } else {
        const filteredMedicines = allMedicines.filter(medicine =>
            medicine.availability == true
        );
    
        displayMedicines(filteredMedicines);
    }
}