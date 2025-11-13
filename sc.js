document.addEventListener("DOMContentLoaded", function() {

  const data = {
    stage1: {
      "شعبة 1": [
        {name:"مريم عبدالله", phone:"96891234567"},
        {name:"سارة خالد", phone:"96898765432"},
        {name:"ليلى سعيد", phone:"96891122334"}
      ],
      "شعبة 2": [
        {name:"أسماء علي", phone:"96897654321"},
        {name:"هالة يوسف", phone:"96899887766"},
        {name:"نور محمد", phone:"96891239876"}
      ]
    },
    stage2: {
      "شعبة 1": [
        {name:"ريما سعيد", phone:"96892234567"},
        {name:"جنى خالد", phone:"96892765432"},
        {name:"تالا يوسف", phone:"96892112334"}
      ]
    },
    stage3: {
      "شعبة 1": [
        {name:"جنى مريم", phone:"96893234567"},
        {name:"لين سارة", phone:"96893765432"},
        {name:"ميار ليلى", phone:"96893112334"}
      ]
    }
  };

  const gradeSelect = document.getElementById("grade");
  const classSelect = document.getElementById("class");
  const studentSelect = document.getElementById("students");

  // تحديث الشُعب عند اختيار المرحلة
  gradeSelect.addEventListener("change", function() {
    const grade = this.value;
    classSelect.innerHTML = '<option value="">اختر الشعبة</option>';
    studentSelect.innerHTML = '';
    if(data[grade]) {
      for(let cls in data[grade]) {
        let option = document.createElement("option");
        option.value = cls;
        option.textContent = cls;
        classSelect.appendChild(option);
      }
    }
  });

  // تحديث الطلاب عند اختيار الشعبة
  classSelect.addEventListener("change", function() {
    const grade = gradeSelect.value;
    const cls = this.value;
    studentSelect.innerHTML = '';
    if(data[grade] && data[grade][cls]) {
      data[grade][cls].forEach(student => {
        let option = document.createElement("option");
        option.value = student.phone;
        option.textContent = student.name;
        studentSelect.appendChild(option);
      });
    }
  });

  // إرسال WhatsApp
  document.getElementById("sendBtn").addEventListener("click", function() {
    const selected = Array.from(studentSelect.selectedOptions);
    if(selected.length === 0) { alert("اختر طالبة واحدة على الأقل"); return; }

    const today = new Date();
    const dateStr = today.toLocaleDateString("ar-OM", {weekday:"long", year:"numeric", month:"long", day:"numeric"});

    selected.forEach((option, idx) => {
      setTimeout(() => {
        const msg = encodeURIComponent(السلام عليكم، نود إعلامكم بغياب الطالبة ${option.textContent} بتاريخ ${dateStr}. إدارة المدرسة.);
        const url = https://wa.me/${option.value}?text=${msg};
        window.open(url, "_blank");
      }, idx*700);
    });
  });

});