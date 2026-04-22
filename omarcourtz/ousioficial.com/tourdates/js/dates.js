
  const tourDates = [
    {
      date: "AUG 19",
      city: "SAN JOSE, CA",
      venue: "San José Civic",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 21",
      city: "INGLEWOOD, CA",
      venue: "YOUTUBE THEATER",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 22",
      city: "LAS VEGAS, NV",
      venue: "Fontainebleau Las Vegas",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 23",
      city: "SAN DIEGO, CA",
      venue: "Cal Coast Credit Union",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 27",
      city: "HOUSTON, TX",
      venue: "713 Music Hall ",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 28",
      city: "IRVING, TX",
      venue: "Toyota Music Factory",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 30",
      city: "ATLANTA, GA",
      venue: "Gas South Arena",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "SEP 02",
      city: "WASHINGTON, DC",
      venue: "The Theater at MGM",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "SEP 03",
      city: "BOSTON, MA",
      venue: "MGM Music Hall @ Fenway",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "SEP 05",
      city: "CHICAGO, IL",
      venue: "Byline Bank Aragon Ballroom",
      status: "soldout",
  bundleStatus: "inactive"
    }
    ,
    {
      date: "SEP 08",
      city: "BROOKLYN, NY",
      venue: "Barclays Center",
      status: "coming",
      isNew: true,
  bundleStatus: "inactive"
    },
    {
      date: "SEP 09",
      city: "BROOKLYN, NY",
      venue: "Barclays Center",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "SEP 10",
      city: "READING, PA",
      venue: "Santander Arena",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "SEP 11",
      city: "MIAMI, FL",
      venue: "Kaseya Center",
      status: "coming",
      isNew: true,
  bundleStatus: "inactive"
    },
    {
      date: "SEP 12",
      city: "MIAMI, FL",
      venue: "Kaseya Center",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "SEP 13",
      city: "ORLANDO, FL",
      venue: "Kia Center",
      status: "soldout",
  bundleStatus: "inactive"
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

function createBundleAction(item) {
  if (item.bundleStatus === "active" && item.bundleUrl) {
    return `
      <a class="tour-btn" href="${item.bundleUrl}" target="_blank" rel="noopener noreferrer" aria-label="Bundle para ${item.city}">
        <span>OUSI BUNDLE</span>
        <img class="tour-btn__arrow" src="assets/arrow-right.svg" alt="">
      </a>
    `;
  }

  return `<span class="tour-status tour-status--coming">OUSI BUNDLE</span>`;
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

        <div class="tour-actions-stack">
  <div class="tour-action">
    ${createTourAction(item)}
  </div>

  <div class="tour-bundle-action">
    ${createBundleAction(item)}
  </div>
</div>
      </div>
    `).join("");
  }

  renderTourDates();
