
  const tourDates = [
    {
      date: "AUG 19",
      city: "SAN JOSE, CA",
      venue: "SAP Center",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 21",
      city: "INGLEWOOD, CA",
      venue: "KIA FORUM",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 23",
      city: "SAN DIEGO, CA",
      venue: "Viejas Arena",
      status: "soldout",
  bundleStatus: "inactive"
    },
    {
      date: "AUG 26",
      city: "HIDALGO, TX",
      venue: "Payne Arena",
      status: "coming",
      isNew: true,
  bundleStatus: "inactive"
    },
    {
      date: "AUG 27",
      city: "HOUSTON, TX",
      venue: "Toyota Center",
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
      venue: "CFG Arena",
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
      venue: "United Center",
      status: "soldout",
  bundleStatus: "inactive"
    }
    ,
    {
      date: "SEP 08",
      city: "BROOKLYN, NY",
      venue: "Barclays Center",
      status: "tickets",
      url: "https://www.ticketmaster.com/omar-courtz-por-si-manana-no-brooklyn-new-york-09-08-2026/event/3000649578B414BC?referrer=https%3A%2F%2Fwww.ticketmaster.com%2Fomar-courtz-tickets%2Fartist%2F3026340",
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
      status: "tickets",
      url: "https://www.ticketmaster.com/omar-courtz-por-si-manana-no-miami-florida-09-11-2026/event/0D006494AAAD946F?referrer=https%3A%2F%2Fwww.ticketmaster.com%2Fomar-courtz-tickets%2Fartist%2F3026340",
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
    },
    {
      date: "SEP 19",
      city: "ORLANDO, FL",
      venue: "Kia Center",
      status: "coming",
      isNew: true,
  bundleStatus: "inactive"
    },
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
