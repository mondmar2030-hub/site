(function () {
  "use strict";

  const FALLBACK_IMAGE = "assets/images/car-fallback.svg";

  const CARS = [
    {
      id: 1,
      brand: "Dacia",
      model: "Sandero",
      category: "Economy",
      transmission: "Manual",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 300,
      featured: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/db/Dacia_Sandero_III_1X7A0329.jpg",
      description:
        "A practical city hatchback for everyday trips and regional travel."
    },
    {
      id: 2,
      brand: "Renault",
      model: "Clio",
      category: "Economy",
      transmission: "Manual",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 350,
      featured: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Renault_Clio_R.S._Line_%28V%29_%E2%80%93_f_17102021.jpg",
      description:
        "A compact hatchback that is easy to park in town and comfortable on longer Moroccan roads."
    },
    {
      id: 3,
      brand: "Peugeot",
      model: "208",
      category: "Compact",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 400,
      featured: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d8/Peugeot_208_B_facelift_DSC_7227.jpg",
      description:
        "A comfortable compact hatchback for city driving and highway journeys."
    },
    {
      id: 4,
      brand: "Volkswagen",
      model: "Golf",
      category: "Compact",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 450,
      featured: false,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg",
      description:
        "A well-known compact car with a balanced ride for longer journeys."
    },
    {
      id: 5,
      brand: "Toyota",
      model: "Corolla",
      category: "Sedan",
      transmission: "Automatic",
      fuel: "Hybrid",
      seats: 5,
      airConditioning: true,
      pricePerDay: 500,
      featured: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Toyota_Corolla_Hybrid_Sedan%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS1338%29.jpg",
      description:
        "A spacious hybrid sedan option for business or family travel."
    },
    {
      id: 6,
      brand: "Skoda",
      model: "Octavia",
      category: "Sedan",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: 5,
      airConditioning: true,
      pricePerDay: 450,
      featured: false,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Skoda_Octavia_IV_Combi_RS_1X7A0352.jpg",
      description:
        "A roomy sedan with a large boot, useful for regional trips."
    },
    {
      id: 7,
      brand: "Dacia",
      model: "Duster",
      category: "SUV",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 550,
      featured: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/Dacia_Duster_III_IMG_8961.jpg",
      description:
        "A higher-riding SUV suited to family travel and mixed road conditions."
    },
    {
      id: 8,
      brand: "Peugeot",
      model: "3008",
      category: "SUV",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: 5,
      airConditioning: true,
      pricePerDay: 650,
      featured: false,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Peugeot_e-3008_Automesse_Ludwigsburg_2024_IMG_1537.jpg",
      description:
        "A family SUV with extra space and comfort for longer rentals."
    },
    {
      id: 9,
      brand: "Mercedes-Benz",
      model: "C-Class",
      category: "Premium",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 1000,
      featured: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Mercedes_C-Class%2C_TWB_2018%2C_Friedrichshafen_%28OW1A0629%29.jpg",
      description:
        "A premium sedan for occasions where comfort and presentation matter."
    },
    {
      id: 10,
      brand: "BMW",
      model: "3 Series",
      category: "Premium",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      airConditioning: true,
      pricePerDay: 1100,
      featured: false,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/BMW_3_SERIES_LWB_SEDAN_%28G28%29_China_%282%29.jpg",
      description:
        "A premium sports sedan for highway comfort and a more dynamic drive."
    }
  ];

  const LOCATIONS = ["Goulmima", "Errachidia", "Pickup location to be confirmed", "Other location to be confirmed"];
  const STORAGE = {
    cookie: "bml_cookie_pref",
    search: "bml_search",
    selectedCar: "bml_selected_car"
  };

  const qs = (sel, root) => (root || document).querySelector(sel);
  const qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function formatMAD(value) {
    return new Intl.NumberFormat("fr-MA").format(value) + " MAD";
  }

  function carName(car) {
    return car.brand + " " + car.model;
  }

  function attachImageFallback(img) {
    img.addEventListener("error", function onError() {
      img.removeEventListener("error", onError);
      img.src = FALLBACK_IMAGE;
    });
  }

  function populateSelect(select, options, placeholder) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = "";
    if (placeholder) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = placeholder;
      select.appendChild(opt);
    }
    options.forEach(function (value) {
      const opt = document.createElement("option");
      opt.value = String(value);
      opt.textContent = String(value);
      select.appendChild(opt);
    });
    if (current) select.value = current;
  }

  function initHeader() {
    const header = qs(".site-header");
    const toggle = qs(".nav-toggle");
    const nav = qs("#site-nav");
    if (header) {
      const onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      qsa("a", nav).forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initFooterYear() {
    qsa("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function initScrollTop() {
    const btn = qs("#scroll-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("is-visible", window.scrollY > 400);
      },
      { passive: true }
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initCookieBanner() {
    const banner = qs("#cookie-banner");
    if (!banner) return;
    const settings = qs("#cookie-settings");
    const saved = localStorage.getItem(STORAGE.cookie);
    if (!saved) banner.classList.add("is-visible");

    function save(choice) {
      const analytics = qs("#cookie-analytics");
      localStorage.setItem(
        STORAGE.cookie,
        JSON.stringify({
          choice: choice,
          analytics: analytics ? analytics.checked : choice === "accept",
          date: new Date().toISOString()
        })
      );
      banner.classList.remove("is-visible");
    }

    qs("#cookie-accept")?.addEventListener("click", function () {
      save("accept");
    });
    qs("#cookie-decline")?.addEventListener("click", function () {
      const analytics = qs("#cookie-analytics");
      if (analytics) analytics.checked = false;
      save("decline");
    });
    qs("#cookie-settings-btn")?.addEventListener("click", function () {
      settings?.classList.toggle("is-open");
    });
    qs("#cookie-save")?.addEventListener("click", function () {
      save("custom");
    });
  }

  function rentalDays(pickupDate, pickupTime, returnDate, returnTime) {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate + "T" + (pickupTime || "00:00"));
    const end = new Date(returnDate + "T" + (returnTime || "00:00"));
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    if (end <= start) return 0;
    return Math.max(1, Math.ceil((end - start) / 86400000));
  }

  function setMinDates() {
    const today = new Date().toISOString().slice(0, 10);
    qsa('input[type="date"]').forEach(function (input) {
      if (!input.min) input.min = today;
    });
  }

  function validateDatePair(pickupDate, pickupTime, returnDate, returnTime) {
    if (!pickupDate || !returnDate) return "Please select pickup and return dates.";
    const start = new Date(pickupDate + "T" + (pickupTime || "00:00"));
    const end = new Date(returnDate + "T" + (returnTime || "00:00"));
    if (end <= start) return "Return date and time must be after pickup.";
    return "";
  }

  function bindDateGuards(form) {
    const pickupDate = qs('[name="pickupDate"]', form);
    const returnDate = qs('[name="returnDate"]', form);
    if (pickupDate && returnDate) {
      pickupDate.addEventListener("change", function () {
        returnDate.min = pickupDate.value || returnDate.min;
        if (returnDate.value && returnDate.value < pickupDate.value) {
          returnDate.value = pickupDate.value;
        }
      });
    }
  }

  function renderCarCard(car) {
    return (
      '<article class="car-card" data-car-id="' +
      car.id +
      '">' +
      '<img src="' +
      car.image +
      '" alt="' +
      carName(car) +
      '" loading="lazy" width="600" height="190">' +
      '<div class="car-body">' +
      '<div class="car-meta"><h3>' +
      carName(car) +
      '</h3><span class="badge">' +
      car.category +
      "</span></div>" +
      '<div class="specs">' +
      "<span>" +
      car.transmission +
      "</span><span>" +
      car.fuel +
      "</span><span>" +
      car.seats +
      " Seats</span><span>" +
      (car.airConditioning ? "A/C" : "No A/C") +
      "</span></div>" +
      '<p class="price">From ' +
      formatMAD(car.pricePerDay) +
      " / day<br><small>Market-reference daily rate</small></p>" +
      '<div class="car-actions">' +
      '<button type="button" class="btn btn-ghost" data-details="' +
      car.id +
      '">View Details</button>' +
      '<a class="btn btn-primary" href="#booking?car=' +
      car.id +
      '">Book Now</a>' +
      "</div></div></article>"
    );
  }

  function filterCars(list, filters) {
    return list.filter(function (car) {
      const hay = (carName(car) + " " + car.category).toLowerCase();
      if (filters.q && hay.indexOf(filters.q.toLowerCase()) === -1) return false;
      if (filters.category && car.category !== filters.category) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.seats && String(car.seats) !== String(filters.seats)) return false;
      return true;
    });
  }

  function sortCars(list, sort) {
    const copy = list.slice();
    if (sort === "price-asc") copy.sort(function (a, b) { return a.pricePerDay - b.pricePerDay; });
    else if (sort === "price-desc") copy.sort(function (a, b) { return b.pricePerDay - a.pricePerDay; });
    else if (sort === "az") copy.sort(function (a, b) { return carName(a).localeCompare(carName(b)); });
    else if (sort === "za") copy.sort(function (a, b) { return carName(b).localeCompare(carName(a)); });
    return copy;
  }

  function bindCardEvents(root) {
    qsa("img", root).forEach(attachImageFallback);
    qsa("[data-details]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        openCarModal(Number(btn.getAttribute("data-details")));
      });
    });
  }

  function renderInto(container, cars, emptyMessage) {
    if (!container) return;
    if (!cars.length) {
      container.innerHTML =
        '<p class="empty-state">' +
        (emptyMessage || "No vehicles match your search. Try another filter.") +
        "</p>";
      return;
    }
    container.innerHTML = cars.map(renderCarCard).join("");
    bindCardEvents(container);
  }

  function openCarModal(id) {
    const car = CARS.find(function (item) { return item.id === id; });
    const modal = qs("#car-modal");
    if (!car || !modal) return;
    qs("#modal-image", modal).src = car.image;
    qs("#modal-image", modal).alt = carName(car);
    attachImageFallback(qs("#modal-image", modal));
    qs("#modal-title", modal).textContent = carName(car);
    qs("#modal-category", modal).textContent = car.category;
    qs("#modal-price", modal).textContent = "From " + formatMAD(car.pricePerDay) + " / day";
    qs("#modal-specs", modal).textContent =
      car.transmission +
      " · " +
      car.fuel +
      " · " +
      car.seats +
      " seats · " +
      (car.airConditioning ? "Air conditioning" : "No air conditioning");
    qs("#modal-description", modal).textContent = car.description;
    qs("#modal-book", modal).href = "#booking?car=" + car.id;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    qs(".modal-close", modal)?.focus();
  }

  function closeCarModal() {
    const modal = qs("#car-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function initModal() {
    const modal = qs("#car-modal");
    if (!modal) return;
    qs(".modal-close", modal)?.addEventListener("click", closeCarModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeCarModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeCarModal();
    });
  }

  function initQuickSearch() {
    const form = qs("#quick-search");
    if (!form) return;
    populateSelect(qs('[name="pickupLocation"]', form), LOCATIONS, "Pick-up location");
    populateSelect(qs('[name="dropoffLocation"]', form), LOCATIONS, "Drop-off location");
    populateSelect(
      qs('[name="category"]', form),
      ["Economy", "Compact", "Sedan", "SUV", "Premium"],
      "All categories"
    );
    bindDateGuards(form);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const errorEl = qs("[data-form-error]", form);
      const message = validateDatePair(
        data.get("pickupDate"),
        data.get("pickupTime"),
        data.get("returnDate"),
        data.get("returnTime")
      );
      if (message) {
        if (errorEl) errorEl.textContent = message;
        return;
      }
      if (errorEl) errorEl.textContent = "";
      const payload = {
        pickupLocation: data.get("pickupLocation"),
        dropoffLocation: data.get("dropoffLocation"),
        pickupDate: data.get("pickupDate"),
        pickupTime: data.get("pickupTime"),
        returnDate: data.get("returnDate"),
        returnTime: data.get("returnTime"),
        category: data.get("category")
      };
      sessionStorage.setItem(STORAGE.search, JSON.stringify(payload));
      window.location.hash = "cars";
      qs("#cars")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function initCarsPage() {
    const list = qs("#car-list");
    if (!list) return;
    const searchInput = qs("#car-search");
    const category = qs("#filter-category");
    const transmission = qs("#filter-transmission");
    const fuel = qs("#filter-fuel");
    const seats = qs("#filter-seats");
    const sort = qs("#filter-sort");
    const count = qs("#results-count");

    populateSelect(category, ["Economy", "Compact", "Sedan", "SUV", "Premium"], "All categories");
    populateSelect(transmission, ["Manual", "Automatic"], "Any transmission");
    populateSelect(fuel, ["Petrol", "Diesel", "Hybrid"], "Any fuel");
    populateSelect(seats, ["5"], "Any seats");

    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE.search) || "null");
      if (saved && saved.category && category) category.value = saved.category;
    } catch (err) {
      /* ignore */
    }

    function update() {
      const filters = {
        q: searchInput ? searchInput.value.trim() : "",
        category: category ? category.value : "",
        transmission: transmission ? transmission.value : "",
        fuel: fuel ? fuel.value : "",
        seats: seats ? seats.value : ""
      };
      const result = sortCars(filterCars(CARS, filters), sort ? sort.value : "price-asc");
      if (count) count.textContent = result.length + " vehicle" + (result.length === 1 ? "" : "s");
      renderInto(list, result);
    }

    [searchInput, category, transmission, fuel, seats, sort].forEach(function (el) {
      el?.addEventListener("input", update);
      el?.addEventListener("change", update);
    });
    qs("#reset-filters")?.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      [category, transmission, fuel, seats].forEach(function (el) {
        if (el) el.value = "";
      });
      if (sort) sort.value = "price-asc";
      update();
    });
    update();
  }

  function initFeaturedCars() {
    const list = qs("#featured-cars");
    if (!list) return;
    renderInto(
      list,
      CARS.filter(function (car) { return car.featured; })
    );
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  }

  function fieldError(input, message) {
    const wrap = input.closest(".field") || input.parentElement;
    const el = wrap ? qs(".field-error", wrap) : null;
    if (el) el.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function initBooking() {
    const form = qs("#booking-form");
    if (!form) return;
    populateSelect(qs('[name="pickupLocation"]', form), LOCATIONS, "Select pick-up");
    populateSelect(qs('[name="dropoffLocation"]', form), LOCATIONS, "Select drop-off");
    const vehicleSelect = qs('[name="vehicleId"]', form);
    populateSelect(
      vehicleSelect,
      CARS.map(function (car) {
        return car.id + " — " + carName(car);
      }),
      "Select a vehicle"
    );
    Array.from(vehicleSelect.options).forEach(function (opt, index) {
      if (index === 0) return;
      opt.value = String(CARS[index - 1].id);
      opt.textContent = carName(CARS[index - 1]) + " — " + formatMAD(CARS[index - 1].pricePerDay) + "/day";
    });

    const params = new URLSearchParams(window.location.search);
    const carId = Number(params.get("car") || sessionStorage.getItem(STORAGE.selectedCar) || 0);
    if (carId) {
      vehicleSelect.value = String(carId);
      sessionStorage.setItem(STORAGE.selectedCar, String(carId));
    }

    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE.search) || "null");
      if (saved) {
        ["pickupLocation", "dropoffLocation", "pickupDate", "pickupTime", "returnDate", "returnTime"].forEach(
          function (name) {
            const el = qs('[name="' + name + '"]', form);
            if (el && saved[name]) el.value = saved[name];
          }
        );
      }
    } catch (err) {
      /* ignore */
    }

    bindDateGuards(form);

    const daysEl = qs("#calc-days");
    const priceEl = qs("#calc-price");
    const totalEl = qs("#calc-total");

    function selectedCar() {
      return CARS.find(function (car) {
        return String(car.id) === String(vehicleSelect.value);
      });
    }

    function updateCalc() {
      const car = selectedCar();
      const days = rentalDays(
        qs('[name="pickupDate"]', form).value,
        qs('[name="pickupTime"]', form).value,
        qs('[name="returnDate"]', form).value,
        qs('[name="returnTime"]', form).value
      );
      const price = car ? car.pricePerDay : 0;
      daysEl.textContent = days ? String(days) : "—";
      priceEl.textContent = car ? formatMAD(price) : "—";
      totalEl.textContent = days && car ? formatMAD(days * price) : "—";
      return { car: car, days: days, total: days && car ? days * price : 0 };
    }

    form.addEventListener("input", updateCalc);
    form.addEventListener("change", updateCalc);
    updateCalc();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;
      const required = ["fullName", "email", "phone", "pickupLocation", "dropoffLocation", "pickupDate", "pickupTime", "returnDate", "returnTime", "vehicleId"];
      required.forEach(function (name) {
        const input = qs('[name="' + name + '"]', form);
        if (!input.value) {
          fieldError(input, "This field is required.");
          valid = false;
        } else {
          fieldError(input, "");
        }
      });
      const email = qs('[name="email"]', form);
      if (email.value && !isValidEmail(email.value)) {
        fieldError(email, "Enter a valid email address.");
        valid = false;
      }
      const phone = qs('[name="phone"]', form);
      if (phone.value && !isValidPhone(phone.value)) {
        fieldError(phone, "Enter a valid phone number.");
        valid = false;
      }
      const dateMessage = validateDatePair(
        qs('[name="pickupDate"]', form).value,
        qs('[name="pickupTime"]', form).value,
        qs('[name="returnDate"]', form).value,
        qs('[name="returnTime"]', form).value
      );
      const dateError = qs("#date-error");
      if (dateError) dateError.textContent = dateMessage;
      if (dateMessage) valid = false;
      const terms = qs('[name="acceptTerms"]', form);
      if (!terms.checked) {
        fieldError(terms, "Please accept the Privacy Policy and Terms.");
        valid = false;
      } else {
        fieldError(terms, "");
      }
      if (!valid) return;

      const calc = updateCalc();
      const ref = "CR-" + String(Math.floor(100000 + Math.random() * 900000));
      qs("#confirm-ref").textContent = ref;
      qs("#confirm-car").textContent = calc.car ? carName(calc.car) : "—";
      qs("#confirm-total").textContent = calc.total ? formatMAD(calc.total) : "—";
      qs("#booking-success").classList.add("is-open");
      qs("#booking-success").setAttribute("aria-hidden", "false");
      form.reset();
      updateCalc();
    });

    qs("#close-success")?.addEventListener("click", function () {
      qs("#booking-success").classList.remove("is-open");
      qs("#booking-success").setAttribute("aria-hidden", "true");
    });
    qs("#booking-success")?.addEventListener("click", function (event) {
      if (event.target.id === "booking-success") {
        qs("#booking-success").classList.remove("is-open");
      }
    });
  }

  function initContactForm() {
    const form = qs("#contact-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;
      ["name", "email", "phone", "message"].forEach(function (name) {
        const input = qs('[name="' + name + '"]', form);
        if (!input.value.trim()) {
          fieldError(input, "This field is required.");
          valid = false;
        } else {
          fieldError(input, "");
        }
      });
      const email = qs('[name="email"]', form);
      if (email.value && !isValidEmail(email.value)) {
        fieldError(email, "Enter a valid email address.");
        valid = false;
      }
      const phone = qs('[name="phone"]', form);
      if (phone.value && !isValidPhone(phone.value)) {
        fieldError(phone, "Enter a valid phone number.");
        valid = false;
      }
      const success = qs("#contact-success");
      if (!valid) {
        if (success) success.hidden = true;
        return;
      }
      if (success) {
        success.hidden = false;
        success.textContent =
          "Your message was recorded on this page. Connect the form to your preferred email service before publishing.";
      }
      form.reset();
    });
  }

  function initFaq() {
    qsa(".faq-item").forEach(function (item) {
      const btn = qs("button", item);
      btn?.addEventListener("click", function () {
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initFooterYear();
    initScrollTop();
    initCookieBanner();
    setMinDates();
    initModal();
    initQuickSearch();
    initFeaturedCars();
    initCarsPage();
    initBooking();
    initContactForm();
    initFaq();
  });
})();
