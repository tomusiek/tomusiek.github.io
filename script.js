function updateCountdown() {
    const targetDate = new Date("2025-02-01T00:00:00");
    const now = new Date();

    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown").textContent = `ETA: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

function updateVisits() {
    fetch('https://portfolio-api-562k.onrender.com/api/visit_count')
    .then((response) => response.json())
    .then((data) => {
        const finalNumber = data.total;
        const visitCountElement = document.getElementById("visit-count");
        
        setTimeout(() => {
            let start = 0;
            const duration = 3000;
            const increment = finalNumber / (duration / 50);
            
            const interval = setInterval(() => {
                start += increment;
                
                if (start >= finalNumber) {
                    start = finalNumber;
                    clearInterval(interval);
                }

                visitCountElement.textContent = `${Math.round(start)} Visits`;
            }, 50);
        }, 2000);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function newVisit() {    
    fetch('https://portfolio-api-562k.onrender.com/api/new_visit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadUser() {
    fetch('https://portfolio-api-562k.onrender.com/api/discord')
    .then((response) => response.json())
    .then((data) => {
       const username = document.querySelector('.username');
       const status_text = document.querySelector('.status-text');
       const status = document.querySelector('.status');
       const avatar = document.querySelector('.av');

       username.textContent = data.name;
       avatar.setAttribute('src', data.avatar);

       if (data.status !== 'none') {
        status_text.textContent = data.status;
       } else {
        status_text.textContent = '';
       }

       if (data.presence === 'online') {
        status.style.backgroundColor = '#23a55a';
       }
       if (data.presence === 'dnd') {
        status.style.backgroundColor = '#f23f43';
       }
       if (data.presence === 'idle') {
        status.style.backgroundColor = '#f0b232';
       }
       if (data.presence === 'offline') {
        status.style.backgroundColor = '#80848e';
       }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function acceptPrivacy() {
    document.getElementById('privacyPopup').style.display = 'none';
    localStorage.setItem('accepted', true);
    newVisit();
}

function denyPrivacy() {
    document.getElementById('privacyPopup').style.display = 'none';
    localStorage.setItem('accepted', false);
}

if (localStorage.getItem('accepted')) {
    document.getElementById('privacyPopup').style.display = 'none';
}

if (localStorage.getItem('accepted') === 'true') {
    newVisit();
}

setInterval(updateCountdown, 1000);

updateCountdown();

updateVisits();

loadUser();