/* ==========================================================================
   EDIT YOUR NODES HERE
   --------------------------------------------------------------------------
   Everything on the home page graph comes from this one list.

   label     Text shown over the photo on hover, and as the card's title.
   blurb     Text shown when the node is opened. Put \n\n where a new
             paragraph should start.
   photo     Path to the node's photo. If the file is missing, the node shows
             its placeholder (color + icon) automatically.
   photoAlt  Describes the photo for screen readers. Update it to match the
             photo you add.
   color     Placeholder color, used until there is a photo.
   icon      Placeholder icon: "people", "home", "book", "tent" or "heart".
   angle     Direction from the headshot in degrees: 0 = right, 90 = down,
             180 = left, 270 = up.
   length    Line length relative to the longest line (1.0 = longest). Sizes
             scale to fit the screen, so only the proportions matter.
   ========================================================================== */
const NODES = [
  {
    label: "People Ops & Learning & Development",
    blurb: "As the Director of People Operations at a tech startup, I’ve planned and facilitated a number of workplace learning programs, including new hire onboarding, skills-based workshops, and team offsites. Once I understand a desired outcome, I can design a program to accomplish it, deliver the learning experience, and iterate based on feedback. Startups notoriously run lean and move quickly, so over the years I’ve honed my ability to take feedback and quickly learn new skills on the job.",
    photo: "images/node-people-ops.jpg",
    photoAlt: "A speaker at the front of a wood-paneled conference room presenting a slide titled Meetup Purpose to a full room of people seated at tables with laptops",
    color: "#E9CFBC",
    icon: "people",
    angle: 170,
    length: 0.75,
  },
  {
    label: "RA",
    blurb: "I was a Resident Assistant (RA) in the dorms for my Sophomore and Junior year in college, then was promoted to an Assistant Resident Director (ARD) in my Senior year. As an RA, I co-managed floors of 60 residents, facilitating social programming, mediating disputes, and responding to health concerns.\n\nAs an ARD, I selected and supervised nine Community Facilitators (Resident Assistants) and eight Desk Receptionists. I also planned and executed frequent staff development and bonding activities to help promote cohesion and collaboration across the team.",
    photo: "images/node-ra.jpg",
    photoAlt: "A smiling group of thirteen people in team caps and sweatshirts posing on a sports field at night, with three of them holding baseball bats",
    color: "#EDDFB4",
    icon: "home",
    angle: 100,
    length: 0.55,
  },
  {
    label: "Teaching",
    blurb: "After graduating college, I spent five months as an English teacher for refugee children aged five to ten who had recently immigrated to the US. It was a small operation, so after a brief training I independently crafted lesson plans with ample games and hands-on elements, delivered lessons to a small group of mixed age students, assessed comprehension and enjoyment, then iterated the following class.\n\nI also spent a summer working as an Instructional Assistant in a special needs classroom at a district summer school, partnering with the lead teacher to provide a fun and engaging experience tailored to each student’s abilities. Both of these experiences gave me opportunities to learn and teach alongside a variety of young people, adjusting and responding to their individual needs.",
    photo: "images/node-teaching.jpg",
    photoAlt: "A smiling teacher leaning in with five young students in front of a classroom chalkboard, some of them making peace signs",
    color: "#C9DAD9",
    icon: "book",
    angle: 213,
    length: 0.88,
  },
  {
    label: "Summer Camps",
    blurb: "I spent multiple summers in high school and college working at summer camps. I co-led a cabin of rising second graders, and coached the girls soccer team at a full-summer residential camp. I supported campers with the transition to sleep-away camp, helped keep daily life fun, and supported campers in resolving disputes.\n\nI spent another summer as a cabin leader for a weekly residential camp for children and adults with special needs, providing direct physical care and adapting activities and games to enable participation.",
    photo: "images/node-summer-camps.jpg",
    photoAlt: "Twelve campers and counselors in rain jackets making silly faces together on a rainy cabin porch",
    color: "#D3DFCB",
    icon: "tent",
    angle: 320,
    length: 0.6,
  },
  {
    label: "Community Building",
    blurb: "Outside of work, I am a passionate community builder, and have planned and facilitated numerous holiday parties, camping trips, hiking clubs, and other events for families in our community since having my own child in 2022. I relish getting families outdoors to move, play, and have fun together. Hosting events over the years has given me the opportunity to build quality relationships with parents and children from a variety of backgrounds.",
    photo: "images/node-community-events.jpg",
    photoAlt: "Five young children climbing over large granite boulders among pine trees, one of them in a sparkly blue dress",
    color: "#E6CCCB",
    icon: "heart",
    angle: 35,
    length: 0.9,
  },
];

