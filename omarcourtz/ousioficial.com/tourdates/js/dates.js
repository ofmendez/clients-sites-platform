
  const tourDates = [
    {
      date: "AUG 19",
      city: "SAN JOSE, CA",
      venue: "San José Civic",
      status: "coming"
    },
    {
      date: "AUG 21",
      city: "INGLEWOOD, CA",
      venue: "YOUTUBE THEATER",
      status: "coming"
    },
    {
      date: "AUG 22",
      city: "LAS VEGAS, NV",
      venue: "Fontainebleau Las Vegas",
      status: "coming"
    },
    {
      date: "AUG 23",
      city: "SAN DIEGO, CA",
      venue: "Cal Coast Credit Union Open Air T.",
      status: "coming"
    },
    {
      date: "AUG 27",
      city: "HOUSTON, TX",
      venue: "713 Music Hall ",
      status: "coming"
    },
    {
      date: "AUG 28",
      city: "IRVING, TX",
      venue: "Toyota Music Factory",
      status: "coming"
    },
    {
      date: "AUG 30",
      city: "ATLANTA, GA",
      venue: "Gas South Arena",
      status: "coming"
    },
    {
      date: "SEP 02",
      city: "WASHINGTON, DC",
      venue: "The Theater at MGM",
      status: "coming"
    },
    {
      date: "SEP 03",
      city: "BOSTON, MA",
      venue: "MGM Music Hall @ Fenway",
      status: "coming"
    },
    {
      date: "SEP 05",
      city: "CHICAGO, IL",
      venue: "Byline Bank Aragon Ballroom",
      status: "coming"
    },
    {
      date: "SEP 09",
      city: "BROOKLYN, NY",
      venue: "Barclays Center",
      status: "coming"
    },
    {
      date: "SEP 10",
      city: "READING, PA",
      venue: "Santander Arena",
      status: "coming"
    },
    {
      date: "SEP 12",
      city: "MIAMI, FL",
      venue: "Kaseya Center",
      status: "coming"
    },
    {
      date: "SEP 13",
      city: "ORLANDO, FL",
      venue: "Kia Center",
      status: "coming"
    }
  ];

  function createTourAction(item) {
    if (item.status === "tickets" && item.url) {
      return `
        <a class="tour-btn" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Tickets para ${item.city}">
          <span>TICKETS</span>
          <img class="tour-btn__arrow" src="assets/arrow-right.svg" alt="">
        </a>
      `;
    }

    if (item.status === "soldout") {
      return `<span class="tour-status tour-status--soldout">SOLD OUT</span>`;
    }

    return `<span class="tour-status tour-status--coming">COMING SOON</span>`;
  }

  function renderTourDates() {
    const container = document.getElementById("tourTable");
    if (!container) return;

    container.innerHTML = tourDates.map(item => `
      <div class="tour-row">
        <div class="tour-date">
          <span>${item.date}</span>
          ${item.isNew ? '<span class="tour-badge-new">NEW</span>' : ''}
        </div>

        <div class="tour-city">${item.city}</div>

        <div class="tour-venue">${item.venue}</div>

        <div class="tour-action">
          ${createTourAction(item)}
        </div>
      </div>
    `).join("");
  }

  renderTourDates();
