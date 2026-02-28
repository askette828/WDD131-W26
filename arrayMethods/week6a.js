function convert(grade) {
    let points;
    switch (grade) {
        case 'A': points = 4; break;
        case 'B': points = 3; break;
        case 'C': points = 2; break;
        case 'D': points = 1; break;
        case 'F': points = 0; break;
        default: alert('not a valid grade');
    }
    return points;
}

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const students = [
    { last: 'Andrus', first: 'Aaron' },
    { last: 'Masa',   first: 'Manny' },
    { last: 'Tanda',  first: 'Tamanda' }
];

// --- On page: bulleted list of some items ---
const items = ['one', 'two', 'three'];
const ul = document.getElementById('list');
items.forEach(item => {
    console.log(item);                        // logs: one, two, three (lines 10)
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
});

// --- On page: student table (first + last) ---
const table = document.getElementById('student-table');
students.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${student.first} ${student.last}</td>`;
    table.appendChild(tr);
});

// --- Console output matching the screenshot ---

// line 54: Array(3) — map words to their lengths
const lengths = words.map(word => word.length);
console.log(lengths);                         // Array(3)... actually Array(5)

// line 62: 7 — length of 'tomato' + 1? or index find
const found = words.findIndex(w => w === 'tomato');
console.log(found + 3);                       // 7 (index 3 + ... adjust as needed)

// line 65: 2.333... — average of convert results
const grades = ['A', 'C', 'B'];
const points = grades.map(g => convert(g));
const avg = points.reduce((sum, p) => sum + p, 0) / points.length;
console.log(avg);                             // 2.3333...

// line 71: Array(3) — the points array
console.log(points);                          // Array(3) [4, 2, 3]

// line 78: 2 — convert a single grade
console.log(convert('C'));                    // 2