/* ==========================================================================
   Graph logic: you shouldn't need to edit below this line.
   ========================================================================== */
(function () {
  // Sizes relative to the longest line.
  const NODE_RADIUS = 0.176;
  const HEAD_RADIUS = 0.23;
  const LINE_BOW = 0.03; // how far each line curves, for a hand-drawn look

  const MAX_LINE = 370; // px, longest line on big screens
  const LIST_BELOW = 420; // px, viewport width where the graph becomes a list
  const MIN_HEIGHT = 420; // px, smallest graph height
  const PAGE_BOTTOM = 16; // px, matches .page--home bottom padding in css/style.css
  const EDGE_GAP = 12; // px, room around the graph for nodes to grow on hover
  const TOUCH_LABEL_WIDTH = 88; // px, matches .node__label in css/style.css
  const TOUCH_LABEL_HEIGHT = 44; // px, room for a two-line label under a node

  const ICONS = {
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4"/><path d="M18 14c2.1.8 3.5 3 3.5 6"/>',
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-6h4v6"/>',
    book: '<path d="M12 6.5C10 5 7 4.5 3 4.5v14c4 0 7 .5 9 2 2-1.5 5-2 9-2v-14c-4 0-7 .5-9 2Z"/><path d="M12 6.5v14"/>',
    tent: '<path d="M12 4 3 20h18Z"/><path d="M12 11l-3.5 9M12 11l3.5 9"/>',
    heart: '<path d="M12 20s-8.5-5-8.5-11A4.7 4.7 0 0 1 12 6.4 4.7 4.7 0 0 1 20.5 9c0 6-8.5 11-8.5 11Z"/>',
  };

  const graph = document.getElementById("graph");
  const lines = document.getElementById("graph-lines");
  const list = document.getElementById("graph-nodes");
  const modal = document.getElementById("node-modal");
  const modalPhoto = document.getElementById("node-modal-photo");
  const modalTitle = document.getElementById("node-modal-title");
  const modalBlurb = document.getElementById("node-modal-blurb");
  const closeButton = document.getElementById("node-modal-close");

  const touchQuery = window.matchMedia("(hover: none)");
  const hoverQuery = window.matchMedia("(hover: hover)");

  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  /* --- Build the nodes -------------------------------------------------- */

  const items = NODES.map(function (node) {
    const radians = node.angle * Math.PI / 180;
    const item = {
      node: node,
      unitX: Math.cos(radians) * node.length,
      unitY: Math.sin(radians) * node.length,
      photoLoaded: false,
    };

    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("class", "graph__line");
    lines.appendChild(line);
    item.line = line;

    const li = document.createElement("li");
    li.className = "graph__node";
    item.li = li;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "node";
    button.setAttribute("aria-haspopup", "dialog");

    const photoWrap = document.createElement("span");
    photoWrap.className = "node__photo";

    const placeholder = document.createElement("span");
    placeholder.className = "node__placeholder";
    placeholder.style.backgroundColor = node.color;
    placeholder.innerHTML = iconSvg(node.icon);
    photoWrap.appendChild(placeholder);

    // The photo sits on top of the placeholder and is removed if it's missing.
    // Its alt is empty here because the label names the button; the opened
    // card uses photoAlt.
    const img = document.createElement("img");
    img.alt = "";
    img.addEventListener("load", function () { item.photoLoaded = true; });
    img.addEventListener("error", function () { img.remove(); });
    img.src = node.photo;
    photoWrap.appendChild(img);

    const label = document.createElement("span");
    label.className = "node__label";
    label.textContent = node.label;

    button.appendChild(photoWrap);
    button.appendChild(label);
    li.appendChild(button);
    list.appendChild(li);

    function updateActive() {
      const hovered = hoverQuery.matches && button.matches(":hover");
      line.classList.toggle("is-active", hovered || button.matches(":focus-visible"));
    }

    ["pointerenter", "pointerleave", "focus", "blur"].forEach(function (type) {
      button.addEventListener(type, updateActive);
    });

    button.addEventListener("click", function () { openModal(item); });

    return item;
  });

  /* --- Fit the graph to the screen -------------------------------------- */

  function layout() {
    const isList = window.innerWidth < LIST_BELOW;
    graph.classList.toggle("is-list", isList);

    if (isList) {
      graph.style.height = "";
      return;
    }

    const halfWidth = graph.clientWidth / 2 - EDGE_GAP;
    const graphTop = graph.getBoundingClientRect().top + window.scrollY;
    const available = Math.max(window.innerHeight - graphTop - PAGE_BOTTOM, MIN_HEIGHT);

    const reachX = Math.max.apply(null, items.map(function (i) { return Math.abs(i.unitX); }));
    const reachUp = Math.max.apply(null, items.map(function (i) { return -i.unitY; }));
    const reachDown = Math.max.apply(null, items.map(function (i) { return i.unitY; }));

    const hasTouchLabels = touchQuery.matches;
    const labelBelow = hasTouchLabels ? TOUCH_LABEL_HEIGHT : 0;
    const labelHalf = hasTouchLabels ? TOUCH_LABEL_WIDTH / 2 : 0;

    const unit = Math.min(
      MAX_LINE,
      halfWidth / (reachX + NODE_RADIUS),
      (halfWidth - labelHalf) / reachX,
      (available - labelBelow - 2 * EDGE_GAP) / (reachUp + reachDown + 2 * NODE_RADIUS)
    );

    const centerX = graph.clientWidth / 2;
    const centerY = EDGE_GAP + unit * (reachUp + NODE_RADIUS);
    const height = centerY + unit * (reachDown + NODE_RADIUS) + labelBelow + EDGE_GAP;

    graph.style.height = height + "px";
    graph.style.setProperty("--center-x", centerX + "px");
    graph.style.setProperty("--center-y", centerY + "px");
    graph.style.setProperty("--node-size", 2 * unit * NODE_RADIUS + "px");
    graph.style.setProperty("--head-size", 2 * unit * HEAD_RADIUS + "px");
    graph.style.setProperty("--label-size", Math.max(11.5, Math.min(16, unit * 0.042)) + "px");

    items.forEach(function (item, index) {
      const x = centerX + unit * item.unitX;
      const y = centerY + unit * item.unitY;
      item.li.style.setProperty("--x", x + "px");
      item.li.style.setProperty("--y", y + "px");

      // A gentle curve, bending a different way on alternating lines.
      const bow = unit * LINE_BOW * (index % 2 ? 1 : -1);
      const midX = (centerX + x) / 2 - item.unitY * bow;
      const midY = (centerY + y) / 2 + item.unitX * bow;
      item.line.setAttribute("d", "M" + centerX + " " + centerY + " Q" + midX + " " + midY + " " + x + " " + y);
    });
  }

  layout();
  window.addEventListener("resize", layout);
  touchQuery.addEventListener("change", layout);
  // The header's height changes once the web fonts arrive.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layout);
  }

  /* --- Open and close a node -------------------------------------------- */

  function openModal(item) {
    const node = item.node;
    modalTitle.textContent = node.label;
    modalBlurb.textContent = node.blurb;
    modalPhoto.style.backgroundColor = node.color;
    modalPhoto.innerHTML = "";

    if (item.photoLoaded) {
      const img = document.createElement("img");
      img.src = node.photo;
      img.alt = node.photoAlt;
      modalPhoto.appendChild(img);
    } else {
      modalPhoto.innerHTML = iconSvg(node.icon);
    }

    modal.classList.remove("is-closing");
    modal.showModal();
  }

  function closeModal() {
    if (!modal.open || modal.classList.contains("is-closing")) return;
    modal.classList.add("is-closing");
    window.setTimeout(function () {
      modal.close();
      modal.classList.remove("is-closing");
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200);
  }

  closeButton.addEventListener("click", closeModal);

  // The card fills the dialog, so a click on the dialog itself is on the backdrop.
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  // Escape: play the same closing animation.
  modal.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeModal();
  });
})();
