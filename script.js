const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

// 1. تحميل المهام المحفوظة عند فتح الموقع
document.addEventListener('DOMContentLoaded', getTasks);

// 2. إضافة مهمة جديدة
addBtn.addEventListener('click', () => {
    if (input.value !== "") {
        createTaskElement(input.value);
        saveLocalTasks(input.value); // حفظ في ذاكرة المتصفح
        input.value = "";
    }
});

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `${taskText} <span class="delete-btn">حذف</span>`;
    
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeLocalTask(taskText); // حذف من الذاكرة
    });
    taskList.appendChild(li);
}

// 3. تفعيل الوضع الليلي
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// --- وظائف الحفظ في ذاكرة المتصفح (Local Storage) ---

function saveLocalTasks(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تحديث وظيفة إنشاء المهمة لتشمل الأولوية والتاريخ
function createTaskElement(taskText, priority, date = new Date().toLocaleString('ar-EG')) {
    const li = document.createElement('li');
    li.classList.add(`priority-${priority}`); // إضافة كلاس الأولوية
    
    li.innerHTML = `
        <div class="task-info">
            <strong>${taskText}</strong>
            <span class="task-date">${date}</span>
        </div>
        <span class="delete-btn">حذف</span>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        // هنا يمكنك إضافة كود حذف من LocalStorage كما في السابق
    });

    taskList.appendChild(li);
}

// إضافة وظيفة البحث (Live Search)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
    const term = searchInput.value.toLowerCase();
    const tasks = taskList.getElementsByTagName('li');
    
    Array.from(tasks).forEach(task => {
        const text = task.firstElementChild.textContent;
        if (text.toLowerCase().indexOf(term) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});

// تحديث زر الإضافة ليقرأ الأولوية
addBtn.addEventListener('click', () => {
    const priority = document.getElementById('priorityInput').value;
    if (input.value !== "") {
        createTaskElement(input.value, priority);
        input.value = "";
    }
});
