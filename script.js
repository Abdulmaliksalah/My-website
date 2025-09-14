// بيانات الحجوزات
let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

// تحديث جدول الحجوزات
function updateBookingTable() {
    const tableBody = document.querySelector("#bookingTable tbody");
    if (!tableBody) return;
    
    tableBody.innerHTML = "";
    
    bookings.forEach((booking, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.roomType}</td>
            <td>${booking.nights}</td>
            <td>$${booking.pricePerNight}</td>
            <td>$${booking.totalPrice}</td>
            <td>
                <button class="delete-btn" onclick="deleteBooking(${index})">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// حذف الحجز
function deleteBooking(index) {
    if (confirm("هل تريد حذف هذا الحجز فعلاً؟")) {
        bookings.splice(index, 1);
        localStorage.setItem("hotelBookings", JSON.stringify(bookings));
        updateBookingTable();
        alert("تم الحذف بنجاح");
    }
}

// إضافة حجز جديد
function reserveRoom(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value;
    const roomType = form.roomType.value;
    const nights = parseInt(form.nights.value);
    const pricePerNight = parseInt(form.roomType.selectedOptions[0].dataset.price || 0);
    const totalPrice = nights * pricePerNight;
    
    const newBooking = {
        name,
        roomType,
        nights,
        pricePerNight,
        totalPrice
    };
    
    bookings.push(newBooking);
    localStorage.setItem("hotelBookings", JSON.stringify(bookings));
    updateBookingTable();
    
    alert(`تم حجز ${roomType} لمدة ${nights} ليالي. السعر: $${totalPrice}`);
    form.reset();
    document.getElementById('totalPrice').textContent = '';
}

// تحديث السعر الإجمالي
function updateTotal() {
    const roomSelect = document.querySelector('select[name="roomType"]');
    const nightsInput = document.querySelector('input[name="nights"]');
    const totalPriceElem = document.getElementById('totalPrice');
    
    if (!roomSelect || !nightsInput || !totalPriceElem) return;
    
    const price = parseInt(roomSelect.selectedOptions[0].dataset.price || 0);
    const nights = parseInt(nightsInput.value || 0);
    const total = price * nights;
    
    totalPriceElem.textContent = `السعر الإجمالي: $${total}`;
}

// تبديل الوضع الليلي
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// عرض الشرائح
let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll('.slider .slides img');
    if (slides.length === 0) return;
    
    slides.forEach(s => s.style.display = 'none');
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 3000);
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    updateBookingTable();
    
    // إضافة مستمعي الأحداث
    const roomSelect = document.querySelector('select[name="roomType"]');
    const nightsInput = document.querySelector('input[name="nights"]');
    
    if (roomSelect) roomSelect.addEventListener('change', updateTotal);
    if (nightsInput) nightsInput.addEventListener('input', updateTotal);
    
    // بدء عرض الشرائح
    showSlides();
});
