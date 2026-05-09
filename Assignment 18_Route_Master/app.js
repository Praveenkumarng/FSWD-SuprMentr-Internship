let currentTab = 'books';
const apiBase = '/api';

const dataGrid = document.getElementById('data-grid');
const sectionTitle = document.getElementById('section-title');
const addBtn = document.getElementById('add-btn');
const booksTab = document.getElementById('books-tab');
const authorsTab = document.getElementById('authors-tab');
const modal = document.getElementById('form-modal');
const dataForm = document.getElementById('data-form');
const formFields = document.getElementById('form-fields');
const cancelBtn = document.getElementById('cancel-btn');
const modalTitle = document.getElementById('modal-title');

let editingId = null;

// Initialize
fetchData();

// Tab Switching
booksTab.addEventListener('click', () => {
    currentTab = 'books';
    booksTab.classList.add('active');
    authorsTab.classList.remove('active');
    sectionTitle.innerText = 'Manage Books';
    fetchData();
});

authorsTab.addEventListener('click', () => {
    currentTab = 'authors';
    authorsTab.classList.add('active');
    booksTab.classList.remove('active');
    sectionTitle.innerText = 'Manage Authors';
    fetchData();
});

// Fetch Data
async function fetchData() {
    dataGrid.innerHTML = '<div class="loader">Fetching data...</div>';
    try {
        const response = await fetch(`${apiBase}/${currentTab}`);
        const data = await response.json();
        renderData(data);
    } catch (error) {
        dataGrid.innerHTML = `<div class="loader">Error loading data: ${error.message}</div>`;
    }
}

function renderData(data) {
    if (data.length === 0) {
        dataGrid.innerHTML = '<div class="loader">No entries found.</div>';
        return;
    }

    dataGrid.innerHTML = data.map(item => `
        <div class="card">
            <h3>${item.title || item.name}</h3>
            ${currentTab === 'books' ? `
                <p><strong>Genre:</strong> ${item.genre}</p>
                <p><strong>Year:</strong> ${item.year}</p>
            ` : `
                <p><strong>Nationality:</strong> ${item.nationality}</p>
                <p><strong>Born:</strong> ${item.birthYear}</p>
            `}
            <div class="card-actions">
                <button class="edit-btn" onclick="openEditModal(${item.id})">Edit</button>
                <button class="delete-btn" onclick="deleteEntry(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Modal Logic
addBtn.addEventListener('click', () => {
    editingId = null;
    modalTitle.innerText = `Add New ${currentTab.slice(0, -1)}`;
    renderForm();
    modal.classList.add('active');
});

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

function renderForm(data = {}) {
    if (currentTab === 'books') {
        formFields.innerHTML = `
            <div>
                <label>Title</label>
                <input type="text" name="title" value="${data.title || ''}" required>
            </div>
            <div>
                <label>Author ID</label>
                <input type="number" name="authorId" value="${data.authorId || ''}" required>
            </div>
            <div>
                <label>Genre</label>
                <input type="text" name="genre" value="${data.genre || ''}">
            </div>
            <div>
                <label>Year</label>
                <input type="number" name="year" value="${data.year || ''}">
            </div>
        `;
    } else {
        formFields.innerHTML = `
            <div>
                <label>Name</label>
                <input type="text" name="name" value="${data.name || ''}" required>
            </div>
            <div>
                <label>Nationality</label>
                <input type="text" name="nationality" value="${data.nationality || ''}">
            </div>
            <div>
                <label>Birth Year</label>
                <input type="number" name="birthYear" value="${data.birthYear || ''}">
            </div>
        `;
    }
}

dataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(dataForm);
    const body = Object.fromEntries(formData.entries());

    const url = editingId ? `${apiBase}/${currentTab}/${editingId}` : `${apiBase}/${currentTab}`;
    const method = editingId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            modal.classList.remove('active');
            fetchData();
        } else {
            alert('Failed to save entry');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function openEditModal(id) {
    editingId = id;
    modalTitle.innerText = `Edit ${currentTab.slice(0, -1)}`;
    try {
        const response = await fetch(`${apiBase}/${currentTab}/${id}`);
        const data = await response.json();
        renderForm(data);
        modal.classList.add('active');
    } catch (error) {
        alert('Error fetching details');
    }
}

async function deleteEntry(id) {
    console.log(`Attempting to delete ${currentTab} with id: ${id}`);
    try {
        const response = await fetch(`${apiBase}/${currentTab}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Delete successful');
            fetchData();
        } else {
            console.error('Failed to delete');
            alert('Failed to delete');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('Error: ' + error.message);
    }
}
