const addBtn = document.getElementById('add-btn');
const displayTable = document.getElementById('display').getElementsByTagName('tbody')[0];
const form = document.getElementById('input-form');
const deleteBtn = document.getElementById('delete-btn');

let row = 0;

addBtn.onclick = function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const website = document.getElementById('website').value.trim();
    const addr = document.getElementById('addr').value.trim();
    const gender = form.gender.value;
    const skills = Array.from(form.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    const imgUrl = document.getElementById('profile-img').value.trim();

    if (!name || !email || !website || !addr) {
        alert('Please fill all required fields.');
        return;
    }

    // Simple email and website validation (for demo)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!website.startsWith('http://') && !website.startsWith('https://')) {
        alert('Website should start with http:// or https://');
        return;
    }

    const description = `
        <p>
            <b>Name:</b> ${name}<br>
            <b>Email:</b> ${email}<br>
            <b>Website:</b> <a href="${website}" target="_blank">${website}</a><br>
            <b>Address:</b> ${addr}<br>
            <b>Gender:</b> ${gender}<br>
            <b>Skills:</b> ${skills.length ? skills.join(', ') : 'None'}
        </p>
    `;

    const newRow = displayTable.insertRow(row);
    const descCell = newRow.insertCell(0);
    const profileCell = newRow.insertCell(1);

    descCell.innerHTML = description;

    // Set image: use user input or default based on gender
    const img = document.createElement('img');
    img.alt = gender;
    img.className = "profile-img";
    if (imgUrl) {
        img.src = imgUrl;
    } else if (gender === 'Male') {
        img.src = 'https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg';
    } else if (gender === 'Female') {
        img.src = 'https://d29fhpw069ctt2.cloudfront.net/clipart/92161/preview/dagobert83_female_user_icon_preview_d35c.png';
    } else {
        img.src = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'; // a simple neutral icon
    }
    profileCell.appendChild(img);

    row++;
    form.reset();
};

deleteBtn.onclick = function () {
    if (row > 0) {
        displayTable.deleteRow(row - 1);
        row--;
    }
};
