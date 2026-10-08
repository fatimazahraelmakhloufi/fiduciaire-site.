function openModal() {
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    // Reset form state if closed
    document.getElementById('bookingForm').classList.remove('hidden');
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('bookingForm').reset();
}

// Close modal if clicking outside of it
window.onclick = function(event) {
    let modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeModal();
    }
}

function submitForm(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    
    // Ici, dans un vrai site, on enverrait les données à un serveur ou par email.
    // Pour la démo, on montre un message de succès.
    
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('successMessage').classList.remove('hidden');
}
